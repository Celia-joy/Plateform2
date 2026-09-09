function LandingPage(){
    return (
        <div className="min-h-screen bg-[#FAF9F6]">
            <nav className="w-full bg-white">
                <div className="mx-auto flex h-[76px] max-w-[1200px] items-center justify-between px-6">
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-2">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#14532D]">
                                <span className="text-lg font-bold text-white">
                                    P
                                </span>
                            </div>
                            <span className="text-xl font-bold tracking-light text-[#14532D]">
                                Plateform
                            </span>
                        </div>
                        <div className="hidden items-center gap-8 md:flex">
                            <a
                            href="features"
                            className="text-sm font-medium text-[#374151] hover:text-[#14532D]">
                                Features
                            </a>
                            <a
                            href="#solutions"
                            className="text-sm font-medium text-[#374151] hover:text-[#14532D]">
                                Solutions
                            </a>
                            <a
                            href="#pricing"
                            className="text-sm font-medium text-[#374151] hover:text-[#14532D]">
                                Pricing
                            </a>
                            <a
                            href="#about"
                            className="text-sm font-medium text-[#374151] hover:text-[#14532D]">
                                About
                            </a>
                        </div>
                        <div className="flex items-center gap-3">
                            <button className="hidden px-4 py-2 text-sm font-medium text-[#14532D] sm:block">
                                Log in
                            </button>
                            <button className="rounded-lg bg-[#14532D] px-5 py-2.5 text-sm font-semibold text-white hover:bg[#0F4224]">
                                Get started
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}
export default LandingPage