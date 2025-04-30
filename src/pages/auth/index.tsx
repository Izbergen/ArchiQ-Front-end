import {lazy, Suspense} from 'react';
import {Route, Routes} from "react-router-dom";

import {AuthLayout} from "@/pages/auth/layout.tsx";

import AuthSkeleton from "./skeleton.tsx";

const VerifyUserPage = lazy(() => import('./verify-user/page'))
const OTPCodePage = lazy(() => import('./otp-code/page'))
export default function AuthRoutes(){
    return (
        <Routes>
            <Route path={'/'} element={<AuthLayout />}>
                <Route index element={
                    <Suspense fallback={<AuthSkeleton />}>
                        <VerifyUserPage />
                    </Suspense>} />
                <Route path={'/otp-code'} element={
                    <Suspense fallback={<AuthSkeleton />}>
                        <OTPCodePage />
                    </Suspense>
                } />
            </Route>
        </Routes>
    )
}