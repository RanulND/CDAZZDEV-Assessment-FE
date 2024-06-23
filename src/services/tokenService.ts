import { toast } from "react-toastify"

export const removeAccessToken = () => {
    localStorage.removeItem('cdazzdev_access_token')
    window.dispatchEvent(new Event('userLoggedOut'))
    toast.success("Logged Out")
}

export const getAccessToken = () => localStorage.getItem('cdazzdev_access_token')

export const setAccessToken = (token : string) => {
    localStorage.setItem('cdazzdev_access_token', token)
    window.dispatchEvent(new Event('userLoggedIn'))
}