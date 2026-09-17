// src/components/restaurant/PendingRequestCard.jsx
import { Check, X, Users } from 'lucide-react'

function PendingRequestCard({ name, phone, time, guests, timeAgo, onAccept, onReject }) {
    return (
        <div className="rounded-xl border border-gray-100 p-3">
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-gray-200" />
                    <div>
                        <p className="text-sm font-medium text-[#111827]">{name}</p>
                        <p className="text-xs text-[#4B5563]">{phone}</p>
                    </div>
                </div>
                <span className="text-xs text-[#9CA3AF]">{timeAgo}</span>
            </div>

            <div className="mt-2 flex items-center gap-3 text-xs text-[#4B5563]">
                <span>{time}</span>
                <span className="flex items-center gap-1"><Users size={12} /> {guests}</span>
            </div>

            <div className="mt-3 flex gap-2">
                <button
                    onClick={onAccept}
                    className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#14532D] text-white"
                >
                    <Check size={14} />
                </button>
                <button
                    onClick={onReject}
                    className="flex h-7 w-7 items-center justify-center rounded-lg border border-gray-200 text-[#991B1B]"
                >
                    <X size={14} />
                </button>
            </div>
        </div>
    )
}

export default PendingRequestCard