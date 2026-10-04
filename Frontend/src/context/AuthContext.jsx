import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    // On first load, check if a previous session was saved
    useEffect(() => {
        const storedUser = localStorage.getItem('plateform_user')
        const storedToken = localStorage.getItem('plateform_token')

        if (storedUser && storedToken) {
            setUser(JSON.parse(storedUser))
            setToken(storedToken)
        }

        setIsLoading(false)
    }, [])

    const login = (userData, authToken) => {
        setUser(userData)
        setToken(authToken)
        localStorage.setItem('plateform_user', JSON.stringify(userData))
        localStorage.setItem('plateform_token', authToken)
    }

    const logout = () => {
        setUser(null)
        setToken(null)
        localStorage.removeItem('plateform_user')
        localStorage.removeItem('plateform_token')
    }

    return (
        <AuthContext.Provider value={{ user, token, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}