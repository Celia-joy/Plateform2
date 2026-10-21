import { X } from 'lucide-react'

function Modal({ isOpen, onClose, title, children }) {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl bg-white p-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold text-[#111827]">{title}</h2>
                    <button onClick={onClose}>
                        <X size={18} className="text-gray-400" />
                    </button>
                </div>
                <div className="mt-4">{children}</div>
            </div>
        </div>
    )
}

export default Modal