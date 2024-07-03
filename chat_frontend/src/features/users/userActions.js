import { createAsyncThunk } from '@reduxjs/toolkit'
import userService from './userService';


export const fetchUser = createAsyncThunk(
    'user/friends',
    async (userData, { thunkAPI }) => {
        try {
            // console.log("User Id:", userData)
            return await userService.userFriends(userData)
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const fetchUserFriend = createAsyncThunk(
    'user/friend',
    async (userData, { thunkAPI }) => {
        try {
            // console.log("User Id:", userData)
            return await userService.userFriend(userData)
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

