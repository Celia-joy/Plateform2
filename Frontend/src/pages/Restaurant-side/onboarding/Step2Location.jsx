import { MapPin } from 'lucide-react'

function Step2Location({ data, updateData }) {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="mb-1.5 block text-sm font-semibold text-[#111827]">Country</label>
                    <select
                        value={data.country}
                        onChange={(e) => updateData({ country: e.target.value })}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-500 outline-none focus:border-[#14532D]"
                    >
                        <option value="">Select country</option>
                        <option value="rwanda">Rwanda</option>
                        <option value="kenya">Kenya</option>
                        <option value="uganda">Uganda</option>
                    </select>
                </div>

                <div>
                    <label className="mb-1.5 block text-sm font-semibold text-[#111827]">City</label>
                    <select
                        value={data.city}
                        onChange={(e) => updateData({ city: e.target.value })}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-500 outline-none focus:border-[#14532D]"
                    >
                        <option value="">Select city</option>
                        <option value="kigali">Kigali</option>
                        <option value="huye">Huye</option>
                        <option value="musanze">Musanze</option>
                    </select>
                </div>
            </div>

            <div>
                <label className="mb-1.5 block text-sm font-semibold text-[#111827]">Address</label>
                <input
                    type="text"
                    placeholder="Enter full address"
                    value={data.address}
                    onChange={(e) => updateData({ address: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-[#14532D]"
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="mb-1.5 block text-sm font-semibold text-[#111827]">Zip/Postal code</label>
                    <input
                        type="text"
                        placeholder="Enter zip code"
                        value={data.zipCode}
                        onChange={(e) => updateData({ zipCode: e.target.value })}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-[#14532D]"
                    />
                </div>

                <div>
                    <label className="mb-1.5 block text-sm font-semibold text-[#111827]">Google Map Location</label>
                    <div className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5">
                        <input
                            type="text"
                            placeholder="Search your location"
                            value={data.mapSearch}
                            onChange={(e) => updateData({ mapSearch: e.target.value })}
                            className="w-full text-sm outline-none"
                        />
                        <MapPin size={16} className="text-gray-400" />
                    </div>
                </div>
            </div>

            {/* Map placeholder — real map integration is a separate future step */}
            <div className="flex h-48 items-center justify-center rounded-lg bg-[#E5E7EB] text-sm text-gray-400">
                Map preview will appear here
            </div>
        </div>
    )
}

export default Step2Location