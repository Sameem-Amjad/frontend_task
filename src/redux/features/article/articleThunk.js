import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/utils/AxiosInstance/axiosInstance.js';

// Fetch all articles
export const fetchArticles = createAsyncThunk(
    'article/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/articles?limit=100');
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch articles');
        }
    }
);

// Create Article
export const createArticle = createAsyncThunk(
    'article/create',
    async (articleData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/articles', articleData);
            return response.data; // The created article
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create article');
        }
    }
);

// Update Article
export const updateArticle = createAsyncThunk(
    'article/update',
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.put(`/articles/${id}`, data);
            return response.data; // The updated article
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update article');
        }
    }
);

// Delete Article
export const deleteArticle = createAsyncThunk(
    'article/delete',
    async (id, { rejectWithValue }) => {
        try {
            await axiosInstance.delete(`/articles/${id}`);
            return id; // Return ID so we can remove it from Redux state
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete article');
        }
    }
);