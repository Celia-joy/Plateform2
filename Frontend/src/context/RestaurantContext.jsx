import { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'
import { getMyRestaurant } from '../services/restaurantService'

const RestaurantContext = createContext(null)

export function RestaurantProvider({ children }) {
    const { user, isLoading: authLoading } = useAuth()
    const [restaurant, setRestaurant] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (authLoading) return

        if (!user || user.role !== 'restaurant') {
            setRestaurant(null)
            setIsLoading(false)
            return
        }

        const loadRestaurant = async () => {
            setIsLoading(true)
            try {
                const response = await getMyRestaurant()
                setRestaurant(response.data)
            }
            catch (error) {
                // 404 means "no restaurant yet" (hasn't finished Onboarding)
                if (error.status === 404) {
                    setRestaurant(null)
                } else {
                    console.error('Failed to load restaurant:', error.message)
                }
            }
            finally {
                setIsLoading(false)
            }
        }

        loadRestaurant()
    }, [user, authLoading])

    return (
        <RestaurantContext.Provider value={{ restaurant, setRestaurant, isLoading }}>
            {children}
        </RestaurantContext.Provider>
    )
}

export function useRestaurant() {
    return useContext(RestaurantContext)
}