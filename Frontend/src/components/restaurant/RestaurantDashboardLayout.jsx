// src/components/restaurant/RestaurantDashboardLayout.jsx
import { Bell } from 'lucide-react'
import RestaurantSidebar from './RestaurantSidebar'

function RestaurantDashboardLayout({ title, description, children }) {
    return (
        <div className="flex min-h-screen bg-[#FBF3EA]">
            <RestaurantSidebar />

            <div className="flex-1 px-8 py-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="font-heading text-3xl font-bold text-[#14532D]">{title}</h1>
                        <p className="mt-1 text-sm text-[#4B5563]">{description}</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="relative">
                            <Bell size={20} className="text-[#374151]" />
                            <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-[#D9A441]" />
                        </button>
                        <div className="flex items-center gap-2">
                            <div className="h-9 w-9 rounded-full bg-gray-300" />
                            <div>
                                <p className="text-sm font-semibold text-[#111827]">UWASE Ariella</p>
                                <p className="text-xs text-[#4B5563]">Restaurant owner</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-6">{children}</div>
            </div>
        </div>
    )
}

export default RestaurantDashboardLayout