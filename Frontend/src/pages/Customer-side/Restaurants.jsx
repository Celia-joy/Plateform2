import { useState } from 'react'
import { ChevronDown, Search, SlidersHorizontal, MapPin, Star, Heart, LayoutGrid, Sparkles, Flame, Sparkle } from 'lucide-react'
import CustomerDashboardLayout from '../../components/customer/CustomerDashboardLayout'
import person11 from '../../assets/images/person11.jpg'
import restaurantOwnerPhoto from '../../assets/images/restaurant-owner-onpc.jpg'

const filterTabs = [
    { label: 'All', sublabel: 'Everything', icon: LayoutGrid },
    { label: 'Nearby', sublabel: 'Near you', icon: MapPin },
    { label: 'Popular', sublabel: 'Most loved', icon: Flame },
    { label: 'Top Rated', sublabel: 'Best quality', icon: Star },
    { label: 'New', sublabel: 'New places', icon: Sparkles },
    { label: 'Cuisines', sublabel: 'All types', icon: Sparkle },
]

const nearbyRestaurants = [
    { name: 'Green Leaf Bistro', cuisine: 'Italian . Pizza . Pasta', distance: '1.2 km away . Ngoma', price: '$$', time: '30-40 min', rating: '4.8', status: 'Open' },
    { name: 'Bella Cucina', cuisine: 'Italian . European', distance: '2.4 km away . Huye City', price: '$$', time: '25-35 min', rating: '4.6', status: 'Open' },
    { name: 'The Garden House', cuisine: 'Healthy . Vegan . Fusion', distance: '3.1 km away . Tumba', price: '$$', time: '30-45 min', rating: '4.7', status: 'Open' },
    { name: 'Urban Eats', cuisine: 'Burgers . American . Fast Food', distance: '3.8 km away . Rango', price: '$$', time: '15-25 min', rating: '4.9', status: 'Open' },
]

const topRatedRestaurants = [
    { name: 'Fusion Delight', cuisine: 'Fusion . International', distance: '2.6 km away . Campus', rating: '4.9', reviews: '256', status: 'Open' },
    { name: 'Savory Hub', cuisine: 'African . Local . Traditional', distance: '1.7 km away . UR Hospital', rating: '4.8', reviews: '182', status: 'Open' },
    { name: 'Cafe de Luxe', cuisine: 'Coffee . Breakfast . Desserts', distance: '2.9 km away . Kabutare', rating: '4.7', reviews: '142', status: 'Open' },
]

function RestaurantCard({ name, cuisine, distance, price, time, rating }) {
    return (
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
            <div className="relative h-32 w-full bg-gray-200">
                <img src={restaurantOwnerPhoto} alt={name} className="h-full w-full object-cover" />
                <span className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-white px-2 py-1 text-xs font-semibold text-[#111827]">
                    <Star size={11} className="fill-[#D9A441] text-[#D9A441]" /> {rating}
                </span>
                <button className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/90">
                    <Heart size={13} className="text-[#374151]" />
                </button>
            </div>
            <div className="p-3">
                <p className="text-sm font-semibold text-[#111827]">{name}</p>
                <p className="mt-1 text-xs text-[#4B5563]">{cuisine}</p>
                <p className="mt-1 text-xs text-[#9CA3AF]">{distance}</p>
                <div className="mt-2 flex items-center justify-between">
                    <span className="text-xs text-[#4B5563]">{price} . {time}</span>
                    <span className="rounded-full bg-[#E7F0E3] px-2 py-0.5 text-xs font-medium text-[#14532D]">Open</span>
                </div>
            </div>
        </div>
    )
}

function Restaurants() {
    const [activeFilter, setActiveFilter] = useState('All')
    const [search, setSearch] = useState('')

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
                        placeholder="Search restaurants, cuisines, or dishes..."
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
                {filterTabs.map(({ label, sublabel, icon: Icon }) => (
                    <button
                        key={label}
                        onClick={() => setActiveFilter(label)}
                        className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-left ${
                            activeFilter === label
                                ? 'border-[#14532D] bg-[#E7F0E3]'
                                : 'border-gray-200 bg-white'
                        }`}
                    >
                        <Icon size={16} className="text-[#14532D]" />
                        <div>
                            <p className="text-xs font-semibold text-[#111827]">{label}</p>
                            <p className="text-[10px] text-[#9CA3AF]">{sublabel}</p>
                        </div>
                    </button>
                ))}
            </div>

            <div className="mt-8 flex items-center justify-between">
                <h2 className="text-lg font-bold text-[#111827]">People Near you</h2>
                <button className="flex items-center gap-1 text-sm font-medium text-[#14532D]">
                    See all →
                </button>
            </div>
            <div className="mt-4 grid grid-cols-4 gap-4">
                {nearbyRestaurants.map((r, i) => (
                    <RestaurantCard key={i} {...r} />
                ))}
            </div>

            <div className="mt-8 flex items-center justify-between">
                <h2 className="text-lg font-bold text-[#111827]">Top Rated Restaurants</h2>
                <button className="flex items-center gap-1 text-sm font-medium text-[#14532D]">
                    See all →
                </button>
            </div>
            <div className="mt-4 divide-y divide-gray-100 rounded-2xl border border-gray-100 bg-white">
                {topRatedRestaurants.map((r, i) => (
                    <div key={i} className="flex items-center gap-4 p-4">
                        <img src={restaurantOwnerPhoto} alt={r.name} className="h-14 w-14 rounded-lg object-cover" />
                        <div className="flex-1">
                            <p className="text-sm font-semibold text-[#111827]">{r.name}</p>
                            <p className="text-xs text-[#4B5563]">{r.cuisine}</p>
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                            <Star size={13} className="fill-[#D9A441] text-[#D9A441]" />
                            <span className="font-semibold text-[#111827]">{r.rating}</span>
                            <span className="text-xs text-[#9CA3AF]">({r.reviews})</span>
                        </div>
                        <div className="text-right text-xs text-[#4B5563]">
                            {r.distance}
                            <span className="ml-2 rounded-full bg-[#E7F0E3] px-2 py-0.5 font-medium text-[#14532D]">{r.status}</span>
                        </div>
                    </div>
                ))}
            </div>
        </CustomerDashboardLayout>
    )
}

export default Restaurants