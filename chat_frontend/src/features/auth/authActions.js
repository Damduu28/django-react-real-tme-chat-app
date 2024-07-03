import { createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

export const signupUser = createAsyncThunk(
    'auth/signup',
    async (userData, { thunkAPI }) => {
        try {
            return await authService.register(userData)
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const loginUser = createAsyncThunk(
    'auth/signin',
    async (userData, thunkAPI) => {
        try {
            return await authService.login({ ...userData })
        } catch (error) {
            const message = error.message || error.toString();
            return thunkAPI.rejectWithValue({ message: "Invalid credentials. Email Or Password is Incorrect." });
        }
    }
);

export const logoutUser = createAsyncThunk('auth/logout',
    async (userData, thunkAPI) => {
        try {
            localStorage.removeItem("chatAuthToken")
            return await authService.logout(userData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    });