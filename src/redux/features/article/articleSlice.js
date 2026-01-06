import { createSlice } from '@reduxjs/toolkit';
import { fetchArticles, createArticle, updateArticle, deleteArticle } from '@/redux/features/article/articleThunk.js';

const initialState = {
    articles: [],
    currentArticle: null, // For editing specific article
    isLoading: false,
    error: null,
    successMessage: null,
};

const articleSlice = createSlice({
    name: 'article',
    initialState,
    reducers: {
        clearArticleMessages: (state) => {
            state.error = null;
            state.successMessage = null;
        },
        // Optional: If you want to clear data on logout
        clearArticles: (state) => {
            state.articles = [];
        }
    },
    extraReducers: (builder) => {
        builder
            // --- Fetch Articles ---
            .addCase(fetchArticles.pending, (state) => { state.isLoading = true; })
            .addCase(fetchArticles.fulfilled, (state, action) => {
                state.isLoading = false;
                state.articles = action.payload.articles;
            })
            .addCase(fetchArticles.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            // --- Create Article ---
            .addCase(createArticle.pending, (state) => { state.isLoading = true; })
            .addCase(createArticle.fulfilled, (state, action) => {
                state.isLoading = false;
                state.articles.unshift(action.payload);
            })
            .addCase(createArticle.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            // --- Update Article ---
            .addCase(updateArticle.pending, (state) => { state.isLoading = true; })
            .addCase(updateArticle.fulfilled, (state, action) => {
                state.isLoading = false;
                const index = state.articles.findIndex(art => art.id === action.payload.id);
                if (index !== -1) {
                    state.articles[index] = action.payload;
                }
            })
            .addCase(updateArticle.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            // --- Delete Article ---
            .addCase(deleteArticle.pending, (state) => { state.isLoading = true; })
            .addCase(deleteArticle.fulfilled, (state, action) => {
                state.isLoading = false;
                state.successMessage = 'Article deleted successfully';
                // Remove the article from the list using the ID we returned
                state.articles = state.articles.filter(art => art.id !== action.payload);
            })
            .addCase(deleteArticle.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { clearArticleMessages, clearArticles } = articleSlice.actions;
export default articleSlice.reducer;