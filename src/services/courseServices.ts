import axios from "./apiservice"

export const getAllCourses = () => axios.get("course/getAll")

export const getCourse = (id: string) => axios.get(`course/get/${id}`)

export const deleteCourse = (id: string) => axios.get(`course/delete/${id}`)

export const updateCourse = (data: object) => axios.get("course/update", data)