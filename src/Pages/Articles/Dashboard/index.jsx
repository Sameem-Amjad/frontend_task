import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { PlusCircle, Edit, Trash2, LogOut } from 'lucide-react';
import { logout } from '@/redux/features/auth/authSlice';
import { fetchArticles } from '@/redux/features/article/articleThunk';
import { clearArticleMessages } from '@/redux/features/article/articleSlice';
import toast from 'react-hot-toast';
import { handleDelete } from '@/components/ConfirmDeleteToast';

const Dashboard = () => {
    // Select data from Redux Store
    const { user, isAuthenticated } = useSelector((state) => state.auth);
    const { articles, isLoading, error, successMessage } = useSelector((state) => state.article);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Initial Fetch
    useEffect(() => {
        dispatch(fetchArticles());
    }, [dispatch]);

    // Handle Notifications
    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearArticleMessages());
        }
        if (successMessage) {
            toast.success(successMessage);
            dispatch(clearArticleMessages());
        }
    }, [error, successMessage, dispatch]);



    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    const canEdit = (article) => {
        if (!isAuthenticated || !user) return false;

        if (user.role === 'ADMIN') return true;

        if (user.role === 'EDITOR' && article?.author?.id && article.author.id === user.id
        ) return true;

        return false;
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="mx-auto max-w-5xl">
                <header className="mb-8 flex items-center justify-between rounded-lg bg-white p-4 shadow">
                    <h1 className="text-2xl font-bold text-gray-800">Articles</h1>
                    <div className="flex gap-4">
                        {isAuthenticated ? (
                            <>
                                {(user.role === 'ADMIN' || user.role === 'EDITOR') && (
                                    <Link to="/articles/create" className="flex items-center gap-2 rounded bg-primary px-4 py-2 text-white hover:bg-blue-700">
                                        <PlusCircle size={18} /> New Article
                                    </Link>
                                )}
                                <button onClick={handleLogout} className="flex items-center gap-2 rounded border border-gray-300 px-4 py-2 hover:bg-gray-100">
                                    <LogOut size={18} /> Logout
                                </button>
                            </>
                        ) : (
                            <Link to="/login" className="rounded bg-primary px-4 py-2 text-white">Login</Link>
                        )}
                    </div>
                </header>

                {isLoading && articles.length === 0 ? (
                    <p className="text-center text-gray-500">Loading articles...</p>
                ) : (
                    <div className="grid gap-6">
                        {articles.map((article) => (
                            <article key={article.id} className="rounded-lg bg-white p-6 shadow transition hover:shadow-md">
                                <div className="flex justify-between">
                                    <h2 className="text-xl font-bold text-gray-900">{article.title}</h2>
                                    <span className={`rounded px-2 py-1 text-xs font-bold ${article.state === 'PUBLISHED' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                        {article.state}
                                    </span>
                                </div>
                                <div className="mt-2 text-sm text-gray-500">
                                    By {article.author?.email} | {new Date(article.createdAt).toLocaleDateString()}
                                </div>
                                {/* Render HTML content safely */}
                                <div className="mt-4 prose max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: article.content }} />

                                {canEdit(article) && (
                                    <div className="mt-4 flex gap-3 border-t pt-4">
                                        <Link to={`/articles/edit/${article.id}`} className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800">
                                            <Edit size={16} /> Edit
                                        </Link>
                                        {user.role === 'ADMIN' && (
                                            <button onClick={() => handleDelete(article.id)} className="flex items-center gap-1 text-sm font-medium text-red-600 hover:text-red-800">
                                                <Trash2 size={16} /> Delete
                                            </button>
                                        )}
                                    </div>
                                )}
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;