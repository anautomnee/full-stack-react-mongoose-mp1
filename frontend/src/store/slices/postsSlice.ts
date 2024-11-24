import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Post, postStateType} from "./stateTypes.ts";
import {createPost, getPosts} from "./actionCreators.ts";

const initialState: postStateType = {
    status: 'IDLE',
    error: null,
    posts: null
};

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getPosts.pending, (state) => {
            state.status = "LOADING";
            state.error = null;
        }).addCase(getPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
            state.status = "SUCCEEDED";
            state.posts = action.payload;
        }).addCase(getPosts.rejected, (state, action) => {
            state.status = "REJECTED";
            state.posts = null;
            state.error = action.error.message || "Could not fetch posts";
        }).addCase(createPost.pending, (state) => {
            state.status = "LOADING";
            state.error = null;
        }).addCase(createPost.fulfilled, (state) => {
            state.status = "CREATED";
            state.error = null;
        }).addCase(createPost.rejected, (state, action) => {
            state.status = "REJECTED";
            state.error = action.error.message || "Could not create a post";
        })
    }
});

export default postsSlice.reducer;