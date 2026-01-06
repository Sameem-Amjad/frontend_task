import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { Save, ArrowLeft } from 'lucide-react';
import { createArticle, updateArticle, fetchArticles } from '@/redux/features/article/articleThunk.js';

const ArticleForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isEditMode = !!id;

    const { articles, isLoading } = useSelector((state) => state.article);

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [state, setState] = useState('DRAFT');

    useEffect(() => {
        if (isEditMode) {
            const found = articles.find(a => a.id === id);
            if (found) {
                setTitle(found.title);
                setContent(found.content);
                setState(found.state);
            } else if (articles.length === 0) {
                dispatch(fetchArticles());
            }
        }
    }, [id, isEditMode, articles]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = { title, content, state };
        let resultAction;

        if (isEditMode) {
            resultAction = await dispatch(updateArticle({ id, data: payload }));
        } else {
            resultAction = await dispatch(createArticle(payload));
        }

        if (createArticle.fulfilled.match(resultAction) || updateArticle.fulfilled.match(resultAction)) {
            toast.success(isEditMode ? "Article updated!" : "Article created!");
            console.log("Redirecting to /articles");
            navigate('/articles');
        } else {
            toast.error(resultAction.payload || "Failed to save article");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="mx-auto max-w-4xl rounded-lg bg-white p-8 shadow">
                <button onClick={() => navigate('/articles')} className="mb-4 flex items-center text-gray-500 hover:text-gray-700">
                    <ArrowLeft size={16} className="mr-1" /> Back to Dashboard
                </button>

                <h1 className="mb-6 text-2xl font-bold">{isEditMode ? 'Edit Article' : 'Create New Article'}</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Title</label>
                        <input
                            type="text" required
                            className="mt-1 w-full rounded border border-gray-300 p-2"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">State</label>
                        <select
                            className="mt-1 w-full rounded border border-gray-300 p-2"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                        >
                            <option value="DRAFT">Draft</option>
                            <option value="PUBLISHED">Published</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Content</label>
                        <div className="mt-1 bg-white">
                            <ReactQuill
                                theme="snow"
                                value={content}
                                onChange={setContent}
                                className="h-64"
                            />
                        </div>
                        <div className="h-12"></div>
                    </div>

                    <div className="flex justify-end pt-4">
                        <button
                            disabled={isLoading}
                            className="flex items-center gap-2 rounded bg-primary px-6 py-2 font-bold text-white hover:bg-blue-700 disabled:opacity-50"
                        >
                            <Save size={18} /> {isLoading ? 'Saving...' : 'Save Article'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ArticleForm;