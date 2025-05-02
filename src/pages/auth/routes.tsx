import {lazy, Suspense} from 'react';
import {Route, Routes} from "react-router-dom";

import {AuthLayout} from "@/pages/auth/layout.tsx";

import AuthSkeleton from "./skeleton.tsx";

const CheckPhonePage = lazy(() => import('./check-phone/page'))
const OTPCodePage = lazy(() => import('./otp-code/page'))
const LoginPage = lazy(() => import('./login/page.tsx'))
const RegisterPage = lazy(() => import('./register/page.tsx'))


export function AuthRoutes(){
    return (
        <Routes>
            <Route path={'/'} element={<AuthLayout />}>
                <Route index element={
                    <Suspense fallback={<AuthSkeleton />}>
                        <CheckPhonePage />
                    </Suspense>} />
                <Route path={'/otp-code'} element={
                    <Suspense fallback={<AuthSkeleton />}>
                        <OTPCodePage />
                    </Suspense>
                } />
                <Route path={'/login'} element={
                    <Suspense fallback={<AuthSkeleton />} >
                        <LoginPage />
                    </Suspense>
                } />
                <Route path={'/register'} element={
                    <Suspense fallback={<AuthSkeleton />} >
                        <RegisterPage />
                    </Suspense>
                } />
            </Route>
        </Routes>
    )
}
