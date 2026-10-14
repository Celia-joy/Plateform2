import { useState, useEffect } from 'react'
import { Calendar, Users, Utensils, Clock, Check, X, Plus } from 'lucide-react'
import RestaurantDashboardLayout from '../../components/restaurant/RestaurantDashboardLayout'
import StatCard from '../../components/restaurant/StatCard'
import TableAvailabilityGrid from '../../components/restaurant/TableAvailabilityGrid'
import PendingRequestCard from '../../components/restaurant/PendingRequestCard'
import Modal from '../../components/ui/Modal'
import { useRestaurant } from '../../context/RestaurantContext'
import { getTablesByRestaurant, createTable, updateTableStatus, deleteTable } from '../../services/tableService'
import { getBookingsByRestaurant, updateBookingStatus } from '../../services/bookingService'

const dateTabs = ['Today', 'Upcoming', 'All reservations']
const tableStatuses = ['available', 'booked', 'occupied', 'maintenance']

const bookingStatusStyles = {
    Pending: 'bg-[#FEF3C7] text-[#92400E]',
    Confirmed: 'bg-[#E7F0E3] text-[#14532D]',
    Completed: 'bg-[#DBEAFE] text-[#1E40AF]',
    Cancelled: 'bg-[#FEE2E2] text-[#991B1B]',
}

const getToday = () => new Date().toLocaleDateString('en-CA')

