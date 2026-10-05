import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Globe, Lock, Mail, ArrowRight, ArrowLeft, Store, Users, Eye, EyeOff } from 'lucide-react'
import AuthLayout from '../../../components/auth/AuthLayout'
import FormInput from '../../../components/ui/FormInput'
import OtpInput from '../../../components/auth/OtpInput'
import { forgotPassword, resetPassword } from '../../../services/authService'

function LanguageSelector() {
    return (
        <div className="flex items-center gap-1.5 text-sm text-[#374151]">
            <Globe size={16} />
            English
        </div>
    )
}

function ResetPassword() {
    const navigate = useNavigate()
    const [step, setStep] = useState('request')
    const [email, setEmail] = useState('')
    const [code, setCode] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [infoMessage, setInfoMessage] = useState('')

    const handleRequestCode = async (e) => {
        e.preventDefault()
        setErrorMessage('')
        setIsSubmitting(true)

        try {
            await forgotPassword(email)
            setStep('reset')
            setInfoMessage('A reset code has been sent to your email')
        }
        catch (error) {
            setErrorMessage(error.message)
        }
        finally {
            setIsSubmitting(false)
        }
    }

    const handleResetPassword = async (e) => {
        e.preventDefault()
        setErrorMessage('')
        setInfoMessage('')

        if (newPassword !== confirmPassword) {
            setErrorMessage('Passwords do not match')
            return
        }

        setIsSubmitting(true)
        try {
            await resetPassword(email, code, newPassword)
            navigate('/Customer-side/Login')
        }
        catch (error) {
            setErrorMessage(error.message)
        }
        finally {
            setIsSubmitting(false)
        }
    }

    return (
        <AuthLayout
            image={null}
            heading="Discover. Dine."
            highlight="Delight."
            description="Login to access your dashboard and manage your business effortlessly"
            stats={[
                { icon: Store, value: '2500+', label: 'Restaurants on Plateform' },
                { icon: Users, value: '50,000+', label: 'Happy customers served daily' },
            ]}
            testimonial={{
                quote: 'Plateform makes it so easy to discover amazing restaurants and book a table in just a few taps. I love it!',
                name: 'MPANO Curie',
                role: 'Food lover',
            }}
            navRight={<LanguageSelector />}
        >
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[#E7F0E3] px-4 py-2 text-sm font-semibold text-[#14532D]">
                <Lock size={16} />
                Reset password
            </span>

            <h2 className="font-heading mt-6 text-3xl font-bold text-[#14532D]">
                Reset your password
            </h2>
            <p className="mt-2 text-sm text-[#4B5563]">
                {step === 'request'
                    ? "Enter your email address and we'll send you a reset code"
                    : `Enter the code sent to ${email} and choose a new password`}
            </p>

            {errorMessage && (
                <div className="mt-4 rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-600">
                    {errorMessage}
                </div>
            )}
            {infoMessage && (
                <div className="mt-4 rounded-lg bg-[#E7F0E3] px-4 py-2.5 text-sm text-[#14532D]">
                    {infoMessage}
                </div>
            )}

            {step === 'request' ? (
                <form onSubmit={handleRequestCode} className="mt-6 space-y-4">
                    <FormInput
                        label="Email Address"
                        icon={Mail}
                        type="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#14532D] py-3 text-sm font-semibold text-white hover:bg-[#0F4224] disabled:opacity-60"
                    >
                        {isSubmitting ? 'Sending...' : 'Send Reset Code'} <ArrowRight size={16} />
                    </button>
                </form>
            ) : (
                <form onSubmit={handleResetPassword} className="mt-6 space-y-4">
                    <div className="flex justify-center">
                        <OtpInput value={code} onChange={setCode} />
                    </div>

                    <FormInput
                        label="New Password"
                        icon={Lock}
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        rightIcon={showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        onRightIconClick={() => setShowPassword((prev) => !prev)}
                    />

                    <FormInput
                        label="Confirm New Password"
                        icon={Lock}
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#14532D] py-3 text-sm font-semibold text-white hover:bg-[#0F4224] disabled:opacity-60"
                    >
                        {isSubmitting ? 'Resetting...' : 'Reset Password'} <ArrowRight size={16} />
                    </button>
                </form>
            )}

            <div className="my-6 flex items-center gap-3">
                <div className="h-px flex-1 bg-gray-200" />
                <span className="text-xs text-gray-400 whitespace-nowrap">Remember your password?</span>
                <div className="h-px flex-1 bg-gray-200" />
            </div>

            <Link
                to="/Customer-side/Login"
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 py-2.5 text-sm font-medium text-[#111827] hover:bg-gray-50"
            >
                <ArrowLeft size={16} /> Back to Login
            </Link>
        </AuthLayout>
    )
}

export default ResetPassword