// src/pages/Restaurant-side/Dashboard.jsx
import {
    ShoppingBag, DollarSign, UserPlus, Utensils, ChevronDown,
} from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import RestaurantDashboardLayout from '../../components/restaurant/RestaurantDashboardLayout'
import StatCard from '../../components/restaurant/StatCard'

const revenueData = [
    { day: 'Mon', value: 300 },
    { day: 'Tue', value: 900 },
    { day: 'Wed', value: 1100 },
    { day: 'Thur', value: 950 },
    { day: 'Fri', value: 1750 },
    { day: 'Sat', value: 1400 },
    { day: 'Sun', value: 1600 },
]

const recentOrders = [
    { id: '#ORD-1028', name: 'Grilled chicken', time: 'Today, 11:45 AM', price: '$28.50', status: 'Completed' },
    { id: '#ORD-1028', name: 'Beef burger', time: 'Today, 11:45 AM', price: '$15.00', status: 'Completed' },
    { id: '#ORD-1028', name: 'Pasta Alfredo', time: 'Today, 11:45 AM', price: '$18.75', status: 'Pending' },
    { id: '#ORD-1028', name: 'Caesar Salad', time: 'Today, 11:45 AM', price: '$12.50', status: 'Completed' },
]

const tableBookings = [
    { table: 'Table 5', people: '4 people', time: '12:30 PM', status: 'Confirmed' },
    { table: 'Table 2', people: '2 people', time: '1:00 PM', status: 'Confirmed' },
    { table: 'Table 8', people: '6 people', time: '2:30 PM', status: 'Pending' },
    { table: 'Table 3', people: '3 people', time: '3:00 PM', status: 'Confirmed' },
]

const topSellingItems = [
    { name: 'Grilled chicken', count: 32, max: 32 },
    { name: 'Beef burger', count: 28, max: 32 },
    { name: 'Pasta Alfredo', count: 24, max: 32 },
    { name: 'Caesar Salad', count: 18, max: 32 },
    { name: 'Lemonade', count: 15, max: 32 },
]

const staffData = [
    { name: 'Chefs', value: 5, color: '#14532D' },
    { name: 'Waiters', value: 4, color: '#D9A441' },
    { name: 'Kitchen Staff', value: 2, color: '#7DD3A0' },
    { name: 'Managers', value: 1, color: '#374151' },
]

const todaySummary = [
    { icon: ShoppingBag, label: 'Orders Completed', value: '96' },
    { icon: DollarSign, label: 'Revenue Generated', value: '$2,450.00' },
    { icon: UserPlus, label: 'New Customers', value: '18' },
    { icon: Utensils, label: 'Average Order Value', value: '$25.52' },
]

