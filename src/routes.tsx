import {Route, Routes} from "react-router-dom";

import MainRoutes from "@/pages/main";
import AuthRoutes from "@/pages/auth";
import {UserLayout} from "@/pages/user/layout.tsx";
import UserPage from "@/pages/user/page.tsx";
import AboutUserPage from "@/pages/user/about.tsx";


export default function AppRoutes(){
    return (
        <Routes>
            <Route path="*" element={<MainRoutes />} />
            <Route path="/auth/*" element={<AuthRoutes />} />
            <Route path="/user" element={<UserLayout />}>
                <Route index element={<UserPage />} />
                <Route path="about" element={<AboutUserPage />} />
            </Route>
        </Routes>
    )
}