// src/pages/Restaurant-side/Orders.jsx
import { useState } from 'react'
import { Search, Users, Clock, ShoppingBag, CheckCircle, XCircle, ChevronDown, Calendar, Eye, MoreVertical, X, Phone, MessageSquare, ChevronLeft, ChevronRight } from 'lucide-react'
import RestaurantDashboardLayout from '../../components/restaurant/RestaurantDashboardLayout'
import StatCard from '../../components/restaurant/StatCard'
import OrderStatusStepper from '../../components/restaurant/OrderStatusStepper'
import person10 from '../../assets/images/person10.jpg'

const orderTabs = ['All orders', 'Pending', 'In Progress', 'Completed', 'Cancelled']

const orders = [
    { avatar: person10, id: '#ORD-1052', customer: 'John Doe', phone: '+250 723 456 678', type: 'Dine In', items: '3 items', amount: '$45.50', time: '10:24 AM', status: 'In Progress', tableInfo: 'Table 5, 4 people' },
    { avatar: person10, id: '#ORD-1051', customer: 'Sarah Miller', phone: '+250 723 456 678', type: 'Dine In', items: '2 items', amount: '$23.50', time: '11:23 AM', status: 'In Progress', tableInfo: 'Table 2, 2 people' },
    { avatar: person10, id: '#ORD-1050', customer: 'Michael Brown', phone: '+250 723 456 678', type: 'Takeway', items: '1 item', amount: '$43.50', time: '03:45 AM', status: 'Pending', tableInfo: '' },
    { avatar: person10, id: '#ORD-1049', customer: 'Emily Johnson', phone: '+250 723 456 678', type: 'Delivery', items: '4 items', amount: '$44.00', time: '03:32 AM', status: 'Cancelled', tableInfo: '' },
    { avatar: person10, id: '#ORD-1048', customer: 'David Kim', phone: '+250 723 456 678', type: 'Delivery', items: '5 items', amount: '$59.00', time: '09:50 AM', status: 'Pending', tableInfo: '' },
    { avatar: person10, id: '#ORD-1047', customer: 'Lisa Parker', phone: '+250 723 456 678', type: 'Dine In', items: '6 items', amount: '$79.50', time: '06:00 AM', status: 'Completed', tableInfo: 'Table 3, 4 people' },
    { avatar: person10, id: '#ORD-1046', customer: 'James Wilson', phone: '+250 723 456 678', type: 'Takeway', items: '2 items', amount: '$34.50', time: '10:24 AM', status: 'In Progress', tableInfo: '' },
    { avatar: person10, id: '#ORD-1045', customer: 'Anna Taylor', phone: '+250 723 456 678', type: 'Dine In', items: '3 items', amount: '$65.50', time: '09:00 AM', status: 'In Progress', tableInfo: 'Table 6, 3 people' },
    { avatar: person10, id: '#ORD-1044', customer: 'Simbi Lys', phone: '+250 723 456 678', type: 'Dine In', items: '2 items', amount: '$45.71', time: '05:45 AM', status: 'In Progress', tableInfo: 'Table 4, 2 people' },
]

const orderTypeStyles = {
    'Dine In': 'bg-[#E7F0E3] text-[#14532D]',
    Takeway: 'bg-[#FEF3C7] text-[#92400E]',
    Delivery: 'bg-[#DBEAFE] text-[#1E40AF]',
}

const orderStatusStyles = {
    Pending: 'bg-[#FEF3C7] text-[#92400E]',
    'In Progress': 'bg-[#DBEAFE] text-[#1E40AF]',
    Completed: 'bg-[#E7F0E3] text-[#14532D]',
    Cancelled: 'bg-[#FEE2E2] text-[#991B1B]',
}

function OrderTypeBadge({ type }) {
    return <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${orderTypeStyles[type]}`}>{type}</span>
}

function OrderStatusBadge({ status }) {
    return <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${orderStatusStyles[status]}`}>{status}</span>
}

