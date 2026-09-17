// src/components/restaurant/RoleBadge.jsx
const roleStyles = {
    Manager: 'bg-[#E7F0E3] text-[#14532D]',
    Waitress: 'bg-[#FEF3C7] text-[#92400E]',
    Chef: 'bg-[#DBEAFE] text-[#1E40AF]',
    Bartender: 'bg-[#F3E8FF] text-[#6B21A8]',
}

function RoleBadge({ role }) {
    return (
        <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${roleStyles[role] || 'bg-gray-100 text-gray-600'}`}>
            {role}
        </span>
    )
}

export default RoleBadge