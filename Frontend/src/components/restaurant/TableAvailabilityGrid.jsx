const statusStyles = {
    available: 'bg-[#DCFCE7] text-[#166534]',
    booked: 'bg-[#FEF3C7] text-[#92400E]',
    occupied: 'bg-[#14532D] text-white',
    maintenance: 'bg-[#E5E7EB] text-[#6B7280]',
}

function TableGroup({ title, tables, onSelect }) {
    if (tables.length === 0) return null

    return (
        <div>
            <p className="mb-2 text-xs font-semibold text-[#4B5563]">{title}</p>
            <div className="grid grid-cols-4 gap-2">
                {tables.map((table) => (
                    <button
                        key={table._id}
                        onClick={() => onSelect(table)}
                        title={`Table ${table.number} · seats ${table.capacity} · ${table.status}`}
                        className={`flex h-9 items-center justify-center rounded-lg text-sm font-semibold hover:ring-2 hover:ring-[#14532D] ${statusStyles[table.status]}`}
                    >
                        {table.number}
                    </button>
                ))}
            </div>
        </div>
    )
}

function TableAvailabilityGrid({ tables, onSelect }) {
    const sortByNumber = (a, b) => a.number - b.number
    const indoor = tables.filter((t) => t.area === 'Indoor').sort(sortByNumber)
    const outdoor = tables.filter((t) => t.area === 'Outdoor').sort(sortByNumber)

    return (
        <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-4 text-xs text-[#4B5563]">
                <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[#22C55E]" /> Available</span>
                <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[#D97706]" /> Booked</span>
                <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[#14532D]" /> Occupied</span>
                <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[#9CA3AF]" /> Maintenance</span>
            </div>

            <TableGroup title="Indoor Area" tables={indoor} onSelect={onSelect} />
            <TableGroup title="Outdoor Area" tables={outdoor} onSelect={onSelect} />
        </div>
    )
}

export default TableAvailabilityGrid