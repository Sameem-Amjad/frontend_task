import { createSlice } from '@reduxjs/toolkit';
import { verifyOtp, loginUser, registerUser } from '@/redux/features/auth/authThunk.js';
import { jwtDecode } from 'jwt-decode';

// Helper to restore user from localStorage if page reloads
const token = localStorage.getItem('accessToken');
let user = null;
if (token) {
    try {
        user = jwtDecode(token);
    } catch (e) {
        localStorage.clear();
    }
}

const initialState = {
    user: user, // { id, role, ... }
    accessToken: token,
    isLoading: false,
    error: null,
    successMessage: null,
    isAuthenticated: !!token,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.accessToken = null;
            state.isAuthenticated = false;
            localStorage.clear();
        },
        clearMessages: (state) => {
            state.error = null;
            state.successMessage = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Register
            .addCase(registerUser.pending, (state) => { state.isLoading = true; state.error = null; })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.successMessage = action.payload.message;
            })
            .addCase(registerUser.rejected, (state, action) => { state.isLoading = false; state.error = action.payload; })

            // Verify OTP
            .addCase(verifyOtp.pending, (state) => { state.isLoading = true; state.error = null; })
            .addCase(verifyOtp.fulfilled, (state, action) => {
                state.isLoading = false;
                state.successMessage = action.payload.message;
            })
            .addCase(verifyOtp.rejected, (state, action) => { state.isLoading = false; state.error = action.payload; })

            // Login
            .addCase(loginUser.pending, (state) => { state.isLoading = true; state.error = null; })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.accessToken = action.payload.data.accessToken;
                state.user = action.payload.data.user;
                state.isAuthenticated = true;
                state.successMessage = action.payload.message;
                // Save to LocalStorage
                localStorage.setItem('accessToken', action.payload.data.accessToken);
                localStorage.setItem('refreshToken', action.payload.data.refreshToken);
            })
            .addCase(loginUser.rejected, (state, action) => { state.isLoading = false; state.error = action.payload; });
    },
});

export const { logout, clearMessages } = authSlice.actions;
export default authSlice.reducer;