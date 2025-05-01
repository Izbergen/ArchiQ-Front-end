import {Outlet} from "react-router-dom";
import Navbar from "@/general/components/NavBar/Navbar.tsx";
import Footer from "@/general/components/Footer/Footer.tsx";
import {Box} from "@chakra-ui/react";
export function AppLayout() {

    return<>
        <Navbar/>
        <Box bgColor={"#F8F8F8"} minHeight={'100vh'}>
            <Outlet />

        </Box>
        <Footer/>
    </>
}