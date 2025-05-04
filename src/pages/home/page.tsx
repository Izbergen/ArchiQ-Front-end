
// import Carousel from "./components/ChakraCarousel.tsx";
// import Banner from "@/pages/home/_general/_components/Banner.tsx";
import {lazy, Suspense, useEffect, useState} from "react";
import {Flex, Text, Heading,  Skeleton, Grid} from "@chakra-ui/react";
import InfoCard from "@/general/components/InfoCard/InfoCard.tsx";
import SingleBanner from "@/general/components/SingleBanner/SingleBanner.tsx";
import {Container} from "@/general/components/ui/Container/Container.tsx";
import {FONTS} from "@/general/constants";
import ResidentialComplex from "@/general/components/ResidentialComplex"
import QuestionCard  from "@/general/components/QuestionCard/QuestionCard.tsx"
const Carousel = lazy(() => import('@/pages/home/_general/_components/ChakraCarousel.tsx'));
import {CoreTypes} from "@/general/di/modules/core";
import {IBannerService} from "@/general/services/banner";
import {useDI} from "@/general/hooks/useDI.ts";
import {IBanner} from "@/pages/home/_general/types.ts";
import {Banner} from "@/pages/home/_general/_components/Banner.tsx";
export default function HomePage() {
    const bannerService = useDI<IBannerService>(CoreTypes.BannerService);
    const [banners, setBanners] = useState<IBanner[]>([]);

    // fetch _once_
    useEffect(() => {
        bannerService.getBanners()
            .then(setBanners)
            .catch(err => console.error("Failed to load banners", err));
    }, [bannerService]);
    return (
        <Container>
            {banners.length > 0 &&

                <Suspense fallback={<Skeleton height="720px" borderRadius="25px" />}>
                    <Carousel >
                        {banners.map(b => (
                            <Banner key={b.id} {...b} />
                        ))}
                    </Carousel>

                </Suspense>
            }
            {banners.length <= 0 && <Skeleton height="720px">
                <Text>Hello world</Text>
            </Skeleton>}

                <Flex gap={'20px'} py={'21px'}  >
                    <InfoCard title="Smart management system" subtitle="Be part of your property"/>
                    <InfoCard title="Stability" subtitle="All crew jumped, Nothing happened"/>
                    <InfoCard title="Installments" subtitle="50% and your three generations of debtors"/>
                </Flex>
            <Skeleton height="126px" py={'16px'}/>
            <Skeleton width="511px" height="21px" pb={"21px"}/>
            <Grid templateColumns="repeat(2, 1fr)" py='16px' gap={"20px"}>
                <ResidentialComplex/>
                <ResidentialComplex/>
                <ResidentialComplex/>
            </Grid>
            <Flex justifyContent="center" py="21px" direction={'column'} alignItems={'start'}>
                <Heading fontFamily={FONTS.StyreneALC.BOLD} fontSize={'48px'} pb={'48px'}>
                    About us
                </Heading>
                <SingleBanner
                    backgroundImage='https://images.unsplash.com/photo-1612852098516-55d01c75769a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDR8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=900&q=60'
                    logoText="SDU Residence"
                    description="Your perfect choice for modern life. Cozy apartments, green zones and safe environment will create ideal conditions for your family."
                    detailLink="/residences/sdu"
                    detailText="Learn more"
                />

            </Flex>
            <Flex gap={'20px'} pt={'21px'} pb={"92px"}  >
                <InfoCard title="2025" subtitle="Company creation year"/>
                <InfoCard title="650 000 м²" subtitle="Overall covered area"/>
                <InfoCard title="100 projects" subtitle="Were finished by us"/>
            </Flex>
            <QuestionCard/>
        </Container>
    )
}