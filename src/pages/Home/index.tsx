import {useDI} from "@/general/hooks/useDI.ts";
import {CoreTypes} from "@/general/di/modules/core";

import {ILoggerService} from "@/general/services/logger";
import Carousel from "@/pages/Home/components/ChakraCarousel.tsx";

export * from './components/PageSkeleton.tsx'

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