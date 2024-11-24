import {combineReducers, configureStore} from '@reduxjs/toolkit'
import authReducer from "./slices/authSlice";
import postsReducer from "./slices/postsSlice";

const rootReducer = combineReducers({
    auth: authReducer,
    posts: postsReducer
});

const store = configureStore({reducer: rootReducer});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;