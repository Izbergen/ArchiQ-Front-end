import {useDI} from "@/general/hooks/useDI.ts";
import {CoreTypes} from "@/general/di/modules/core";
import {Suspense} from "react";
import {ILoggerService} from "@/general/services/logger";
// import Carousel from "./components/ChakraCarousel.tsx";
import {Text} from "@chakra-ui/react";
import {lazy} from "react";
import {Skeleton} from "@chakra-ui/react";
export * from './components/PageSkeleton'
const Carousel = lazy(() => import('./components/ChakraCarousel.tsx'));

export default function HomePage() {
    const service = useDI<ILoggerService>(CoreTypes.LoggerService)
    const sampleSlides = [
        {
            id: 1,
            title: "SDU Residence",
            subtitle: "Your perfect choice for modern life. Cozy apartments, green zones and safe environment will create ideal conditions for your family.",
            imageUrl: "@/general/assets/colors/sdu.png",
            link: "/residences/sdu"
        },
        {
            id: 2,
            title: "Modern Living Spaces",
            subtitle: "Experience the perfect blend of comfort and style in our carefully designed apartments.",
            imageUrl: "/images/sdu-residence-2.jpg",
            link: "/apartments"
        },
        {
            id: 3,
            title: "Green Environment",
            subtitle: "Surrounded by nature, our residence offers a peaceful and eco-friendly living environment.",
            imageUrl: "/images/sdu-residence-3.jpg",
            link: "/environment"
        }
    ];
    service.log("HomePage")
    return (
        <>

            <Suspense fallback={<Skeleton height="200px" />}>

                <Carousel slides={sampleSlides} />
            </Suspense>
        </>
    )
}