function Orders() {
    const [activeTab, setActiveTab] = useState('All orders')
    const [search, setSearch] = useState('')
    const [selectedOrder, setSelectedOrder] = useState(orders[0])

    return (
        <RestaurantDashboardLayout
            title="Orders"
            description="Manage and track all customer orders"
        >
            <div className="grid grid-cols-5 gap-4">
                <StatCard icon={ShoppingBag} label="Total Orders" value="84" change="18%" />
                <StatCard icon={Clock} label="Pending" value="15" change={null} />
                <StatCard icon={ShoppingBag} label="In progress" value="32" change={null} />
                <StatCard icon={CheckCircle} label="Completed" value="25" change={null} />
                <StatCard icon={XCircle} label="Cancelled" value="12" change={null} />
            </div>

            <div className="mt-6 flex items-center gap-3">
                <div className="flex flex-1 items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2.5">
                    <Search size={16} className="text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by order ID, customer or phone..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full text-sm outline-none"
                    />
                </div>
                <button className="flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-[#374151]">
                    All Status <ChevronDown size={14} />
                </button>
                <button className="flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-[#374151]">
                    All Orders Types <ChevronDown size={14} />
                </button>
                <button className="flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-[#374151]">
                    <Calendar size={14} /> May 25-26, 2024
                </button>
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
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="border-b border-gray-100 bg-[#F9FAFB] text-xs font-semibold text-[#4B5563]">
                                <th className="px-4 py-3">Order ID</th>
                                <th className="px-4 py-3">Customer</th>
                                <th className="px-4 py-3">Type</th>
                                <th className="px-4 py-3">Items</th>
                                <th className="px-4 py-3">Amount</th>
                                <th className="px-4 py-3">Time</th>
                                <th className="px-4 py-3">Status</th>
                                <th className="px-4 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr
                                    key={order.id}
                                    className={`cursor-pointer border-b border-gray-50 last:border-none ${
                                        selectedOrder?.id === order.id ? 'bg-[#F3F4F1]' : ''
                                    }`}
                                    onClick={() => setSelectedOrder(order)}
                                >
                                    <td className="px-4 py-3 font-medium text-[#111827]">{order.id}</td>
                                    <td className="px-4 py-3 text-[#374151]">
                                        {order.customer}
                                        <p className="text-xs text-[#9CA3AF]">{order.phone}</p>
                                    </td>
                                    <td className="px-4 py-3"><OrderTypeBadge type={order.type} /></td>
                                    <td className="px-4 py-3 text-[#374151]">{order.items}</td>
                                    <td className="px-4 py-3 font-medium text-[#111827]">{order.amount}</td>
                                    <td className="px-4 py-3 text-[#374151]">{order.time}</td>
                                    <td className="px-4 py-3"><OrderStatusBadge status={order.status} /></td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-2">
                                            <button className="flex h-7 w-7 items-center justify-center rounded-lg border border-gray-200">
                                                <Eye size={13} className="text-[#4B5563]" />
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
                        <p className="text-xs text-[#4B5563]">Showing 1 to 9 of 24 orders</p>
                        <div className="flex items-center gap-2">
                            <button className="flex h-7 w-7 items-center justify-center rounded-lg border border-gray-200"><ChevronLeft size={14} /></button>
                            <button className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#14532D] text-xs font-semibold text-white">1</button>
                            <button className="flex h-7 w-7 items-center justify-center rounded-lg text-xs font-medium text-[#4B5563]">2</button>
                            <button className="flex h-7 w-7 items-center justify-center rounded-lg text-xs font-medium text-[#4B5563]">3</button>
                            <button className="flex h-7 w-7 items-center justify-center rounded-lg border border-gray-200"><ChevronRight size={14} /></button>
                        </div>
                    </div>
                </div>

                {/* Order details panel */}
                {selectedOrder && (
                    <div className="w-80 shrink-0 rounded-2xl border border-gray-100 bg-white p-5">
                        <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-[#111827]">Order Details</h3>
                            <button onClick={() => setSelectedOrder(null)}>
                                <X size={16} className="text-gray-400" />
                            </button>
                        </div>

                        <p className="mt-3 text-sm font-semibold text-[#111827]">{selectedOrder.id}</p>
                        <p className="text-xs text-[#4B5563]">{selectedOrder.time}</p>
                        <OrderStatusBadge status={selectedOrder.status} />

                        <div className="mt-4 border-t border-gray-100 pt-4">
                            <h4 className="text-xs font-semibold uppercase text-[#9CA3AF]">Customer Information</h4>
                            <div className="mt-2 flex items-center gap-2">
                                <img src={selectedOrder.avatar} alt={selectedOrder.customer} className="h-8 w-8 rounded-full object-cover" />
                                <span className="flex-1 text-sm font-medium text-[#111827]">{selectedOrder.customer}</span>
                                <button className="flex h-7 w-7 items-center justify-center rounded-lg border border-gray-200">
                                    <Phone size={12} className="text-[#4B5563]" />
                                </button>
                                <button className="flex h-7 w-7 items-center justify-center rounded-lg border border-gray-200">
                                    <MessageSquare size={12} className="text-[#4B5563]" />
                                </button>
                            </div>
                        </div>

                        <div className="mt-4 border-t border-gray-100 pt-4">
                            <h4 className="text-xs font-semibold uppercase text-[#9CA3AF]">Order Type</h4>
                            <div className="mt-2 flex items-center gap-2 text-sm text-[#111827]">
                                <OrderTypeBadge type={selectedOrder.type} />
                                {selectedOrder.tableInfo && <span className="text-xs text-[#4B5563]">{selectedOrder.tableInfo}</span>}
                            </div>
                        </div>

                        <div className="mt-4 border-t border-gray-100 pt-4">
                            <h4 className="text-xs font-semibold uppercase text-[#9CA3AF]">Order Items</h4>
                            <p className="mt-2 text-xs text-[#9CA3AF]">
                                Item details aren't stored yet — this will list each dish once orders connect to the Menu.
                            </p>
                        </div>

                        <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4 text-sm">
                            <span className="text-[#4B5563]">Total Amount</span>
                            <span className="text-lg font-bold text-[#14532D]">{selectedOrder.amount}</span>
                        </div>

                        <div className="mt-4 border-t border-gray-100 pt-4">
                            <h4 className="text-xs font-semibold uppercase text-[#9CA3AF]">Order Status</h4>
                            <div className="mt-3">
                                <OrderStatusStepper currentStatus={selectedOrder.status} />
                            </div>
                        </div>

                        <button className="mt-5 w-full rounded-lg border border-gray-300 py-2.5 text-sm font-semibold text-[#111827]">
                            Mark as Completed
                        </button>
                        <button className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-lg bg-[#14532D] py-2.5 text-sm font-semibold text-white">
                            Update Status <ChevronDown size={14} />
                        </button>
                    </div>
                )}
            </div>
        </RestaurantDashboardLayout>
    )
}

export default Orders