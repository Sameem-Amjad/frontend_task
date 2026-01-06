import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '@/redux/features/auth/authThunk';
import { clearMessages } from '@/redux/features/auth/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { UserPlus } from 'lucide-react';

const Register = () => {
    const [formData, setFormData] = useState({ email: '', password: '', role: 'VIEWER' });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, error, successMessage } = useSelector((state) => state.auth);

    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage);
            dispatch(clearMessages());

            navigate('/verify-otp', { state: { email: formData.email } });
        }
        if (error) {
            toast.error(error);
            dispatch(clearMessages());

        }
    }, [successMessage, error, navigate, dispatch, formData.email]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(registerUser(formData));
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
                <div className="mb-6 text-center">
                    <UserPlus className="mx-auto h-12 w-12 text-primary" />
                    <h2 className="mt-2 text-2xl font-bold text-gray-800">Create Account</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email" required
                            className="mt-1 w-full rounded border border-gray-300 p-2"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password" required
                            className="mt-1 w-full rounded border border-gray-300 p-2"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Role</label>
                        <select
                            className="mt-1 w-full rounded border border-gray-300 p-2"
                            value={formData.role}
                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        >
                            <option value="VIEWER">Viewer (Read Only)</option>
                            <option value="EDITOR">Editor</option>
                            {/* <option value="ADMIN">Admin</option> */}
                        </select>
                    </div>
                    <button
                        disabled={isLoading}
                        className="w-full rounded bg-primary py-2 font-bold text-white hover:bg-blue-700 disabled:opacity-50"
                    >
                        {isLoading ? 'Creating...' : 'Register'}
                    </button>
                </form>
                <p className="mt-4 text-center text-sm">
                    Already have an account? <Link to="/login" className="text-primary hover:underline">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;