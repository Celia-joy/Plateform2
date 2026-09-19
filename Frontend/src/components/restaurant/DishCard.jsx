// src/components/restaurant/DishCard.jsx
import { Pencil } from 'lucide-react'

function DishCard({ image, name, description, price, available }) {
    return (
        <div className="rounded-xl border border-gray-100 bg-white p-3">
            <div className="relative h-32 w-full overflow-hidden rounded-lg bg-gray-200">
                <img src={image} alt={name} className="h-full w-full object-cover" />
                <button className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/90">
                    <Pencil size={13} className="text-[#374151]" />
                </button>
            </div>
            <h3 className="mt-3 text-sm font-semibold text-[#111827]">{name}</h3>
            <p className="mt-1 text-xs text-[#4B5563]">{description}</p>
            <div className="mt-2 flex items-center justify-between">
                <span className="text-sm font-bold text-[#111827]">${price}</span>
                {available && (
                    <span className="flex items-center gap-1 text-xs font-medium text-[#14532D]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#14532D]" /> Available
                    </span>
                )}
            </div>
        </div>
    )
}

export default DishCard