import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    authenticationDataType,
    createPostDataType,
    deletePostDataType,
    getPostsDataType,
    updatePostDataType
} from "./stateTypes.ts";

let backendURL;

if(import.meta.env.VITE_ENV === 'local') {
    backendURL = 'http://localhost:3001';
} else {
    backendURL = import.meta.env.VITE_BACKEND_URL;
}

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
);

export const getPosts = createAsyncThunk(
    'posts/get',
    async ({token}: getPostsDataType, {rejectWithValue}) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
            };

            const {data} = await axios.get(`${backendURL}/posts/`, config);
            return data;

        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response && error.response.data.message) {
                    return rejectWithValue(error.response.data.message)
                } else {
                    return rejectWithValue(error.message)
                }
            }
        }
    }
);


export const createPost = createAsyncThunk(
    'posts/create',
    async ({title, content, author, token}: createPostDataType, {rejectWithValue}) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
            };

            const {data} = await axios.post(`${backendURL}/posts/`,
                { title, content, author, token },
                config);
            return data;

        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response && error.response.data.message) {
                    return rejectWithValue(error.response.data.message)
                } else {
                    return rejectWithValue(error.message)
                }
            }
        }
    }
);

export const deletePost = createAsyncThunk(
    'posts/delete',
    async ({_id, token}: deletePostDataType, {rejectWithValue}) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
            };

            const {data} = await axios.delete(`${backendURL}/posts/${_id}`, config);
            return data;

        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response && error.response.data.message) {
                    return rejectWithValue(error.response.data.message)
                } else {
                    return rejectWithValue(error.message)
                }
            }
        }
    }
);

export const updatePost = createAsyncThunk(
    'posts/update',
    async (updateData: updatePostDataType, {rejectWithValue}) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': updateData.token
                },
            };

            const {data} = await axios.put(`${backendURL}/posts/${updateData._id}`, updateData, config);
            return data;

        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response && error.response.data.message) {
                    return rejectWithValue(error.response.data.message)
                } else {
                    return rejectWithValue(error.message)
                }
            }
        }
    }
);