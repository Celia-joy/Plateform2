function FormInput({ label, icon: Icon, type = 'text', placeholder, rightIcon, onRightIconClick }) {
    return (
        <div>
            <label className="mb-1.5 block text-sm font-semibold text-[#111827]">
                {label}
            </label>
            <div className="flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2.5 focus-within:border-[#14532D]">
                <Icon size={18} className="text-gray-400" />
                <input
                    type={type}
                    placeholder={placeholder}
                    className="w-full text-sm outline-none placeholder:text-gray-400"
                />
                {rightIcon && (
                    <button type="button" onClick={onRightIconClick} className="text-gray-400">
                        {rightIcon}
                    </button>
                )}
            </div>
        </div>
    )
}

export default FormInput