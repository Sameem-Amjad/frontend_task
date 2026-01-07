import React, { useMemo } from 'react';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';
import yaml from 'js-yaml';
import { swaggerYaml } from '@/data/swaggerConfig.js';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ApiDocs = () => {
    const navigate = useNavigate();

    // Parse YAML to JSON object efficiently
    const spec = useMemo(() => {
        try {
            return yaml.load(swaggerYaml);
        } catch (e) {
            console.error("YAML Parse Error", e);
            return {};
        }
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b px-6 py-4 flex items-center justify-between sticky top-0 z-50">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/articles')}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600"
                        title="Back to App"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <h1 className="text-xl font-bold text-gray-800">API Documentation</h1>
                </div>
                <div className="text-sm text-gray-500">
                    v1.0.0
                </div>
            </div>

            {/* Swagger UI Container */}
            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                    <SwaggerUI
                        spec={spec}
                        filter={true} // Enables the search bar
                        docExpansion="list" // 'none', 'list', or 'full'
                        defaultModelsExpandDepth={-1} // Hides schemas at bottom for cleaner look
                        persistAuthorization={true} // Remembers token if user refreshes
                    />
                </div>
            </div>
        </div>
    );
};

export default ApiDocs;