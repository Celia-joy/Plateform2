import { useState, useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { Calendar, Clock, Users, MapPin, User, Mail, FileText, ArrowRight, ArrowLeft } from 'lucide-react'
import CustomerDashboardLayout from '../../components/customer/CustomerDashboardLayout'
import CustomerTableGrid from '../../components/customer/CustomerTableGrid'
import { useAuth } from '../../context/AuthContext'
import { useCart } from '../../context/CartContext'
import { getRestaurantById } from '../../services/restaurantService'
import { getTablesByRestaurant } from '../../services/tableService'
import { createBooking, getMyBookings, updateBookingStatus } from '../../services/bookingService'
import person11 from '../../assets/images/person11.jpg'

const capitalize = (text) => (text ? text.charAt(0).toUpperCase() + text.slice(1) : '')

const bookingStatusStyles = {
    Pending: 'bg-[#FEF3C7] text-[#92400E]',
    Confirmed: 'bg-[#E7F0E3] text-[#14532D]',
    Completed: 'bg-[#DBEAFE] text-[#1E40AF]',
    Cancelled: 'bg-[#FEE2E2] text-[#991B1B]',
}

// Today's date as YYYY-MM-DD in the user's own timezone
const getToday = () => new Date().toLocaleDateString('en-CA')

function TableBooking() {
    const { restaurantId } = useParams()
    const { user } = useAuth()
    const { cart } = useCart()

    const [restaurant, setRestaurant] = useState(null)
    const [tables, setTables] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState('')

    const [areaFilter, setAreaFilter] = useState('all')
    const [selectedTable, setSelectedTable] = useState(null)
    const [date, setDate] = useState(getToday())
    const [time, setTime] = useState('19:00')
    const [guests, setGuests] = useState(2)
    const [specialRequests, setSpecialRequests] = useState('')

    const [isBooking, setIsBooking] = useState(false)
    const [bookError, setBookError] = useState('')
    const [successMessage, setSuccessMessage] = useState('')

    const [myBookings, setMyBookings] = useState([])
    const [bookingsLoading, setBookingsLoading] = useState(true)
    const [bookingsError, setBookingsError] = useState('')
    const [bookingsVersion, setBookingsVersion] = useState(0)

    // Load the restaurant and its tables together
    useEffect(() => {
        if (!restaurantId) return

        let cancelled = false

        const load = async () => {
            setIsLoading(true)
            setErrorMessage('')
            try {
                const [restaurantResponse, tablesResponse] = await Promise.all([
                    getRestaurantById(restaurantId),
                    getTablesByRestaurant(restaurantId),
                ])
                if (!cancelled) {
                    setRestaurant(restaurantResponse.data)
                    setTables(tablesResponse.data)
                }
            }
            catch (error) {
                if (!cancelled) setErrorMessage(error.message)
            }
            finally {
                if (!cancelled) setIsLoading(false)
            }
        }

        load()
        return () => { cancelled = true }
    }, [restaurantId])

    // Load this customer's bookings (reloads when bookingsVersion changes)
    useEffect(() => {
        let cancelled = false

        const loadBookings = async () => {
            setBookingsLoading(true)
            setBookingsError('')
            try {
                const response = await getMyBookings()
                if (!cancelled) setMyBookings(response.data)
            }
            catch (error) {
                if (!cancelled) setBookingsError(error.message)
            }
            finally {
                if (!cancelled) setBookingsLoading(false)
            }
        }

        loadBookings()
        return () => { cancelled = true }
    }, [bookingsVersion])

    // Opened from the sidebar without choosing a restaurant first
    if (!restaurantId) {
        if (cart.restaurantId) {
            return <Navigate to={`/Customer-side/TableBooking/${cart.restaurantId}`} replace />
        }
        return (
            <CustomerDashboardLayout userPhoto={person11}>
                <div className="mt-10 text-center">
                    <p className="text-sm text-[#4B5563]">Pick a restaurant first to book a table.</p>
                    <Link
                        to="/Customer-side/Restaurants"
                        className="mt-4 inline-block rounded-lg bg-[#14532D] px-5 py-2.5 text-sm font-semibold text-white"
                    >
                        Browse restaurants
                    </Link>
                </div>
            </CustomerDashboardLayout>
        )
    }

    const hasTables = tables.length > 0
    const canConfirm = !hasTables || selectedTable !== null

    const handleConfirmBooking = async () => {
        setBookError('')
        setSuccessMessage('')

        if (!date || !time) {
            setBookError('Please choose a date and time')
            return
        }
        if (date < getToday()) {
            setBookError('You cannot book a date in the past')
            return
        }
        if (selectedTable && guests > selectedTable.capacity) {
            setBookError(`Table ${selectedTable.number} seats up to ${selectedTable.capacity} guests. Choose a larger table or fewer guests.`)
            return
        }

        setIsBooking(true)
        try {
            await createBooking({
                restaurantId,
                table: selectedTable?._id,
                date,
                time,
                guests,
                specialRequests: specialRequests.trim() || undefined,
            })

            setSelectedTable(null)
            setSpecialRequests('')
            setSuccessMessage('Your booking request has been sent. The restaurant will confirm it.')
            setBookingsVersion((v) => v + 1)
        }
        catch (error) {
            setBookError(error.message)
        }
        finally {
            setIsBooking(false)
        }
    }

    const handleCancelBooking = async (bookingId) => {
        if (!window.confirm('Cancel this booking?')) return

        try {
            await updateBookingStatus(bookingId, 'Cancelled')
            setBookingsVersion((v) => v + 1)
        }
        catch (error) {
            setBookingsError(error.message)
        }
    }

    return (
        <CustomerDashboardLayout userPhoto={person11}>
            <Link
                to={`/Customer-side/Menu/${restaurantId}`}
                className="flex items-center gap-1.5 text-sm font-medium text-[#374151]"
            >
                <ArrowLeft size={16} /> Back to menu
            </Link>

            <h1 className="font-heading mt-3 text-3xl font-bold text-[#14532D]">Table Booking</h1>
            <p className="mt-1 text-sm text-[#4B5563]">Reserve your table and enjoy a wonderful dining experience.</p>

            {errorMessage && (
                <div className="mt-4 rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-600">{errorMessage}</div>
            )}
            {successMessage && (
                <div className="mt-4 rounded-lg bg-[#E7F0E3] px-4 py-2.5 text-sm text-[#14532D]">{successMessage}</div>
            )}

            {isLoading && <p className="mt-6 text-sm text-[#9CA3AF]">Loading...</p>}

            {restaurant && (
                <div className="mt-6 grid grid-cols-3 gap-6">
                    <div className="col-span-2 space-y-6">
                        <div className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-4">
                            <div className="flex h-16 w-20 items-center justify-center rounded-xl bg-gray-200">
                                {restaurant.coverImageUrl ? (
                                    <img src={restaurant.coverImageUrl} alt={restaurant.name} className="h-full w-full rounded-xl object-cover" />
                                ) : (
                                    <span className="font-heading text-2xl font-bold text-gray-400">
                                        {restaurant.name.charAt(0).toUpperCase()}
                                    </span>
                                )}
                            </div>
                            <div>
                                <h2 className="font-heading text-lg font-bold text-[#111827]">{restaurant.name}</h2>
                                <p className="text-xs text-[#4B5563]">{capitalize(restaurant.cuisineType) || 'Restaurant'}</p>
                                <p className="mt-1 flex items-center gap-1 text-xs text-[#9CA3AF]">
                                    <MapPin size={11} />
                                    {[restaurant.address, capitalize(restaurant.city)].filter(Boolean).join(', ') || 'Location not set'}
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
                                        min={getToday()}
                                        onChange={(e) => setDate(e.target.value)}
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#14532D]"
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
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#14532D]"
                                    />
                                </div>
                                <div>
                                    <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-[#111827]">
                                        <Users size={13} /> Guests
                                    </label>
                                    <select
                                        value={guests}
                                        onChange={(e) => setGuests(Number(e.target.value))}
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#14532D]"
                                    >
                                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                                            <option key={n} value={n}>{n} Guest{n > 1 ? 's' : ''}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-gray-100 bg-white p-5">
                            <div className="flex items-center justify-between">
                                <h2 className="font-semibold text-[#111827]">Table Availability</h2>
                                <select
                                    value={areaFilter}
                                    onChange={(e) => setAreaFilter(e.target.value)}
                                    className="rounded-lg border border-gray-200 px-2.5 py-1 text-xs outline-none"
                                >
                                    <option value="all">All areas</option>
                                    <option value="Indoor">Indoor</option>
                                    <option value="Outdoor">Outdoor</option>
                                </select>
                            </div>

                            <div className="mt-4">
                                {hasTables ? (
                                    <CustomerTableGrid
                                        tables={tables}
                                        areaFilter={areaFilter}
                                        selectedTableId={selectedTable?._id}
                                        onSelect={setSelectedTable}
                                    />
                                ) : (
                                    <p className="text-sm text-[#9CA3AF]">
                                        This restaurant hasn't set up its tables yet. You can still send a booking
                                        request and the restaurant will assign you a table.
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* My bookings */}
                        <div className="rounded-2xl border border-gray-100 bg-white p-5">
                            <h2 className="font-semibold text-[#111827]">My bookings</h2>

                            {bookingsError && (
                                <div className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{bookingsError}</div>
                            )}

                            {bookingsLoading ? (
                                <p className="mt-4 text-sm text-[#9CA3AF]">Loading bookings...</p>
                            ) : myBookings.length === 0 ? (
                                <p className="mt-4 text-sm text-[#9CA3AF]">You haven't made any bookings yet.</p>
                            ) : (
                                <div className="mt-4 divide-y divide-gray-100">
                                    {myBookings.map((booking) => (
                                        <div key={booking._id} className="flex items-center gap-3 py-3">
                                            <div className="flex-1">
                                                <p className="text-sm font-semibold text-[#111827]">
                                                    {booking.restaurant?.name || 'Restaurant'}
                                                </p>
                                                <p className="mt-0.5 text-xs text-[#4B5563]">
                                                    {booking.date} at {booking.time} · {booking.guests} guest{booking.guests > 1 ? 's' : ''}
                                                    {booking.table && ` · Table ${booking.table.number} (${booking.table.area})`}
                                                </p>
                                            </div>
                                            <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${bookingStatusStyles[booking.status]}`}>
                                                {booking.status}
                                            </span>
                                            {(booking.status === 'Pending' || booking.status === 'Confirmed') && (
                                                <button
                                                    onClick={() => handleCancelBooking(booking._id)}
                                                    className="rounded-lg border border-red-300 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50"
                                                >
                                                    Cancel
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Reservation summary */}
                    <div className="h-fit rounded-2xl border border-gray-100 bg-white p-5">
                        <h2 className="font-semibold text-[#111827]">Reservation Summary</h2>

                        <div className="mt-3 rounded-xl bg-[#E7F0E3] p-4 text-center">
                            {selectedTable ? (
                                <>
                                    <p className="font-heading text-lg font-bold text-[#14532D]">Table {selectedTable.number}</p>
                                    <p className="text-xs text-[#4B5563]">
                                        {selectedTable.area} Area · seats {selectedTable.capacity}
                                    </p>
                                </>
                            ) : hasTables ? (
                                <>
                                    <p className="text-sm font-semibold text-[#14532D]">No table selected</p>
                                    <p className="text-xs text-[#4B5563]">Select an available table to continue.</p>
                                </>
                            ) : (
                                <>
                                    <p className="text-sm font-semibold text-[#14532D]">Table assigned by the restaurant</p>
                                    <p className="text-xs text-[#4B5563]">No tables are listed for this restaurant yet.</p>
                                </>
                            )}
                        </div>

                        <div className="mt-4 space-y-2 border-t border-gray-100 pt-4 text-sm">
                            <div className="flex justify-between"><span className="text-[#4B5563]">Date</span><span className="font-medium text-[#111827]">{date}</span></div>
                            <div className="flex justify-between"><span className="text-[#4B5563]">Time</span><span className="font-medium text-[#111827]">{time}</span></div>
                            <div className="flex justify-between"><span className="text-[#4B5563]">Guests</span><span className="font-medium text-[#111827]">{guests}</span></div>
                        </div>

                        <div className="mt-4 border-t border-gray-100 pt-4">
                            <h3 className="text-xs font-semibold uppercase text-[#9CA3AF]">Guest Information</h3>
                            <p className="mt-2 flex items-center gap-2 text-sm text-[#111827]"><User size={14} /> {user?.fullName}</p>
                            <p className="mt-1 flex items-center gap-2 text-sm text-[#111827]"><Mail size={14} /> {user?.email}</p>
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
                                className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#14532D]"
                            />
                        </div>

                        {bookError && (
                            <div className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{bookError}</div>
                        )}

                        <button
                            onClick={handleConfirmBooking}
                            disabled={!canConfirm || isBooking}
                            className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-[#14532D] py-2.5 text-sm font-semibold text-white disabled:opacity-40"
                        >
                            {isBooking ? 'Sending...' : 'Confirm Booking'} {!isBooking && <ArrowRight size={14} />}
                        </button>
                    </div>
                </div>
            )}
        </CustomerDashboardLayout>
    )
}

export default TableBooking