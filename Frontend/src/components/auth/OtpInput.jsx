// src/components/auth/OtpInput.jsx
import { useRef } from 'react'

function OtpInput({ length = 6, value, onChange }) {
    const inputRefs = useRef([])

    const handleChange = (index, digit) => {
        if (digit && !/^[0-9]$/.test(digit)) return

        const newValue = value.split('')
        newValue[index] = digit
        onChange(newValue.join(''))

        if (digit && index < length - 1) {
            inputRefs.current[index + 1]?.focus()
        }
    }

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !value[index] && index > 0) {
            inputRefs.current[index - 1]?.focus()
        }
    }

    return (
        <div className="flex gap-3">
            {Array.from({ length }).map((_, index) => (
                <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={value[index] || ''}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="h-14 w-14 rounded-lg border border-gray-300 text-center text-xl font-bold text-[#14532D] outline-none focus:border-[#14532D]"
                />
            ))}
        </div>
    )
}

export default OtpInput