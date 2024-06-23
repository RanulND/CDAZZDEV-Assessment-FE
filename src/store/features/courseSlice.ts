import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { Course } from "../../types/course"
import { getAllCourses } from "../../services/courseServices"

type InitialState = {
    courses: Array<Course>
    status: string
    error : null | Error
}

let initialState : InitialState = {
    status: 'idle',
    courses: [],
    error: null
}

const courseSlice = createSlice({
    name: "courses",
    initialState: initialState,
    reducers: {
        addCourseToStore: (state, action) => {
            state.courses = [...state.courses, action.payload]
        },
        deleteCourseToStore: (state, action) => {
            state.courses = state.courses.filter(x => x.courseId !== action.payload.id)
        },
        updateCourseToStore: (state, action) => {
            state.courses = state.courses.map(course => course.courseId === action.payload.courseId? action.payload: course)
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getCourses.pending, state => {
            state.status = "loading"
            state.error = null
        }).addCase(getCourses.fulfilled, (state, action) => {
            state.status = "succeeded"
            state.error = null
            state.courses = action.payload
        }).addCase(getCourses.rejected, state => {
            state.status = "failed"
            state.error = new Error("something went wrong")
        })
    },
})

export const getCourses = createAsyncThunk("courses/getAllCourses", async () => {
    const res = await getAllCourses()
    return res.data.data
})

export const { addCourseToStore, deleteCourseToStore, updateCourseToStore} = courseSlice.actions
export default courseSlice.reducer