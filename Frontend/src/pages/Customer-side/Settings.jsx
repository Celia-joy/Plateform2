// src/pages/Customer-side/Settings.jsx
import { useState } from 'react'
import { Camera, ChevronRight, User, Bell, MapPin, CreditCard, Globe, Shield, Lock, Trash2 } from 'lucide-react'
import CustomerDashboardLayout from '../../components/customer/CustomerDashboardLayout'
import person11 from '../../assets/images/person11.jpg'

function Settings() {
    const [notificationsEnabled, setNotificationsEnabled] = useState(true)
    const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)

    return (
        <CustomerDashboardLayout userPhoto={person11}>
            <h1 className="font-heading text-3xl font-bold text-[#14532D]">Settings</h1>
            <p className="mt-1 text-sm text-[#4B5563]">Manage your account and preferences.</p>

            <div className="mt-6 rounded-2xl border border-gray-100 bg-white p-5">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="font-semibold text-[#111827]">Profile</h2>
                        <p className="text-sm text-[#4B5563]">Update your personal information and profile picture</p>
                    </div>
                    <button className="flex items-center gap-1.5 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-[#111827]">
                        Edit Profile
                    </button>
                </div>

                <div className="mt-4 flex items-center gap-3">
                    <div className="relative h-14 w-14">
                        <img src={person11} alt="M. Rick" className="h-14 w-14 rounded-full object-cover" />
                        <div className="absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-[#14532D]">
                            <Camera size={10} className="text-white" />
                        </div>
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-[#111827]">M. Rick</p>
                        <p className="text-xs text-[#4B5563]">mrick77@gmail.com</p>
                    </div>
                </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-6">
                <div className="rounded-2xl border border-gray-100 bg-white p-5">
                    <h2 className="font-semibold text-[#111827]">Account</h2>
                    <p className="text-sm text-[#4B5563]">Manage your account information</p>

                    <div className="mt-3 divide-y divide-gray-50">
                        {[
                            { icon: User, label: 'Personal Information' },
                            { icon: Bell, label: 'Notifications' },
                            { icon: MapPin, label: 'Saved Address' },
                            { icon: CreditCard, label: 'Payment Methods' },
                        ].map(({ icon: Icon, label }) => (
                            <div key={label} className="flex cursor-not-allowed items-center gap-3 py-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E7F0E3]">
                                    <Icon size={15} className="text-[#14532D]" />
                                </div>
                                <span className="flex-1 text-sm text-[#111827]">{label}</span>
                                <ChevronRight size={16} className="text-gray-300" />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="rounded-2xl border border-gray-100 bg-white p-5">
                        <h2 className="font-semibold text-[#111827]">Preferences</h2>
                        <p className="text-sm text-[#4B5563]">Customize your experience</p>

                        <div className="mt-3 space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E7F0E3]">
                                    <Globe size={15} className="text-[#14532D]" />
                                </div>
                                <span className="flex-1 text-sm text-[#111827]">Language</span>
                                <button className="flex items-center gap-1 text-sm text-[#4B5563]">
                                    English <ChevronRight size={14} />
                                </button>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E7F0E3]">
                                    <Bell size={15} className="text-[#14532D]" />
                                </div>
                                <span className="flex-1 text-sm text-[#111827]">Notifications</span>
                                <button
                                    onClick={() => setNotificationsEnabled((prev) => !prev)}
                                    className={`h-5 w-9 rounded-full p-0.5 ${notificationsEnabled ? 'bg-[#14532D]' : 'bg-gray-300'}`}
                                >
                                    <div className={`h-4 w-4 rounded-full bg-white transition-transform ${notificationsEnabled ? 'translate-x-4' : 'translate-x-0'}`} />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-gray-100 bg-white p-5">
                        <h2 className="font-semibold text-[#111827]">Security</h2>
                        <p className="text-sm text-[#4B5563]">Keep your account safe and secure</p>

                        <div className="mt-3 space-y-3">
                            <div className="flex cursor-not-allowed items-center gap-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E7F0E3]">
                                    <Shield size={15} className="text-[#14532D]" />
                                </div>
                                <span className="flex-1 text-sm text-[#111827]">Change Password</span>
                                <ChevronRight size={16} className="text-gray-300" />
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E7F0E3]">
                                    <Lock size={15} className="text-[#14532D]" />
                                </div>
                                <span className="flex-1 text-sm text-[#111827]">Two-Factor Authentication</span>
                                <button
                                    onClick={() => setTwoFactorEnabled((prev) => !prev)}
                                    className={`h-5 w-9 rounded-full p-0.5 ${twoFactorEnabled ? 'bg-[#14532D]' : 'bg-gray-300'}`}
                                >
                                    <div className={`h-4 w-4 rounded-full bg-white transition-transform ${twoFactorEnabled ? 'translate-x-4' : 'translate-x-0'}`} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-6 flex items-center justify-between rounded-2xl border border-red-100 bg-red-50 p-5">
                <div className="flex items-center gap-3">
                    <Trash2 size={18} className="text-red-600" />
                    <div>
                        <p className="text-sm font-semibold text-red-600">Danger Zone</p>
                        <p className="text-xs text-red-400">Manage your account information</p>
                    </div>
                </div>
                <button className="rounded-lg border border-red-300 px-4 py-2 text-sm font-medium text-red-600">
                    Delete Account
                </button>
            </div>
        </CustomerDashboardLayout>
    )
}

export default Settings