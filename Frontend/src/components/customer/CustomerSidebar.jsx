import { Link, useLocation } from 'react-router-dom'
import { Home, BookOpen, ShoppingBag, CalendarCheck, Settings, LogOut, ChevronRight } from 'lucide-react'

const navItems = [
    { label: 'Restaurants', icon: Home, path: '/Customer-side/Restaurants' },
    { label: 'Menu', icon: BookOpen, path: '/Customer-side/Menu' },
    { label: 'Orders', icon: ShoppingBag, path: '/Customer-side/Orders' },
    { label: 'Table booking', icon: CalendarCheck, path: '/Customer-side/TableBooking' },
    { label: 'Settings', icon: Settings, path: '/Customer-side/Settings' },
]

function CustomerSidebar({ userPhoto }) {
    const location = useLocation()

    return (
        <aside className="sticky top-0 flex h-screen w-60 flex-col justify-between overflow-y-auto border-r border-gray-100 bg-white p-5">
            <div>
                <div className="flex items-center gap-2 px-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#14532D]">
                        <span className="text-sm font-bold text-white">P</span>
                    </div>
                    <div>
                        <p className="font-heading text-base font-bold leading-none text-[#14532D]">Plateform</p>
                        <p className="text-[10px] font-medium text-[#4B5563]">Good food, great moments.</p>
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
                                        ? 'bg-[#E7F0E3] text-[#14532D]'
                                        : 'text-[#4B5563] hover:bg-gray-50'
                                }`}
                            >
                                <Icon size={18} />
                                {label}
                            </Link>
                        )
                    })}
                </nav>
            </div>

            <div className="space-y-1 border-t border-gray-100 pt-3">
                <button className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left hover:bg-gray-50">
                    <img src={userPhoto} alt="Rick M." className="h-8 w-8 rounded-full object-cover" />
                    <div className="flex-1">
                        <p className="text-sm font-semibold text-[#111827]">Rick M.</p>
                        <p className="text-xs text-[#9CA3AF]">View Profile</p>
                    </div>
                    <ChevronRight size={14} className="text-[#9CA3AF]" />
                </button>

                <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-[#4B5563] hover:bg-gray-50">
                    <LogOut size={16} /> Log out
                </button>
            </div>
        </aside>
    )
}

export default CustomerSidebar