// src/components/restaurant/StatCard.jsx
import { TrendingUp } from 'lucide-react'

function StatCard({ icon: Icon, label, value, change, sparklineColor = '#14532D' }) {
    return (
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
            <div className="flex items-center gap-2 text-sm text-[#4B5563]">
                <Icon size={16} className="text-[#14532D]" />
                {label}
            </div>
            <p className="font-heading mt-2 text-2xl font-bold text-[#111827]">{value}</p>
            {change && (
                <p className="mt-1 flex items-center gap-1 text-xs font-medium text-[#14532D]">
                    <TrendingUp size={12} /> {change} vs yesterday
                </p>
            )}
        </div>
    )
}

export default StatCard