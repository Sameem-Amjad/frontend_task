import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '@/redux/features/auth/authThunk';
import { clearMessages } from '@/redux/features/auth/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { LogIn } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, error, isAuthenticated } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isAuthenticated) navigate('/articles');
        if (error) {
            toast.error(error);
            dispatch(clearMessages());
        }
    }, [isAuthenticated, error, navigate, dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser({ email, password }));
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
                <div className="mb-6 text-center">
                    <LogIn className="mx-auto h-12 w-12 text-primary" />
                    <h2 className="mt-2 text-2xl font-bold text-gray-800">Welcome Back</h2>
                    <p className="text-gray-600">Sign in to manage your content</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            required
                            className="mt-1 w-full rounded border border-gray-300 p-2 focus:border-primary focus:outline-none"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            required
                            className="mt-1 w-full rounded border border-gray-300 p-2 focus:border-primary focus:outline-none"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        disabled={isLoading}
                        className="w-full rounded bg-primary py-2 font-bold text-white hover:bg-blue-700 disabled:opacity-50"
                    >
                        {isLoading ? 'Signing In...' : 'Sign In'}
                    </button>
                </form>
                <p className="mt-4 text-center text-sm">
                    Don't have an account? <Link to="/register" className="text-primary hover:underline">Register</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;