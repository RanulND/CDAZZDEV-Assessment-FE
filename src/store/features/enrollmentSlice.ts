import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { Enrollment } from "../../types/enrollment"
import { getAllEnrollments } from "../../services/enrollmentService"

type InitialState = {
    enrollments: Array<Enrollment>
    status: string
    error : null | Error
}

let initialState : InitialState = {
    status: 'idle',
    enrollments: [],
    error: null
}

const enrollmentSlice = createSlice({
    name: "enrollments",
    initialState: initialState,
    reducers: {
        addEnrollmentToStore: (state, action) => {
            state.enrollments = [...state.enrollments, action.payload]
        },
        deleteEnrollmentToStore: (state, action) => {
            state.enrollments = state.enrollments.filter(x => x.enrollmentId !== action.payload.id)
        },
        updateEnrollmentToStore: (state, action) => {
            state.enrollments = state.enrollments.map(enrollment => enrollment.enrollmentId === action.payload.enrollmentId? action.payload: enrollment)
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getEnrollments.pending, state => {
            state.status = "loading"
            state.error = null
        }).addCase(getEnrollments.fulfilled, (state, action) => {
            state.status = "succeeded"
            state.error = null
            state.enrollments = action.payload
        }).addCase(getEnrollments.rejected, state => {
            state.status = "failed"
            state.error = new Error("something went wrong")
        })
    },
})

export const getEnrollments = createAsyncThunk("enrollments/getAllEnrollments", async () => {
    const res = await getAllEnrollments()
    return res.data.data
})

export const { addEnrollmentToStore, deleteEnrollmentToStore,updateEnrollmentToStore} = enrollmentSlice.actions
export default enrollmentSlice.reducer