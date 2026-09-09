import { BarChart3, Smartphone, LineChart, Users, Calendar, ArrowRight } from 'lucide-react'

const features = [
    { icon: BarChart3, title: 'Smart Management', text: 'Manage orders, menus, staff and reservations from one intuitive dashboard.' },
    { icon: Smartphone, title: 'Seamless Experience', text: 'Customers can discover restaurants, place orders, and book tables effortlessly.' },
    { icon: LineChart, title: 'Real-Time Insights', text: 'Track performance and make data-driven decisions with real-time analytics.' },
    { icon: Users, title: 'Staff & Operations', text: 'Organize your team and streamline your daily operations with ease.' },
    { icon: Calendar, title: 'Table Reservation', text: 'Manage table bookings efficiently and never miss an opportunity.' },
]

const stats = [
    { value: '2500+', label: 'Restaurants on Plateform' },
    { value: '50,000+', label: 'Happy Customers' },
    { value: '120+', label: 'Cities Covered' },
    { value: '99.9%', label: 'Uptime and reliability' },
]

function Navbar() {
    return (
        <nav className="w-full bg-white">
            <div className="mx-auto flex h-[76px] max-w-[1200px] items-center justify-between px-6">
                <div className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#14532D]">
                        <span className="text-lg font-bold text-white">P</span>
                    </div>
                    <span className="font-heading text-xl font-bold tracking-tight text-[#14532D]">
                        Plateform
                    </span>
                </div>

                <div className="hidden items-center gap-8 md:flex">
                    <a href="#home" className="text-sm font-semibold text-[#14532D]">Home</a>
                    <a href="#features" className="text-sm font-medium text-[#374151] hover:text-[#14532D]">Features</a>
                    <a href="#for-restaurants" className="text-sm font-medium text-[#374151] hover:text-[#14532D]">For Restaurants</a>
                    <a href="#for-customers" className="text-sm font-medium text-[#374151] hover:text-[#14532D]">For Customers</a>
                    <a href="#pricing" className="text-sm font-medium text-[#374151] hover:text-[#14532D]">Pricing</a>
                    <a href="#about" className="text-sm font-medium text-[#374151] hover:text-[#14532D]">About us</a>
                </div>

                <div className="flex items-center gap-3">
                    <button className="hidden px-4 py-2 text-sm font-medium text-[#14532D] sm:block">
                        Log in
                    </button>
                    <button className="rounded-lg bg-[#14532D] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0F4224]">
                        Get Started
                    </button>
                </div>
            </div>
        </nav>
    )
}

function Hero() {
    return (
        <section className="mx-auto max-w-[1200px] px-6 py-16 md:py-24">
            <div className="grid items-center gap-12 md:grid-cols-2">
                <div>
                    <span className="inline-block rounded-full bg-[#E7F0E3] px-4 py-1.5 text-xs font-semibold tracking-wide text-[#14532D]">
                        ALL-IN-ONE RESTAURANT PLATFORM
                    </span>

                    <h1 className="font-heading mt-6 text-5xl font-bold leading-tight text-[#14532D] md:text-6xl">
                        Elevate Every Dining Experience,{' '}
                        <span className="font-script font-normal text-[#C9A227]">Together</span>
                    </h1>

                    <p className="mt-6 max-w-md text-[#4B5563]">
                        Plateform is the all-in-one platform that helps restaurants manage
                        their operations effortlessly while giving customers a seamless
                        way to discover, order, and book their favorite dining spots.
                    </p>

                    <div className="mt-8 flex flex-wrap gap-4">
                        <button className="rounded-lg bg-[#14532D] px-6 py-3 text-sm font-semibold text-white hover:bg-[#0F4224]">
                            Register as restaurant
                        </button>
                        <button className="rounded-lg border border-[#14532D] px-6 py-3 text-sm font-semibold text-[#14532D] hover:bg-[#E7F0E3]">
                            Register as customer
                        </button>
                    </div>

                    <div className="mt-8 flex items-center gap-3">
                        <div className="flex -space-x-2">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="h-8 w-8 rounded-full border-2 border-white bg-gray-300" />
                            ))}
                        </div>
                        <p className="text-sm text-[#4B5563]">
                            Trusted by 2,500+ restaurants and 50,000+ happy customers
                        </p>
                    </div>
                </div>

                <div className="relative flex justify-center">
                    <div className="h-[380px] w-[300px] rounded-3xl border-8 border-[#14532D] bg-white shadow-xl" />
                    <div className="absolute -left-4 bottom-4 h-[220px] w-[130px] rounded-2xl border-8 border-[#14532D] bg-white shadow-xl" />
                </div>
            </div>
        </section>
    )
}

