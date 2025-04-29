import {lazy, Suspense} from "react";
import {Route, Routes} from "react-router-dom";

import {AppLayout} from "@/pages/layout.tsx";

import {HomeSkeleton} from "@/pages/home";
import {AuthLayout, VerifyUserPage} from "@/pages/auth";

const HomePage = lazy(() => import('@/pages/home'));


export default function AppRoutes(){
    return (
        <Routes>
            <Route path="/" element={<AppLayout />}>
                <Route index element={
                    <Suspense fallback={<HomeSkeleton />}>
                        <HomePage />
                    </Suspense>
                } />
            </Route>
            <Route path={'/auth'} element={<AuthLayout />}>
                <Route index element={<VerifyUserPage />} />
            </Route>
        </Routes>
    )
}