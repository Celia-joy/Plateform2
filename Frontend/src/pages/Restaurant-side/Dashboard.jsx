import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingBag, DollarSign, CalendarCheck, Utensils, UserCheck, ChevronDown } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import RestaurantDashboardLayout from '../../components/restaurant/RestaurantDashboardLayout'
import StatCard from '../../components/restaurant/StatCard'
import { useAuth } from '../../context/AuthContext'
import { useRestaurant } from '../../context/RestaurantContext'
import { getOrdersByRestaurant } from '../../services/orderService'
import { getBookingsByRestaurant } from '../../services/bookingService'
import { getStaff } from '../../services/staffService'

const statusStyles = {
    Pending: 'bg-[#FEF3C7] text-[#92400E]',
    'In Progress': 'bg-[#DBEAFE] text-[#1E40AF]',
    Ready: 'bg-[#F3E8FF] text-[#6B21A8]',
    Completed: 'bg-[#E7F0E3] text-[#14532D]',
    Confirmed: 'bg-[#E7F0E3] text-[#14532D]',
    Cancelled: 'bg-[#FEE2E2] text-[#991B1B]',
}

const roleColors = {
    Manager: '#374151',
    Waitress: '#D9A441',
    Chef: '#14532D',
    Bartender: '#7DD3A0',
}

// A date as YYYY-MM-DD in the user's own timezone
const toDateKey = (date) => new Date(date).toLocaleDateString('en-CA')

const sum = (list, getValue) => list.reduce((total, item) => total + getValue(item), 0)

const formatMoney = (amount) => `$${amount.toFixed(2)}`

const formatTime = (isoString) =>
    new Date(isoString).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })

