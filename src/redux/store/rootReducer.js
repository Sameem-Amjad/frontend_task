import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '@/redux/features/auth/authSlice.js';
import articleReducer from '@/redux/features/article/articleSlice.js';
// Import other reducers (admin, editor) here when created

const rootReducer = combineReducers({
    auth: authReducer,
    article: articleReducer,
});

export default rootReducer;