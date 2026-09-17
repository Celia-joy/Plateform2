// src/pages/Restaurant-side/auth/VerifyEmail.jsx
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, ShieldCheck, ArrowRight, ArrowLeft, Users, ShieldQuestion, Star } from 'lucide-react'
import AuthLayout from '../../../components/auth/AuthLayout'
import OtpInput from '../../../components/auth/OtpInput'

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
    const [code, setCode] = useState('')
    const [secondsLeft, setSecondsLeft] = useState(600) // 10:00

    useEffect(() => {
        if (secondsLeft <= 0) return

        const timer = setInterval(() => {
            setSecondsLeft((prev) => prev - 1)
        }, 1000)

        // Cleanup: stop the interval if the component unmounts
        return () => clearInterval(timer)
    }, [secondsLeft])

    const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, '0')
    const seconds = String(secondsLeft % 60).padStart(2, '0')

    return (
        <AuthLayout
            image={null}
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
                    We've sent an 6-digit verification code to<br />
                    <span className="font-semibold text-[#111827]">celiajoy@example.com</span>
                </p>

                <div className="mt-6">
                    <OtpInput value={code} onChange={setCode} />
                </div>

                <p className="mt-4 text-sm text-[#4B5563]">
                    The code will expire in <span className="font-semibold">{minutes}:{seconds}</span>
                </p>

                <button
                    type="button"
                    onClick={() => navigate('/Restaurant-side/Onboarding')}
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-[#14532D] py-3 text-sm font-semibold text-white hover:bg-[#0F4224]"
                >
                    Verify Email <ArrowRight size={16} />
                </button>

                <div className="my-6 flex w-full items-center gap-3">
                    <div className="h-px flex-1 bg-gray-200" />
                    <span className="text-xs text-gray-400">OR</span>
                    <div className="h-px flex-1 bg-gray-200" />
                </div>

                <button
                    type="button"
                    className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 py-2.5 text-sm font-medium text-[#111827] hover:bg-gray-50"
                >
                    <Mail size={16} /> Resend code
                </button>

                <Link
                    to="/Restaurant-side/Login"
                    className="mt-4 flex items-center gap-1.5 text-sm font-medium text-[#14532D] hover:underline"
                >
                    <ArrowLeft size={14} /> Back to login
                </Link>
            </div>
        </AuthLayout>
    )
}

export default VerifyEmail