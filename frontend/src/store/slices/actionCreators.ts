// authActions.js
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {authenticationDataType} from "./stateTypes.ts";

const backendURL = import.meta.env.VITE_BACKEND_URL;

export const registerUser = createAsyncThunk(
    'auth/register',
    async ({ username, password }: authenticationDataType, { rejectWithValue }) => {
        try {
            console.log(username, password);
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            await axios.post(
                `${backendURL}/auth/register`,
                { username, password },
                config
            )
        } catch (error: unknown) {
            // return custom error message from backend if present
            console.log(error)
            if (axios.isAxiosError(error)) {
                if (error.response && error.response.data.message) {
                    return rejectWithValue(error.response.data.message)
                } else {
                    return rejectWithValue(error.message)
                }
            }
        }
    }
)

export const userLogin = createAsyncThunk(
    'auth/login',
    async ({ username, password }: authenticationDataType, { rejectWithValue }) => {
        try {
            // configure header's Content-Type as JSON
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            const { data } = await axios.post(
                `${backendURL}/auth/login`,
                { username, password },
                config
            )
            // store user's token in local storage
            console.log(data)
            localStorage.setItem('userToken', data.userToken)
            return data
        } catch (error: unknown) {
            // return custom error message from API if any

            if (axios.isAxiosError(error)) {
                if (error.response && error.response.data.message) {
                    return rejectWithValue(error.response.data.message)
                } else {
                    return rejectWithValue(error.message)
                }
            }
        }
    }
)