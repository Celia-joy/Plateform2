// src/pages/Restaurant-side/Settings.jsx
import { useState } from 'react'
import { Camera } from 'lucide-react'
import RestaurantDashboardLayout from '../../components/restaurant/RestaurantDashboardLayout'
import SettingsNav from '../../components/restaurant/SettingsNav'

const daysDefault = [
    { day: 'Monday', open: '08:00', close: '22:00', isOpen: true },
    { day: 'Tuesday', open: '08:00', close: '22:00', isOpen: true },
    { day: 'Wednesday', open: '08:00', close: '22:00', isOpen: true },
    { day: 'Thursday', open: '08:00', close: '22:00', isOpen: true },
    { day: 'Friday', open: '08:00', close: '22:00', isOpen: true },
    { day: 'Saturday', open: '10:00', close: '02:00', isOpen: true },
    { day: 'Sunday', open: '10:00', close: '02:00', isOpen: true },
]

function Settings() {
    const [activeTab, setActiveTab] = useState('general')
    const [logoPreview, setLogoPreview] = useState(null)
    const [formData, setFormData] = useState({
        name: 'Green Leaf Bistro',
        cuisineType: 'italian',
        phone: '+250 784 567 896',
        email: 'hello@greenleafbistro.com',
        website: 'www.greenleafbistro.com',
        currency: 'USD',
        address: '123 Green Street, Downtown, Kigali, NY 10001, Rwanda',
        hours: daysDefault,
        timezone: 'UTC-5:00 Eastern Time (US & Canada)',
    })

    const updateData = (fields) => {
        setFormData((prev) => ({ ...prev, ...fields }))
    }

    const updateDay = (day, fields) => {
        const newHours = formData.hours.map((d) => (d.day === day ? { ...d, ...fields } : d))
        updateData({ hours: newHours })
    }

    const handleLogoChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setLogoPreview(URL.createObjectURL(file))
        }
    }

    return (
        <RestaurantDashboardLayout
            title="Settings"
            description="Manage your restaurant settings and preferences"
        >
            <div className="mb-4 flex justify-end">
                <button className="rounded-lg bg-[#14532D] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0F4224]">
                    Save changes
                </button>
            </div>

            <div className="flex gap-6">
                <SettingsNav activeTab={activeTab} onSelect={setActiveTab} />

                <div className="flex-1 rounded-2xl border border-gray-100 bg-white p-6">
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-lg font-bold text-[#111827]">General Information</h2>
                            <p className="text-sm text-[#4B5563]">Update your restaurant's basic information</p>

                            <div className="mt-4 flex items-center gap-4">
                                <div className="relative h-16 w-16 shrink-0">
                                    <div className="h-16 w-16 overflow-hidden rounded-full bg-gray-200">
                                        {logoPreview && <img src={logoPreview} alt="Logo preview" className="h-full w-full object-cover" />}
                                    </div>
                                    <label className="absolute -right-1 -bottom-1 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border border-gray-300 bg-white">
                                        <Camera size={12} className="text-[#14532D]" />
                                        <input type="file" accept="image/*" onChange={handleLogoChange} className="hidden" />
                                    </label>
                                </div>
                            </div>

                            <div className="mt-5 grid grid-cols-3 gap-4">
                                <div>
                                    <label className="mb-1.5 block text-sm font-semibold text-[#111827]">Restaurant Name</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => updateData({ name: e.target.value })}
                                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-[#14532D]"
                                    />
                                </div>
                                <div>
                                    <label className="mb-1.5 block text-sm font-semibold text-[#111827]">Cuisine Type</label>
                                    <select
                                        value={formData.cuisineType}
                                        onChange={(e) => updateData({ cuisineType: e.target.value })}
                                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-[#14532D]"
                                    >
                                        <option value="italian">Italian</option>
                                        <option value="rwandan">Rwandan</option>
                                        <option value="chinese">Chinese</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="mb-1.5 block text-sm font-semibold text-[#111827]">Phone Number</label>
                                    <input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => updateData({ phone: e.target.value })}
                                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-[#14532D]"
                                    />
                                </div>
                            </div>

                            <div className="mt-4 grid grid-cols-3 gap-4">
                                <div>
                                    <label className="mb-1.5 block text-sm font-semibold text-[#111827]">Email Address</label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => updateData({ email: e.target.value })}
                                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-[#14532D]"
                                    />
                                </div>
                                <div>
                                    <label className="mb-1.5 block text-sm font-semibold text-[#111827]">Website</label>
                                    <input
                                        type="text"
                                        value={formData.website}
                                        onChange={(e) => updateData({ website: e.target.value })}
                                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-[#14532D]"
                                    />
                                </div>
                                <div>
                                    <label className="mb-1.5 block text-sm font-semibold text-[#111827]">Currency</label>
                                    <select
                                        value={formData.currency}
                                        onChange={(e) => updateData({ currency: e.target.value })}
                                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-[#14532D]"
                                    >
                                        <option value="USD">USD $</option>
                                        <option value="RWF">RWF</option>
                                    </select>
                                </div>
                            </div>

                            <div className="mt-4">
                                <label className="mb-1.5 block text-sm font-semibold text-[#111827]">Restaurant Address</label>
                                <input
                                    type="text"
                                    value={formData.address}
                                    onChange={(e) => updateData({ address: e.target.value })}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-[#14532D]"
                                />
                            </div>
                        </div>

                        <div className="border-t border-gray-100 pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-lg font-bold text-[#111827]">Business Hours</h2>
                                    <p className="text-sm text-[#4B5563]">Set your restaurant's operating hours</p>
                                </div>
                                <button className="flex items-center gap-1.5 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-[#111827]">
                                    + Add Special Hours
                                </button>
                            </div>

                            <div className="mt-4 grid grid-cols-2 gap-x-8 gap-y-3">
                                {formData.hours.map((d) => (
                                    <div key={d.day} className="flex items-center gap-3">
                                        <span className="w-20 text-sm text-[#374151]">{d.day}</span>
                                        <input
                                            type="time"
                                            value={d.open}
                                            onChange={(e) => updateDay(d.day, { open: e.target.value })}
                                            className="rounded-lg border border-gray-300 px-2 py-1.5 text-xs outline-none"
                                        />
                                        <span className="text-gray-400">—</span>
                                        <input
                                            type="time"
                                            value={d.close}
                                            onChange={(e) => updateDay(d.day, { close: e.target.value })}
                                            className="rounded-lg border border-gray-300 px-2 py-1.5 text-xs outline-none"
                                        />
                                        <button
                                            onClick={() => updateDay(d.day, { isOpen: !d.isOpen })}
                                            className={`ml-auto h-5 w-9 rounded-full p-0.5 ${d.isOpen ? 'bg-[#14532D]' : 'bg-gray-300'}`}
                                        >
                                            <div className={`h-4 w-4 rounded-full bg-white transition-transform ${d.isOpen ? 'translate-x-4' : 'translate-x-0'}`} />
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-5">
                                <label className="mb-1.5 block text-sm font-semibold text-[#111827]">Time zone</label>
                                <p className="mb-1.5 text-xs text-[#9CA3AF]">Set your restaurant's time zone</p>
                                <select
                                    value={formData.timezone}
                                    onChange={(e) => updateData({ timezone: e.target.value })}
                                    className="w-full max-w-sm rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-[#14532D]"
                                >
                                    <option>UTC-5:00 Eastern Time (US &amp; Canada)</option>
                                    <option>UTC+2:00 Central Africa Time</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </RestaurantDashboardLayout>
    )
}

export default Settings