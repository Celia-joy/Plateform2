// src/components/auth/AuthLayout.jsx
import { Link } from 'react-router-dom'
import { Star } from 'lucide-react'

function AuthLayout({ image, heading, highlight, description, stats, testimonial, securityNote, navRight, navText, navLinkLabel, navLinkTo, children }) {
    return (
        <div className="min-h-screen bg-[#FBF3EA]">
            <nav className="w-full">
                <div className="mx-auto flex h-[76px] max-w-[1200px] items-center justify-between px-6">
                    <div className="flex items-center gap-2">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#14532D]">
                            <span className="text-lg font-bold text-white">P</span>
                        </div>
                        <span className="font-heading text-xl font-bold text-[#14532D]">
                            PlateForm
                        </span>
                    </div>

                    {navRight ? (
                        navRight
                    ) : (
                        <p className="text-sm text-[#374151]">
                            {navText}{' '}
                            <Link to={navLinkTo} className="font-semibold text-[#14532D] hover:underline">
                                {navLinkLabel}
                            </Link>
                        </p>
                    )}
                </div>
            </nav>

            <div className="mx-auto max-w-[1200px] px-6 py-6">
                <div className="grid overflow-hidden rounded-3xl md:grid-cols-2">
                    <div
                        className="relative flex min-h-[720px] flex-col justify-between bg-cover bg-center p-8 text-white"
                        style={{
                            backgroundImage: image
                                ? `linear-gradient(to top, rgba(0,0,0,0.55), rgba(0,0,0,0.15)), url(${image})`
                                : 'linear-gradient(135deg, #8B7355, #4A3F35)',
                        }}
                    >
                        <div>
                            <h1 className="font-heading text-4xl font-bold leading-tight">
                                {heading}{' '}
                                <span className="text-[#D9A441]">{highlight}</span>
                            </h1>
                            <p className="mt-4 max-w-sm text-white/90">{description}</p>

                            <div className="mt-6 flex gap-4">
                                {stats.map(({ icon: Icon, value, label }) => (
                                    <div key={label} className="rounded-xl bg-black/20 p-4 backdrop-blur-sm">
                                        <Icon size={20} className="text-[#D9A441]" />
                                        <p className="mt-2 text-xl font-bold">{value}</p>
                                        <p className="text-xs text-white/80">{label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {testimonial ? (
                            <div className="rounded-xl bg-black/30 p-4 backdrop-blur-sm">
                                <div className="flex gap-1">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <Star key={i} size={16} className="fill-[#D9A441] text-[#D9A441]" />
                                    ))}
                                </div>
                                <p className="mt-2 text-sm text-white/90">"{testimonial.quote}"</p>
                                <div className="mt-3 flex items-center gap-2">
                                    <div className="h-8 w-8 rounded-full bg-gray-300" />
                                    <div>
                                        <p className="text-sm font-semibold">{testimonial.name}</p>
                                        <p className="text-xs text-white/70">{testimonial.role}</p>
                                    </div>
                                </div>
                            </div>
                        ) : securityNote ? (
                            <div className="rounded-xl bg-black/30 p-4 backdrop-blur-sm">
                                <div className="flex items-center gap-2 font-semibold">
                                    <securityNote.icon size={18} className="text-[#D9A441]" />
                                    {securityNote.title}
                                </div>
                                <p className="mt-1 text-sm text-white/80">{securityNote.text}</p>
                            </div>
                        ) : null}
                    </div>

                    <div className="flex flex-col justify-center bg-white p-8 md:p-12">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthLayout