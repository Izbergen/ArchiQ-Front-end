import {ReactNode} from "react";

import {ChakraProvider, SystemContext} from "@chakra-ui/react";
import {defaultSystem} from "@/general/config/ui.config.ts";


export const UIProvider = ({children , system = defaultSystem } : {children: ReactNode , system? : SystemContext}) => (
    <ChakraProvider value={system}>
        {children}
    </ChakraProvider>
)
