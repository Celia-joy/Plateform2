// src/pages/Restaurant-side/onboarding/Step1RestaurantInfo.jsx
import { Upload } from 'lucide-react'

function Step1RestaurantInfo({ data, updateData }) {
    return (
        <div className="space-y-6">
            <div>
                <label className="mb-1.5 block text-sm font-semibold text-[#111827]">Restaurant Name</label>
                <input
                    type="text"
                    placeholder="e.g. The Green Kitchen"
                    value={data.name}
                    onChange={(e) => updateData({ name: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-[#14532D]"
                />
            </div>

            <div>
                <label className="mb-1.5 block text-sm font-semibold text-[#111827]">Description</label>
                <textarea
                    placeholder="Describe your restaurant..."
                    maxLength={200}
                    rows={4}
                    value={data.description}
                    onChange={(e) => updateData({ description: e.target.value })}
                    className="w-full resize-none rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-[#14532D]"
                />
                <p className="mt-1 text-right text-xs text-gray-400">{data.description.length}/200</p>
            </div>

            <div>
                <label className="mb-1.5 block text-sm font-semibold text-[#111827]">Cuisine Type</label>
                <select
                    value={data.cuisineType}
                    onChange={(e) => updateData({ cuisineType: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-500 outline-none focus:border-[#14532D]"
                >
                    <option value="">Select cuisine type</option>
                    <option value="italian">Italian</option>
                    <option value="rwandan">Rwandan</option>
                    <option value="chinese">Chinese</option>
                    <option value="fast-food">Fast Food</option>
                </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="mb-1.5 block text-sm font-semibold text-[#111827]">Restaurant Logo</label>
                    <label className="flex h-36 cursor-pointer flex-col items-center justify-center rounded-lg border border-gray-300 text-center">
                        <Upload size={20} className="text-gray-400" />
                        <span className="mt-2 text-sm font-medium text-[#111827]">Upload Logo</span>
                        <span className="text-xs text-gray-400">PNG, JPG up to 2MBs</span>
                        <input type="file" accept="image/png, image/jpeg" className="hidden" />
                    </label>
                </div>

                <div>
                    <label className="mb-1.5 block text-sm font-semibold text-[#111827]">Cover image</label>
                    <label className="flex h-36 cursor-pointer flex-col items-center justify-center rounded-lg border border-gray-300 text-center">
                        <Upload size={20} className="text-gray-400" />
                        <span className="mt-2 text-sm font-medium text-[#111827]">Upload Cover Image</span>
                        <span className="text-xs text-gray-400">PNG, JPG up to 2MBs</span>
                        <input type="file" accept="image/png, image/jpeg" className="hidden" />
                    </label>
                </div>
            </div>
        </div>
    )
}

export default Step1RestaurantInfo