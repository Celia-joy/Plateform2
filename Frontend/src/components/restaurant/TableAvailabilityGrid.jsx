// src/components/restaurant/TableAvailabilityGrid.jsx
const statusStyles = {
    available: 'bg-[#DCFCE7] text-[#166534]',
    booked: 'bg-[#FEF3C7] text-[#92400E]',
    occupied: 'bg-[#14532D] text-white',
    maintenance: 'bg-[#E5E7EB] text-[#6B7280]',
}

function TableGrid({ tables }) {
    return (
        <div className="grid grid-cols-4 gap-2">
            {tables.map((table) => (
                <div
                    key={table.number}
                    className={`flex h-9 items-center justify-center rounded-lg text-sm font-semibold ${statusStyles[table.status]}`}
                >
                    {table.number}
                </div>
            ))}
        </div>
    )
}

function TableAvailabilityGrid({ indoorTables, outdoorTables }) {
    return (
        <div className="space-y-4">
            <div className="flex items-center gap-4 text-xs text-[#4B5563]">
                <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[#22C55E]" /> Available</span>
                <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[#D97706]" /> Booked</span>
                <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[#14532D]" /> Occupied</span>
            </div>

            <div>
                <p className="mb-2 text-xs font-semibold text-[#4B5563]">Indoor Area</p>
                <TableGrid tables={indoorTables} />
            </div>

            <div>
                <p className="mb-2 text-xs font-semibold text-[#4B5563]">Outdoor Area</p>
                <TableGrid tables={outdoorTables} />
            </div>
        </div>
    )
}

export default TableAvailabilityGrid