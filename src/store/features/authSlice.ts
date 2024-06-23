import { createSlice } from "@reduxjs/toolkit"
import { User } from "../../types/user"

type InitialState = {
    currentUser: User | null
}

let initialState : InitialState = {
    currentUser: null
}

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        assignCurrentUser: (state, action) => {
            state.currentUser = action.payload
        },
        removeCurrentUser: (state) => {
            state.currentUser = null
        }
    } 
})

export const {assignCurrentUser,removeCurrentUser} = authSlice.actions
export default authSlice.reducer