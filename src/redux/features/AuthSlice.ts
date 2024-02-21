import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login, logout } from "../../services/api/auth/AuthApi";
import { FormData } from "@/src/interfaces/auth/userInterface";



const initialState = {
    isLogged:  localStorage.getItem('token') || null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logoutUser: (state) => {
            state.isLogged = '' || null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.pending, (state) => {
            state.isLogged = '' || null;
        });
        builder.addCase(loginUser.fulfilled, (state) => {
            state.isLogged = localStorage.getItem('token') || null;
        });
        builder.addCase(loginUser.rejected, (state) => {
            state.isLogged = '' || null;
        });
    },
});

export const loginUser = createAsyncThunk('auth/loginUser', async (dataForm: FormData, { rejectWithValue }) => {
    try {
        return await login(dataForm);

    } catch (error: any) {
        return rejectWithValue(error.message);
    }
});



// Define logoutUser action creator
export const { logoutUser } = authSlice.actions;

export default authSlice.reducer;
