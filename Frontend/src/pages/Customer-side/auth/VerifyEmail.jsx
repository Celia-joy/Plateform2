import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Mail, ShieldCheck, ArrowRight, ArrowLeft, Users, ShieldQuestion, Star } from 'lucide-react'
import AuthLayout from '../../../components/auth/AuthLayout'
import OtpInput from '../../../components/auth/OtpInput'
import { verifyEmailCode, resendVerificationCode } from '../../../services/authService'
import { useAuth } from '../../../context/AuthContext'
import authPhoto from '../../../assets/images/verify-email-customer.jpg'

function SupportLink() {
    return (
        <p className="text-sm text-[#374151]">
            Need help?{' '}
            <a href="#" className="font-semibold text-[#14532D] hover:underline">Contact support</a>
        </p>
    )
}

function VerifyEmail() {
    const navigate = useNavigate()
    const location = useLocation()
    const { login } = useAuth()
    const email = location.state?.email || 'your email'

    const [code, setCode] = useState('')
    const [secondsLeft, setSecondsLeft] = useState(600)
    const [isVerifying, setIsVerifying] = useState(false)
    const [isResending, setIsResending] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [infoMessage, setInfoMessage] = useState('')

    useEffect(() => {
        if (secondsLeft <= 0) return
        const timer = setInterval(() => setSecondsLeft((prev) => prev - 1), 1000)
        return () => clearInterval(timer)
    }, [secondsLeft])

    const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, '0')
    const seconds = String(secondsLeft % 60).padStart(2, '0')

    const handleVerify = async () => {
        setErrorMessage('')
        setInfoMessage('')

        if (code.length !== 6) {
            setErrorMessage('Please enter the full 6-digit code')
            return
        }

        setIsVerifying(true)
        try {
            const response = await verifyEmailCode(email, code)

            if (response.data?.token) {
                login(response.data.user, response.data.token)
                navigate('/Customer-side/Restaurants')
            } else {
                // "Already verified" case: no token is returned, so send them to Login
                navigate('/Customer-side/Login')
            }
        }
        catch (error) {
            setErrorMessage(error.message)
        }
        finally {
            setIsVerifying(false)
        }
    }

    const handleResend = async () => {
        setErrorMessage('')
        setInfoMessage('')
        setIsResending(true)

        try {
            await resendVerificationCode(email)
            setSecondsLeft(600)
            setCode('')
            setInfoMessage('A new code has been sent to your email')
        }
        catch (error) {
            setErrorMessage(error.message)
        }
        finally {
            setIsResending(false)
        }
    }

    return (
        <AuthLayout
            image={authPhoto}
            heading="One last step to get started with"
            highlight="Plateform"
            description="We've sent a verification code to your email address. Please enter the code below to verify your account."
            stats={[
                { icon: Users, value: '2500+', label: 'Restaurants Trust us' },
                { icon: ShieldCheck, value: '50,000+', label: 'Happy Customers' },
                { icon: Star, value: '4.8/5', label: 'Average rating' },
            ]}
            securityNote={{
                icon: ShieldQuestion,
                title: 'Your security is our priority',
                text: 'We use secure verification to keep your account safe and protected',
            }}
            navRight={<SupportLink />}
        >
            <div className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#E7F0E3]">
                    <Mail size={28} className="text-[#14532D]" />
                </div>

                <h2 className="font-heading mt-4 text-3xl font-bold text-[#14532D]">
                    Verify your email
                </h2>
                <p className="mt-2 text-sm text-[#4B5563]">
                    We've sent a 6-digit verification code to<br />
                    <span className="font-semibold text-[#111827]">{email}</span>
                </p>

                {errorMessage && (
                    <div className="mt-4 w-full rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-600">
                        {errorMessage}
                    </div>
                )}
                {infoMessage && (
                    <div className="mt-4 w-full rounded-lg bg-[#E7F0E3] px-4 py-2.5 text-sm text-[#14532D]">
                        {infoMessage}
                    </div>
                )}

                <div className="mt-6">
                    <OtpInput value={code} onChange={setCode} />
                </div>

                <p className="mt-4 text-sm text-[#4B5563]">
                    {secondsLeft > 0 ? (
                        <>The code will expire in <span className="font-semibold">{minutes}:{seconds}</span></>
                    ) : (
                        <span className="font-semibold text-red-600">Your code has expired — request a new one</span>
                    )}
                </p>

                <button
                    type="button"
                    onClick={handleVerify}
                    disabled={isVerifying}
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-[#14532D] py-3 text-sm font-semibold text-white hover:bg-[#0F4224] disabled:opacity-60"
                >
                    {isVerifying ? 'Verifying...' : 'Verify Email'}
                    {!isVerifying && <ArrowRight size={16} />}
                </button>

                <div className="my-6 flex w-full items-center gap-3">
                    <div className="h-px flex-1 bg-gray-200" />
                    <span className="text-xs text-gray-400">OR</span>
                    <div className="h-px flex-1 bg-gray-200" />
                </div>

                <button
                    type="button"
                    onClick={handleResend}
                    disabled={isResending}
                    className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 py-2.5 text-sm font-medium text-[#111827] hover:bg-gray-50 disabled:opacity-60"
                >
                    <Mail size={16} /> {isResending ? 'Sending...' : 'Resend code'}
                </button>

                <Link
                    to="/Customer-side/Login"
                    className="mt-4 flex items-center gap-1.5 text-sm font-medium text-[#14532D] hover:underline"
                >
                    <ArrowLeft size={14} /> Back to login
                </Link>
            </div>
        </AuthLayout>
    )
}

export default VerifyEmail