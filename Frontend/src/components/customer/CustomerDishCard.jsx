import { Plus, Minus } from 'lucide-react'

function CustomerDishCard({ image, name, description, price, quantity, onAdd, onIncrease, onDecrease }) {
    return (
        <div className="overflow-hidden rounded-xl border border-gray-100 bg-white">
            <div className="h-32 w-full bg-gray-200">
                {image && <img src={image} alt={name} className="h-full w-full object-cover" />}
            </div>
            <div className="p-3">
                <p className="text-sm font-semibold text-[#111827]">{name}</p>
                <p className="mt-1 line-clamp-2 text-xs text-[#4B5563]">{description}</p>
                <div className="mt-2 flex items-center justify-between">
                    <span className="text-sm font-bold text-[#111827]">${Number(price).toFixed(2)}</span>

                    {quantity === 0 ? (
                        <button
                            onClick={onAdd}
                            className="flex items-center gap-1 rounded-lg bg-[#14532D] px-3 py-1.5 text-xs font-semibold text-white"
                        >
                            <Plus size={12} /> Add
                        </button>
                    ) : (
                        <div className="flex items-center gap-2 rounded-lg bg-[#14532D] px-2 py-1">
                            <button onClick={onDecrease} className="text-white"><Minus size={12} /></button>
                            <span className="text-xs font-semibold text-white">{quantity}</span>
                            <button onClick={onIncrease} className="text-white"><Plus size={12} /></button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default CustomerDishCard