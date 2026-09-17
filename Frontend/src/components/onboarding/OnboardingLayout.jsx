// src/components/onboarding/OnboardingLayout.jsx
import { HelpCircle, User } from 'lucide-react'

const steps = [
    { number: 1, label: 'Restaurant info' },
    { number: 2, label: 'Location' },
    { number: 3, label: 'Opening hours' },
    { number: 4, label: 'Services' },
    { number: 5, label: 'First menu' },
]

function OnboardingLayout({ currentStep, title, description, children, onBack, onContinue, continueLabel = 'Continue', showBack = true, tip, rightPanel }) {
    const percent = (currentStep / steps.length) * 100

    return (
        <div className="flex min-h-screen bg-[#FBF3EA]">
            {/* Sidebar */}
            <aside className="flex w-64 flex-col justify-between border-r border-gray-200 bg-white p-6">
                <div>
                    <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#14532D]">
                            <span className="text-sm font-bold text-white">P</span>
                        </div>
                        <span className="font-heading text-lg font-bold text-[#14532D]">PlateForm</span>
                    </div>

                    <h2 className="mt-8 text-sm font-semibold text-[#111827]">Restaurant setup</h2>

                    <ul className="mt-4 space-y-4">
                        {steps.map((step) => {
                            const isActive = step.number === currentStep
                            return (
                                <li key={step.number} className="flex items-center gap-3">
                                    <span
                                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                                            isActive
                                                ? 'bg-[#14532D] text-white'
                                                : 'border border-gray-300 text-gray-400'
                                        }`}
                                    >
                                        {step.number}
                                    </span>
                                    <span className={`text-sm ${isActive ? 'font-semibold text-[#111827]' : 'text-gray-400'}`}>
                                        {step.label}
                                    </span>
                                </li>
                            )
                        })}
                    </ul>
                </div>

                {tip && (
                    <div className="flex items-start gap-2 rounded-xl bg-[#F3F4F1] p-4 text-xs text-[#4B5563]">
                        <User size={16} className="mt-0.5 shrink-0" />
                        {tip}
                    </div>
                )}
            </aside>

            {/* Main content */}
            <div className="flex flex-1">
                <div className="flex-1 px-10 py-8">
                    <div className="flex items-center justify-between">
                        <div className="flex-1">
                            <p className="text-sm font-semibold text-[#14532D]">Step {currentStep} of {steps.length}</p>
                            <div className="mt-2 h-1.5 w-full max-w-md overflow-hidden rounded-full bg-gray-200">
                                <div
                                    className="h-full rounded-full bg-[#14532D] transition-all"
                                    style={{ width: `${percent}%` }}
                                />
                            </div>
                        </div>
                        <div className="flex items-center gap-1.5 text-sm text-[#374151]">
                            <HelpCircle size={16} /> Need help?
                        </div>
                    </div>

                    <h1 className="font-heading mt-6 text-3xl font-bold text-[#14532D]">{title}</h1>
                    <p className="mt-2 text-sm text-[#4B5563]">{description}</p>

                    <div className="mt-8 max-w-2xl">{children}</div>

                    <div className="mt-10 flex max-w-2xl items-center justify-between">
                        {showBack ? (
                            <button
                                onClick={onBack}
                                className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-semibold text-[#111827] hover:bg-gray-50"
                            >
                                ← Back
                            </button>
                        ) : <div />}

                        <button
                            onClick={onContinue}
                            className="rounded-lg bg-[#14532D] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#0F4224]"
                        >
                            {continueLabel} →
                        </button>
                    </div>
                </div>

                {rightPanel && (
                    <div className="w-96 border-l border-gray-200 bg-[#F3F4F1] p-8">
                        {rightPanel}
                    </div>
                )}
            </div>
        </div>
    )
}

export default OnboardingLayout