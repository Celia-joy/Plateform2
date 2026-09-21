import { Bell } from 'lucide-react'
import CustomerSidebar from './CustomerSidebar'

function CustomerDashboardLayout({ userPhoto, children }) {
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
                        <img src={userPhoto} alt="Rick M." className="h-9 w-9 rounded-full object-cover" />
                        <span className="text-sm font-semibold text-[#111827]">Rick M.</span>
                    </div>
                </div>

                {children}
            </div>
        </div>
    )
}

export default CustomerDashboardLayout