function StatusBadge({ status }) {
    const isCompleted = status === 'Completed' || status === 'Confirmed'
    return (
        <span
            className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                isCompleted ? 'bg-[#E7F0E3] text-[#14532D]' : 'bg-[#FEF3C7] text-[#92400E]'
            }`}
        >
            {status}
        </span>
    )
}

function Dashboard() {
    return (
        <RestaurantDashboardLayout
            title="Dashboard"
            description="Welcome back, Ariella! Here's what's happening today."
        >
            {/* Top stat cards */}
            <div className="grid grid-cols-4 gap-4">
                <StatCard icon={ShoppingBag} label="Total Orders" value="128" change="12%" />
                <StatCard icon={DollarSign} label="Total Revenue" value="$2,450.00" change="8%" />
                <StatCard icon={UserPlus} label="New Booking" value="24" change="15%" />
                <div className="rounded-2xl border border-gray-100 bg-white p-5">
                    <div className="flex items-center gap-2 text-sm text-[#4B5563]">
                        <Utensils size={16} className="text-[#14532D]" /> Popular items
                    </div>
                    <p className="font-heading mt-2 text-xl font-bold text-[#111827]">Grilled chicken</p>
                    <p className="mt-1 text-xs text-[#4B5563]">32 orders today</p>
                </div>
            </div>

            {/* Revenue + Recent Orders + Table Bookings */}
            <div className="mt-6 grid grid-cols-3 gap-6">
                <div className="col-span-1 rounded-2xl border border-gray-100 bg-white p-5">
                    <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-[#111827]">Revenue Overview</h3>
                        <button className="flex items-center gap-1 rounded-lg border border-gray-200 px-2.5 py-1 text-xs">
                            This Week <ChevronDown size={12} />
                        </button>
                    </div>
                    <div className="mt-4 h-48">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={revenueData}>
                                <defs>
                                    <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#14532D" stopOpacity={0.2} />
                                        <stop offset="100%" stopColor="#14532D" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="day" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                                <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                                <Tooltip />
                                <Area
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#14532D"
                                    strokeWidth={2}
                                    fill="url(#revenueFill)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="col-span-1 rounded-2xl border border-gray-100 bg-white p-5">
                    <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-[#111827]">Recent Orders</h3>
                        <button className="text-xs font-medium text-[#14532D]">View all</button>
                    </div>
                    <div className="mt-4 space-y-4">
                        {recentOrders.map((order, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <div className="h-9 w-9 shrink-0 rounded-lg bg-gray-200" />
                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-sm font-medium text-[#111827]">{order.name}</p>
                                    <p className="text-xs text-[#4B5563]">{order.id} · {order.time}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-semibold text-[#111827]">{order.price}</p>
                                    <StatusBadge status={order.status} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="col-span-1 rounded-2xl border border-gray-100 bg-white p-5">
                    <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-[#111827]">Table Bookings</h3>
                        <button className="text-xs font-medium text-[#14532D]">View all</button>
                    </div>
                    <div className="mt-4 space-y-4">
                        {tableBookings.map((booking, i) => (
                            <div key={i} className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-[#111827]">{booking.table}</p>
                                    <p className="text-xs text-[#4B5563]">{booking.people}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-medium text-[#111827]">{booking.time}</p>
                                    <StatusBadge status={booking.status} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Top Selling Items + Staff Overview + Today's Summary */}
            <div className="mt-6 grid grid-cols-3 gap-6">
                <div className="col-span-1 rounded-2xl border border-gray-100 bg-white p-5">
                    <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-[#111827]">Top Selling Items</h3>
                        <button className="flex items-center gap-1 rounded-lg border border-gray-200 px-2.5 py-1 text-xs">
                            This Week <ChevronDown size={12} />
                        </button>
                    </div>
                    <div className="mt-4 space-y-4">
                        {topSellingItems.map((item, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <div className="h-8 w-8 shrink-0 rounded-lg bg-gray-200" />
                                <div className="flex-1">
                                    <div className="flex items-center justify-between text-xs">
                                        <span className="font-medium text-[#111827]">{item.name}</span>
                                        <span className="text-[#4B5563]">{item.count}</span>
                                    </div>
                                    <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
                                        <div
                                            className="h-full rounded-full bg-[#14532D]"
                                            style={{ width: `${(item.count / item.max) * 100}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="col-span-1 rounded-2xl border border-gray-100 bg-white p-5">
                    <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-[#111827]">Staff Overview</h3>
                        <button className="text-xs font-medium text-[#14532D]">View all</button>
                    </div>
                    <div className="mt-2 flex items-center gap-6">
                        <div className="relative h-32 w-32 shrink-0">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={staffData}
                                        dataKey="value"
                                        innerRadius={40}
                                        outerRadius={60}
                                        startAngle={90}
                                        endAngle={-270}
                                    >
                                        {staffData.map((entry, i) => (
                                            <Cell key={i} fill={entry.color} />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                                <p className="font-heading text-xl font-bold text-[#111827]">12</p>
                                <p className="text-[10px] text-[#4B5563]">Total Staff</p>
                            </div>
                        </div>

                        <div className="space-y-2 text-xs">
                            {staffData.map((entry, i) => (
                                <div key={i} className="flex items-center gap-2">
                                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }} />
                                    <span className="text-[#4B5563]">{entry.name}</span>
                                    <span className="ml-auto font-medium text-[#111827]">{entry.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="col-span-1 rounded-2xl border border-gray-100 bg-white p-5">
                    <h3 className="font-semibold text-[#111827]">Today's Summary</h3>
                    <div className="mt-4 space-y-4">
                        {todaySummary.map(({ icon: Icon, label, value }, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F3F4F1]">
                                    <Icon size={16} className="text-[#14532D]" />
                                </div>
                                <span className="flex-1 text-sm text-[#4B5563]">{label}</span>
                                <span className="text-sm font-semibold text-[#111827]">{value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </RestaurantDashboardLayout>
    )
}

export default Dashboard