// src/pages/Restaurant-side/Menu.jsx
import { useState } from 'react'
import { Search, Pencil, MoreVertical, Plus, ChevronLeft, ChevronRight } from 'lucide-react'
import RestaurantDashboardLayout from '../../components/restaurant/RestaurantDashboardLayout'
import DishCard from '../../components/restaurant/DishCard'
import grilledChicken from '../../assets/images/grilled-chicken.jpg'
import margheritaPizza from '../../assets/images/margherita-pizza.jpg'
import alfredoPasta from '../../assets/images/alfredo-pasta.jpg'
import caesarSalad from '../../assets/images/caesar-salad.jpg'
import beefBurger from '../../assets/images/beef-burger.jpg'
import ribeyeSteak from '../../assets/images/ribeye-steak.jpg'
import chocolateCake from '../../assets/images/chocolate-cake.jpg'

const dishes = [
    { image: grilledChicken, name: 'Grilled chicken', description: 'Juicy grilled chicken served with seasonal vegetables.', price: '12.00', available: true },
    { image: margheritaPizza, name: 'Margherita Pizza', description: 'Classic pizza with tomato sauce, mozzarella and basil.', price: '10.00', available: true },
    { image: alfredoPasta, name: 'Pasta Alfredo', description: 'Creamy pasta with grilled chicken and parmesan.', price: '11.50', available: true },
    { image: caesarSalad, name: 'Caesar Salad', description: 'Crisp romaine lettuce with parmesan & caesar dressing.', price: '7.00', available: true },
    { image: beefBurger, name: 'Beef burger', description: 'Grilled beef patty with cheese, lettuce, tomato & fries.', price: '9.50', available: true },
    { image: ribeyeSteak, name: 'Ribeye Steak', description: 'Premium ribeye steak served with mashed potato.', price: '18.00', available: true },
    { image: chocolateCake, name: 'Chocolate Cake',description: 'Rich chocolate cake with chocolate ganache.', price: '6.00', available: true },
]

const menuTabs = ['Main Menu', 'Breakfast', 'Drinks', 'Desserts']
const categoryTabs = ['All', 'Starters', 'Main Courses', 'Sides', 'Desserts', 'Drinks']



function Menu() {
    const [activeMenuTab, setActiveMenuTab] = useState('Main Menu')
    const [activeCategory, setActiveCategory] = useState('All')
    const [search, setSearch] = useState('')

    return (
        <RestaurantDashboardLayout
            title="Menu"
            description="Manage your menus, categories, and dishes"
        >
            {/* Search + menu type tabs */}
            <div className="flex items-center gap-4">
                <div className="flex flex-1 items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2.5">
                    <Search size={16} className="text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search dishes or categories..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full text-sm outline-none"
                    />
                </div>

                <div className="flex rounded-lg border border-gray-200 bg-white p-1">
                    {menuTabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveMenuTab(tab)}
                            className={`rounded-md px-4 py-2 text-sm font-medium ${
                                activeMenuTab === tab
                                    ? 'bg-[#14532D] text-white'
                                    : 'text-[#4B5563] hover:bg-gray-50'
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white">
                    <MoreVertical size={16} className="text-[#4B5563]" />
                </button>
            </div>

            {/* Menu content card */}
            <div className="mt-6 rounded-2xl border border-gray-100 bg-white p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-bold text-[#111827]">{activeMenuTab}</h2>
                        <p className="text-sm text-[#4B5563]">Our selection of popular dishes.</p>
                    </div>
                    <button className="flex items-center gap-1.5 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-[#111827]">
                        <Pencil size={14} /> Edit Menu
                    </button>
                </div>

                {/* Category tabs */}
                <div className="mt-4 flex gap-6 border-b border-gray-100">
                    {categoryTabs.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`border-b-2 pb-2 text-sm font-medium ${
                                activeCategory === cat
                                    ? 'border-[#14532D] text-[#14532D]'
                                    : 'border-transparent text-[#4B5563]'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Dish grid */}
                <div className="mt-5 grid grid-cols-4 gap-4">
                    {dishes.map((dish, i) => (
                        <DishCard key={i} {...dish} />
                    ))}

                    <button className="flex h-full min-h-[210px] flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 text-center">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
                            <Plus size={16} className="text-[#4B5563]" />
                        </div>
                        <p className="mt-2 text-sm font-medium text-[#111827]">Add Dish</p>
                        <p className="text-xs text-[#4B5563]">Add a new dish to your menu</p>
                    </button>
                </div>

                {/* Pagination */}
                <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4">
                    <p className="text-xs text-[#4B5563]">Showing 8 of 24 dishes</p>
                    <div className="flex items-center gap-2">
                        <button className="flex h-7 w-7 items-center justify-center rounded-lg border border-gray-200">
                            <ChevronLeft size={14} />
                        </button>
                        <button className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#14532D] text-xs font-semibold text-white">1</button>
                        <button className="flex h-7 w-7 items-center justify-center rounded-lg text-xs font-medium text-[#4B5563]">2</button>
                        <button className="flex h-7 w-7 items-center justify-center rounded-lg text-xs font-medium text-[#4B5563]">3</button>
                        <button className="flex h-7 w-7 items-center justify-center rounded-lg border border-gray-200">
                            <ChevronRight size={14} />
                        </button>
                    </div>
                </div>
            </div>
        </RestaurantDashboardLayout>
    )
}

export default Menu