function WhyPlateform() {
    return (
        <section className="mx-auto max-w-[1200px] px-6 py-16 text-center">
            <span className="text-xs font-semibold tracking-wide text-[#C9A227]">
                WHY PLATEFORM
            </span>
            <h2 className="font-heading mt-3 text-3xl font-bold text-[#14532D] md:text-4xl">
                Everything You Need, in One{' '}
                <span className="font-script font-normal text-[#C9A227]">Beautiful</span>{' '}
                Platform
            </h2>

            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
                {features.map(({ icon: Icon, title, text }) => (
                    <div key={title} className="rounded-2xl bg-[#F3F4F1] p-6 text-left">
                        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-white">
                            <Icon size={20} className="text-[#14532D]" />
                        </div>
                        <h3 className="font-semibold text-[#14532D]">{title}</h3>
                        <p className="mt-2 text-sm text-[#4B5563]">{text}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}

function CtaBanner() {
    return (
        <section className="mx-auto max-w-[1200px] px-6 py-8">
            <div className="grid overflow-hidden rounded-3xl md:grid-cols-2">
                <div className="h-64 bg-gray-300 md:h-auto" />
                <div className="bg-[#0F3D28] p-10 text-white">
                    <span className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold">
                        FOR RESTAURANTS
                    </span>
                    <h3 className="font-heading mt-4 text-3xl font-bold">
                        Run Your Restaurant.{' '}
                        <span className="font-script font-normal text-[#D9A441]">Grow</span>{' '}
                        Your Business.
                    </h3>
                    <p className="mt-4 max-w-sm text-white/80">
                        Join thousands of restaurant owners who trust Plateform to
                        simplify operations and create amazing experiences.
                    </p>
                    <button className="mt-6 flex items-center gap-2 rounded-lg bg-[#D9A441] px-6 py-3 text-sm font-semibold text-[#0F3D28] hover:bg-[#C9942E]">
                        Get Started Now <ArrowRight size={16} />
                    </button>
                </div>
            </div>
        </section>
    )
}

function StatsBar() {
    return (
        <section className="mx-auto max-w-[1200px] px-6 py-8">
            <div className="grid grid-cols-2 gap-6 rounded-2xl bg-[#F3F4F1] p-8 md:grid-cols-4">
                {stats.map(({ value, label }) => (
                    <div key={label} className="text-center">
                        <p className="font-heading text-2xl font-bold text-[#14532D]">{value}</p>
                        <p className="mt-1 text-xs text-[#4B5563]">{label}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}

function Footer() {
    return (
        <footer className="border-t border-gray-200">
            <div className="mx-auto grid max-w-[1200px] gap-8 px-6 py-12 md:grid-cols-5">
                <div>
                    <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#14532D]">
                            <span className="text-sm font-bold text-white">P</span>
                        </div>
                        <span className="font-heading font-bold text-[#14532D]">Plateform</span>
                    </div>
                    <p className="mt-3 text-sm text-[#4B5563]">
                        The all-in-one platform for restaurants and food lovers.
                    </p>
                </div>

                <div>
                    <h4 className="text-sm font-semibold text-[#14532D]">Product</h4>
                    <ul className="mt-3 space-y-2 text-sm text-[#4B5563]">
                        <li>Features</li><li>Security</li><li>Pricing</li><li>Updates</li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-sm font-semibold text-[#14532D]">For Restaurants</h4>
                    <ul className="mt-3 space-y-2 text-sm text-[#4B5563]">
                        <li>How it works</li><li>Resources</li><li>Partners</li><li>Support</li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-sm font-semibold text-[#14532D]">For Customers</h4>
                    <ul className="mt-3 space-y-2 text-sm text-[#4B5563]">
                        <li>Discover Restaurants</li><li>How it works</li><li>Help center</li><li>Contact us</li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-sm font-semibold text-[#14532D]">Company</h4>
                    <ul className="mt-3 space-y-2 text-sm text-[#4B5563]">
                        <li>About us</li><li>Careers</li><li>Press kit</li><li>Blog</li>
                    </ul>
                </div>
            </div>

            <div className="border-t border-gray-200 py-4 text-center text-xs text-[#4B5563]">
                © 2026 Plateform. All rights reserved.
            </div>
        </footer>
    )
}

function LandingPage() {
    return (
        <div className="min-h-screen bg-[#FBF3EA]">
            <Navbar />
            <Hero />
            <WhyPlateform />
            <CtaBanner />
            <StatsBar />
            <Footer />
        </div>
    )
}

export default LandingPage