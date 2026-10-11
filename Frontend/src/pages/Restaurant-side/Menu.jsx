import { useState, useEffect } from 'react'
import { Search, Pencil, MoreVertical, Plus } from 'lucide-react'
import RestaurantDashboardLayout from '../../components/restaurant/RestaurantDashboardLayout'
import DishCard from '../../components/restaurant/DishCard'
import Modal from '../../components/ui/Modal'
import { useRestaurant } from '../../context/RestaurantContext'
import { menuCategories } from '../../constants/menuCategories'
import { getMenuItems, createMenuItem, updateMenuItem, deleteMenuItem } from '../../services/menuItemService'

const menuTabs = ['Main Menu', 'Breakfast', 'Drinks', 'Desserts']

const emptyForm = { name: '', category: 'main', price: '', description: '', available: true }

function Menu() {
    const { restaurant } = useRestaurant()

    const [dishes, setDishes] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [pageError, setPageError] = useState('')

    const [activeCategory, setActiveCategory] = useState('all')
    const [search, setSearch] = useState('')

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingId, setEditingId] = useState(null)
    const [form, setForm] = useState(emptyForm)
    const [modalError, setModalError] = useState('')
    const [isSaving, setIsSaving] = useState(false)

    // Load this restaurant's dishes once we know which restaurant it is
    useEffect(() => {
        if (!restaurant) return

        const loadDishes = async () => {
            setIsLoading(true)
            setPageError('')
            try {
                const response = await getMenuItems(restaurant._id)
                setDishes(response.data)
            }
            catch (error) {
                setPageError(error.message)
            }
            finally {
                setIsLoading(false)
            }
        }

        loadDishes()
    }, [restaurant])

    const filteredDishes = dishes.filter((dish) => {
        const matchesCategory = activeCategory === 'all' || dish.category === activeCategory
        const matchesSearch = dish.name.toLowerCase().includes(search.trim().toLowerCase())
        return matchesCategory && matchesSearch
    })

    const updateForm = (field, value) => {
        setForm((prev) => ({ ...prev, [field]: value }))
    }

    const openAddModal = () => {
        setEditingId(null)
        setForm(emptyForm)
        setModalError('')
        setIsModalOpen(true)
    }

    const openEditModal = (dish) => {
        setEditingId(dish._id)
        setForm({
            name: dish.name,
            category: dish.category || 'main',
            price: String(dish.price),
            description: dish.description || '',
            available: dish.available,
        })
        setModalError('')
        setIsModalOpen(true)
    }

    const handleSave = async () => {
        setModalError('')

        if (!form.name.trim()) {
            setModalError('Dish name is required')
            return
        }
        if (form.price === '' || Number(form.price) <= 0) {
            setModalError('Price must be greater than 0')
            return
        }

        const fields = {
            name: form.name.trim(),
            category: form.category,
            price: Number(form.price),
            description: form.description,
            available: form.available,
        }

        setIsSaving(true)
        try {
            if (editingId) {
                const response = await updateMenuItem(editingId, fields)
                setDishes((prev) => prev.map((d) => (d._id === editingId ? response.data : d)))
            } else {
                const response = await createMenuItem({ ...fields, restaurantId: restaurant._id })
                setDishes((prev) => [...prev, response.data])
            }
            setIsModalOpen(false)
        }
        catch (error) {
            setModalError(error.message)
        }
        finally {
            setIsSaving(false)
        }
    }

    const handleDelete = async () => {
        if (!window.confirm('Delete this dish? This cannot be undone.')) return

        setIsSaving(true)
        try {
            await deleteMenuItem(editingId)
            setDishes((prev) => prev.filter((d) => d._id !== editingId))
            setIsModalOpen(false)
        }
        catch (error) {
            setModalError(error.message)
        }
        finally {
            setIsSaving(false)
        }
    }

    return (
        <RestaurantDashboardLayout
            title="Menu"
            description="Manage your menus, categories, and dishes"
        >
            {/* Search + menu type tabs */}
            <div className="flex items-center gap-4">
                <div className="flex flex-1 items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2.5">
                    <Search size={16} className="text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search dishes..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full text-sm outline-none"
                    />
                </div>

                <div className="flex rounded-lg border border-gray-200 bg-white p-1">
                    {menuTabs.map((tab, index) => (
                        <div
                            key={tab}
                            className={`rounded-md px-4 py-2 text-sm font-medium ${
                                index === 0
                                    ? 'bg-[#14532D] text-white'
                                    : 'cursor-not-allowed text-[#9CA3AF] opacity-60'
                            }`}
                        >
                            {tab}
                        </div>
                    ))}
                </div>

                <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white">
                    <MoreVertical size={16} className="text-[#4B5563]" />
                </button>
            </div>

            {pageError && (
                <div className="mt-4 rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-600">
                    {pageError}
                </div>
            )}

            {/* Menu content card */}
            <div className="mt-6 rounded-2xl border border-gray-100 bg-white p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-bold text-[#111827]">Main Menu</h2>
                        <p className="text-sm text-[#4B5563]">Our selection of popular dishes.</p>
                    </div>
                    <button className="flex items-center gap-1.5 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-[#111827]">
                        <Pencil size={14} /> Edit Menu
                    </button>
                </div>

                {/* Category tabs */}
                <div className="mt-4 flex gap-6 border-b border-gray-100">
                    {[{ value: 'all', label: 'All' }, ...menuCategories].map((cat) => (
                        <button
                            key={cat.value}
                            onClick={() => setActiveCategory(cat.value)}
                            className={`border-b-2 pb-2 text-sm font-medium ${
                                activeCategory === cat.value
                                    ? 'border-[#14532D] text-[#14532D]'
                                    : 'border-transparent text-[#4B5563]'
                            }`}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                {isLoading ? (
                    <p className="mt-6 text-sm text-[#9CA3AF]">Loading dishes...</p>
                ) : (
                    <div className="mt-5 grid grid-cols-4 gap-4">
                        {filteredDishes.map((dish) => (
                            <DishCard
                                key={dish._id}
                                image={dish.imageUrl}
                                name={dish.name}
                                description={dish.description}
                                price={dish.price}
                                available={dish.available}
                                onEdit={() => openEditModal(dish)}
                            />
                        ))}

                        <button
                            onClick={openAddModal}
                            className="flex h-full min-h-[210px] flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 text-center"
                        >
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
                                <Plus size={16} className="text-[#4B5563]" />
                            </div>
                            <p className="mt-2 text-sm font-medium text-[#111827]">Add Dish</p>
                            <p className="text-xs text-[#4B5563]">Add a new dish to your menu</p>
                        </button>
                    </div>
                )}

                {!isLoading && filteredDishes.length === 0 && (
                    <p className="mt-4 text-sm text-[#9CA3AF]">
                        {dishes.length === 0
                            ? 'No dishes yet. Add your first one.'
                            : 'No dishes match this filter.'}
                    </p>
                )}

                <div className="mt-6 border-t border-gray-100 pt-4">
                    <p className="text-xs text-[#4B5563]">
                        Showing {filteredDishes.length} of {dishes.length} dishes
                    </p>
                </div>
            </div>

            {/* Add / Edit dish modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingId ? 'Edit Dish' : 'Add Dish'}
            >
                <div className="space-y-4">
                    {modalError && (
                        <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
                            {modalError}
                        </div>
                    )}

                    <div>
                        <label className="mb-1.5 block text-sm font-semibold text-[#111827]">Dish name</label>
                        <input
                            type="text"
                            value={form.name}
                            onChange={(e) => updateForm('name', e.target.value)}
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#14532D]"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="mb-1.5 block text-sm font-semibold text-[#111827]">Category</label>
                            <select
                                value={form.category}
                                onChange={(e) => updateForm('category', e.target.value)}
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#14532D]"
                            >
                                {menuCategories.map((cat) => (
                                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="mb-1.5 block text-sm font-semibold text-[#111827]">Price</label>
                            <input
                                type="number"
                                min="0"
                                step="0.01"
                                value={form.price}
                                onChange={(e) => updateForm('price', e.target.value)}
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#14532D]"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="mb-1.5 block text-sm font-semibold text-[#111827]">Description</label>
                        <textarea
                            rows={3}
                            maxLength={200}
                            value={form.description}
                            onChange={(e) => updateForm('description', e.target.value)}
                            className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#14532D]"
                        />
                    </div>

                    <label className="flex items-center gap-2 text-sm text-[#374151]">
                        <input
                            type="checkbox"
                            checked={form.available}
                            onChange={(e) => updateForm('available', e.target.checked)}
                            className="h-4 w-4 accent-[#14532D]"
                        />
                        Available to order
                    </label>

                    <div className="flex gap-3 pt-2">
                        {editingId && (
                            <button
                                onClick={handleDelete}
                                disabled={isSaving}
                                className="rounded-lg border border-red-300 px-4 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 disabled:opacity-60"
                            >
                                Delete
                            </button>
                        )}
                        <button
                            onClick={handleSave}
                            disabled={isSaving}
                            className="flex-1 rounded-lg bg-[#14532D] py-2.5 text-sm font-semibold text-white hover:bg-[#0F4224] disabled:opacity-60"
                        >
                            {isSaving ? 'Saving...' : 'Save'}
                        </button>
                    </div>
                </div>
            </Modal>
        </RestaurantDashboardLayout>
    )
}

export default Menu