import { Upload, Plus, Store } from 'lucide-react'

function Step5FirstMenu({ data, updateData }) {
    const updateItem = (index, fields) => {
        const newItems = [...data.menuItems]
        newItems[index] = { ...newItems[index], ...fields }
        updateData({ menuItems: newItems })
    }

    const addItem = () => {
        updateData({
            menuItems: [...data.menuItems, { category: '', itemName: '', price: '', description: '' }],
        })
    }

    return (
        <div className="space-y-8">
            {data.menuItems.map((item, index) => (
                <div key={index} className="space-y-4 border-b border-gray-100 pb-6 last:border-none">
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label className="mb-1.5 block text-sm font-semibold text-[#111827]">Category</label>
                            <select
                                value={item.category}
                                onChange={(e) => updateItem(index, { category: e.target.value })}
                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-500 outline-none focus:border-[#14532D]"
                            >
                                <option value="">Select category</option>
                                <option value="main">Main Course</option>
                                <option value="starter">Starter</option>
                                <option value="drink">Drink</option>
                            </select>
                        </div>
                        <div>
                            <label className="mb-1.5 block text-sm font-semibold text-[#111827]">Item Name</label>
                            <input
                                type="text"
                                placeholder="e.g. Grilled Chicken"
                                value={item.itemName}
                                onChange={(e) => updateItem(index, { itemName: e.target.value })}
                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-[#14532D]"
                            />
                        </div>
                        <div>
                            <label className="mb-1.5 block text-sm font-semibold text-[#111827]">Price (RWF)</label>
                            <input
                                type="number"
                                placeholder="0.00"
                                value={item.price}
                                onChange={(e) => updateItem(index, { price: e.target.value })}
                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-[#14532D]"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="mb-1.5 block text-sm font-semibold text-[#111827]">Description</label>
                        <textarea
                            placeholder="Describe your dish..."
                            maxLength={200}
                            rows={3}
                            value={item.description}
                            onChange={(e) => updateItem(index, { description: e.target.value })}
                            className="w-full resize-none rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-[#14532D]"
                        />
                        <p className="mt-1 text-right text-xs text-gray-400">{item.description.length}/200</p>
                    </div>

                    <div>
                        <label className="mb-1.5 block text-sm font-semibold text-[#111827]">Feed Image (Optional)</label>
                        <label className="flex h-32 w-full max-w-xs cursor-pointer flex-col items-center justify-center rounded-lg border border-gray-300">
                            <Upload size={20} className="text-gray-400" />
                            <span className="mt-2 text-sm font-medium text-[#111827]">Upload Image</span>
                            <span className="text-xs text-gray-400">PNG, JPG up to 2MBs</span>
                            <input type="file" accept="image/png, image/jpeg" className="hidden" />
                        </label>
                    </div>
                </div>
            ))}

            <button
                type="button"
                onClick={addItem}
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-[#14532D] py-2.5 text-sm font-semibold text-[#14532D] hover:bg-[#E7F0E3]"
            >
                <Plus size={16} /> Add Another Item
            </button>
        </div>
    )
}

export function OnboardingSuccessPanel() {
    return (
        <div className="flex h-full flex-col items-center justify-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#E7F0E3]">
                <Store size={28} className="text-[#14532D]" />
            </div>
            <h2 className="font-heading mt-4 text-2xl font-bold text-[#14532D]">
                Your restaurant is ready!
            </h2>
            <p className="mt-2 text-sm text-[#4B5563]">
                You've completed all setup steps. You can always update your details later in Settings.
            </p>
        </div>
    )
}

export default Step5FirstMenu