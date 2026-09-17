// src/pages/Restaurant-side/TableBooking.jsx
import { useState } from 'react'
import { Calendar, ChevronLeft, ChevronRight, CalendarDays, Users, Utensils, Clock, Pencil, MoreVertical, ChevronDown } from 'lucide-react'
import RestaurantDashboardLayout from '../../components/restaurant/RestaurantDashboardLayout'
import StatCard from '../../components/restaurant/StatCard'
import TableAvailabilityGrid from '../../components/restaurant/TableAvailabilityGrid'
import PendingRequestCard from '../../components/restaurant/PendingRequestCard'

const dateTabs = ['Today', 'Upcoming', 'All reservations']

const bookings = [
    { time: '12:00 PM', name: 'John Doe', phone: '+250 788 888 999', table: 'Table 3', area: 'Indoor', guests: 4, status: 'Confirmed', occasion: 'Birthday Celebration' },
    { time: '12:00 PM', name: 'Sarah Miller', phone: '+250 788 888 999', table: 'Table 4', area: 'Indoor', guests: 2, status: 'Confirmed', occasion: 'Lunch' },
    { time: '3:00 PM', name: 'David Kim', phone: '+250 788 888 999', table: 'Table 4', area: 'Outdoor', guests: 6, status: 'Confirmed', occasion: 'Business Meeting' },
    { time: '8:00 PM', name: 'Emma Grune', phone: '+250 788 888 999', table: 'Table 5', area: 'Outdoor', guests: 4, status: 'Confirmed', occasion: 'Dinner' },
    { time: '9:00 PM', name: 'David Scott', phone: '+250 788 888 999', table: 'Table 5', area: 'Indoor', guests: 7, status: 'Pending', occasion: '' },
    { time: '6:00 PM', name: 'Keith Powers', phone: '+250 788 888 999', table: 'Table 5', area: 'Indoor', guests: 3, status: 'Pending', occasion: '' },
    { time: '8:00 AM', name: 'Marah Rice', phone: '+250 788 888 999', table: 'Table 7', area: 'Indoor', guests: 5, status: 'Confirmed', occasion: 'Breakfast' },
    { time: '7:00 PM', name: 'Lisa Parker', phone: '+250 788 888 999', table: 'Table 7', area: 'Indoor', guests: 4, status: 'Confirmed', occasion: 'Birthday Celebration' },
    { time: '7:00 AM', name: 'William Taylor', phone: '+250 788 888 999', table: 'Table 6', area: 'Indoor', guests: 8, status: 'Confirmed', occasion: 'Breakfast' },
]

const indoorTables = [
    { number: 1, status: 'available' }, { number: 2, status: 'available' },
    { number: 3, status: 'occupied' }, { number: 4, status: 'occupied' },
    { number: 5, status: 'booked' }, { number: 6, status: 'booked' },
    { number: 7, status: 'occupied' }, { number: 8, status: 'maintenance' },
]

const outdoorTables = [
    { number: 1, status: 'booked' }, { number: 2, status: 'available' },
    { number: 3, status: 'occupied' }, { number: 4, status: 'occupied' },
    { number: 5, status: 'available' }, { number: 6, status: 'available' },
    { number: 7, status: 'booked' }, { number: 8, status: 'occupied' },
]

const pendingRequests = [
    { name: 'David Scott', phone: '+250 788 888 999', time: 'Today, 9:00PM', guests: '7 people', timeAgo: '10m ago' },
    { name: 'Keith Powers', phone: '+250 788 888 999', time: 'Today, 6:00PM', guests: '20 people', timeAgo: '25m ago' },
]

