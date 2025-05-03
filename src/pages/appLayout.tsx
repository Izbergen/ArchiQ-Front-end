import {Outlet} from "react-router-dom";
import Navbar from "@/general/components/NavBar/Navbar.tsx";
import Footer from "@/general/components/Footer/Footer.tsx";
import {Box} from "@chakra-ui/react";
export function AppLayout() {

    return (
        <Box bg={'#F8F8F8'}>
        <Navbar/>
        <Outlet />
        <Footer/>
    </Box>
    )
}