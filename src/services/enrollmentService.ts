import axios from "./apiservice"

export const getAllEnrollments = () => axios.get("enrollment/getAll")

export const getEnrollment = (id: string) => axios.get(`enrollment/get/${id}`)

export const deleteEnrollment = (id: string) => axios.get(`enrollment/delete/${id}`)

export const updateEnrollment = (data: object) => axios.get("enrollment/update", data)