function TableBooking() {
    const [activeTab, setActiveTab] = useState('Today')

    return (
        <RestaurantDashboardLayout
            title="Table Booking"
            description="Manage reservations and table availability"
        >
            <div className="grid grid-cols-4 gap-4">
                <StatCard icon={Calendar} label="Today's bookings" value="24" change="12%" />
                <StatCard icon={Users} label="Upcoming Bookings" value="6" change={null} />
                <StatCard icon={Utensils} label="Tables Available" value="12" change={null} />
                <StatCard icon={Clock} label="Pending Requests" value="2" change={null} />
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
                        <div className="flex items-center gap-2 text-sm text-[#374151]">
                            <button><ChevronLeft size={16} /></button>
                            <span className="flex items-center gap-1.5"><CalendarDays size={14} /> May 19, 2026</span>
                            <button><ChevronRight size={16} /></button>
                        </div>
                    </div>

                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="border-b border-gray-100 bg-[#F9FAFB] text-xs font-semibold text-[#4B5563]">
                                <th className="px-4 py-3">Time</th>
                                <th className="px-4 py-3">Guests</th>
                                <th className="px-4 py-3">Contact</th>
                                <th className="px-4 py-3">Table</th>
                                <th className="px-4 py-3">People</th>
                                <th className="px-4 py-3">Status</th>
                                <th className="px-4 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map((b, i) => (
                                <tr key={i} className="border-b border-gray-50 last:border-none">
                                    <td className="px-4 py-3 text-[#111827]">{b.time}</td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-2">
                                            <div className="h-7 w-7 rounded-full bg-gray-200" />
                                            <div>
                                                <p className="font-medium text-[#111827]">{b.name}</p>
                                                {b.occasion && <p className="text-xs text-[#9CA3AF]">{b.occasion}</p>}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-xs text-[#4B5563]">{b.phone}</td>
                                    <td className="px-4 py-3 text-[#374151]">{b.table} · {b.area}</td>
                                    <td className="px-4 py-3">
                                        <span className="flex items-center gap-1 text-[#374151]"><Users size={12} /> {b.guests}</span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <span
                                            className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                                                b.status === 'Confirmed'
                                                    ? 'bg-[#E7F0E3] text-[#14532D]'
                                                    : 'bg-[#FEF3C7] text-[#92400E]'
                                            }`}
                                        >
                                            {b.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
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

                    <div className="flex items-center justify-between border-t border-gray-100 px-4 py-4">
                        <p className="text-xs text-[#4B5563]">Showing 1 to 9 of 24 bookings</p>
                        <div className="flex items-center gap-2">
                            <button className="flex h-7 w-7 items-center justify-center rounded-lg border border-gray-200"><ChevronLeft size={14} /></button>
                            <button className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#14532D] text-xs font-semibold text-white">1</button>
                            <button className="flex h-7 w-7 items-center justify-center rounded-lg text-xs font-medium text-[#4B5563]">2</button>
                            <button className="flex h-7 w-7 items-center justify-center rounded-lg text-xs font-medium text-[#4B5563]">3</button>
                            <button className="flex h-7 w-7 items-center justify-center rounded-lg border border-gray-200"><ChevronRight size={14} /></button>
                        </div>
                    </div>
                </div>

                {/* Right: availability + requests */}
                <div className="space-y-6">
                    <div className="rounded-2xl border border-gray-100 bg-white p-5">
                        <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-[#111827]">Table Availability</h3>
                            <button className="flex items-center gap-1 rounded-lg border border-gray-200 px-2.5 py-1 text-xs">
                                All areas <ChevronDown size={12} />
                            </button>
                        </div>
                        <div className="mt-4">
                            <TableAvailabilityGrid indoorTables={indoorTables} outdoorTables={outdoorTables} />
                        </div>
                    </div>

                    <div className="rounded-2xl border border-gray-100 bg-white p-5">
                        <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-[#111827]">Pending Requests</h3>
                            <button className="text-xs font-medium text-[#14532D]">View all</button>
                        </div>
                        <div className="mt-4 space-y-3">
                            {pendingRequests.map((req, i) => (
                                <PendingRequestCard key={i} {...req} />
                            ))}
                        </div>
                        <button className="mt-3 flex w-full items-center justify-center gap-1 text-xs font-medium text-[#14532D]">
                            View all requests →
                        </button>
                    </div>
                </div>
            </div>
        </RestaurantDashboardLayout>
    )
}

export default TableBooking