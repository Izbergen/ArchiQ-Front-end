import {Outlet} from "react-router-dom";
import Navbar from "@/general/components/NavBar/Navbar.tsx";

export function AppLayout() {

    return<>
        <Navbar/>
        <Outlet />
    </>
}