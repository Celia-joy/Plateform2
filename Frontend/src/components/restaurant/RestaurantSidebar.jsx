// src/components/restaurant/RestaurantSidebar.jsx
import { Link, useLocation } from 'react-router-dom'
import { LayoutGrid, BookOpen, Users, ShoppingBag, CalendarCheck, Settings, LogOut, ChevronDown } from 'lucide-react'

const navItems = [
    { label: 'Dashboard', icon: LayoutGrid, path: '/Restaurant-side/Dashboard' },
    { label: 'Menu', icon: BookOpen, path: '/Restaurant-side/Menu' },
    { label: 'Staff', icon: Users, path: '/Restaurant-side/Staff' },
    { label: 'Orders', icon: ShoppingBag, path: '/Restaurant-side/Orders' },
    { label: 'Table booking', icon: CalendarCheck, path: '/Restaurant-side/TableBooking' },
    { label: 'Settings', icon: Settings, path: '/Restaurant-side/Settings' },
]

function RestaurantSidebar() {
    const location = useLocation()

    return (
        <aside className="flex h-screen w-60 flex-col justify-between bg-[#0F3D28] p-5 text-white">
            <div>
                <div className="flex items-center gap-2 px-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
                        <span className="text-sm font-bold">P</span>
                    </div>
                    <div>
                        <p className="font-heading text-base font-bold leading-none">Plateform</p>
                        <p className="text-[10px] font-medium text-[#D9A441]">Restaurant</p>
                    </div>
                </div>

                <nav className="mt-8 space-y-1">
                    {navItems.map(({ label, icon: Icon, path }) => {
                        const isActive = location.pathname === path
                        return (
                            <Link
                                key={path}
                                to={path}
                                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium ${
                                    isActive
                                        ? 'bg-white text-[#14532D]'
                                        : 'text-white/80 hover:bg-white/10'
                                }`}
                            >
                                <Icon size={18} />
                                {label}
                            </Link>
                        )
                    })}
                </nav>
            </div>

            <div className="space-y-3">
                <button className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left hover:bg-white/10">
                    <div className="h-8 w-8 rounded-full bg-gray-300" />
                    <div className="flex-1">
                        <p className="text-sm font-semibold">Green Leaf Bistro</p>
                        <p className="text-xs text-white/60">Restaurant owner</p>
                    </div>
                    <ChevronDown size={16} className="text-white/60" />
                </button>

                <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-white/80 hover:bg-white/10">
                    <LogOut size={16} /> Log out
                </button>
            </div>
        </aside>
    )
}

export default RestaurantSidebar