import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, Search, SlidersHorizontal, MapPin, Star, Heart, LayoutGrid, Sparkles, Flame, Sparkle } from 'lucide-react'
import CustomerDashboardLayout from '../../components/customer/CustomerDashboardLayout'
import { getRestaurants } from '../../services/restaurantService'
import person11 from '../../assets/images/person11.jpg'
import restaurantOwnerPhoto from '../../assets/images/restaurant-owner-onpc.jpg'

const filterTabs = [
    { label: 'All', sublabel: 'Everything', icon: LayoutGrid, enabled: true },
    { label: 'Nearby', sublabel: 'Near you', icon: MapPin, enabled: false },
    { label: 'Popular', sublabel: 'Most loved', icon: Flame, enabled: false },
    { label: 'Top Rated', sublabel: 'Best quality', icon: Star, enabled: false },
    { label: 'New', sublabel: 'New places', icon: Sparkles, enabled: false },
    { label: 'Cuisines', sublabel: 'All types', icon: Sparkle, enabled: false },
]

const capitalize = (text) => (text ? text.charAt(0).toUpperCase() + text.slice(1) : '')

function RestaurantCard({ restaurant }) {
    const location = [restaurant.address, capitalize(restaurant.city)].filter(Boolean).join(', ')

    return (
        <Link
            to={`/Customer-side/Menu/${restaurant._id}`}
            className="block overflow-hidden rounded-2xl border border-gray-100 bg-white transition hover:shadow-md"
        >
            <div className="relative flex h-32 w-full items-center justify-center bg-gray-200">
                {restaurant.coverImageUrl ? (
                    <img src={restaurant.coverImageUrl} alt={restaurant.name} className="h-full w-full object-cover" />
                ) : (
                    <span className="font-heading text-4xl font-bold text-gray-400">
                        {restaurant.name.charAt(0).toUpperCase()}
                    </span>
                )}
                <span className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/90">
                    <Heart size={13} className="text-[#374151]" />
                </span>
            </div>
            <div className="p-3">
                <p className="text-sm font-semibold text-[#111827]">{restaurant.name}</p>
                <p className="mt-1 text-xs text-[#4B5563]">{capitalize(restaurant.cuisineType) || 'Restaurant'}</p>
                {location && (
                    <p className="mt-1 flex items-center gap-1 text-xs text-[#9CA3AF]">
                        <MapPin size={11} /> {location}
                    </p>
                )}
            </div>
        </Link>
    )
}

function Restaurants() {
    const [restaurants, setRestaurants] = useState([])
    const [search, setSearch] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState('')

    // Wait 300ms after the user stops typing before asking the backend
    useEffect(() => {
        let cancelled = false

        const timer = setTimeout(async () => {
            setIsLoading(true)
            setErrorMessage('')
            try {
                const response = await getRestaurants(search)
                if (!cancelled) setRestaurants(response.data)
            }
            catch (error) {
                if (!cancelled) setErrorMessage(error.message)
            }
            finally {
                if (!cancelled) setIsLoading(false)
            }
        }, 300)

        return () => {
            cancelled = true
            clearTimeout(timer)
        }
    }, [search])

    return (
        <CustomerDashboardLayout userPhoto={person11}>
            <div className="flex items-center gap-1.5 text-sm text-[#4B5563]">
                <MapPin size={14} />
                <div>
                    <p className="text-xs text-[#9CA3AF]">Location</p>
                    <button className="flex items-center gap-1 font-semibold text-[#111827]">
                        Huye, Rwanda <ChevronDown size={14} />
                    </button>
                </div>
            </div>

            <div className="mt-4 grid items-center gap-8 md:grid-cols-2">
                <div>
                    <h1 className="font-heading text-3xl font-bold text-[#14532D]">
                        Find your next<br />
                        <span className="text-[#4CAF50]">favorite</span> place to eat
                    </h1>
                    <p className="mt-2 text-sm text-[#4B5563]">
                        Discover the best restaurants around you, explore menus and enjoy delicious meals.
                    </p>
                </div>
                <img src={restaurantOwnerPhoto} alt="Food" className="h-40 w-full rounded-2xl object-cover" />
            </div>

            <div className="mt-6 flex items-center gap-3">
                <div className="flex flex-1 items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2.5">
                    <Search size={16} className="text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search restaurants or cuisines..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full text-sm outline-none"
                    />
                </div>
                <button className="flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-[#374151]">
                    <MapPin size={14} /> Near me <ChevronDown size={14} />
                </button>
                <button className="flex items-center gap-1.5 rounded-lg bg-[#14532D] px-4 py-2.5 text-sm font-medium text-white">
                    <SlidersHorizontal size={14} /> Filters
                </button>
            </div>

            <div className="mt-4 flex gap-3">
                {filterTabs.map(({ label, sublabel, icon: Icon, enabled }) => (
                    <div
                        key={label}
                        className={`flex items-center gap-2 rounded-lg border px-3 py-2 ${
                            enabled
                                ? 'border-[#14532D] bg-[#E7F0E3]'
                                : 'cursor-not-allowed border-gray-200 bg-white opacity-50'
                        }`}
                    >
                        <Icon size={16} className="text-[#14532D]" />
                        <div>
                            <p className="text-xs font-semibold text-[#111827]">{label}</p>
                            <p className="text-[10px] text-[#9CA3AF]">{sublabel}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 flex items-center justify-between">
                <h2 className="text-lg font-bold text-[#111827]">Restaurants</h2>
                {!isLoading && (
                    <span className="text-sm text-[#4B5563]">{restaurants.length} found</span>
                )}
            </div>

            {errorMessage && (
                <div className="mt-4 rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-600">
                    {errorMessage}
                </div>
            )}

            {isLoading ? (
                <p className="mt-4 text-sm text-[#9CA3AF]">Loading restaurants...</p>
            ) : restaurants.length === 0 ? (
                <p className="mt-4 text-sm text-[#9CA3AF]">
                    {search.trim() ? 'No restaurants match your search.' : 'No restaurants yet.'}
                </p>
            ) : (
                <div className="mt-4 grid grid-cols-4 gap-4">
                    {restaurants.map((restaurant) => (
                        <RestaurantCard key={restaurant._id} restaurant={restaurant} />
                    ))}
                </div>
            )}
        </CustomerDashboardLayout>
    )
}

export default Restaurants