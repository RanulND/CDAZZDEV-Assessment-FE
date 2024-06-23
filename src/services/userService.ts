import { User } from "../types/user";
import axios from "./apiservice";

export const signin = (email: string, password: string) => axios.post("auth/signin", {email:email, password:password})

export const registerUser = (user: User) => axios.post("auth/register", user)

export const getAllStudents = () => axios.get("student/getAll")

export const getStudent = (id: string) => axios.get(`student/get/${id}`)

export const deleteStudent = (id: string) => axios.get(`student/delete/${id}`)

export const updateStudent = (data: object) => axios.post("student/update", data)