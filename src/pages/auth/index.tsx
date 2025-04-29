import {lazy, Suspense} from 'react';
import {Route, Routes} from "react-router-dom";

import {AuthLayout} from "@/pages/auth/layout.tsx";

import VerifyUserPageSkeleton from "./verify-user/skeleton";

const VerifyUserPage = lazy(() => import('./verify-user/page'))

export default function AuthRoutes(){
    return (
        <Routes>
            <Route path={'/'} element={<AuthLayout />}>
                <Route index element={
                    <Suspense fallback={<VerifyUserPageSkeleton />}>
                        <VerifyUserPage />
                    </Suspense>} />

            </Route>
        </Routes>
    )
}