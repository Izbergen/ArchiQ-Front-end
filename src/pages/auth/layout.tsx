import {Box ,Center} from "@chakra-ui/react";
import {COLORS} from "@/general/constants/colors.constants.ts";
import {Outlet} from "react-router-dom";

export function AuthLayout() {
    return (
        <Center height={'100vh'} bgColor={COLORS["bg-1"]}>
            <Box borderRadius={'30px'} width={'895px'} bgColor={'white'} boxShadow="0px 0px 15px 0px #00000040" px={'128px'} py={'40px'}>
                <Outlet />
            </Box>
        </Center>

    )
}