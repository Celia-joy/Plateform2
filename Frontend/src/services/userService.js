import { apiRequest } from "./api"

export const updateMyProfile = (fullName) => {
    return apiRequest("/users/me", {
        method: "PUT",
        body: JSON.stringify({ fullName }),
    })
}