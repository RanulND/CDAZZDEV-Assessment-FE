import ax from "axios"
import { getAccessToken, removeAccessToken } from "./tokenService"

const axios = ax.create({
    baseURL: 'http://localhost:5001/api/',
    headers: {
        'Content-Type': 'application/json'
    }
})

axios.interceptors.request.use((config) => {
    const accessToken = getAccessToken()

    if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`
    }

    return config
},
(error) => Promise.reject(error))

axios.interceptors.response.use((res) => {
    return res
},
async (err) => {
    const config = err.config
    if(err.response){
        if(err.response.status === 401 && !config._retry){
            config._retry = true
            removeAccessToken()
        }
    }
    return Promise.reject(err)
})

export default axios