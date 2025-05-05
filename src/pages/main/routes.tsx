import {lazy, Suspense} from "react";
import {Route, Routes} from "react-router-dom";

import {MainLayout} from "./layout";

const HomePage = lazy(() => import('./home/page'));
const ResdenceComplexCatalogPage = lazy(() => import('./residential-complexes/page'));
const ResdenceComplexDetailPage = lazy(() => import('./residential-complexes/dynamicPage'));
export function MainRoutes(){
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route index element={<HomePage />} />
                <Route path={'residential-complexes/:id'} element={<ResdenceComplexDetailPage />} />
                <Route path={'residential-complexes/'} element={
                    <Suspense fallback={<></>}><ResdenceComplexCatalogPage /> </Suspense>} />
                    
            </Route>
           
        </Routes>
    )
}