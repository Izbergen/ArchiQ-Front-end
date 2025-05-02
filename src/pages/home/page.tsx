import {useDI} from "@/general/hooks/useDI.ts";
import {CoreTypes} from "@/general/di/modules/core";
import {Suspense} from "react";
import {ILoggerService} from "@/general/services/logger";
// import Carousel from "./components/ChakraCarousel.tsx";
import {lazy} from "react";
import {Flex, HStack, Skeleton} from "@chakra-ui/react";
import InfoCard from "@/general/components/InfoCard/InfoCard.tsx";
import SingleBanner from "@/general/components/SingleBanner/SingleBanner.tsx";

const Carousel = lazy(() => import('./_components/ChakraCarousel.tsx'));

export default function HomePage() {
    const service = useDI<ILoggerService>(CoreTypes.LoggerService)
    service.log("HomePage")
    return (
        <>

            <Suspense fallback={<Skeleton height="200px" />}>

                <Carousel />
            </Suspense>
            <Flex width="100%" justifyContent="center" py="21px">
                <HStack wrap='wrap' gap="20px">
                    <InfoCard title="Smart management system" subtitle="Be part of your property"/>
                    <InfoCard title="Stability" subtitle="All crew jumped, Nothing happened"/>
                    <InfoCard title="Installments" subtitle="50% and your three generations of debtors"/>
                </HStack>
            </Flex>
            <Flex justifyContent="center" py="21px">
                <SingleBanner
                    backgroundImage='https://images.unsplash.com/photo-1612852098516-55d01c75769a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDR8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=900&q=60'
                    logoText="SDU Residence"
                    description="Your perfect choice for modern life. Cozy apartments, green zones and safe environment will create ideal conditions for your family."
                    detailLink="/residences/sdu"
                    detailText="Learn more"
                />

            </Flex>
        </>
    )
}