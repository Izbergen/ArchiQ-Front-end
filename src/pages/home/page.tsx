import {useDI} from "@/general/hooks/useDI.ts";
import {CoreTypes} from "@/general/di/modules/core";

import {ILoggerService} from "@/general/services/logger";
import Carousel from "./components/ChakraCarousel.tsx";
import {Text} from "@chakra-ui/react";

export * from './components/PageSkeleton'
export default function HomePage() {
    const service = useDI<ILoggerService>(CoreTypes.LoggerService)
    service.log("HomePage")
    return (
        <>
            <div style={{
                fontFamily: "StyreneALC-Regular"
            }}>hsbcjhbdkscjhsdbjcbsdjhcbsdjhcbsdjhbchjsdc</div>
            <Text textStyle="StyreneALCBold" >hsbcjhbdkscjhsdbjcbsdjhcbsdjhcbsdjhbchjsdc</Text>
        <Carousel />
        </>
    )
}