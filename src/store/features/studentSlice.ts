import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { User } from "../../types/user"
import { getAllStudents } from "../../services/userService"

type InitialState = {
    students: Array<User>
    status: string
    error : null | Error
}

let initialState : InitialState = {
    status: 'idle',
    students: [],
    error: null
}

const studentSlice = createSlice({
    name: "students",
    initialState: initialState,
    reducers: {
        addStud: (state, action) => {
            state.students = [...state.students, action.payload]
        },
        deleteStud: (state, action) => {
            state.students = state.students.filter(x => x.userId !== action.payload.id)
        },
        updateStud: (state, action) => {
            state.students = state.students.map(student => student.userId === action.payload.userId? action.payload: student)
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAllStuds.pending, state => {
            state.status = "loading"
            state.error = null
        }).addCase(getAllStuds.fulfilled, (state, action)=> {
            state.status = "succeeded"
            state.error = null
            state.students = action.payload
        }).addCase(getAllStuds.rejected, state => {
            state.status = "failed"
            state.error = new Error("something went wrong")
        })
    },
})

export const getAllStuds = createAsyncThunk("students/getAllStudents", async () => {
    const res = await getAllStudents()
    return res.data.data
})

export const { addStud, deleteStud, updateStud} = studentSlice.actions
export default studentSlice.reducer