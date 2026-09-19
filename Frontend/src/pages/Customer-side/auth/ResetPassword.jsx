// src/pages/Customer-side/auth/ResetPassword.jsx
import { Link } from 'react-router-dom'
import authPhoto from "../../../assets/images/customer-onpc.jpg"
import { Globe, Lock, Mail, ArrowRight, ArrowLeft, Store, Users } from 'lucide-react'
import AuthLayout from '../../../components/auth/AuthLayout'
import FormInput from '../../../components/ui/FormInput'

function LanguageSelector() {
    return (
        <div className="flex items-center gap-1.5 text-sm text-[#374151]">
            <Globe size={16} />
            English
        </div>
    )
}

function ResetPassword() {
    return (
        <AuthLayout
            image={authPhoto}
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
                Enter your email address and we'll send you a link to reset your password
            </p>

            <form className="mt-6 space-y-4">
                <FormInput label="Email Address" icon={Mail} type="email" placeholder="Enter your email address" />

                <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#14532D] py-3 text-sm font-semibold text-white hover:bg-[#0F4224]"
                >
                    Send Resent Link <ArrowRight size={16} />
                </button>
            </form>

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