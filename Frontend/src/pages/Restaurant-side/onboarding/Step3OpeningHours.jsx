const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

function Step3OpeningHours({ data, updateData }) {
    const updateDay = (day, fields) => {
        updateData({
            hours: {
                ...data.hours,
                [day]: { ...data.hours[day], ...fields },
            },
        })
    }

    return (
        <div className="space-y-6">
            <div className="space-y-3">
                {days.map((day) => {
                    const dayData = data.hours[day]
                    return (
                        <div key={day} className="flex items-center gap-4">
                            <span className="w-24 text-sm font-medium text-[#111827]">{day}</span>

                            {dayData.isOpen ? (
                                <>
                                    <input
                                        type="time"
                                        value={dayData.open}
                                        onChange={(e) => updateDay(day, { open: e.target.value })}
                                        className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#14532D]"
                                    />
                                    <span className="text-gray-400">—</span>
                                    <input
                                        type="time"
                                        value={dayData.close}
                                        onChange={(e) => updateDay(day, { close: e.target.value })}
                                        className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#14532D]"
                                    />
                                </>
                            ) : (
                                <div className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-400">
                                    Closed
                                </div>
                            )}

                            <label className="ml-auto flex items-center gap-2">
                                <span className={`text-xs font-medium ${dayData.isOpen ? 'text-[#14532D]' : 'text-gray-400'}`}>
                                    {dayData.isOpen ? 'Open' : 'Closed'}
                                </span>
                                <button
                                    type="button"
                                    onClick={() => updateDay(day, { isOpen: !dayData.isOpen })}
                                    className={`h-6 w-11 rounded-full p-0.5 transition-colors ${
                                        dayData.isOpen ? 'bg-[#14532D]' : 'bg-gray-300'
                                    }`}
                                >
                                    <div
                                        className={`h-5 w-5 rounded-full bg-white transition-transform ${
                                            dayData.isOpen ? 'translate-x-5' : 'translate-x-0'
                                        }`}
                                    />
                                </button>
                            </label>
                        </div>
                    )
                })}
            </div>

            <div>
                <h3 className="text-sm font-semibold text-[#111827]">Additional Contact Information</h3>
                <div className="mt-3 grid grid-cols-2 gap-4">
                    <div>
                        <label className="mb-1.5 block text-sm font-semibold text-[#111827]">Phone Number</label>
                        <input
                            type="tel"
                            placeholder="+250 792 771 751"
                            value={data.phone}
                            onChange={(e) => updateData({ phone: e.target.value })}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-[#14532D]"
                        />
                    </div>
                    <div>
                        <label className="mb-1.5 block text-sm font-semibold text-[#111827]">Email</label>
                        <input
                            type="email"
                            placeholder="info@platebistro.com"
                            value={data.email}
                            onChange={(e) => updateData({ email: e.target.value })}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-[#14532D]"
                        />
                    </div>
                </div>
                <div className="mt-4">
                    <label className="mb-1.5 block text-sm font-semibold text-[#111827]">Website (Optional)</label>
                    <input
                        type="text"
                        placeholder="www.platebistro.com"
                        value={data.website}
                        onChange={(e) => updateData({ website: e.target.value })}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-[#14532D]"
                    />
                </div>
            </div>
        </div>
    )
}

export default Step3OpeningHours