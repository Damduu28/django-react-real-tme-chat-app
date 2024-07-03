import { createSlice } from '@reduxjs/toolkit'
import { fetchUser } from './userActions'

const initialState = {
    user: [],
    loading: false,
    error: null,
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
          .addCase(fetchUser.pending, (state) => {
            state.loading = true
          })
          .addCase(fetchUser.fulfilled, (state, action) => {
            state.user = action.payload
            state.loading = false
          })
          .addCase(fetchUser.rejected, (state, action) => {
            state.error = action.payload
            state.loading = false
          })
    }
})

export default userSlice.reducer