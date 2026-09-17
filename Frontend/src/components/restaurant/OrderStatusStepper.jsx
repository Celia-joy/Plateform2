const stages = ['Pending', 'In Progress', 'Ready', 'Completed']

function OrderStatusStepper({ currentStatus }) {
    const currentIndex = stages.indexOf(currentStatus)

    return (
        <div className="flex items-center">
            {stages.map((stage, i) => (
                <div key={stage} className="flex flex-1 items-center last:flex-none">
                    <div
                        className={`h-3 w-3 shrink-0 rounded-full ${
                            i <= currentIndex ? 'bg-[#14532D]' : 'bg-gray-200'
                        }`}
                    />
                    {i < stages.length - 1 && (
                        <div className={`h-0.5 flex-1 ${i < currentIndex ? 'bg-[#14532D]' : 'bg-gray-200'}`} />
                    )}
                </div>
            ))}
        </div>
    )
}

export default OrderStatusStepper