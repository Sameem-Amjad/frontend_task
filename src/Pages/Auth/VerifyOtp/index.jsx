import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { verifyOtp } from '@/redux/features/auth/authThunk';
import { clearMessages } from '@/redux/features/auth/authSlice';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { ShieldCheck } from 'lucide-react';

const VerifyOtp = () => {
    const [otp, setOtp] = useState('');
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, successMessage, error } = useSelector((state) => state.auth);

    const email = location.state?.email;

    useEffect(() => {
        if (!email) {
            toast.error("No email found. Please register again.");
            navigate('/register');
        }
    }, [email, navigate]);

    useEffect(() => {
        if (successMessage) {
            toast.success("Account Verified!");
            dispatch(clearMessages());
            navigate('/login');
        }
        if (error) {
            toast.error(error);
            dispatch(clearMessages());
        }
    }, [successMessage, error, dispatch, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(verifyOtp({ email, otp }));
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-sm rounded-lg bg-white p-8 shadow-lg">
                <div className="mb-6 text-center">
                    <ShieldCheck className="mx-auto h-12 w-12 text-primary" />
                    <h2 className="mt-2 text-2xl font-bold text-gray-800">Enter OTP</h2>
                    <p className="text-sm text-gray-600">Sent to {email}</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text" required maxLength={6}
                        placeholder="123456"
                        className="w-full rounded border border-gray-300 p-3 text-center text-2xl tracking-widest focus:border-primary focus:outline-none"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                    />
                    <button
                        disabled={isLoading}
                        className="w-full rounded bg-primary py-2 font-bold text-white hover:bg-blue-700 disabled:opacity-50"
                    >
                        {isLoading ? 'Verifying...' : 'Verify Email'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default VerifyOtp;