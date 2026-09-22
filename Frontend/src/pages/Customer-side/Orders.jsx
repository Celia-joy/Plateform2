// src/pages/Customer-side/Orders.jsx
import { useState } from 'react'
import { Trash2, Plus, Minus, ArrowRight, ShieldCheck, Leaf, Truck, Award, Edit2, MapPin, Clock, FileText } from 'lucide-react'
import CustomerDashboardLayout from '../../components/customer/CustomerDashboardLayout'
import person11 from '../../assets/images/person11.jpg'
import alfredoPasta from '../../assets/images/alfredo-pasta.jpg'
import margheritaPizza from '../../assets/images/margherita-pizza.jpg'
import grilledChicken from '../../assets/images/grilled-chicken.jpg'
import beefBurger from '../../assets/images/beef-burger.jpg'

const orderHistory = [
    { image: grilledChicken, restaurant: 'Green Leaf Bistro', items: '2 items', status: 'Completed', date: 'May 12, 2025 . 7:30 PM', total: '$24.50' },
    { image: beefBurger, restaurant: 'The Flavor Hub', items: '3 items', status: 'Completed', date: 'May 6, 2025 . 1:20 PM', total: '$12.00' },
    { image: margheritaPizza, restaurant: 'Urban Eats', items: '2 items', status: 'Completed', date: 'Apr 28, 2025 . 8:15 PM', total: '$15.75' },
]

const badges = [
    { icon: ShieldCheck, label: 'Secure Payment' },
    { icon: Leaf, label: 'Fresh Food' },
    { icon: Truck, label: 'Fast Delivery' },
    { icon: Award, label: 'Best Quality' },
]

function Orders() {
    const [cartItems, setCartItems] = useState([
        { id: 1, image: alfredoPasta, name: 'Creamy Alfredo Pasta', description: 'Fettuccine pasta in creamy alfredo sauce with parmesan', price: 12.50, quantity: 1 },
        { id: 2, image: margheritaPizza, name: 'Margheritta Pizza', description: 'Fresh tomatoes, mozzarella, basil, and olive oil', price: 13.00, quantity: 1 },
        { id: 3, image: null, name: 'Lemonade', description: 'Fresh lemonade with lemon slices and mint', price: 3.50, quantity: 1 },
    ])

    const updateQuantity = (id, delta) => {
        setCartItems((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
            )
        )
    }

    const removeItem = (id) => {
        setCartItems((prev) => prev.filter((item) => item.id !== id))
    }

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const serviceFee = subtotal * 0.05
    const deliveryFee = 2.0
    const total = subtotal + serviceFee + deliveryFee

    return (
        <CustomerDashboardLayout userPhoto={person11}>
            <h1 className="font-heading text-3xl font-bold text-[#14532D]">My Order</h1>
            <p className="mt-1 text-sm text-[#4B5563]">Review your items, update quantities and place your order.</p>

            <div className="mt-6 grid grid-cols-3 gap-6">
                <div className="col-span-2 space-y-6">
                    <div className="rounded-2xl border border-gray-100 bg-white p-5">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <h2 className="font-semibold text-[#111827]">Current Order</h2>
                                <span className="rounded-full bg-[#E7F0E3] px-2 py-0.5 text-xs font-medium text-[#14532D]">
                                    {cartItems.length} items
                                </span>
                            </div>
                            <button
                                onClick={() => setCartItems([])}
                                className="flex items-center gap-1 text-xs font-medium text-[#991B1B]"
                            >
                                <Trash2 size={13} /> Clear all
                            </button>
                        </div>

                        <div className="mt-4 divide-y divide-gray-100">
                            {cartItems.map((item) => (
                                <div key={item.id} className="flex items-center gap-3 py-3">
                                    {item.image ? (
                                        <img src={item.image} alt={item.name} className="h-14 w-14 rounded-lg object-cover" />
                                    ) : (
                                        <div className="h-14 w-14 rounded-lg bg-gray-200" />
                                    )}
                                    <div className="flex-1">
                                        <p className="text-sm font-semibold text-[#111827]">{item.name}</p>
                                        <p className="text-xs text-[#4B5563]">{item.description}</p>
                                        <p className="mt-1 text-xs font-medium text-[#111827]">${item.price.toFixed(2)}</p>
                                    </div>
                                    <div className="flex items-center gap-2 rounded-lg border border-gray-200 px-2 py-1">
                                        <button onClick={() => updateQuantity(item.id, -1)}><Minus size={12} /></button>
                                        <span className="text-xs font-semibold">{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.id, 1)}><Plus size={12} /></button>
                                    </div>
                                    <span className="w-14 text-right text-sm font-semibold text-[#111827]">
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </span>
                                    <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-[#991B1B]">
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            ))}
                            {cartItems.length === 0 && (
                                <p className="py-6 text-center text-sm text-[#9CA3AF]">Your cart is empty.</p>
                            )}
                        </div>
                    </div>

                    <div className="rounded-2xl border border-gray-100 bg-white p-5">
                        <div className="flex items-center justify-between">
                            <h2 className="font-semibold text-[#111827]">Order History</h2>
                            <button className="text-xs font-medium text-[#14532D]">View All Orders →</button>
                        </div>
                        <div className="mt-4 divide-y divide-gray-100">
                            {orderHistory.map((order, i) => (
                                <div key={i} className="flex items-center gap-3 py-3">
                                    <img src={order.image} alt={order.restaurant} className="h-12 w-12 rounded-lg object-cover" />
                                    <div className="flex-1">
                                        <p className="text-sm font-semibold text-[#111827]">{order.restaurant}</p>
                                        <p className="text-xs text-[#4B5563]">
                                            {order.items} . <span className="text-[#14532D]">{order.status}</span>
                                        </p>
                                        <p className="text-xs text-[#9CA3AF]">{order.date}</p>
                                    </div>
                                    <span className="text-sm font-semibold text-[#111827]">{order.total}</span>
                                    <button className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium text-[#111827]">
                                        View Details
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
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
                        <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-[#14532D] py-2.5 text-sm font-semibold text-white">
                            Proceed to checkout <ArrowRight size={14} />
                        </button>
                        <p className="mt-2 text-center text-xs text-[#9CA3AF]">Secure checkout . Safe &amp; easy payment</p>
                    </div>

                    <div className="rounded-2xl border border-gray-100 bg-white p-5">
                        <div className="flex items-center justify-between">
                            <h2 className="font-semibold text-[#111827]">Delivery Information</h2>
                            <button className="flex items-center gap-1 text-xs font-medium text-[#14532D]">
                                <Edit2 size={12} /> Edit
                            </button>
                        </div>
                        <div className="mt-3 space-y-2 text-xs text-[#4B5563]">
                            <p className="flex items-start gap-2">
                                <MapPin size={14} className="mt-0.5 shrink-0" />
                                Delivery Address<br />
                                <span className="text-[#111827]">KG 15 AVE, Nyarutarama, Kigali, Rwanda</span>
                            </p>
                            <p className="flex items-center gap-2">
                                <Clock size={14} /> Delivery Time: 25-35 min
                            </p>
                        </div>
                        <div className="mt-3 flex items-start gap-2 rounded-lg bg-[#F3F4F1] p-3 text-xs text-[#4B5563]">
                            <FileText size={14} className="mt-0.5 shrink-0" />
                            Order Note (Optional)<br />
                            Add a note for the restaurant...
                        </div>
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