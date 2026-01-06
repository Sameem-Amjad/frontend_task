import { AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PageNotFound() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="text-center px-6">
                <AlertCircle className="w-24 h-24 text-red-500 mx-auto mb-6" />
                <h1 className="text-6xl font-bold text-gray-900 mb-2">404</h1>
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                    Page Not Found
                </h2>
                <p className="text-gray-600 mb-8 max-w-md">
                    Sorry, the page you're looking for doesn't exist or has been moved.
                </p>
                <Link
                    to="/"
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition"
                >
                    Go Home
                </Link>
            </div>
        </div>
    );
}