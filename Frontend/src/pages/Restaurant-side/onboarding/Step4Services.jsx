import { Check, Utensils, ShoppingBag, Bike, CalendarCheck, ChefHat, ShoppingCart, Info } from 'lucide-react'

const serviceOptions = [
    { id: 'dine-in', icon: Utensils, title: 'Dine In', text: 'Customers can dine in at your restaurant' },
    { id: 'take-away', icon: ShoppingBag, title: 'Take Away', text: 'Customers can order and pick up their food' },
    { id: 'delivery', icon: Bike, title: 'Delivery', text: "Deliver orders to customer's locations" },
    { id: 'table-reservation', icon: CalendarCheck, title: 'Table reservation', text: 'Allow customers to book tables in advance' },
    { id: 'catering', icon: ChefHat, title: 'Catering', text: 'Provide catering services for events and occasions' },
    { id: 'online-ordering', icon: ShoppingCart, title: 'Online Ordering', text: 'Allow customers to place orders online' },
]

function Step4Services({ data, updateData }) {
    const toggleService = (id) => {
        const isSelected = data.services.includes(id)
        updateData({
            services: isSelected
                ? data.services.filter((s) => s !== id)
                : [...data.services, id],
        })
    }

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
                {serviceOptions.map(({ id, icon: Icon, title, text }) => {
                    const isSelected = data.services.includes(id)
                    return (
                        <button
                            key={id}
                            type="button"
                            onClick={() => toggleService(id)}
                            className={`relative rounded-xl border p-4 text-left ${
                                isSelected ? 'border-[#14532D] bg-[#E7F0E3]' : 'border-gray-200 bg-white'
                            }`}
                        >
                            <div
                                className={`absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded ${
                                    isSelected ? 'bg-[#14532D]' : 'border border-gray-300'
                                }`}
                            >
                                {isSelected && <Check size={12} className="text-white" />}
                            </div>
                            <Icon size={20} className="text-[#14532D]" />
                            <h3 className="mt-2 text-sm font-semibold text-[#111827]">{title}</h3>
                            <p className="mt-1 text-xs text-[#4B5563]">{text}</p>
                        </button>
                    )
                })}
            </div>

            <div className="flex items-center gap-2 rounded-lg bg-[#E7F0E3] p-4 text-sm text-[#14532D]">
                <Info size={16} />
                You can manage and customize these services later in Settings
            </div>
        </div>
    )
}

export default Step4Services