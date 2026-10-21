import { Bell } from 'lucide-react'
import CustomerSidebar from './CustomerSidebar'
import { useAuth } from '../../context/AuthContext'

function CustomerDashboardLayout({ userPhoto, children }) {
    const { user } = useAuth()

    return (
        <div className="flex min-h-screen bg-[#FBF3EA]">
            <CustomerSidebar userPhoto={userPhoto} />

            <div className="flex-1 px-8 py-6">
                <div className="mb-6 flex items-center justify-end gap-4">
                    <button className="relative">
                        <Bell size={20} className="text-[#374151]" />
                        <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-[#D9A441]" />
                    </button>
                    <div className="flex items-center gap-2">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-200 text-sm font-semibold text-gray-500">
                            {user?.fullName?.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-sm font-semibold text-[#111827]">{user?.fullName}</span>
                    </div>
                </div>

                {children}
            </div>
        </div>
    )
}

export default CustomerDashboardLayout