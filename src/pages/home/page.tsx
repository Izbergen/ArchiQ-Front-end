import {useDI} from "@/general/hooks/useDI.ts";
import {CoreTypes} from "@/general/di/modules/core";

import {ILoggerService} from "@/general/services/logger";
import Carousel from "./_components/ChakraCarousel.tsx";
import Navbar from "./_components/Navbar";

export default function HomePage() {
    const service = useDI<ILoggerService>(CoreTypes.LoggerService)
    service.log("HomePage")
    return (
        <>
            <Navbar/>
            <Carousel/>
        </>
    )
}