const timeAgo = (isoString) => {
    const minutes = Math.floor((Date.now() - new Date(isoString)) / 60000)
    if (minutes < 1) return 'just now'
    if (minutes < 60) return `${minutes}m ago`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours}h ago`
    return `${Math.floor(hours / 24)}d ago`
}

function TableBooking() {
    const { restaurant } = useRestaurant()

    const [tables, setTables] = useState([])
    const [bookings, setBookings] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [pageError, setPageError] = useState('')
    const [dataVersion, setDataVersion] = useState(0)
    const [activeTab, setActiveTab] = useState('Today')

    // Table modal (add a new table, or edit an existing one)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingTable, setEditingTable] = useState(null)
    const [form, setForm] = useState({ number: '', area: 'Indoor', capacity: 4, status: 'available' })
    const [modalError, setModalError] = useState('')
    const [isSaving, setIsSaving] = useState(false)

    // Load tables and bookings together; reload whenever dataVersion changes
    useEffect(() => {
        if (!restaurant) return

        let cancelled = false

        const load = async () => {
            setIsLoading(true)
            setPageError('')
            try {
                const [tablesResponse, bookingsResponse] = await Promise.all([
                    getTablesByRestaurant(restaurant._id),
                    getBookingsByRestaurant(restaurant._id),
                ])
                if (!cancelled) {
                    setTables(tablesResponse.data)
                    setBookings(bookingsResponse.data)
                }
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
    }, [restaurant, dataVersion])

    const reload = () => setDataVersion((v) => v + 1)

    // ---- Numbers for the stat cards ----
    const today = getToday()
    const activeBookings = bookings.filter((b) => b.status !== 'Cancelled')
    const todayCount = activeBookings.filter((b) => b.date === today).length
    const upcomingCount = activeBookings.filter((b) => b.date > today).length
    const availableTables = tables.filter((t) => t.status === 'available').length
    const pendingBookings = bookings.filter((b) => b.status === 'Pending')

    // ---- Which bookings the table shows ----
    const visibleBookings = bookings
        .filter((b) => {
            if (activeTab === 'Today') return b.date === today && b.status !== 'Cancelled'
            if (activeTab === 'Upcoming') return b.date > today && b.status !== 'Cancelled'
            return true
        })
        .sort((a, b) => `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`))

    const sortedTables = [...tables].sort((a, b) => a.number - b.number)

    // ---- Booking actions ----
    const handleBookingStatus = async (booking, status) => {
        setPageError('')
        try {
            await updateBookingStatus(booking._id, status)
            reload()
        }
        catch (error) {
            setPageError(error.message)
        }
    }

    const handleAssignTable = async (booking, tableId) => {
        if (!tableId) return
        setPageError('')
        try {
            await updateBookingStatus(booking._id, booking.status, tableId)
            reload()
        }
        catch (error) {
            setPageError(error.message)
        }
    }

    // ---- Table modal ----
    const nextTableNumber = (area) => {
        const numbers = tables.filter((t) => t.area === area).map((t) => t.number)
        return numbers.length > 0 ? Math.max(...numbers) + 1 : 1
    }

    const openAddTable = () => {
        setEditingTable(null)
        setForm({ number: nextTableNumber('Indoor'), area: 'Indoor', capacity: 4, status: 'available' })
        setModalError('')
        setIsModalOpen(true)
    }

    const openEditTable = (table) => {
        setEditingTable(table)
        setForm({ number: table.number, area: table.area, capacity: table.capacity, status: table.status })
        setModalError('')
        setIsModalOpen(true)
    }

    const handleAreaChange = (area) => {
        setForm((prev) => ({ ...prev, area, number: editingTable ? prev.number : nextTableNumber(area) }))
    }

    const handleSaveTable = async () => {
        setModalError('')

        if (!editingTable && (Number(form.number) < 1 || Number(form.capacity) < 1)) {
            setModalError('Table number and capacity must be at least 1')
            return
        }

        setIsSaving(true)
        try {
            if (editingTable) {
                await updateTableStatus(editingTable._id, form.status)
            } else {
                await createTable({
                    restaurantId: restaurant._id,
                    number: Number(form.number),
                    area: form.area,
                    capacity: Number(form.capacity),
                })
            }
            setIsModalOpen(false)
            reload()
        }
        catch (error) {
            setModalError(error.message)
        }
        finally {
            setIsSaving(false)
        }
    }

    const handleDeleteTable = async () => {
        if (!window.confirm(`Delete Table ${editingTable.number}? Existing bookings keep their record but lose the table.`)) return

        setIsSaving(true)
        try {
            await deleteTable(editingTable._id)
            setIsModalOpen(false)
            reload()
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
            title="Table Booking"
            description="Manage reservations and table availability"
        >
            {pageError && (
                <div className="mb-4 rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-600">{pageError}</div>
            )}

            <div className="grid grid-cols-4 gap-4">
                <StatCard icon={Calendar} label="Today's bookings" value={todayCount} change={null} />
                <StatCard icon={Users} label="Upcoming Bookings" value={upcomingCount} change={null} />
                <StatCard icon={Utensils} label="Tables Available" value={availableTables} change={null} />
                <StatCard icon={Clock} label="Pending Requests" value={pendingBookings.length} change={null} />
            </div>

            <div className="mt-6 grid grid-cols-3 gap-6">
                {/* Left: bookings list */}
                <div className="col-span-2 rounded-2xl border border-gray-100 bg-white">
                    <div className="flex items-center justify-between border-b border-gray-100 p-4">
                        <div className="flex gap-6">
                            {dateTabs.map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`border-b-2 pb-2 text-sm font-medium ${
                                        activeTab === tab ? 'border-[#14532D] text-[#14532D]' : 'border-transparent text-[#4B5563]'
                                    }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                        <span className="text-xs text-[#4B5563]">{visibleBookings.length} booking{visibleBookings.length === 1 ? '' : 's'}</span>
                    </div>

                    {isLoading ? (
                        <p className="p-6 text-sm text-[#9CA3AF]">Loading bookings...</p>
                    ) : visibleBookings.length === 0 ? (
                        <p className="p-6 text-sm text-[#9CA3AF]">No bookings to show here.</p>
                    ) : (
                        <table className="w-full text-left text-sm">
                            <thead>
                                <tr className="border-b border-gray-100 bg-[#F9FAFB] text-xs font-semibold text-[#4B5563]">
                                    <th className="px-4 py-3">When</th>
                                    <th className="px-4 py-3">Guest</th>
                                    <th className="px-4 py-3">Table</th>
                                    <th className="px-4 py-3">People</th>
                                    <th className="px-4 py-3">Status</th>
                                    <th className="px-4 py-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {visibleBookings.map((booking) => {
                                    const canAssign = !booking.table && (booking.status === 'Pending' || booking.status === 'Confirmed')

                                    return (
                                        <tr key={booking._id} className="border-b border-gray-50 last:border-none">
                                            <td className="px-4 py-3 text-[#111827]">
                                                {booking.date}
                                                <p className="text-xs text-[#9CA3AF]">{booking.time}</p>
                                            </td>
                                            <td className="px-4 py-3">
                                                <p className="font-medium text-[#111827]">{booking.customer?.fullName || 'Unknown'}</p>
                                                <p className="text-xs text-[#9CA3AF]">{booking.customer?.email}</p>
                                                {booking.specialRequests && (
                                                    <p className="mt-0.5 text-xs italic text-[#4B5563]">"{booking.specialRequests}"</p>
                                                )}
                                            </td>
                                            <td className="px-4 py-3 text-[#374151]">
                                                {booking.table ? (
                                                    `Table ${booking.table.number} · ${booking.table.area}`
                                                ) : canAssign ? (
                                                    <select
                                                        defaultValue=""
                                                        onChange={(e) => handleAssignTable(booking, e.target.value)}
                                                        className="rounded-lg border border-gray-300 px-2 py-1 text-xs outline-none"
                                                    >
                                                        <option value="">Assign table</option>
                                                        {sortedTables.map((table) => (
                                                            <option key={table._id} value={table._id}>
                                                                {table.area} {table.number} (seats {table.capacity})
                                                            </option>
                                                        ))}
                                                    </select>
                                                ) : (
                                                    <span className="text-[#9CA3AF]">—</span>
                                                )}
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className="flex items-center gap-1 text-[#374151]"><Users size={12} /> {booking.guests}</span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${bookingStatusStyles[booking.status]}`}>
                                                    {booking.status}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-2">
                                                    {booking.status === 'Pending' && (
                                                        <>
                                                            <button
                                                                onClick={() => handleBookingStatus(booking, 'Confirmed')}
                                                                title="Confirm"
                                                                className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#14532D] text-white"
                                                            >
                                                                <Check size={13} />
                                                            </button>
                                                            <button
                                                                onClick={() => handleBookingStatus(booking, 'Cancelled')}
                                                                title="Decline"
                                                                className="flex h-7 w-7 items-center justify-center rounded-lg border border-gray-200 text-[#991B1B]"
                                                            >
                                                                <X size={13} />
                                                            </button>
                                                        </>
                                                    )}
                                                    {booking.status === 'Confirmed' && (
                                                        <>
                                                            <button
                                                                onClick={() => handleBookingStatus(booking, 'Completed')}
                                                                className="rounded-lg border border-gray-300 px-2.5 py-1 text-xs font-medium text-[#111827] hover:bg-gray-50"
                                                            >
                                                                Complete
                                                            </button>
                                                            <button
                                                                onClick={() => handleBookingStatus(booking, 'Cancelled')}
                                                                className="rounded-lg border border-red-300 px-2.5 py-1 text-xs font-medium text-red-600 hover:bg-red-50"
                                                            >
                                                                Cancel
                                                            </button>
                                                        </>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    )}
                </div>

                {/* Right: tables + requests */}
                <div className="space-y-6">
                    <div className="rounded-2xl border border-gray-100 bg-white p-5">
                        <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-[#111827]">Tables</h3>
                            <button
                                onClick={openAddTable}
                                className="flex items-center gap-1 rounded-lg bg-[#14532D] px-2.5 py-1 text-xs font-medium text-white"
                            >
                                <Plus size={12} /> Add table
                            </button>
                        </div>
                        <div className="mt-4">
                            {tables.length === 0 ? (
                                <p className="text-sm text-[#9CA3AF]">
                                    No tables yet. Add your first one so customers can pick it when booking.
                                </p>
                            ) : (
                                <>
                                    <TableAvailabilityGrid tables={tables} onSelect={openEditTable} />
                                    <p className="mt-3 text-xs text-[#9CA3AF]">Click a table to change its status or remove it.</p>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="rounded-2xl border border-gray-100 bg-white p-5">
                        <h3 className="font-semibold text-[#111827]">Pending Requests</h3>
                        <div className="mt-4 space-y-3">
                            {pendingBookings.length === 0 ? (
                                <p className="text-sm text-[#9CA3AF]">No pending requests.</p>
                            ) : (
                                pendingBookings.map((booking) => (
                                    <PendingRequestCard
                                        key={booking._id}
                                        name={booking.customer?.fullName || 'Unknown'}
                                        email={booking.customer?.email}
                                        dateTime={`${booking.date} · ${booking.time}`}
                                        guests={`${booking.guests} people`}
                                        timeAgo={timeAgo(booking.createdAt)}
                                        onAccept={() => handleBookingStatus(booking, 'Confirmed')}
                                        onReject={() => handleBookingStatus(booking, 'Cancelled')}
                                    />
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Add / edit table modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingTable ? `Table ${editingTable.number} · ${editingTable.area}` : 'Add table'}
            >
                <div className="space-y-4">
                    {modalError && (
                        <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{modalError}</div>
                    )}

                    {editingTable ? (
                        <div>
                            <label className="mb-1.5 block text-sm font-semibold text-[#111827]">Status</label>
                            <select
                                value={form.status}
                                onChange={(e) => setForm((prev) => ({ ...prev, status: e.target.value }))}
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm capitalize outline-none focus:border-[#14532D]"
                            >
                                {tableStatuses.map((status) => (
                                    <option key={status} value={status}>{status}</option>
                                ))}
                            </select>
                            <p className="mt-2 text-xs text-[#9CA3AF]">Seats {editingTable.capacity} guests.</p>
                        </div>
                    ) : (
                        <>
                            <div>
                                <label className="mb-1.5 block text-sm font-semibold text-[#111827]">Area</label>
                                <select
                                    value={form.area}
                                    onChange={(e) => handleAreaChange(e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#14532D]"
                                >
                                    <option value="Indoor">Indoor</option>
                                    <option value="Outdoor">Outdoor</option>
                                </select>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="mb-1.5 block text-sm font-semibold text-[#111827]">Table number</label>
                                    <input
                                        type="number"
                                        min="1"
                                        value={form.number}
                                        onChange={(e) => setForm((prev) => ({ ...prev, number: e.target.value }))}
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#14532D]"
                                    />
                                </div>
                                <div>
                                    <label className="mb-1.5 block text-sm font-semibold text-[#111827]">Seats</label>
                                    <input
                                        type="number"
                                        min="1"
                                        value={form.capacity}
                                        onChange={(e) => setForm((prev) => ({ ...prev, capacity: e.target.value }))}
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#14532D]"
                                    />
                                </div>
                            </div>
                        </>
                    )}

                    <div className="flex gap-3 pt-2">
                        {editingTable && (
                            <button
                                onClick={handleDeleteTable}
                                disabled={isSaving}
                                className="rounded-lg border border-red-300 px-4 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 disabled:opacity-60"
                            >
                                Delete
                            </button>
                        )}
                        <button
                            onClick={handleSaveTable}
                            disabled={isSaving}
                            className="flex-1 rounded-lg bg-[#14532D] py-2.5 text-sm font-semibold text-white hover:bg-[#0F4224] disabled:opacity-60"
                        >
                            {isSaving ? 'Saving...' : editingTable ? 'Save status' : 'Add table'}
                        </button>
                    </div>
                </div>
            </Modal>
        </RestaurantDashboardLayout>
    )
}

export default TableBooking