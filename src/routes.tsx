import {lazy, Suspense} from "react";
import {Route, Routes} from "react-router-dom";

import {AppLayout} from "@/pages/Layout.tsx";

import {HomeSkeleton} from "@/pages/Home";

const HomePage = lazy(() => import('@/pages/Home'));


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
        </Routes>
    )
}