function StatusBadge({ status }) {
    return (
        <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusStyles[status]}`}>
            {status}
        </span>
    )
}

function Dashboard() {
    const { user } = useAuth()
    const { restaurant } = useRestaurant()

    const [orders, setOrders] = useState([])
    const [bookings, setBookings] = useState([])
    const [staffList, setStaffList] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [pageError, setPageError] = useState('')
    const [dataVersion, setDataVersion] = useState(0)

    useEffect(() => {
        if (!restaurant) return

        let cancelled = false

        const load = async () => {
            if (dataVersion === 0) setIsLoading(true)
            try {
                const [ordersResponse, bookingsResponse, staffResponse] = await Promise.all([
                    getOrdersByRestaurant(restaurant._id),
                    getBookingsByRestaurant(restaurant._id),
                    getStaff(restaurant._id),
                ])
                if (!cancelled) {
                    setOrders(ordersResponse.data)
                    setBookings(bookingsResponse.data)
                    setStaffList(staffResponse.data)
                    setPageError('')
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

    // Refresh every 30 seconds
    useEffect(() => {
        const interval = setInterval(() => setDataVersion((v) => v + 1), 30000)
        return () => clearInterval(interval)
    }, [])

    // ---------- Work out the numbers ----------
    const today = toDateKey(new Date())

    const activeOrders = orders.filter((o) => o.status !== 'Cancelled')
    const completedOrders = orders.filter((o) => o.status === 'Completed')
    const totalRevenue = sum(completedOrders, (o) => o.total)

    const activeBookings = bookings.filter((b) => b.status !== 'Cancelled')
    const todaysBookings = activeBookings.filter((b) => b.date === today)

    // Dishes sold: add up quantities by dish name (cancelled orders don't count)
    const soldByDish = {}
    activeOrders.forEach((order) => {
        order.items.forEach((item) => {
            soldByDish[item.name] = (soldByDish[item.name] || 0) + item.quantity
        })
    })
    const topDishes = Object.entries(soldByDish)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5)
    const maxSold = topDishes.length > 0 ? topDishes[0].count : 1

    // Revenue for each of the last 7 days
    const revenueData = Array.from({ length: 7 }, (_, index) => {
        const date = new Date()
        date.setDate(date.getDate() - (6 - index))
        const key = toDateKey(date)
        const dayOrders = completedOrders.filter((o) => toDateKey(o.createdAt) === key)
        return {
            day: date.toLocaleDateString('en-US', { weekday: 'short' }),
            value: Number(sum(dayOrders, (o) => o.total).toFixed(2)),
        }
    })

    // Recent orders and upcoming bookings
    const recentOrders = orders.slice(0, 4)
    const upcomingBookings = activeBookings
        .filter((b) => b.date >= today)
        .sort((a, b) => `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`))
        .slice(0, 4)

    // Staff by role
    const staffByRole = Object.keys(roleColors)
        .map((role) => ({
            name: role,
            value: staffList.filter((s) => s.role === role).length,
            color: roleColors[role],
        }))
        .filter((entry) => entry.value > 0)

    // Today's summary
    const todaysOrders = orders.filter((o) => toDateKey(o.createdAt) === today && o.status !== 'Cancelled')
    const todaysCompleted = todaysOrders.filter((o) => o.status === 'Completed')
    const customersToday = new Set(todaysOrders.map((o) => o.customer?._id)).size
    const averageOrder = completedOrders.length > 0 ? totalRevenue / completedOrders.length : 0

    const todaySummary = [
        { icon: ShoppingBag, label: 'Orders Completed', value: todaysCompleted.length },
        { icon: DollarSign, label: 'Revenue Generated', value: formatMoney(sum(todaysCompleted, (o) => o.total)) },
        { icon: UserCheck, label: 'Customers Served', value: customersToday },
        { icon: Utensils, label: 'Average Order Value', value: formatMoney(averageOrder) },
    ]

    const firstName = user?.fullName?.split(' ')[0] || ''

    return (
        <RestaurantDashboardLayout
            title="Dashboard"
            description={`Welcome back, ${firstName}! Here's what's happening today.`}
        >
            {pageError && (
                <div className="mb-4 rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-600">{pageError}</div>
            )}

            {isLoading ? (
                <p className="text-sm text-[#9CA3AF]">Loading dashboard...</p>
            ) : (
                <>
                    {/* Top stat cards */}
                    <div className="grid grid-cols-4 gap-4">
                        <StatCard icon={ShoppingBag} label="Total Orders" value={activeOrders.length} change={null} />
                        <StatCard icon={DollarSign} label="Total Revenue" value={formatMoney(totalRevenue)} change={null} />
                        <StatCard icon={CalendarCheck} label="Today's Bookings" value={todaysBookings.length} change={null} />
                        <div className="rounded-2xl border border-gray-100 bg-white p-5">
                            <div className="flex items-center gap-2 text-sm text-[#4B5563]">
                                <Utensils size={16} className="text-[#14532D]" /> Popular item
                            </div>
                            <p className="font-heading mt-2 truncate text-xl font-bold text-[#111827]">
                                {topDishes.length > 0 ? topDishes[0].name : '—'}
                            </p>
                            <p className="mt-1 text-xs text-[#4B5563]">
                                {topDishes.length > 0 ? `${topDishes[0].count} sold` : 'No sales yet'}
                            </p>
                        </div>
                    </div>

                    {/* Revenue + Recent Orders + Bookings */}
                    <div className="mt-6 grid grid-cols-3 gap-6">
                        <div className="rounded-2xl border border-gray-100 bg-white p-5">
                            <div className="flex items-center justify-between">
                                <h3 className="font-semibold text-[#111827]">Revenue Overview</h3>
                                <span className="flex items-center gap-1 rounded-lg border border-gray-200 px-2.5 py-1 text-xs text-[#4B5563]">
                                    Last 7 days <ChevronDown size={12} />
                                </span>
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
                                        <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
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

                        <div className="rounded-2xl border border-gray-100 bg-white p-5">
                            <div className="flex items-center justify-between">
                                <h3 className="font-semibold text-[#111827]">Recent Orders</h3>
                                <Link to="/Restaurant-side/Orders" className="text-xs font-medium text-[#14532D]">View all</Link>
                            </div>
                            <div className="mt-4 space-y-4">
                                {recentOrders.length === 0 ? (
                                    <p className="text-sm text-[#9CA3AF]">No orders yet.</p>
                                ) : (
                                    recentOrders.map((order) => (
                                        <div key={order._id} className="flex items-center gap-3">
                                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-200 text-sm font-semibold text-gray-500">
                                                {order.items[0]?.name.charAt(0).toUpperCase()}
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <p className="truncate text-sm font-medium text-[#111827]">
                                                    {order.items[0]?.name}
                                                    {order.items.length > 1 && ` +${order.items.length - 1} more`}
                                                </p>
                                                <p className="text-xs text-[#4B5563]">
                                                    #{order._id.slice(-6).toUpperCase()} · {formatTime(order.createdAt)}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm font-semibold text-[#111827]">{formatMoney(order.total)}</p>
                                                <StatusBadge status={order.status} />
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        <div className="rounded-2xl border border-gray-100 bg-white p-5">
                            <div className="flex items-center justify-between">
                                <h3 className="font-semibold text-[#111827]">Upcoming Bookings</h3>
                                <Link to="/Restaurant-side/TableBooking" className="text-xs font-medium text-[#14532D]">View all</Link>
                            </div>
                            <div className="mt-4 space-y-4">
                                {upcomingBookings.length === 0 ? (
                                    <p className="text-sm text-[#9CA3AF]">No upcoming bookings.</p>
                                ) : (
                                    upcomingBookings.map((booking) => (
                                        <div key={booking._id} className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm font-medium text-[#111827]">
                                                    {booking.table ? `Table ${booking.table.number}` : 'No table yet'}
                                                </p>
                                                <p className="text-xs text-[#4B5563]">{booking.guests} people</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm font-medium text-[#111827]">
                                                    {booking.date === today ? 'Today' : booking.date} · {booking.time}
                                                </p>
                                                <StatusBadge status={booking.status} />
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Top Selling Items + Staff + Today's Summary */}
                    <div className="mt-6 grid grid-cols-3 gap-6">
                        <div className="rounded-2xl border border-gray-100 bg-white p-5">
                            <h3 className="font-semibold text-[#111827]">Top Selling Items</h3>
                            <div className="mt-4 space-y-4">
                                {topDishes.length === 0 ? (
                                    <p className="text-sm text-[#9CA3AF]">No sales yet.</p>
                                ) : (
                                    topDishes.map((dish) => (
                                        <div key={dish.name} className="flex items-center gap-3">
                                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-200 text-xs font-semibold text-gray-500">
                                                {dish.name.charAt(0).toUpperCase()}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between text-xs">
                                                    <span className="font-medium text-[#111827]">{dish.name}</span>
                                                    <span className="text-[#4B5563]">{dish.count}</span>
                                                </div>
                                                <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
                                                    <div
                                                        className="h-full rounded-full bg-[#14532D]"
                                                        style={{ width: `${(dish.count / maxSold) * 100}%` }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        <div className="rounded-2xl border border-gray-100 bg-white p-5">
                            <div className="flex items-center justify-between">
                                <h3 className="font-semibold text-[#111827]">Staff Overview</h3>
                                <Link to="/Restaurant-side/Staff" className="text-xs font-medium text-[#14532D]">View all</Link>
                            </div>

                            {staffList.length === 0 ? (
                                <p className="mt-4 text-sm text-[#9CA3AF]">No staff added yet.</p>
                            ) : (
                                <div className="mt-2 flex items-center gap-6">
                                    <div className="relative h-32 w-32 shrink-0">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie
                                                    data={staffByRole}
                                                    dataKey="value"
                                                    innerRadius={40}
                                                    outerRadius={60}
                                                    startAngle={90}
                                                    endAngle={-270}
                                                >
                                                    {staffByRole.map((entry) => (
                                                        <Cell key={entry.name} fill={entry.color} />
                                                    ))}
                                                </Pie>
                                            </PieChart>
                                        </ResponsiveContainer>
                                        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                                            <p className="font-heading text-xl font-bold text-[#111827]">{staffList.length}</p>
                                            <p className="text-[10px] text-[#4B5563]">Total Staff</p>
                                        </div>
                                    </div>

                                    <div className="space-y-2 text-xs">
                                        {staffByRole.map((entry) => (
                                            <div key={entry.name} className="flex items-center gap-2">
                                                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }} />
                                                <span className="text-[#4B5563]">{entry.name}</span>
                                                <span className="ml-auto font-medium text-[#111827]">{entry.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="rounded-2xl border border-gray-100 bg-white p-5">
                            <h3 className="font-semibold text-[#111827]">Today's Summary</h3>
                            <div className="mt-4 space-y-4">
                                {todaySummary.map(({ icon: Icon, label, value }) => (
                                    <div key={label} className="flex items-center gap-3">
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
                </>
            )}
        </RestaurantDashboardLayout>
    )
}

export default Dashboard