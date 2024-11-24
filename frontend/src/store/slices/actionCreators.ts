// authActions.js
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit'
import 'dotenv/config';
import {authenticationDataType} from "./stateTypes.ts";

const backendURL = import.meta.env.BACKEND_URL;

export const registerUser = createAsyncThunk(
    'auth/register',
    async ({ username, password }: authenticationDataType, { rejectWithValue }) => {
        try {
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