import {lazy, Suspense} from "react";
import {Route, Routes} from "react-router-dom";

import {MainLayout} from "./layout";

const HomePage = lazy(() => import('./home/page'));
const ResdenceComplexCatalogPage = lazy(() => import('./residential-complexes/page'));
const Apartments = lazy(() => import('../apartments/page.tsx'))
const Parking = lazy(() => import('../parking/page.tsx'))
const Boxrooms = lazy(() => import('../boxrooms/page.tsx'))
const Commerce = lazy(() => import('../commerce/page.tsx'))
const ResdenceComplexDetailPage = lazy(() => import('./residential-complexes/dynamicPage'));
export function MainRoutes(){
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route index element={<HomePage />} />
                <Route path={'residential-complexes/:id'} element={<ResdenceComplexDetailPage />} />
                <Route path={'residential-complexes/'} element={
                    <Suspense fallback={<></>}><ResdenceComplexCatalogPage /> </Suspense>} />

                <Route path={'apartments/'} element={
                    <Suspense fallback={<></>}> <Apartments/> </Suspense>} />
                <Route path={'parking/'} element={
                    <Suspense fallback={<></>}> <Parking/> </Suspense>} />
                <Route path={'boxrooms/'} element={
                    <Suspense fallback={<></>}> <Boxrooms/> </Suspense>} />
                <Route path={'commerce/'} element={
                    <Suspense fallback={<></>}> <Commerce/> </Suspense>} />
            </Route>
           
        </Routes>
    )
}