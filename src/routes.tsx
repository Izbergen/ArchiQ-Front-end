import {lazy} from "react";
import {Route, Routes} from "react-router-dom";

import {AppLayout} from "@/pages/appLayout.tsx";
import AuthRoutes from "@/pages/auth";

const HomePage = lazy(() => import('@/pages/home/page'));
const ProjectPage = lazy(() => import('@/pages/project/page'));
const ApartmentsPage = lazy(() => import('@/pages/apartments/page'));
const BoxroomsPage = lazy(() => import('@/pages/boxrooms/page'));
const ParkingPage = lazy(() => import('@/pages/parking/page'));
const CommercePage = lazy(() => import('@/pages/commerce/page'));

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
            <Route path="/boxrooms" element={<AppLayout />}>
                <Route index element={<BoxroomsPage />} />
            </Route>
            <Route path="/parking" element={<AppLayout />}>
                <Route index element={<ParkingPage />} />
            </Route>
            <Route path="/commerce" element={<AppLayout />}>
                <Route index element={<CommercePage />} />
            </Route>
            <Route path="/auth/*" element={<AuthRoutes />} />
        </Routes>
    )
}