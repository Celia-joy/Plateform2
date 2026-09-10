// src/pages/auth/CustomerSignup.jsx
import { useState } from 'react'
import { User, Mail, Lock, Eye, EyeOff, Store, Users, ArrowRight } from 'lucide-react'
import AuthLayout from '../../../components/auth/AuthLayout'
import FormInput from '../../../components/ui/FormInput'

function GoogleIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 18 18">
            <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.9c1.7-1.57 2.7-3.87 2.7-6.62z" />
            <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.9-2.26c-.8.54-1.84.86-3.06.86-2.35 0-4.34-1.59-5.05-3.72H.96v2.33A9 9 0 0 0 9 18z" />
            <path fill="#FBBC05" d="M3.95 10.7A5.4 5.4 0 0 1 3.67 9c0-.59.1-1.17.28-1.7V4.97H.96A9 9 0 0 0 0 9c0 1.45.35 2.83.96 4.03l2.99-2.33z" />
            <path fill="#EA4335" d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .96 4.97L3.95 7.3C4.66 5.17 6.65 3.58 9 3.58z" />
        </svg>
    )
}

function AppleIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M11.3 8.5c0-1.9 1.6-2.8 1.6-2.9-.9-1.3-2.3-1.5-2.8-1.5-1.2-.1-2.3.7-2.9.7s-1.5-.7-2.5-.7c-1.3 0-2.5.75-3.1 1.9-1.3 2.3-.35 5.7.95 7.6.65.9 1.4 1.95 2.4 1.9.95-.05 1.3-.6 2.5-.6s1.5.6 2.5.6c1.05 0 1.7-.95 2.35-1.9.7-1.05 1-2.05 1-2.1-.05 0-1.95-.75-1.95-2.9zM9.4 2.4c.5-.65.85-1.5.75-2.4-.75.05-1.65.5-2.15 1.15-.45.55-.9 1.45-.8 2.3.85.05 1.7-.4 2.2-1.05z" />
        </svg>
    )
}

function CustomerSignup() {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    return (
        <AuthLayout
            image={null}
            heading="Join thousands of food lovers discovering amazing"
            highlight="restaurants"
            description="Create an account and explore the best restaurants near you, order easily and enjoy exclusive offers."
            stats={[
                { icon: Store, value: '2500+', label: 'Restaurants on Plateform' },
                { icon: Users, value: '50,000+', label: 'Happy customers served daily' },
            ]}
            testimonial={{
                quote: 'Plateform makes it so easy to find great food and support local restaurants',
                name: 'MPANO Curie',
                role: 'Food lover',
            }}
        >
            <h2 className="font-heading text-3xl font-bold text-[#14532D]">
                Create your account
            </h2>
            <p className="mt-2 text-sm text-[#4B5563]">
                Start your journey with Plateform today.
            </p>

            <form className="mt-6 space-y-4">
                <FormInput label="Full Name" icon={User} placeholder="Enter your full name" />
                <FormInput label="Email" icon={Mail} type="email" placeholder="Enter your email address" />

                <FormInput
                    label="Password"
                    icon={Lock}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a password"
                    rightIcon={showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    onRightIconClick={() => setShowPassword((prev) => !prev)}
                />

                <FormInput
                    label="Confirm Password"
                    icon={Lock}
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm your password"
                    rightIcon={showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    onRightIconClick={() => setShowConfirmPassword((prev) => !prev)}
                />

                <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#14532D] py-3 text-sm font-semibold text-white hover:bg-[#0F4224]"
                >
                    Create account <ArrowRight size={16} />
                </button>
            </form>

            <div className="my-6 flex items-center gap-3">
                <div className="h-px flex-1 bg-gray-200" />
                <span className="text-xs text-gray-400">OR</span>
                <div className="h-px flex-1 bg-gray-200" />
            </div>

            <div className="space-y-3">
                <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 py-2.5 text-sm font-medium text-[#111827] hover:bg-gray-50">
                    <GoogleIcon /> Continue with Google
                </button>
                <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 py-2.5 text-sm font-medium text-[#111827] hover:bg-gray-50">
                    <AppleIcon /> Continue with Apple
                </button>
            </div>

            <p className="mt-6 text-xs text-gray-500">
                By creating an account you agree to our{' '}
                <a href="#" className="font-semibold text-[#111827] hover:underline">Terms of Services</a>{' '}
                and{' '}
                <a href="#" className="font-semibold text-[#111827] hover:underline">Privacy Policy</a>
            </p>
        </AuthLayout>
    )
}

export default CustomerSignup