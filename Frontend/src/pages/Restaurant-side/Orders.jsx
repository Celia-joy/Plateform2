import { useState, useEffect } from 'react'
import { Search, Clock, ShoppingBag, CheckCircle, XCircle, Utensils, Eye, X } from 'lucide-react'
import RestaurantDashboardLayout from '../../components/restaurant/RestaurantDashboardLayout'
import StatCard from '../../components/restaurant/StatCard'
import OrderStatusStepper from '../../components/restaurant/OrderStatusStepper'
import { useRestaurant } from '../../context/RestaurantContext'
import { getOrdersByRestaurant, updateOrderStatus } from '../../services/orderService'

const orderTabs = ['All orders', 'Pending', 'In Progress', 'Ready', 'Completed', 'Cancelled']
const allStatuses = ['Pending', 'In Progress', 'Ready', 'Completed', 'Cancelled']
const orderTypes = ['Dine In', 'Takeaway', 'Delivery']

// The next step in the normal workflow for each status
const nextStatus = {
    Pending: 'In Progress',
    'In Progress': 'Ready',
    Ready: 'Completed',
}

const orderTypeStyles = {
    'Dine In': 'bg-[#E7F0E3] text-[#14532D]',
    Takeaway: 'bg-[#FEF3C7] text-[#92400E]',
    Delivery: 'bg-[#DBEAFE] text-[#1E40AF]',
}

const orderStatusStyles = {
    Pending: 'bg-[#FEF3C7] text-[#92400E]',
    'In Progress': 'bg-[#DBEAFE] text-[#1E40AF]',
    Ready: 'bg-[#F3E8FF] text-[#6B21A8]',
    Completed: 'bg-[#E7F0E3] text-[#14532D]',
    Cancelled: 'bg-[#FEE2E2] text-[#991B1B]',
}

const shortId = (id) => `#${id.slice(-6).toUpperCase()}`

const formatTime = (isoString) =>
    new Date(isoString).toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
    })

function OrderTypeBadge({ type }) {
    return <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${orderTypeStyles[type]}`}>{type}</span>
}

function OrderStatusBadge({ status }) {
    return <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${orderStatusStyles[status]}`}>{status}</span>
}

