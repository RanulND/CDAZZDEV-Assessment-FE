import { configureStore } from "@reduxjs/toolkit";
import studentSlice from "./features/studentSlice";
import courseSlice from "./features/courseSlice";
import enrollmentSlice from "./features/enrollmentSlice";
import authSlice from "./features/authSlice";

export const store = configureStore({
    reducer: {
        students: studentSlice,
        courses: courseSlice,
        enrollments: enrollmentSlice,
        auth: authSlice
    }
})

export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

