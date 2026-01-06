import axios from 'axios';
import { toast } from 'react-hot-toast';

const BASE_URL = import.meta.env.VITE_BASE_URL

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request Interceptor: Attach Access Token
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response Interceptor: Handle 401 & Refresh Token
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // If 401 (Unauthorized) and we haven't retried yet
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = localStorage.getItem('refreshToken');

            if (refreshToken) {
                try {
                    // Call Backend Refresh Endpoint
                    const response = await axios.post(`${BASE_URL}/auth/refresh`, {
                        token: refreshToken,
                    });

                    // Save new Access Token
                    const { accessToken } = response.data;
                    localStorage.setItem('accessToken', accessToken);

                    // Retry original request with new token
                    originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
                    return axiosInstance(originalRequest);
                } catch (refreshError) {
                    // If refresh fails, force logout
                    localStorage.clear();
                    window.location.href = '/login';
                    toast.error('Session expired. Please login again.');
                }
            } else {
                localStorage.clear();
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;