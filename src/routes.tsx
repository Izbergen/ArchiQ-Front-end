import {lazy} from "react";
import {Route, Routes} from "react-router-dom";

import {AppLayout} from "@/pages/appLayout.tsx";
import AuthRoutes from "@/pages/auth";

const HomePage = lazy(() => import('@/pages/home/page'));
const ProjectPage = lazy(() => import('@/pages/project/page'));
const ApartmentsPage = lazy(() => import('@/pages/apartments/page'));
export default function AppRoutes(){
    return (
        <Routes>
            <Route path="*" element={<AppLayout />}>
                <Route index element={<HomePage />} />

            </Route>
            <Route path="/project" element={<AppLayout />}>
                <Route index element={<ProjectPage />} />

            </Route>
            <Route path="/apartments" element={<AppLayout />}>
                <Route index element={<ApartmentsPage />} />

            </Route>
            <Route path="/auth/*" element={<AuthRoutes />} />
        </Routes>
    )
}