// src/pages/Customer-side/TableBooking.jsx
import { useState } from 'react'
import { Calendar, Clock, Users, MapPin, ChevronDown, User, Phone, FileText, ArrowRight, ClipboardCheck } from 'lucide-react'
import CustomerDashboardLayout from '../../components/customer/CustomerDashboardLayout'
import CustomerTableGrid from '../../components/customer/CustomerTableGrid'
import person11 from '../../assets/images/person11.jpg'
import restaurantOwnerPhoto from '../../assets/images/restaurant-owner-onpc.jpg'

const indoorTables = [
    { number: 1, status: 'available' }, { number: 2, status: 'available' },
    { number: 3, status: 'occupied' }, { number: 4, status: 'occupied' },
    { number: 5, status: 'booked' }, { number: 6, status: 'booked' },
    { number: 7, status: 'occupied' }, { number: 8, status: 'maintenance' },
]

const outdoorTables = [
    { number: 1, status: 'booked' }, { number: 2, status: 'booked' },
    { number: 3, status: 'occupied' }, { number: 4, status: 'maintenance' },
    { number: 5, status: 'occupied' }, { number: 6, status: 'occupied' },
    { number: 7, status: 'booked' }, { number: 8, status: 'occupied' },
]

function TableBooking() {
    const [selectedTable, setSelectedTable] = useState(null)
    const [date, setDate] = useState('2026-05-20')
    const [time, setTime] = useState('12:00')
    const [guests, setGuests] = useState(2)
    const [specialRequests, setSpecialRequests] = useState('')

    return (
        <CustomerDashboardLayout userPhoto={person11}>
            <h1 className="font-heading text-3xl font-bold text-[#14532D]">Table Booking</h1>
            <p className="mt-1 text-sm text-[#4B5563]">Reserve your table and enjoy a wonderful dining experience.</p>

            <div className="mt-6 grid grid-cols-3 gap-6">
                <div className="col-span-2 space-y-6">
                    <div className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-4">
                        <img src={restaurantOwnerPhoto} alt="Green Leaf Bistro" className="h-16 w-20 rounded-xl object-cover" />
                        <div>
                            <h2 className="font-heading text-lg font-bold text-[#111827]">Green Leaf Bistro</h2>
                            <p className="text-xs text-[#4B5563]">4.6 (256 reviews) . Italian . $$ . <span className="text-[#14532D]">Open</span></p>
                            <p className="mt-1 flex items-center gap-1 text-xs text-[#9CA3AF]">
                                <MapPin size={11} /> 1.2 km away . Ngoma . Open today: 10:00 AM - 10:00 PM
                            </p>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-gray-100 bg-white p-4">
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-[#111827]">
                                    <Calendar size={13} /> Date
                                </label>
                                <input
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none"
                                />
                            </div>
                            <div>
                                <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-[#111827]">
                                    <Clock size={13} /> Time
                                </label>
                                <input
                                    type="time"
                                    value={time}
                                    onChange={(e) => setTime(e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none"
                                />
                            </div>
                            <div>
                                <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-[#111827]">
                                    <Users size={13} /> Guests
                                </label>
                                <select
                                    value={guests}
                                    onChange={(e) => setGuests(Number(e.target.value))}
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none"
                                >
                                    {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                                        <option key={n} value={n}>{n} Guest{n > 1 ? 's' : ''}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-gray-100 bg-white p-5">
                        <div className="flex items-center justify-between">
                            <h2 className="font-semibold text-[#111827]">Table Availability</h2>
                            <button className="flex items-center gap-1 rounded-lg border border-gray-200 px-2.5 py-1 text-xs">
                                All areas <ChevronDown size={12} />
                            </button>
                        </div>
                        <div className="mt-4">
                            <CustomerTableGrid
                                indoorTables={indoorTables}
                                outdoorTables={outdoorTables}
                                selectedTable={selectedTable}
                                onSelect={setSelectedTable}
                            />
                        </div>
                    </div>
                </div>

                <div className="rounded-2xl border border-gray-100 bg-white p-5">
                    <h2 className="font-semibold text-[#111827]">Reservation Summary</h2>

                    <div className="mt-3 rounded-xl bg-[#E7F0E3] p-4 text-center">
                        {selectedTable ? (
                            <>
                                <p className="font-heading text-lg font-bold text-[#14532D]">Table {selectedTable.number}</p>
                                <p className="text-xs text-[#4B5563]">{selectedTable.area} Area</p>
                            </>
                        ) : (
                            <>
                                <p className="text-sm font-semibold text-[#14532D]">No table selected</p>
                                <p className="text-xs text-[#4B5563]">Select an available table to continue.</p>
                            </>
                        )}
                    </div>

                    <div className="mt-4 space-y-2 border-t border-gray-100 pt-4 text-sm">
                        <div className="flex justify-between"><span className="text-[#4B5563]">Date</span><span className="font-medium text-[#111827]">{date}</span></div>
                        <div className="flex justify-between"><span className="text-[#4B5563]">Time</span><span className="font-medium text-[#111827]">{time}</span></div>
                        <div className="flex justify-between"><span className="text-[#4B5563]">Guests</span><span className="font-medium text-[#111827]">{guests} Guests</span></div>
                    </div>

                    <div className="mt-4 border-t border-gray-100 pt-4">
                        <h3 className="text-xs font-semibold uppercase text-[#9CA3AF]">Guest Information</h3>
                        <p className="mt-2 flex items-center gap-2 text-sm text-[#111827]"><User size={14} /> M. Rick</p>
                        <p className="mt-1 flex items-center gap-2 text-sm text-[#111827]"><Phone size={14} /> +250 728 504 253</p>
                    </div>

                    <div className="mt-4 border-t border-gray-100 pt-4">
                        <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-[#111827]">
                            <FileText size={13} /> Special Requests (Optional)
                        </label>
                        <textarea
                            placeholder="Any special requests for the restaurant?"
                            value={specialRequests}
                            onChange={(e) => setSpecialRequests(e.target.value)}
                            rows={3}
                            className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none"
                        />
                    </div>

                    <button
                        disabled={!selectedTable}
                        className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-[#14532D] py-2.5 text-sm font-semibold text-white disabled:opacity-40"
                    >
                        Confirm Booking <ArrowRight size={14} />
                    </button>
                    <p className="mt-2 flex items-center justify-center gap-1 text-center text-xs text-[#9CA3AF]">
                        <ClipboardCheck size={12} /> Free cancellation up to 2 hours before booking
                    </p>
                </div>
            </div>
        </CustomerDashboardLayout>
    )
}

export default TableBooking