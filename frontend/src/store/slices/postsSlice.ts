import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Post, postStateType, updatePostDataType} from "./stateTypes.ts";
import {createPost, deletePost, getPosts, updatePost} from "./actionCreators.ts";

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
        // Get posts
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

            // Create post
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
            // Delete post
            .addCase(deletePost.pending, (state) => {
            state.status = "LOADING";
            state.error = null;
        }).addCase(deletePost.fulfilled, (state, action) => {
            state.status = "DELETED";
            state.error = null;
            state.posts = state.posts?.filter(post => post._id !== action.payload) || null;
        }).addCase(deletePost.rejected, (state, action) => {
            state.status = "REJECTED";
            state.error = action.error.message || "Could not delete a post";
        })
            // UpdatePost
            .addCase(updatePost.pending, (state) => {
            state.status = "LOADING";
            state.error = null;
        }).addCase(updatePost.fulfilled, (state, action: PayloadAction<updatePostDataType>) => {
            state.status = "UPDATED";
            state.error = null;
            state.posts = state.posts?.map(post => {
                if(post._id === action.payload._id) {
                    if(action.payload.title) {
                        post.title = action.payload.title;
                    } else if(action.payload.content) {
                        post.content = action.payload.content;
                    }
                }
                return post;
            }) ?? null;
        }).addCase(updatePost.rejected, (state, action) => {
            state.status = "REJECTED";
            state.error = action.error.message || "Could not update a post";
        })
    }
});

export default postsSlice.reducer;