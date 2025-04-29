import {useDI} from "@/general/hooks/useDI.ts";
import {ILoggerService} from "@/general/services/logger";
import {CoreTypes} from "@/general/di/modules/core";
import Carousel from "@/pages/home/components/ChakraCarousel.tsx";

export default function HomePage() {
    const service = useDI<ILoggerService>(CoreTypes.LoggerService)
    service.log("HomePage")
    return (
        <>
            <div className={'text-amber-300'}>hsbcjhbdkscjhsdbjcbsdjhcbsdjhcbsdjhbchjsdc</div>
            <Carousel />
        </>
    )
}