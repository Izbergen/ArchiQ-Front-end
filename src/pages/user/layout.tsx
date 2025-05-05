import { Outlet } from "react-router-dom";
import Navbar from "@/general/components/NavBar/Navbar.tsx";
import Footer from "@/general/components/Footer/Footer.tsx";
import { Flex, Box } from "@chakra-ui/react";

export function UserLayout() {
    return (
        <Flex bg={'#F8F8F8'} h='100vh' direction={'column'} position={'relative'}>
            <Navbar />
            <Box flexGrow={1}>
                <Outlet />
            </Box>
            <Footer />
        </Flex>
    );
} 