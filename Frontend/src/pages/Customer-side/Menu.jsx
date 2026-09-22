import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Search, SlidersHorizontal, Star, MapPin, Clock, ChevronDown, ExternalLink } from 'lucide-react'
import CustomerDashboardLayout from '../../components/customer/CustomerDashboardLayout'
import CustomerDishCard from '../../components/customer/CustomerDishCard'
import person11 from '../../assets/images/person11.jpg'
import restaurantOwnerPhoto from '../../assets/images/restaurant-owner-onpc.jpg'
import grilledChicken from '../../assets/images/grilled-chicken.jpg'
import margheritaPizza from '../../assets/images/margherita-pizza.jpg'
import alfredoPasta from '../../assets/images/alfredo-pasta.jpg'
import caesarSalad from '../../assets/images/caesar-salad.jpg'
import beefBurger from '../../assets/images/beef-burger.jpg'
import ribeyeSteak from '../../assets/images/ribeye-steak.jpg'
import chocolateCake from '../../assets/images/chocolate-cake.jpg'

const categoryTabs = ['All', 'Starters', 'Main Dishes', 'Pasta', 'Pizza', 'Drinks', 'Desserts', 'Salads']

const dishes = [
    { image: grilledChicken, name: 'Grilled chicken', description: 'Juicy grilled chicken served with seasonal vegetables.', price: '12.00' },
    { image: margheritaPizza, name: 'Margherita Pizza', description: 'Classic pizza with tomato sauce, mozzarella & basil', price: '10.00' },
    { image: alfredoPasta, name: 'Pasta Alfredo', description: 'Creamy pasta with grilled chicken and parmesan', price: '11.50' },
    { image: caesarSalad, name: 'Caesar Salad', description: 'Crisp romaine lettuce with parmesan & caesar dressing.', price: '7.00' },
    { image: beefBurger, name: 'Beef burger', description: 'Grilled beef patty with cheese, lettuce, tomato & fries.', price: '9.50' },
    { image: ribeyeSteak, name: 'Ribeye Steak', description: 'Premium ribeye steak served with mashed potato.', price: '18.00' },
    { image: chocolateCake, name: 'Chocolate Cake', description: 'Rich chocolate cake with chocolate ganache.', price: '6.00' },
    { image: chocolateCake, name: 'Tiramisu', description: 'Classic Italian dessert with coffee-soaked ladyfingers', price: '7.00' },
]

function Menu() {
    const [activeCategory, setActiveCategory] = useState('All')
    const [search, setSearch] = useState('')

    return (
        <CustomerDashboardLayout userPhoto={person11}>
            <Link to="/Customer-side/Restaurants" className="flex items-center gap-1.5 text-sm font-medium text-[#374151]">
                <ArrowLeft size={16} /> Back to restaurants
            </Link>

            <div className="mt-4 flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-4">
                <div className="flex items-center gap-4">
                    <img src={restaurantOwnerPhoto} alt="Green Leaf Bistro" className="h-20 w-28 rounded-xl object-cover" />
                    <div>
                        <h1 className="font-heading text-xl font-bold text-[#111827]">Green Leaf Bistro</h1>
                        <div className="mt-1 flex items-center gap-2 text-sm text-[#4B5563]">
                            <span className="flex items-center gap-1">
                                <Star size={13} className="fill-[#D9A441] text-[#D9A441]" /> 4.6 (256 reviews)
                            </span>
                            <span>. Italian . $$</span>
                            <span className="rounded-full bg-[#E7F0E3] px-2 py-0.5 text-xs font-medium text-[#14532D]">Open</span>
                        </div>
                        <div className="mt-1 flex items-center gap-4 text-xs text-[#9CA3AF]">
                            <span className="flex items-center gap-1"><MapPin size={12} /> 1.2 km away . Ngoma</span>
                            <span className="flex items-center gap-1"><Clock size={12} /> Open today: 10:00 AM - 10:00 PM</span>
                        </div>
                    </div>
                </div>
                <button className="flex items-center gap-1.5 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-[#111827]">
                    View Restaurant <ExternalLink size={14} />
                </button>
            </div>

            <div className="mt-6 flex items-center gap-3">
                <div className="flex flex-1 items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2.5">
                    <Search size={16} className="text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search in menu..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full text-sm outline-none"
                    />
                </div>
                <button className="flex items-center gap-1.5 rounded-lg bg-[#14532D] px-4 py-2.5 text-sm font-medium text-white">
                    <SlidersHorizontal size={14} /> Filters
                </button>
            </div>

            <div className="mt-4 flex gap-2">
                {categoryTabs.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`rounded-lg px-3 py-1.5 text-sm font-medium ${
                            activeCategory === cat
                                ? 'bg-[#14532D] text-white'
                                : 'bg-white text-[#4B5563] border border-gray-200'
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <h2 className="mt-6 text-lg font-bold text-[#111827]">Popular Dishes</h2>
            <div className="mt-4 grid grid-cols-4 gap-4">
                {dishes.map((dish, i) => (
                    <CustomerDishCard key={i} {...dish} />
                ))}
            </div>

            <div className="mt-6 flex justify-center">
                <button className="flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-medium text-[#111827]">
                    Load More <ChevronDown size={14} />
                </button>
            </div>
        </CustomerDashboardLayout>
    )
}

export default Menu