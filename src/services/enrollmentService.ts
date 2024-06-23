import { Enrollment } from "../types/enrollment"
import axios from "./apiservice"

export const getAllEnrollments = () => axios.get("enrollment/getAll")

export const getEnrollment = (id: string) => axios.get(`enrollment/get/${id}`)

export const deleteEnrollment = (id: string) => axios.get(`enrollment/delete/${id}`)

export const updateEnrollment = (data: object) => axios.post("enrollment/update", data)

export const createEnrollment = (data: Enrollment) => axios.post("enrollment/create", data)