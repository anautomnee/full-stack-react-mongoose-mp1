import { createSlice } from "@reduxjs/toolkit";
import {authStateType} from "./stateTypes.ts";
import {registerUser} from "./actionCreators.ts";

const initialState:authStateType = {
    status: 'IDLE',
    error: null,
    userToken: null,
    userInfo: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(registerUser.pending, (state) => {
            state.status = 'LOADING';
            state.error = null;
        }).addCase(registerUser.fulfilled, (state) => {
            state.status = 'SUCCEEDED';
        }).addCase(registerUser.rejected, (state, action) => {
            state.status = 'FAILED';
            console.log(action);
            state.error = action.error.message || "Registration failed";
        })
    }
})

export default authSlice.reducer;