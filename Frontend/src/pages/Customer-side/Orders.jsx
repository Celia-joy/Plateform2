import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Trash2, Plus, Minus, ArrowRight, ShieldCheck, Leaf, Truck, Award, ChevronDown, ChevronUp } from 'lucide-react'
import CustomerDashboardLayout from '../../components/customer/CustomerDashboardLayout'
import { useCart } from '../../context/CartContext'
import { createOrder, getMyOrders, updateOrderStatus } from '../../services/orderService'
import person11 from '../../assets/images/person11.jpg'

const orderTypes = ['Dine In', 'Takeaway', 'Delivery']

const statusStyles = {
    Pending: 'bg-[#FEF3C7] text-[#92400E]',
    'In Progress': 'bg-[#DBEAFE] text-[#1E40AF]',
    Ready: 'bg-[#F3E8FF] text-[#6B21A8]',
    Completed: 'bg-[#E7F0E3] text-[#14532D]',
    Cancelled: 'bg-[#FEE2E2] text-[#991B1B]',
}

const badges = [
    { icon: ShieldCheck, label: 'Secure Account' },
    { icon: Leaf, label: 'Fresh Food' },
    { icon: Truck, label: 'Fast Service' },
    { icon: Award, label: 'Best Quality' },
]

const formatDate = (isoString) =>
    new Date(isoString).toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
    })