function Orders() {
    const { restaurant } = useRestaurant()

    const [orders, setOrders] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [pageError, setPageError] = useState('')
    const [dataVersion, setDataVersion] = useState(0)

    const [activeTab, setActiveTab] = useState('All orders')
    const [typeFilter, setTypeFilter] = useState('all')
    const [search, setSearch] = useState('')
    const [selectedId, setSelectedId] = useState(null)
    const [isUpdating, setIsUpdating] = useState(false)

    // Load orders; reloads whenever dataVersion changes
    useEffect(() => {
        if (!restaurant) return

        let cancelled = false

        const load = async () => {
            // Only show the loading text the very first time, not on every refresh
            if (dataVersion === 0) setIsLoading(true)
            try {
                const response = await getOrdersByRestaurant(restaurant._id)
                if (!cancelled) {
                    setOrders(response.data)
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

    // Check for new orders every 30 seconds
    useEffect(() => {
        const interval = setInterval(() => setDataVersion((v) => v + 1), 30000)
        return () => clearInterval(interval)
    }, [])

    const countByStatus = (status) => orders.filter((o) => o.status === status).length

    const visibleOrders = orders.filter((order) => {
        const matchesTab = activeTab === 'All orders' || order.status === activeTab
        const matchesType = typeFilter === 'all' || order.orderType === typeFilter

        const term = search.trim().toLowerCase()
        const matchesSearch =
            term === '' ||
            shortId(order._id).toLowerCase().includes(term) ||
            order.customer?.fullName?.toLowerCase().includes(term) ||
            order.customer?.email?.toLowerCase().includes(term)

        return matchesTab && matchesType && matchesSearch
    })

    // Look the selected order up again on every render so the panel stays fresh after a reload
    const selectedOrder = orders.find((o) => o._id === selectedId)

    const handleStatusChange = async (order, status) => {
        if (!status || status === order.status) return

        setIsUpdating(true)
        setPageError('')
        try {
            await updateOrderStatus(order._id, status)
            setDataVersion((v) => v + 1)
        }
        catch (error) {
            setPageError(error.message)
        }
        finally {
            setIsUpdating(false)
        }
    }

    return (
        <RestaurantDashboardLayout
            title="Orders"
            description="Manage and track all customer orders"
        >
            {pageError && (
                <div className="mb-4 rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-600">{pageError}</div>
            )}

            <div className="grid grid-cols-5 gap-4">
                <StatCard icon={ShoppingBag} label="Total Orders" value={orders.length} change={null} />
                <StatCard icon={Clock} label="Pending" value={countByStatus('Pending')} change={null} />
                <StatCard icon={Utensils} label="In progress" value={countByStatus('In Progress')} change={null} />
                <StatCard icon={CheckCircle} label="Completed" value={countByStatus('Completed')} change={null} />
                <StatCard icon={XCircle} label="Cancelled" value={countByStatus('Cancelled')} change={null} />
            </div>

            <div className="mt-6 flex items-center gap-3">
                <div className="flex flex-1 items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2.5">
                    <Search size={16} className="text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by order code, customer name or email..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full text-sm outline-none"
                    />
                </div>
                <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-[#374151] outline-none"
                >
                    <option value="all">All order types</option>
                    {orderTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                    ))}
                </select>
            </div>

            <div className="mt-4 flex gap-6 border-b border-gray-100">
                {orderTabs.map((tab) => (
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

            <div className="mt-4 flex gap-6">
                {/* Orders table */}
                <div className="flex-1 overflow-hidden rounded-2xl border border-gray-100 bg-white">
                    {isLoading ? (
                        <p className="p-6 text-sm text-[#9CA3AF]">Loading orders...</p>
                    ) : visibleOrders.length === 0 ? (
                        <p className="p-6 text-sm text-[#9CA3AF]">
                            {orders.length === 0 ? 'No orders yet. They will appear here as customers place them.' : 'No orders match these filters.'}
                        </p>
                    ) : (
                        <table className="w-full text-left text-sm">
                            <thead>
                                <tr className="border-b border-gray-100 bg-[#F9FAFB] text-xs font-semibold text-[#4B5563]">
                                    <th className="px-4 py-3">Order</th>
                                    <th className="px-4 py-3">Customer</th>
                                    <th className="px-4 py-3">Type</th>
                                    <th className="px-4 py-3">Items</th>
                                    <th className="px-4 py-3">Amount</th>
                                    <th className="px-4 py-3">Placed</th>
                                    <th className="px-4 py-3">Status</th>
                                    <th className="px-4 py-3"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {visibleOrders.map((order) => {
                                    const itemCount = order.items.reduce((sum, item) => sum + item.quantity, 0)

                                    return (
                                        <tr
                                            key={order._id}
                                            onClick={() => setSelectedId(order._id)}
                                            className={`cursor-pointer border-b border-gray-50 last:border-none ${
                                                selectedId === order._id ? 'bg-[#F3F4F1]' : ''
                                            }`}
                                        >
                                            <td className="px-4 py-3 font-medium text-[#111827]">{shortId(order._id)}</td>
                                            <td className="px-4 py-3 text-[#374151]">
                                                {order.customer?.fullName || 'Unknown'}
                                                <p className="text-xs text-[#9CA3AF]">{order.customer?.email}</p>
                                            </td>
                                            <td className="px-4 py-3"><OrderTypeBadge type={order.orderType} /></td>
                                            <td className="px-4 py-3 text-[#374151]">{itemCount}</td>
                                            <td className="px-4 py-3 font-medium text-[#111827]">${order.total.toFixed(2)}</td>
                                            <td className="px-4 py-3 text-xs text-[#374151]">{formatTime(order.createdAt)}</td>
                                            <td className="px-4 py-3"><OrderStatusBadge status={order.status} /></td>
                                            <td className="px-4 py-3">
                                                <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-gray-200">
                                                    <Eye size={13} className="text-[#4B5563]" />
                                                </span>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    )}

                    {!isLoading && orders.length > 0 && (
                        <div className="border-t border-gray-100 px-4 py-4">
                            <p className="text-xs text-[#4B5563]">
                                Showing {visibleOrders.length} of {orders.length} orders · refreshes every 30 seconds
                            </p>
                        </div>
                    )}
                </div>

                {/* Order details panel */}
                {selectedOrder && (
                    <div className="h-fit w-80 shrink-0 rounded-2xl border border-gray-100 bg-white p-5">
                        <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-[#111827]">Order Details</h3>
                            <button onClick={() => setSelectedId(null)}>
                                <X size={16} className="text-gray-400" />
                            </button>
                        </div>

                        <p className="mt-3 text-sm font-semibold text-[#111827]">{shortId(selectedOrder._id)}</p>
                        <p className="mb-2 text-xs text-[#4B5563]">{formatTime(selectedOrder.createdAt)}</p>
                        <OrderStatusBadge status={selectedOrder.status} />

                        <div className="mt-4 border-t border-gray-100 pt-4">
                            <h4 className="text-xs font-semibold uppercase text-[#9CA3AF]">Customer</h4>
                            <div className="mt-2 flex items-center gap-2">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-sm font-semibold text-gray-500">
                                    {selectedOrder.customer?.fullName?.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-[#111827]">{selectedOrder.customer?.fullName || 'Unknown'}</p>
                                    <p className="text-xs text-[#9CA3AF]">{selectedOrder.customer?.email}</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 border-t border-gray-100 pt-4">
                            <h4 className="text-xs font-semibold uppercase text-[#9CA3AF]">Order Type</h4>
                            <div className="mt-2 flex items-center gap-2">
                                <OrderTypeBadge type={selectedOrder.orderType} />
                            </div>
                            {selectedOrder.tableInfo && (
                                <p className="mt-2 text-xs text-[#4B5563]">Table: {selectedOrder.tableInfo}</p>
                            )}
                            {selectedOrder.deliveryAddress && (
                                <p className="mt-2 text-xs text-[#4B5563]">Deliver to: {selectedOrder.deliveryAddress}</p>
                            )}
                        </div>

                        <div className="mt-4 border-t border-gray-100 pt-4">
                            <h4 className="text-xs font-semibold uppercase text-[#9CA3AF]">Order Items</h4>
                            <div className="mt-2 space-y-2">
                                {selectedOrder.items.map((item, index) => (
                                    <div key={index} className="flex items-center justify-between text-sm">
                                        <span className="text-[#111827]">{item.quantity} × {item.name}</span>
                                        <span className="text-[#4B5563]">${(item.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>
                            {selectedOrder.specialNote && (
                                <p className="mt-3 rounded-lg bg-[#F9FAFB] p-2 text-xs italic text-[#4B5563]">
                                    "{selectedOrder.specialNote}"
                                </p>
                            )}
                        </div>

                        <div className="mt-4 space-y-1 border-t border-gray-100 pt-4 text-sm">
                            <div className="flex justify-between text-[#4B5563]"><span>Subtotal</span><span>${selectedOrder.subtotal.toFixed(2)}</span></div>
                            <div className="flex justify-between text-[#4B5563]"><span>Service fee</span><span>${selectedOrder.serviceFee.toFixed(2)}</span></div>
                            {selectedOrder.deliveryFee > 0 && (
                                <div className="flex justify-between text-[#4B5563]"><span>Delivery fee</span><span>${selectedOrder.deliveryFee.toFixed(2)}</span></div>
                            )}
                            <div className="flex justify-between pt-1">
                                <span className="font-semibold text-[#111827]">Total</span>
                                <span className="text-lg font-bold text-[#14532D]">${selectedOrder.total.toFixed(2)}</span>
                            </div>
                        </div>

                        <div className="mt-4 border-t border-gray-100 pt-4">
                            <h4 className="text-xs font-semibold uppercase text-[#9CA3AF]">Order Status</h4>
                            <div className="mt-3">
                                <OrderStatusStepper currentStatus={selectedOrder.status} />
                            </div>
                        </div>

                        {nextStatus[selectedOrder.status] && (
                            <button
                                onClick={() => handleStatusChange(selectedOrder, nextStatus[selectedOrder.status])}
                                disabled={isUpdating}
                                className="mt-5 w-full rounded-lg bg-[#14532D] py-2.5 text-sm font-semibold text-white hover:bg-[#0F4224] disabled:opacity-60"
                            >
                                {isUpdating ? 'Updating...' : `Mark as ${nextStatus[selectedOrder.status]}`}
                            </button>
                        )}

                        <select
                            value={selectedOrder.status}
                            onChange={(e) => handleStatusChange(selectedOrder, e.target.value)}
                            disabled={isUpdating}
                            className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm font-medium text-[#111827] outline-none disabled:opacity-60"
                        >
                            {allStatuses.map((status) => (
                                <option key={status} value={status}>Set status: {status}</option>
                            ))}
                        </select>
                    </div>
                )}
            </div>
        </RestaurantDashboardLayout>
    )
}

export default Orders