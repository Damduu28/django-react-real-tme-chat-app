import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { userTokensURL } from '../../constant';
import axios from 'axios';
import authService from './authService';
import { loginUser, logoutUser, signupUser } from './authActions';
import { jwtDecode } from 'jwt-decode'

const authTokens = JSON.parse(localStorage.getItem('chatAuthToken'))

const initialState = {
    tokens: authTokens ? authTokens : null,
    user: authTokens ? jwtDecode(authTokens.refresh) : null,
    isAuthenticated: authTokens ? true : false,
    loading: false,
    success: false,
    error: null,
};


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signupUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(signupUser.fulfilled, (state, action) => {
                state.success = true;
            })
            .addCase(signupUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Signup failed';
            })
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = jwtDecode(action.payload.refresh);
                state.tokens = action.payload
                state.isAuthenticated = true;
                state.success = true
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Login failed';
            })
            .addCase(logoutUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.loading = false;
                state.isAuthenticated = false;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});


/*
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.tokens = action.payload;
            localStorage.setItem('chatAuthToken', action.payload);
        },
        loginFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        logout: (state) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.tokens = null;
            localStorage.removeItem('chatAuthToken');
        },
    },
});
export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;
*/



export const { setUser } = authSlice.actions;

export default authSlice.reducer;



