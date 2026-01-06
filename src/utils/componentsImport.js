import { lazy } from 'react';

const Components = {
    Login: lazy(() => import('@/Pages/Auth/Login/index.jsx')),
    Register: lazy(() => import('@/Pages/Auth/Register/index.jsx')),
    VerifyOtp: lazy(() => import('@/Pages/Auth/VerifyOtp/index.jsx')),
    Dashboard: lazy(() => import('@/Pages/Articles/Dashboard/index.jsx')),
    ArticleForm: lazy(() => import('@/Pages/Articles/Editor/index.jsx')),
    PageNotFound: lazy(() => import('@/Pages/PageNotFound/index.jsx')),
}

export default Components;