function Orders() {
    const { cart, changeQuantity, removeItem, clearCart, totalItems } = useCart()

    // Checkout form
    const [orderType, setOrderType] = useState('Dine In')
    const [tableInfo, setTableInfo] = useState('')
    const [deliveryAddress, setDeliveryAddress] = useState('')
    const [note, setNote] = useState('')
    const [isPlacing, setIsPlacing] = useState(false)
    const [placeError, setPlaceError] = useState('')
    const [successMessage, setSuccessMessage] = useState('')

    // Order history
    const [orders, setOrders] = useState([])
    const [ordersLoading, setOrdersLoading] = useState(true)
    const [ordersError, setOrdersError] = useState('')
    const [ordersVersion, setOrdersVersion] = useState(0)
    const [expandedId, setExpandedId] = useState(null)

    // Reload the history whenever ordersVersion changes (after placing or cancelling)
    useEffect(() => {
        let cancelled = false

        const loadOrders = async () => {
            setOrdersLoading(true)
            setOrdersError('')
            try {
                const response = await getMyOrders()
                if (!cancelled) setOrders(response.data)
            }
            catch (error) {
                if (!cancelled) setOrdersError(error.message)
            }
            finally {
                if (!cancelled) setOrdersLoading(false)
            }
        }

        loadOrders()
        return () => { cancelled = true }
    }, [ordersVersion])

    // Same math as the backend, for preview only. The server recalculates everything.
    const subtotal = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const serviceFee = Math.round(subtotal * 0.05 * 100) / 100
    const deliveryFee = orderType === 'Delivery' && cart.items.length > 0 ? 2 : 0
    const total = subtotal + serviceFee + deliveryFee

    const handlePlaceOrder = async () => {
        setPlaceError('')
        setSuccessMessage('')

        if (cart.items.length === 0) return

        if (orderType === 'Delivery' && !deliveryAddress.trim()) {
            setPlaceError('Please enter a delivery address')
            return
        }

        setIsPlacing(true)
        try {
            await createOrder({
                restaurantId: cart.restaurantId,
                items: cart.items.map((item) => ({
                    menuItemId: item.menuItemId,
                    quantity: item.quantity,
                })),
                orderType,
                tableInfo: orderType === 'Dine In' ? tableInfo.trim() : undefined,
                deliveryAddress: orderType === 'Delivery' ? deliveryAddress.trim() : undefined,
                specialNote: note.trim() || undefined,
            })

            clearCart()
            setTableInfo('')
            setDeliveryAddress('')
            setNote('')
            setSuccessMessage('Your order has been placed!')
            setOrdersVersion((v) => v + 1)
        }
        catch (error) {
            setPlaceError(error.message)
        }
        finally {
            setIsPlacing(false)
        }
    }

    const handleCancelOrder = async (orderId) => {
        if (!window.confirm('Cancel this order?')) return

        try {
            await updateOrderStatus(orderId, 'Cancelled')
            setOrdersVersion((v) => v + 1)
        }
        catch (error) {
            setOrdersError(error.message)
        }
    }

    return (
        <CustomerDashboardLayout userPhoto={person11}>
            <h1 className="font-heading text-3xl font-bold text-[#14532D]">My Order</h1>
            <p className="mt-1 text-sm text-[#4B5563]">Review your items, update quantities and place your order.</p>

            {successMessage && (
                <div className="mt-4 rounded-lg bg-[#E7F0E3] px-4 py-2.5 text-sm text-[#14532D]">
                    {successMessage}
                </div>
            )}

            <div className="mt-6 grid grid-cols-3 gap-6">
                <div className="col-span-2 space-y-6">
                    {/* Current order */}
                    <div className="rounded-2xl border border-gray-100 bg-white p-5">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <h2 className="font-semibold text-[#111827]">Current Order</h2>
                                <span className="rounded-full bg-[#E7F0E3] px-2 py-0.5 text-xs font-medium text-[#14532D]">
                                    {totalItems} item{totalItems === 1 ? '' : 's'}
                                </span>
                            </div>
                            {cart.items.length > 0 && (
                                <button
                                    onClick={clearCart}
                                    className="flex items-center gap-1 text-xs font-medium text-[#991B1B]"
                                >
                                    <Trash2 size={13} /> Clear all
                                </button>
                            )}
                        </div>

                        {cart.items.length > 0 && (
                            <p className="mt-1 text-xs text-[#4B5563]">
                                From{' '}
                                <Link to={`/Customer-side/Menu/${cart.restaurantId}`} className="font-medium text-[#14532D] hover:underline">
                                    {cart.restaurantName}
                                </Link>
                            </p>
                        )}

                        {cart.items.length === 0 ? (
                            <div className="py-8 text-center">
                                <p className="text-sm text-[#9CA3AF]">Your cart is empty.</p>
                                <Link
                                    to="/Customer-side/Restaurants"
                                    className="mt-3 inline-block text-sm font-semibold text-[#14532D] hover:underline"
                                >
                                    Browse restaurants
                                </Link>
                            </div>
                        ) : (
                            <div className="mt-4 divide-y divide-gray-100">
                                {cart.items.map((item) => (
                                    <div key={item.menuItemId} className="flex items-center gap-3 py-3">
                                        <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-gray-200">
                                            {item.imageUrl && (
                                                <img src={item.imageUrl} alt={item.name} className="h-full w-full object-cover" />
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-semibold text-[#111827]">{item.name}</p>
                                            <p className="line-clamp-1 text-xs text-[#4B5563]">{item.description}</p>
                                            <p className="mt-1 text-xs font-medium text-[#111827]">${Number(item.price).toFixed(2)}</p>
                                        </div>
                                        <div className="flex items-center gap-2 rounded-lg border border-gray-200 px-2 py-1">
                                            <button onClick={() => changeQuantity(item.menuItemId, -1)}><Minus size={12} /></button>
                                            <span className="text-xs font-semibold">{item.quantity}</span>
                                            <button onClick={() => changeQuantity(item.menuItemId, 1)}><Plus size={12} /></button>
                                        </div>
                                        <span className="w-16 text-right text-sm font-semibold text-[#111827]">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </span>
                                        <button onClick={() => removeItem(item.menuItemId)} className="text-gray-400 hover:text-[#991B1B]">
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Order history */}
                    <div className="rounded-2xl border border-gray-100 bg-white p-5">
                        <h2 className="font-semibold text-[#111827]">Order History</h2>

                        {ordersError && (
                            <div className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{ordersError}</div>
                        )}

                        {ordersLoading ? (
                            <p className="mt-4 text-sm text-[#9CA3AF]">Loading orders...</p>
                        ) : orders.length === 0 ? (
                            <p className="mt-4 text-sm text-[#9CA3AF]">You haven't placed any orders yet.</p>
                        ) : (
                            <div className="mt-4 divide-y divide-gray-100">
                                {orders.map((order) => {
                                    const isExpanded = expandedId === order._id
                                    const itemCount = order.items.reduce((sum, item) => sum + item.quantity, 0)

                                    return (
                                        <div key={order._id} className="py-3">
                                            <div className="flex items-center gap-3">
                                                <div className="flex-1">
                                                    <p className="text-sm font-semibold text-[#111827]">
                                                        {order.restaurant?.name || 'Restaurant'}
                                                    </p>
                                                    <p className="mt-0.5 flex items-center gap-2 text-xs text-[#4B5563]">
                                                        {itemCount} item{itemCount === 1 ? '' : 's'} · {order.orderType}
                                                        <span className={`rounded-full px-2 py-0.5 font-medium ${statusStyles[order.status]}`}>
                                                            {order.status}
                                                        </span>
                                                    </p>
                                                    <p className="text-xs text-[#9CA3AF]">{formatDate(order.createdAt)}</p>
                                                </div>
                                                <span className="text-sm font-semibold text-[#111827]">${order.total.toFixed(2)}</span>
                                                <button
                                                    onClick={() => setExpandedId(isExpanded ? null : order._id)}
                                                    className="flex items-center gap-1 rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium text-[#111827]"
                                                >
                                                    {isExpanded ? 'Hide' : 'View Details'}
                                                    {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                                                </button>
                                            </div>

                                            {isExpanded && (
                                                <div className="mt-3 rounded-lg bg-[#F9FAFB] p-4 text-xs text-[#4B5563]">
                                                    <div className="space-y-1">
                                                        {order.items.map((item, index) => (
                                                            <div key={index} className="flex justify-between">
                                                                <span>{item.quantity} × {item.name}</span>
                                                                <span>${(item.price * item.quantity).toFixed(2)}</span>
                                                            </div>
                                                        ))}
                                                    </div>

                                                    <div className="mt-3 space-y-1 border-t border-gray-200 pt-3">
                                                        <div className="flex justify-between"><span>Subtotal</span><span>${order.subtotal.toFixed(2)}</span></div>
                                                        <div className="flex justify-between"><span>Service fee</span><span>${order.serviceFee.toFixed(2)}</span></div>
                                                        {order.deliveryFee > 0 && (
                                                            <div className="flex justify-between"><span>Delivery fee</span><span>${order.deliveryFee.toFixed(2)}</span></div>
                                                        )}
                                                        <div className="flex justify-between font-semibold text-[#111827]"><span>Total</span><span>${order.total.toFixed(2)}</span></div>
                                                    </div>

                                                    {order.tableInfo && <p className="mt-3">Table: {order.tableInfo}</p>}
                                                    {order.deliveryAddress && <p className="mt-3">Deliver to: {order.deliveryAddress}</p>}
                                                    {order.specialNote && <p className="mt-1">Note: {order.specialNote}</p>}

                                                    {order.status === 'Pending' && (
                                                        <button
                                                            onClick={() => handleCancelOrder(order._id)}
                                                            className="mt-3 rounded-lg border border-red-300 px-3 py-1.5 font-medium text-red-600 hover:bg-red-50"
                                                        >
                                                            Cancel order
                                                        </button>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </div>
                </div>

                {/* Right column */}
                <div className="space-y-6">
                    <div className="rounded-2xl border border-gray-100 bg-white p-5">
                        <h2 className="font-semibold text-[#111827]">Order Type</h2>
                        <div className="mt-3 flex gap-2">
                            {orderTypes.map((type) => (
                                <button
                                    key={type}
                                    onClick={() => setOrderType(type)}
                                    className={`flex-1 rounded-lg border px-2 py-2 text-xs font-semibold ${
                                        orderType === type
                                            ? 'border-[#14532D] bg-[#E7F0E3] text-[#14532D]'
                                            : 'border-gray-200 text-[#4B5563]'
                                    }`}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>

                        {orderType === 'Dine In' && (
                            <input
                                type="text"
                                placeholder="Table or party size (optional)"
                                value={tableInfo}
                                onChange={(e) => setTableInfo(e.target.value)}
                                className="mt-3 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#14532D]"
                            />
                        )}
                        {orderType === 'Delivery' && (
                            <input
                                type="text"
                                placeholder="Delivery address"
                                value={deliveryAddress}
                                onChange={(e) => setDeliveryAddress(e.target.value)}
                                className="mt-3 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#14532D]"
                            />
                        )}

                        <textarea
                            placeholder="Note for the restaurant (optional)"
                            rows={2}
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            className="mt-3 w-full resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#14532D]"
                        />
                    </div>

                    <div className="rounded-2xl border border-gray-100 bg-white p-5">
                        <h2 className="font-semibold text-[#111827]">Order Summary</h2>
                        <div className="mt-3 space-y-2 text-sm">
                            <div className="flex justify-between text-[#4B5563]">
                                <span>Subtotal</span><span>${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-[#4B5563]">
                                <span>Service Fee (5%)</span><span>${serviceFee.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-[#4B5563]">
                                <span>Delivery Fee</span><span>${deliveryFee.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between border-t border-gray-100 pt-2 text-base font-bold text-[#111827]">
                                <span>Total</span><span>${total.toFixed(2)}</span>
                            </div>
                        </div>

                        {placeError && (
                            <div className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{placeError}</div>
                        )}

                        <button
                            onClick={handlePlaceOrder}
                            disabled={isPlacing || cart.items.length === 0}
                            className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-[#14532D] py-2.5 text-sm font-semibold text-white disabled:opacity-50"
                        >
                            {isPlacing ? 'Placing order...' : 'Place order'} {!isPlacing && <ArrowRight size={14} />}
                        </button>
                        <p className="mt-2 text-center text-xs text-[#9CA3AF]">
                            No online payment — you pay the restaurant directly.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        {badges.map(({ icon: Icon, label }) => (
                            <div key={label} className="flex items-center gap-2 rounded-lg bg-[#E7F0E3] p-3 text-xs font-medium text-[#14532D]">
                                <Icon size={16} /> {label}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </CustomerDashboardLayout>
    )
}

export default Orders