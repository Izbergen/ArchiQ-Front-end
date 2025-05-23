// import Carousel from "./components/ChakraCarousel.tsx";
// import Banner from "@/pages/home/_general/_components/Banner.tsx";
import {lazy, Suspense, useEffect, useState} from "react";
import {Flex, Text, Heading,  Skeleton} from "@chakra-ui/react";
import InfoCard from "@/general/components/InfoCard/InfoCard.tsx";
import SingleBanner from "@/general/components/SingleBanner/SingleBanner.tsx";
import {Container} from "@/general/components/ui/Container/Container.tsx";
import {FONTS} from "@/general/constants";
import QuestionCard  from "@/general/components/QuestionCard/QuestionCard.tsx"
const Carousel = lazy(() => import('./_general/_components/ChakraCarousel'));
import {CoreTypes} from "@/general/di/modules/core";
import {IBannerService} from "@/general/services/banner";
import {useDI} from "@/general/hooks/useDI.ts";
import {IBanner} from "./_general/types";
import {Banner} from "./_general/_components/Banner";
import ProjectsModule from "@/modules/ResidenceComplexCatalog";
export default function HomePage() {
    const bannerService = useDI<IBannerService>(CoreTypes.BannerService);
    const [banners, setBanners] = useState<IBanner[]>([]);

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
            
            <ProjectsModule />
            <Flex justifyContent="center" py="21px" direction={'column'} alignItems={'start'}>
                <Heading fontFamily={FONTS.StyreneALC.BOLD} fontSize={'48px'} pb={'48px'}>
                    About us
                </Heading>
                <SingleBanner
                    backgroundImage='https://images.wallpaperscraft.com/image/single/skyscraper_building_architecture_112550_1600x900.jpg'
                    logoText="ArchiQ"
                    description="ArchiQ merges visionary design and expert craftsmanship to deliver sustainable, high-quality construction projects tailored to each client's unique vision."
                    detailLink="/user/about"
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