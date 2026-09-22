// src/components/customer/CustomerTableGrid.jsx
const statusStyles = {
    available: 'bg-[#DCFCE7] text-[#166534] cursor-pointer hover:ring-2 hover:ring-[#14532D]',
    booked: 'bg-[#FEF3C7] text-[#92400E] cursor-not-allowed',
    occupied: 'bg-[#14532D] text-white cursor-not-allowed',
    maintenance: 'bg-[#E5E7EB] text-[#6B7280] cursor-not-allowed',
}

function TableGrid({ tables, area, selectedTable, onSelect }) {
    return (
        <div className="grid grid-cols-4 gap-2">
            {tables.map((table) => {
                const isSelected = selectedTable?.number === table.number && selectedTable?.area === area
                return (
                    <button
                        key={table.number}
                        disabled={table.status !== 'available'}
                        onClick={() => onSelect({ number: table.number, area, status: table.status })}
                        className={`flex h-9 items-center justify-center rounded-lg text-sm font-semibold ${statusStyles[table.status]} ${
                            isSelected ? 'ring-2 ring-[#14532D] ring-offset-1' : ''
                        }`}
                    >
                        {table.number}
                    </button>
                )
            })}
        </div>
    )
}

function CustomerTableGrid({ indoorTables, outdoorTables, selectedTable, onSelect }) {
    return (
        <div className="space-y-4">
            <div className="flex items-center gap-4 text-xs text-[#4B5563]">
                <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[#22C55E]" /> Available</span>
                <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[#D97706]" /> Booked</span>
                <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[#14532D]" /> Occupied</span>
                <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[#9CA3AF]" /> Maintenance</span>
            </div>

            <div>
                <p className="mb-2 text-xs font-semibold text-[#4B5563]">Indoor Area</p>
                <TableGrid tables={indoorTables} area="Indoor" selectedTable={selectedTable} onSelect={onSelect} />
            </div>

            <div>
                <p className="mb-2 text-xs font-semibold text-[#4B5563]">Outdoor Area</p>
                <TableGrid tables={outdoorTables} area="Outdoor" selectedTable={selectedTable} onSelect={onSelect} />
            </div>
        </div>
    )
}

export default CustomerTableGrid