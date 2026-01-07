import { Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import Loader from "@/components/global/Loader/index";
import PrivateRoute from "@/components/PrivateRoute/index.jsx";
import PublicRoute from "@/components/PublicRoute/index.jsx";
import Components from "@/utils/componentsImport.js";

const router = createBrowserRouter([
    {
        path: "/login",
        element: (
            <Suspense fallback={<Loader />}>
                <PublicRoute>
                    <Components.Login />
                </PublicRoute>
            </Suspense>
        ),
    },
    {
        path: "/register",
        element: (
            <Suspense fallback={<Loader />}>
                <PublicRoute>
                    <Components.Register />
                </PublicRoute>
            </Suspense>
        ),
    },
    {
        path: "/verify-otp",
        element: (
            <Suspense fallback={<Loader />}>
                <PublicRoute>
                    <Components.VerifyOtp />
                </PublicRoute>
            </Suspense>
        ),
    },
    {
        path: "/",
        element: <Navigate to="/articles" replace />
    },
    {
        path: "/articles",
        element: (
            <Suspense fallback={<Loader />}>
                <Components.Dashboard />
            </Suspense>
        ),
    },
    {
        path: "/api-docs",
        element: (
            <Suspense fallback={<Loader />}>
                <Components.ApiDocs />
            </Suspense>
        ),
    },
    {
        element: (
            <Suspense fallback={<Loader />}>
                <PrivateRoute allowedRoles={["ADMIN", "EDITOR"]} />
            </Suspense>
        ),
        children: [
            {
                path: "/articles/create",
                element: (
                    <Suspense fallback={<Loader />}>
                        <Components.ArticleForm />
                    </Suspense>
                ),
            },
            {
                path: "/articles/edit/:id",
                element: (
                    <Suspense fallback={<Loader />}>
                        <Components.ArticleForm />
                    </Suspense>
                ),
            },
        ],
    },
    {
        path: "*",
        element: (
            <Suspense fallback={<Loader />}>
                <Components.PageNotFound />
            </Suspense>
        ),
    },
]);

export default router;