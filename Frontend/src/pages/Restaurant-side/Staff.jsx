import { useState, useEffect } from 'react'
import { Search, Users, UserCheck, Briefcase, Clock, Pencil, Plus } from 'lucide-react'
import RestaurantDashboardLayout from '../../components/restaurant/RestaurantDashboardLayout'
import StatCard from '../../components/restaurant/StatCard'
import RoleBadge from '../../components/restaurant/RoleBadge'
import StatusDot from '../../components/restaurant/StatusDot'
import Modal from '../../components/ui/Modal'
import { useRestaurant } from '../../context/RestaurantContext'
import { getStaff, createStaff, updateStaff, deleteStaff } from '../../services/staffService'

const staffRoles = ['Manager', 'Waitress', 'Chef', 'Bartender']
const staffStatuses = ['Active', 'On Leave']

const emptyForm = { name: '', email: '', phone: '', role: 'Waitress', status: 'Active' }

const formatDate = (isoString) =>
    new Date(isoString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

function Staff() {
    const { restaurant } = useRestaurant()

    const [staffList, setStaffList] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [pageError, setPageError] = useState('')

    const [search, setSearch] = useState('')
    const [roleFilter, setRoleFilter] = useState('all')
    const [statusFilter, setStatusFilter] = useState('all')
    const [sortBy, setSortBy] = useState('name-asc')

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingId, setEditingId] = useState(null)
    const [form, setForm] = useState(emptyForm)
    const [modalError, setModalError] = useState('')
    const [isSaving, setIsSaving] = useState(false)

    useEffect(() => {
        if (!restaurant) return

        let cancelled = false

        const load = async () => {
            setIsLoading(true)
            setPageError('')
            try {
                const response = await getStaff(restaurant._id)
                if (!cancelled) setStaffList(response.data)
            }
            catch (error) {
                if (!cancelled) setPageError(error.message)
            }
            finally {
                if (!cancelled) setIsLoading(false)
            }
        }

        load()
        return () => { cancelled = true }
    }, [restaurant])

    // Stat cards
    const activeCount = staffList.filter((s) => s.status === 'Active').length
    const managerCount = staffList.filter((s) => s.role === 'Manager').length
    const onLeaveCount = staffList.filter((s) => s.status === 'On Leave').length

    // Filter, then sort
    const term = search.trim().toLowerCase()

    const visibleStaff = staffList
        .filter((member) => {
            const matchesSearch =
                term === '' ||
                member.name.toLowerCase().includes(term) ||
                member.email.toLowerCase().includes(term) ||
                member.role.toLowerCase().includes(term) ||
                (member.phone || '').includes(term)
            const matchesRole = roleFilter === 'all' || member.role === roleFilter
            const matchesStatus = statusFilter === 'all' || member.status === statusFilter
            return matchesSearch && matchesRole && matchesStatus
        })
        .sort((a, b) => {
            if (sortBy === 'name-desc') return b.name.localeCompare(a.name)
            if (sortBy === 'newest') return new Date(b.createdAt) - new Date(a.createdAt)
            return a.name.localeCompare(b.name)
        })

    const updateForm = (field, value) => {
        setForm((prev) => ({ ...prev, [field]: value }))
    }

    const openAddModal = () => {
        setEditingId(null)
        setForm(emptyForm)
        setModalError('')
        setIsModalOpen(true)
    }

    const openEditModal = (member) => {
        setEditingId(member._id)
        setForm({
            name: member.name,
            email: member.email,
            phone: member.phone || '',
            role: member.role,
            status: member.status,
        })
        setModalError('')
        setIsModalOpen(true)
    }

    const handleSave = async () => {
        setModalError('')

        if (!form.name.trim()) {
            setModalError('Name is required')
            return
        }
        if (!form.email.includes('@')) {
            setModalError('Please enter a valid email address')
            return
        }

        const fields = {
            name: form.name.trim(),
            email: form.email.trim(),
            phone: form.phone.trim(),
            role: form.role,
            status: form.status,
        }

        setIsSaving(true)
        try {
            if (editingId) {
                const response = await updateStaff(editingId, fields)
                setStaffList((prev) => prev.map((s) => (s._id === editingId ? response.data : s)))
            } else {
                const response = await createStaff({ ...fields, restaurantId: restaurant._id })
                setStaffList((prev) => [...prev, response.data])
            }
            setIsModalOpen(false)
        }
        catch (error) {
            setModalError(error.message)
        }
        finally {
            setIsSaving(false)
        }
    }

    const handleDelete = async () => {
        if (!window.confirm('Remove this staff member? This cannot be undone.')) return

        setIsSaving(true)
        try {
            await deleteStaff(editingId)
            setStaffList((prev) => prev.filter((s) => s._id !== editingId))
            setIsModalOpen(false)
        }
        catch (error) {
            setModalError(error.message)
        }
        finally {
            setIsSaving(false)
        }
    }

    return (
        <RestaurantDashboardLayout
            title="Staff"
            description="Manage your restaurant team and their roles."
        >
            {pageError && (
                <div className="mb-4 rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-600">{pageError}</div>
            )}

            <div className="grid grid-cols-4 gap-4">
                <StatCard icon={Users} label="Total Staff" value={staffList.length} change={null} />
                <StatCard icon={UserCheck} label="Active Staff" value={activeCount} change={null} />
                <StatCard icon={Briefcase} label="Managers" value={managerCount} change={null} />
                <StatCard icon={Clock} label="On Leave" value={onLeaveCount} change={null} />
            </div>

            <div className="mt-6 flex items-center gap-3">
                <div className="flex flex-1 items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2.5">
                    <Search size={16} className="text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search staff by name, email, role or phone..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full text-sm outline-none"
                    />
                </div>

                <select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-[#374151] outline-none"
                >
                    <option value="all">All roles</option>
                    {staffRoles.map((role) => (
                        <option key={role} value={role}>{role}</option>
                    ))}
                </select>

                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-[#374151] outline-none"
                >
                    <option value="all">All status</option>
                    {staffStatuses.map((status) => (
                        <option key={status} value={status}>{status}</option>
                    ))}
                </select>

                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-[#374151] outline-none"
                >
                    <option value="name-asc">Sort by: Name A-Z</option>
                    <option value="name-desc">Sort by: Name Z-A</option>
                    <option value="newest">Sort by: Newest first</option>
                </select>

                <button
                    onClick={openAddModal}
                    className="flex items-center gap-1.5 rounded-lg bg-[#14532D] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#0F4224]"
                >
                    <Plus size={14} /> Add staff
                </button>
            </div>

            <div className="mt-6 overflow-hidden rounded-2xl border border-gray-100 bg-white">
                {isLoading ? (
                    <p className="p-6 text-sm text-[#9CA3AF]">Loading staff...</p>
                ) : visibleStaff.length === 0 ? (
                    <p className="p-6 text-sm text-[#9CA3AF]">
                        {staffList.length === 0
                            ? 'No staff members yet. Add your first one.'
                            : 'No staff members match these filters.'}
                    </p>
                ) : (
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="border-b border-gray-100 bg-[#F9FAFB] text-xs font-semibold text-[#4B5563]">
                                <th className="px-6 py-3">Staff Member</th>
                                <th className="px-6 py-3">Role</th>
                                <th className="px-6 py-3">Contact</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3">Joined</th>
                                <th className="px-6 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {visibleStaff.map((member) => (
                                <tr key={member._id} className="border-b border-gray-50 last:border-none">
                                    <td className="px-6 py-3">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-200 text-sm font-semibold text-gray-500">
                                                {member.name.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <p className="font-medium text-[#111827]">{member.name}</p>
                                                <p className="text-xs text-[#4B5563]">{member.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-3"><RoleBadge role={member.role} /></td>
                                    <td className="px-6 py-3 text-[#374151]">{member.phone || '—'}</td>
                                    <td className="px-6 py-3"><StatusDot status={member.status} /></td>
                                    <td className="px-6 py-3 text-[#374151]">{formatDate(member.createdAt)}</td>
                                    <td className="px-6 py-3">
                                        <button
                                            onClick={() => openEditModal(member)}
                                            title="Edit"
                                            className="flex h-7 w-7 items-center justify-center rounded-lg border border-gray-200"
                                        >
                                            <Pencil size={13} className="text-[#4B5563]" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                {!isLoading && staffList.length > 0 && (
                    <div className="border-t border-gray-100 px-6 py-4">
                        <p className="text-xs text-[#4B5563]">
                            Showing {visibleStaff.length} of {staffList.length} staff members
                        </p>
                    </div>
                )}
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingId ? 'Edit staff member' : 'Add staff member'}
            >
                <div className="space-y-4">
                    {modalError && (
                        <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{modalError}</div>
                    )}

                    <div>
                        <label className="mb-1.5 block text-sm font-semibold text-[#111827]">Full name</label>
                        <input
                            type="text"
                            value={form.name}
                            onChange={(e) => updateForm('name', e.target.value)}
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#14532D]"
                        />
                    </div>

                    <div>
                        <label className="mb-1.5 block text-sm font-semibold text-[#111827]">Email</label>
                        <input
                            type="email"
                            value={form.email}
                            onChange={(e) => updateForm('email', e.target.value)}
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#14532D]"
                        />
                    </div>

                    <div>
                        <label className="mb-1.5 block text-sm font-semibold text-[#111827]">Phone</label>
                        <input
                            type="tel"
                            value={form.phone}
                            onChange={(e) => updateForm('phone', e.target.value)}
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#14532D]"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="mb-1.5 block text-sm font-semibold text-[#111827]">Role</label>
                            <select
                                value={form.role}
                                onChange={(e) => updateForm('role', e.target.value)}
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#14532D]"
                            >
                                {staffRoles.map((role) => (
                                    <option key={role} value={role}>{role}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="mb-1.5 block text-sm font-semibold text-[#111827]">Status</label>
                            <select
                                value={form.status}
                                onChange={(e) => updateForm('status', e.target.value)}
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#14532D]"
                            >
                                {staffStatuses.map((status) => (
                                    <option key={status} value={status}>{status}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                        {editingId && (
                            <button
                                onClick={handleDelete}
                                disabled={isSaving}
                                className="rounded-lg border border-red-300 px-4 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 disabled:opacity-60"
                            >
                                Remove
                            </button>
                        )}
                        <button
                            onClick={handleSave}
                            disabled={isSaving}
                            className="flex-1 rounded-lg bg-[#14532D] py-2.5 text-sm font-semibold text-white hover:bg-[#0F4224] disabled:opacity-60"
                        >
                            {isSaving ? 'Saving...' : 'Save'}
                        </button>
                    </div>
                </div>
            </Modal>
        </RestaurantDashboardLayout>
    )
}

export default Staff

