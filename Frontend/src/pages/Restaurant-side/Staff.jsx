// src/pages/Restaurant-side/Staff.jsx
import { useState } from 'react'
import { Search, Users, UserCheck, Briefcase, Clock, Pencil, MoreVertical, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'
import RestaurantDashboardLayout from '../../components/restaurant/RestaurantDashboardLayout'
import StatCard from '../../components/restaurant/StatCard'
import RoleBadge from '../../components/restaurant/RoleBadge'
import StatusDot from '../../components/restaurant/StatusDot'

const staffMembers = [
    { name: 'Sandra IGIHOZO', email: 'sandra@gmail.com', role: 'Manager', phone: '+250 788 888 999', status: 'Active', joined: 'Apr 20, 2026' },
    { name: 'Cadeau Isabelle', email: 'cadeau@gmail.com', role: 'Waitress', phone: '+250 788 888 999', status: 'Active', joined: 'Apr 20, 2026' },
    { name: 'Dorcas Nyigena', email: 'dorcas@gmail.com', role: 'Waitress', phone: '+250 788 888 999', status: 'Active', joined: 'Apr 20, 2026' },
    { name: 'Eunice KABUNDI', email: 'eunice@gmail.com', role: 'Waitress', phone: '+250 788 999 999', status: 'On Leave', joined: 'Apr 20, 2026' },
    { name: 'Sano Angella', email: 'angella@gmail.com', role: 'Chef', phone: '+250 788 789 451', status: 'Active', joined: 'Apr 20, 2026' },
    { name: 'Jenny Miriotta', email: 'mirlota@gmail.com', role: 'Chef', phone: '+250 781 234 587', status: 'Active', joined: 'Apr 20, 2026' },
    { name: 'Amelie Gift', email: 'amelie@gmail.com', role: 'Bartender', phone: '+250 787 664 231', status: 'Active', joined: 'Apr 20, 2026' },
    { name: 'Divine Teta', email: 'teta@gmail.com', role: 'Bartender', phone: '+250 780 123 458', status: 'Active', joined: 'Apr 20, 2026' },
]

function Staff() {
    const [search, setSearch] = useState('')

    return (
        <RestaurantDashboardLayout
            title="Staff"
            description="Manage your restaurant team and their roles."
        >
            <div className="grid grid-cols-4 gap-4">
                <StatCard icon={Users} label="Total Staff" value="12" change={null} />
                <StatCard icon={UserCheck} label="Active Staff" value="8" change={null} />
                <StatCard icon={Briefcase} label="Managers" value="2" change={null} />
                <StatCard icon={Clock} label="On Leave" value="2" change={null} />
            </div>

            <div className="mt-6 flex items-center gap-3">
                <div className="flex flex-1 items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2.5">
                    <Search size={16} className="text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search staff by name, role or phone..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full text-sm outline-none"
                    />
                </div>

                <button className="flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-[#374151]">
                    All roles <ChevronDown size={14} />
                </button>
                <button className="flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-[#374151]">
                    All status <ChevronDown size={14} />
                </button>
                <button className="flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-[#374151]">
                    Sort by: Name A-Z <ChevronDown size={14} />
                </button>
            </div>

            <div className="mt-6 overflow-hidden rounded-2xl border border-gray-100 bg-white">
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
                        {staffMembers.map((member, i) => (
                            <tr key={i} className="border-b border-gray-50 last:border-none">
                                <td className="flex items-center gap-3 px-6 py-3">
                                    <div className="h-9 w-9 rounded-full bg-gray-200" />
                                    <div>
                                        <p className="font-medium text-[#111827]">{member.name}</p>
                                        <p className="text-xs text-[#4B5563]">{member.email}</p>
                                    </div>
                                </td>
                                <td className="px-6 py-3"><RoleBadge role={member.role} /></td>
                                <td className="px-6 py-3 text-[#374151]">{member.phone}</td>
                                <td className="px-6 py-3"><StatusDot status={member.status} /></td>
                                <td className="px-6 py-3 text-[#374151]">{member.joined}</td>
                                <td className="px-6 py-3">
                                    <div className="flex items-center gap-2">
                                        <button className="flex h-7 w-7 items-center justify-center rounded-lg border border-gray-200">
                                            <Pencil size={13} className="text-[#4B5563]" />
                                        </button>
                                        <button className="flex h-7 w-7 items-center justify-center rounded-lg border border-gray-200">
                                            <MoreVertical size={13} className="text-[#4B5563]" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="flex items-center justify-between border-t border-gray-100 px-6 py-4">
                    <p className="text-xs text-[#4B5563]">Showing 1 to 8 of 12 staff members</p>
                    <div className="flex items-center gap-2">
                        <button className="flex h-7 w-7 items-center justify-center rounded-lg border border-gray-200">
                            <ChevronLeft size={14} />
                        </button>
                        <button className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#14532D] text-xs font-semibold text-white">1</button>
                        <button className="flex h-7 w-7 items-center justify-center rounded-lg text-xs font-medium text-[#4B5563]">2</button>
                        <button className="flex h-7 w-7 items-center justify-center rounded-lg border border-gray-200">
                            <ChevronRight size={14} />
                        </button>
                    </div>
                </div>
            </div>
        </RestaurantDashboardLayout>
    )
}

export default Staff