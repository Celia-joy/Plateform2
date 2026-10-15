import { useState } from 'react'
import RestaurantDashboardLayout from '../../components/restaurant/RestaurantDashboardLayout'
import SettingsNav from '../../components/restaurant/SettingsNav'
import { useRestaurant } from '../../context/RestaurantContext'
import { updateMyRestaurant } from '../../services/restaurantService'
import { cuisineTypes } from '../../constants/cuisineTypes'

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

const currencies = [
    { value: 'USD', label: 'USD $' },
    { value: 'RWF', label: 'RWF' },
]

const timezones = [
    { value: 'Africa/Kigali', label: 'Kigali (UTC+2)' },
    { value: 'Africa/Nairobi', label: 'Nairobi (UTC+3)' },
    { value: 'Africa/Kampala', label: 'Kampala (UTC+3)' },
    { value: 'UTC', label: 'UTC' },
]

const inputClass =
    'w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-[#14532D]'

// Always gives 7 days in order, filling any missing day with sensible defaults
const buildHours = (saved = []) =>
    days.map((day) => {
        const found = saved.find((h) => h.day === day)
        return found
            ? { day, open: found.open, close: found.close, isOpen: found.isOpen }
            : { day, open: '08:00', close: '22:00', isOpen: true }
    })

function SettingsContent({ restaurant }) {
    const { setRestaurant } = useRestaurant()

    const [activeTab, setActiveTab] = useState('general')
    const [isSaving, setIsSaving] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')

    // Start the form from the saved restaurant
    const [form, setForm] = useState({
        name: restaurant.name || '',
        cuisineType: restaurant.cuisineType || '',
        phone: restaurant.phone || '',
        email: restaurant.email || '',
        website: restaurant.website || '',
        currency: restaurant.currency || 'USD',
        address: restaurant.address || '',
        city: restaurant.city || '',
        timezone: restaurant.timezone || 'Africa/Kigali',
        hours: buildHours(restaurant.hours),
    })

    const updateForm = (field, value) => {
        setForm((prev) => ({ ...prev, [field]: value }))
    }

    const updateDay = (day, fields) => {
        setForm((prev) => ({
            ...prev,
            hours: prev.hours.map((h) => (h.day === day ? { ...h, ...fields } : h)),
        }))
    }

    const handleSave = async () => {
        setErrorMessage('')
        setSuccessMessage('')

        if (!form.name.trim()) {
            setErrorMessage('Restaurant name is required')
            return
        }

        setIsSaving(true)
        try {
            const response = await updateMyRestaurant({
                name: form.name.trim(),
                cuisineType: form.cuisineType,
                phone: form.phone.trim(),
                email: form.email.trim(),
                website: form.website.trim(),
                currency: form.currency,
                address: form.address.trim(),
                // Stored lowercase because the restaurant search filters on lowercase city names
                city: form.city.trim().toLowerCase(),
                timezone: form.timezone,
                hours: form.hours,
            })

            setRestaurant(response.data)
            setSuccessMessage('Your settings have been saved.')
        }
        catch (error) {
            setErrorMessage(error.message)
        }
        finally {
            setIsSaving(false)
        }
    }

    // If the saved cuisine isn't one of our standard options, still show it
    const cuisineOptions = cuisineTypes.some((c) => c.value === form.cuisineType) || !form.cuisineType
        ? cuisineTypes
        : [...cuisineTypes, { value: form.cuisineType, label: form.cuisineType }]

    return (
        <>
            <div className="mb-4 flex items-center justify-between">
                <div className="flex-1">
                    {errorMessage && (
                        <div className="max-w-xl rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-600">{errorMessage}</div>
                    )}
                    {successMessage && (
                        <div className="max-w-xl rounded-lg bg-[#E7F0E3] px-4 py-2.5 text-sm text-[#14532D]">{successMessage}</div>
                    )}
                </div>
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="rounded-lg bg-[#14532D] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0F4224] disabled:opacity-60"
                >
                    {isSaving ? 'Saving...' : 'Save changes'}
                </button>
            </div>

            <div className="flex gap-6">
                <SettingsNav activeTab={activeTab} onSelect={setActiveTab} />

                <div className="flex-1 rounded-2xl border border-gray-100 bg-white p-6">
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-lg font-bold text-[#111827]">General Information</h2>
                            <p className="text-sm text-[#4B5563]">Update your restaurant's basic information</p>

                            <div className="mt-5 grid grid-cols-3 gap-4">
                                <div>
                                    <label className="mb-1.5 block text-sm font-semibold text-[#111827]">Restaurant Name</label>
                                    <input
                                        type="text"
                                        value={form.name}
                                        onChange={(e) => updateForm('name', e.target.value)}
                                        className={inputClass}
                                    />
                                </div>
                                <div>
                                    <label className="mb-1.5 block text-sm font-semibold text-[#111827]">Cuisine Type</label>
                                    <select
                                        value={form.cuisineType}
                                        onChange={(e) => updateForm('cuisineType', e.target.value)}
                                        className={inputClass}
                                    >
                                        <option value="">Select cuisine type</option>
                                        {cuisineOptions.map((cuisine) => (
                                            <option key={cuisine.value} value={cuisine.value}>{cuisine.label}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="mb-1.5 block text-sm font-semibold text-[#111827]">Phone Number</label>
                                    <input
                                        type="tel"
                                        value={form.phone}
                                        onChange={(e) => updateForm('phone', e.target.value)}
                                        className={inputClass}
                                    />
                                </div>
                            </div>

                            <div className="mt-4 grid grid-cols-3 gap-4">
                                <div>
                                    <label className="mb-1.5 block text-sm font-semibold text-[#111827]">Email Address</label>
                                    <input
                                        type="email"
                                        value={form.email}
                                        onChange={(e) => updateForm('email', e.target.value)}
                                        className={inputClass}
                                    />
                                </div>
                                <div>
                                    <label className="mb-1.5 block text-sm font-semibold text-[#111827]">Website</label>
                                    <input
                                        type="text"
                                        value={form.website}
                                        onChange={(e) => updateForm('website', e.target.value)}
                                        className={inputClass}
                                    />
                                </div>
                                <div>
                                    <label className="mb-1.5 block text-sm font-semibold text-[#111827]">Currency</label>
                                    <select
                                        value={form.currency}
                                        onChange={(e) => updateForm('currency', e.target.value)}
                                        className={inputClass}
                                    >
                                        {currencies.map((currency) => (
                                            <option key={currency.value} value={currency.value}>{currency.label}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="mt-4 grid grid-cols-3 gap-4">
                                <div className="col-span-2">
                                    <label className="mb-1.5 block text-sm font-semibold text-[#111827]">Restaurant Address</label>
                                    <input
                                        type="text"
                                        value={form.address}
                                        onChange={(e) => updateForm('address', e.target.value)}
                                        className={inputClass}
                                    />
                                </div>
                                <div>
                                    <label className="mb-1.5 block text-sm font-semibold text-[#111827]">City</label>
                                    <input
                                        type="text"
                                        value={form.city}
                                        onChange={(e) => updateForm('city', e.target.value)}
                                        className={inputClass}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-gray-100 pt-6">
                            <h2 className="text-lg font-bold text-[#111827]">Business Hours</h2>
                            <p className="text-sm text-[#4B5563]">Set your restaurant's operating hours</p>

                            <div className="mt-4 grid grid-cols-2 gap-x-8 gap-y-3">
                                {form.hours.map((d) => (
                                    <div key={d.day} className="flex items-center gap-3">
                                        <span className="w-20 text-sm text-[#374151]">{d.day}</span>
                                        <input
                                            type="time"
                                            value={d.open}
                                            disabled={!d.isOpen}
                                            onChange={(e) => updateDay(d.day, { open: e.target.value })}
                                            className="rounded-lg border border-gray-300 px-2 py-1.5 text-xs outline-none disabled:bg-gray-50 disabled:text-gray-400"
                                        />
                                        <span className="text-gray-400">—</span>
                                        <input
                                            type="time"
                                            value={d.close}
                                            disabled={!d.isOpen}
                                            onChange={(e) => updateDay(d.day, { close: e.target.value })}
                                            className="rounded-lg border border-gray-300 px-2 py-1.5 text-xs outline-none disabled:bg-gray-50 disabled:text-gray-400"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => updateDay(d.day, { isOpen: !d.isOpen })}
                                            title={d.isOpen ? 'Open' : 'Closed'}
                                            className={`ml-auto h-5 w-9 rounded-full p-0.5 ${d.isOpen ? 'bg-[#14532D]' : 'bg-gray-300'}`}
                                        >
                                            <div className={`h-4 w-4 rounded-full bg-white transition-transform ${d.isOpen ? 'translate-x-4' : 'translate-x-0'}`} />
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-5 max-w-sm">
                                <label className="mb-1.5 block text-sm font-semibold text-[#111827]">Time zone</label>
                                <select
                                    value={form.timezone}
                                    onChange={(e) => updateForm('timezone', e.target.value)}
                                    className={inputClass}
                                >
                                    {timezones.map((tz) => (
                                        <option key={tz.value} value={tz.value}>{tz.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function Settings() {
    const { restaurant } = useRestaurant()

    return (
        <RestaurantDashboardLayout
            title="Settings"
            description="Manage your restaurant settings and preferences"
        >
            {/* key makes the form start fresh if a different restaurant ever loads */}
            {restaurant && <SettingsContent key={restaurant._id} restaurant={restaurant} />}
        </RestaurantDashboardLayout>
    )
}

export default Settings