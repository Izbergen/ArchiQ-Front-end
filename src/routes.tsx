import {Route, Routes} from "react-router-dom";
import {HomePage} from "./pages/Home";
import {AppLayout} from "@/pages/Layout.tsx";

export default function AppRoutes(){
    return (
        <Routes>
            <Route path="/" element={<AppLayout />}>
                <Route path={"home"} element={<HomePage />} />
            </Route>
        </Routes>
    )
}