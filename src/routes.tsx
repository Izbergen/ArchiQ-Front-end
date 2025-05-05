import {Route, Routes} from "react-router-dom";

import MainRoutes from "@/pages/main";
import AuthRoutes from "@/pages/auth";


export default function AppRoutes(){
    return (
        <Routes>
            <Route path="*" element={<MainRoutes />} />
            <Route path="/auth/*" element={<AuthRoutes />} />
        </Routes>
    )
}