const API_BASE_URL = "https://localhost:3000/api"
export const apiRequest = async (endpoint, options = {}) => {
    const token = localStorage.getItem("plateform_token")
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
            "Content-Type" : "application/json",
            ...(token && { Authorization: `Bearer ${token}`}),
            ...options.headers,
        },
    })
    const data = await response.json()
    if (!response.ok){
        throw new Error(data.error || data.message || "Something went wrong")
    }
    return data
}