import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {authStateType, loginPayloadType} from "./stateTypes.ts";
import {registerUser, userLogin} from "./actionCreators.ts";

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
            state.error = null;
        }).addCase(registerUser.rejected, (state, action) => {
            state.status = 'FAILED';
            console.log(action);
            state.error = action.error.message || "Registration failed";
        }).addCase(userLogin.pending, (state) => {
                state.status = 'LOADING';
                state.error = null;
        }).addCase(userLogin.fulfilled, (state, action: PayloadAction<loginPayloadType>) => {
            state.status = 'SUCCEEDED';
            state.error = null;
            state.userToken = action.payload.data.token;
            state.userInfo = action.payload.data.username;
        }).addCase(userLogin.rejected, (state, action) => {
            state.status = 'FAILED';
            console.log(action);
            state.error = action.error.message || "Login failed";
        })
    }
})

export default authSlice.reducer;