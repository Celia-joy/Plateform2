import { apiRequest } from "./api"

export const registerUser = (userData) => {
    return apiRequest("/auth/signup", {
        method: "POST",
        body: JSON.stringify(userData)
    })
}