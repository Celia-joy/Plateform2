// src/components/restaurant/SettingsNav.jsx
import { Settings, Store, Clock, Bell, CreditCard, Receipt, Users, Shield, Plug, Trash2 } from 'lucide-react'

const settingsTabs = [
    { id: 'general', label: 'General', sublabel: 'Basic information', icon: Settings, enabled: true },
    { id: 'profile', label: 'Restaurant Profile', sublabel: 'Manage your restaurant details', icon: Store, enabled: false },
    { id: 'hours', label: 'Business Hours', sublabel: 'Set your opening hours', icon: Clock, enabled: false },
    { id: 'notifications', label: 'Notification', sublabel: 'Manage notifications preferences', icon: Bell, enabled: false },
    { id: 'payments', label: 'Payment Methods', sublabel: 'Manage payment options', icon: CreditCard, enabled: false },
    { id: 'tax', label: 'Tax & Charges', sublabel: 'Manage taxes and fees', icon: Receipt, enabled: false },
    { id: 'users', label: 'Users & Permissions', sublabel: 'Manage access and roles', icon: Users, enabled: false },
    { id: 'security', label: 'Security', sublabel: 'Password and security settings', icon: Shield, enabled: false },
    { id: 'integration', label: 'Integration', sublabel: 'Third-party integrations', icon: Plug, enabled: false },
]

function SettingsNav({ activeTab, onSelect }) {
    return (
        <div className="w-64 shrink-0 rounded-2xl border border-gray-100 bg-white p-3">
            <nav className="space-y-1">
                {settingsTabs.map(({ id, label, sublabel, icon: Icon, enabled }) => {
                    const isActive = activeTab === id

                    if (!enabled) {
                        return (
                            <div
                                key={id}
                                className="flex w-full cursor-not-allowed items-start gap-3 rounded-lg px-3 py-2.5 text-left opacity-40"
                            >
                                <Icon size={16} className="mt-0.5 text-[#9CA3AF]" />
                                <div>
                                    <p className="text-sm font-medium text-[#9CA3AF]">{label}</p>
                                    <p className="text-xs text-[#D1D5DB]">Unavailable</p>
                                </div>
                            </div>
                        )
                    }

                    return (
                        <button
                            key={id}
                            onClick={() => onSelect(id)}
                            className={`flex w-full items-start gap-3 rounded-lg px-3 py-2.5 text-left ${
                                isActive ? 'bg-[#E7F0E3]' : 'hover:bg-gray-50'
                            }`}
                        >
                            <Icon size={16} className={isActive ? 'mt-0.5 text-[#14532D]' : 'mt-0.5 text-[#4B5563]'} />
                            <div>
                                <p className={`text-sm font-medium ${isActive ? 'text-[#14532D]' : 'text-[#111827]'}`}>
                                    {label}
                                </p>
                                <p className="text-xs text-[#9CA3AF]">{sublabel}</p>
                            </div>
                        </button>
                    )
                })}
            </nav>

            <div className="mt-4 border-t border-gray-100 pt-3">
                <button className="flex w-full items-start gap-3 rounded-lg px-3 py-2.5 text-left hover:bg-red-50">
                    <Trash2 size={16} className="mt-0.5 text-red-600" />
                    <div>
                        <p className="text-sm font-medium text-red-600">Danger Zone</p>
                        <p className="text-xs text-red-400">Delete restaurant account</p>
                    </div>
                </button>
            </div>
        </div>
    )
}

export default SettingsNav