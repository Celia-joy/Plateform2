// src/components/auth/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

function ProtectedRoute({ children, allowedRole }) {
    const { user, isLoading } = useAuth()

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#FBF3EA]">
                <p className="text-sm text-[#4B5563]">Loading...</p>
            </div>
        )
    }

    if (!user) {
        const loginPath = allowedRole === 'restaurant' ? '/Restaurant-side/Login' : '/Customer-side/Login'
        return <Navigate to={loginPath} replace />
    }

    if (allowedRole && user.role !== allowedRole) {
        return <Navigate to="/" replace />
    }

    return children
}

export default ProtectedRoute