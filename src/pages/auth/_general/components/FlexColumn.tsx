import {Flex} from "@chakra-ui/react";
import {ReactNode} from "react";

export const FlexColumn = ({children} : {children: ReactNode}) => {
    return (
        <Flex
            direction="column"
            align="center"
            justify="center"
            p={4}
        >
            {children}
        </Flex>)

}