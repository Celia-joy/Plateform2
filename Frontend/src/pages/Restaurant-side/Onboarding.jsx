import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import OnboardingLayout from '../../components/onboarding/OnboardingLayout'
import Step1RestaurantInfo from './onboarding/Step1RestaurantInfo'
import Step2Location from './onboarding/Step2Location'
import Step3OpeningHours from './onboarding/Step3OpeningHours'
import Step4Services from './onboarding/Step4Services'
import Step5FirstMenu, { OnboardingSuccessPanel } from './onboarding/Step5FirstMenu'

const defaultHours = {
    Monday: { open: '08:00', close: '22:00', isOpen: true },
    Tuesday: { open: '08:00', close: '22:00', isOpen: true },
    Wednesday: { open: '08:00', close: '22:00', isOpen: true },
    Thursday: { open: '08:00', close: '22:00', isOpen: true },
    Friday: { open: '08:00', close: '22:00', isOpen: true },
    Saturday: { open: '08:00', close: '22:00', isOpen: true },
    Sunday: { open: '08:00', close: '22:00', isOpen: false },
}

function Onboarding() {
    const navigate = useNavigate()
    const [currentStep, setCurrentStep] = useState(1)
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        cuisineType: '',
        country: '',
        city: '',
        address: '',
        zipCode: '',
        mapSearch: '',
        hours: defaultHours,
        phone: '',
        email: '',
        website: '',
        services: [],
        menuItems: [{ category: '', itemName: '', price: '', description: '' }],
    })

    const updateData = (fields) => {
        setFormData((prev) => ({ ...prev, ...fields }))
    }

    const goNext = () => setCurrentStep((prev) => prev + 1)
    const goBack = () => setCurrentStep((prev) => prev - 1)

    const stepConfig = {
        1: {
            title: 'Tell us about your restaurant',
            description: "Let's start with some basic information about your restaurant.",
            component: <Step1RestaurantInfo data={formData} updateData={updateData} />,
            showBack: false,
            tip: 'You can always change these details later in Settings',
        },
        2: {
            title: 'Where is your restaurant located?',
            description: 'Add your restaurant location so that customers can find you easily.',
            component: <Step2Location data={formData} updateData={updateData} />,
        },
        3: {
            title: 'Set your opening hours',
            description: "Let customers know when you're open",
            component: <Step3OpeningHours data={formData} updateData={updateData} />,
        },
        4: {
            title: 'What services do you offer?',
            description: 'Select all the services your restaurant provides.',
            component: <Step4Services data={formData} updateData={updateData} />,
        },
        5: {
            title: 'Add your first menu item',
            description: "Let's add at least one menu item to get you started.",
            component: <Step5FirstMenu data={formData} updateData={updateData} />,
            continueLabel: 'Finish Setup',
            rightPanel: <OnboardingSuccessPanel />,
        },
    }

    const current = stepConfig[currentStep]

    const handleContinue = () => {
        if (currentStep === 5) {
            navigate('/Restaurant-side/Dashboard')
            return
        }
        goNext()
    }

    return (
        <OnboardingLayout
            currentStep={currentStep}
            title={current.title}
            description={current.description}
            onBack={goBack}
            onContinue={handleContinue}
            continueLabel={current.continueLabel}
            showBack={current.showBack !== false}
            tip={current.tip}
            rightPanel={current.rightPanel}
        >
            {current.component}
        </OnboardingLayout>
    )
}

export default Onboarding