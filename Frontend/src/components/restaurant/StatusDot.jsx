// src/components/restaurant/StatusDot.jsx
function StatusDot({ status }) {
    const isActive = status === 'Active'
    return (
        <span className={`flex items-center gap-1.5 text-xs font-medium ${isActive ? 'text-[#14532D]' : 'text-[#92400E]'}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${isActive ? 'bg-[#14532D]' : 'bg-[#D97706]'}`} />
            {status}
        </span>
    )
}

export default StatusDot