import { useState, useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowLeft, Search, MapPin, Clock, ShoppingBag } from 'lucide-react'
import CustomerDashboardLayout from '../../components/customer/CustomerDashboardLayout'
import CustomerDishCard from '../../components/customer/CustomerDishCard'
import { useCart } from '../../context/CartContext'
import { menuCategories } from '../../constants/menuCategories'
import { getRestaurantById } from '../../services/restaurantService'
import { getMenuItems } from '../../services/menuItemService'
import person11 from '../../assets/images/person11.jpg'

const capitalize = (text) => (text ? text.charAt(0).toUpperCase() + text.slice(1) : '')

// Reads today's opening hours from the restaurant's saved hours
const getTodayHours = (hours = []) => {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' })
    const entry = hours.find((h) => h.day === today)
    if (!entry || !entry.isOpen) return 'Closed today'
    return `Open today: ${entry.open} - ${entry.close}`
}

function Menu() {
    const { restaurantId } = useParams()
    const { cart, addItem, changeQuantity, getQuantity, totalItems } = useCart()

    const [restaurant, setRestaurant] = useState(null)
    const [dishes, setDishes] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState('')
    const [activeCategory, setActiveCategory] = useState('all')
    const [search, setSearch] = useState('')

    useEffect(() => {
        if (!restaurantId) return

        let cancelled = false

        const load = async () => {
            setIsLoading(true)
            setErrorMessage('')
            try {
                const [restaurantResponse, dishesResponse] = await Promise.all([
                    getRestaurantById(restaurantId),
                    getMenuItems(restaurantId),
                ])
                if (!cancelled) {
                    setRestaurant(restaurantResponse.data)
                    setDishes(dishesResponse.data)
                }
            }
            catch (error) {
                if (!cancelled) setErrorMessage(error.message)
            }
            finally {
                if (!cancelled) setIsLoading(false)
            }
        }

        load()
        return () => { cancelled = true }
    }, [restaurantId])

    // Opened from the sidebar without choosing a restaurant first
    if (!restaurantId) {
        if (cart.restaurantId) {
            return <Navigate to={`/Customer-side/Menu/${cart.restaurantId}`} replace />
        }
        return (
            <CustomerDashboardLayout userPhoto={person11}>
                <div className="mt-10 text-center">
                    <p className="text-sm text-[#4B5563]">Pick a restaurant first to see its menu.</p>
                    <Link
                        to="/Customer-side/Restaurants"
                        className="mt-4 inline-block rounded-lg bg-[#14532D] px-5 py-2.5 text-sm font-semibold text-white"
                    >
                        Browse restaurants
                    </Link>
                </div>
            </CustomerDashboardLayout>
        )
    }

    // Customers only see dishes the restaurant has marked available
    const visibleDishes = dishes.filter((dish) => {
        if (!dish.available) return false
        const matchesCategory = activeCategory === 'all' || dish.category === activeCategory
        const matchesSearch = dish.name.toLowerCase().includes(search.trim().toLowerCase())
        return matchesCategory && matchesSearch
    })

    const cartHasThisRestaurant = cart.restaurantId === restaurantId && totalItems > 0

    return (
        <CustomerDashboardLayout userPhoto={person11}>
            <Link to="/Customer-side/Restaurants" className="flex items-center gap-1.5 text-sm font-medium text-[#374151]">
                <ArrowLeft size={16} /> Back to restaurants
            </Link>

            {errorMessage && (
                <div className="mt-4 rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-600">
                    {errorMessage}
                </div>
            )}

            {isLoading && <p className="mt-6 text-sm text-[#9CA3AF]">Loading menu...</p>}

            {restaurant && (
                <>
                    <div className="mt-4 flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-4">
                        <div className="flex items-center gap-4">
                            <div className="flex h-20 w-28 items-center justify-center rounded-xl bg-gray-200">
                                {restaurant.coverImageUrl ? (
                                    <img src={restaurant.coverImageUrl} alt={restaurant.name} className="h-full w-full rounded-xl object-cover" />
                                ) : (
                                    <span className="font-heading text-3xl font-bold text-gray-400">
                                        {restaurant.name.charAt(0).toUpperCase()}
                                    </span>
                                )}
                            </div>
                            <div>
                                <h1 className="font-heading text-xl font-bold text-[#111827]">{restaurant.name}</h1>
                                <p className="mt-1 text-sm text-[#4B5563]">{capitalize(restaurant.cuisineType) || 'Restaurant'}</p>
                                <div className="mt-1 flex items-center gap-4 text-xs text-[#9CA3AF]">
                                    <span className="flex items-center gap-1">
                                        <MapPin size={12} />
                                        {[restaurant.address, capitalize(restaurant.city)].filter(Boolean).join(', ') || 'Location not set'}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Clock size={12} /> {getTodayHours(restaurant.hours)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <Link
                            to={`/Customer-side/TableBooking/${restaurant._id}`}
                            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-[#111827] hover:bg-gray-50"
                        >
                            Book a table
                        </Link>
                    </div>

                    <div className="mt-6 flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2.5">
                        <Search size={16} className="text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search in menu..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full text-sm outline-none"
                        />
                    </div>

                    <div className="mt-4 flex gap-2">
                        {[{ value: 'all', label: 'All' }, ...menuCategories].map((cat) => (
                            <button
                                key={cat.value}
                                onClick={() => setActiveCategory(cat.value)}
                                className={`rounded-lg px-3 py-1.5 text-sm font-medium ${
                                    activeCategory === cat.value
                                        ? 'bg-[#14532D] text-white'
                                        : 'border border-gray-200 bg-white text-[#4B5563]'
                                }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>

                    {cartHasThisRestaurant && (
                        <Link
                            to="/Customer-side/Orders"
                            className="mt-4 flex items-center justify-between rounded-lg bg-[#E7F0E3] px-4 py-3 text-sm font-medium text-[#14532D]"
                        >
                            <span className="flex items-center gap-2">
                                <ShoppingBag size={16} /> {totalItems} item{totalItems > 1 ? 's' : ''} in your cart
                            </span>
                            <span>View cart →</span>
                        </Link>
                    )}

                    <h2 className="mt-6 text-lg font-bold text-[#111827]">Dishes</h2>

                    {visibleDishes.length === 0 ? (
                        <p className="mt-4 text-sm text-[#9CA3AF]">
                            {dishes.length === 0
                                ? 'This restaurant has not added any dishes yet.'
                                : 'No dishes match your filters.'}
                        </p>
                    ) : (
                        <div className="mt-4 grid grid-cols-4 gap-4">
                            {visibleDishes.map((dish) => (
                                <CustomerDishCard
                                    key={dish._id}
                                    image={dish.imageUrl}
                                    name={dish.name}
                                    description={dish.description}
                                    price={dish.price}
                                    quantity={getQuantity(dish._id)}
                                    onAdd={() => addItem(restaurant, dish)}
                                    onIncrease={() => changeQuantity(dish._id, 1)}
                                    onDecrease={() => changeQuantity(dish._id, -1)}
                                />
                            ))}
                        </div>
                    )}
                </>
            )}
        </CustomerDashboardLayout>
    )
}

export default Menu