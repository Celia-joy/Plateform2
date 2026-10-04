import { apiRequest } from "./api"

export const registerUser = (userData) => {
    return apiRequest("/auth/signup", {
        method: "POST",
        body: JSON.stringify(userData)
    })
}

export const loginUser = (credentials) => {
    return apiRequest("/auth/signin", {
        method: "POST",
        body: JSON.stringify(credentials)
    })
}
export const verifyEmailCode = (email, code) => {
    return apiRequest("/auth/verify-email", {
        method: "POST",
        body: JSON.stringify({ email, code }),
    })
}

export const resendVerification = (email) => {
    return apiRequest("/auth/resend-code", {
        method: "POST",
        body: JSON.stringify({ email })
    })
}