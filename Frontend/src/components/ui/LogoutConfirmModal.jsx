// src/components/ui/LogoutConfirmModal.jsx
import { LogOut } from 'lucide-react'

function LogoutConfirmModal({ isOpen, onCancel, onConfirm }) {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="w-full max-w-sm rounded-2xl bg-white p-8 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
                    <LogOut size={26} className="text-red-500" />
                </div>

                <h2 className="font-heading mt-4 text-xl font-bold text-[#111827]">
                    Log out of Plateform?
                </h2>
                <p className="mt-2 text-sm text-[#4B5563]">
                    You'll be logged out of your account. You can log back in anytime.
                </p>

                <div className="mt-6 flex gap-3">
                    <button
                        onClick={onCancel}
                        className="flex-1 rounded-lg border border-gray-300 py-2.5 text-sm font-semibold text-[#111827]"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-red-500 py-2.5 text-sm font-semibold text-white hover:bg-red-600"
                    >
                        <LogOut size={14} /> Log Out
                    </button>
                </div>
            </div>
        </div>
    )
}

export default LogoutConfirmModal