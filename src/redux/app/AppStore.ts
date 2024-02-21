import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/AuthSlice";

// Define RootState type
export type RootState = ReturnType<typeof store.getState>;

export const store = configureStore({
    reducer : {
        auth : authReducer
    }
})
export type AppDispatch = typeof store.dispatch