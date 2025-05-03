import {useDI} from "@/general/hooks/useDI.ts";
import {CoreTypes} from "@/general/di/modules/core";
import {Suspense} from "react";
import {ILoggerService} from "@/general/services/logger";
// import Carousel from "./components/ChakraCarousel.tsx";
import {lazy} from "react";
import {Flex, Text, Heading, HStack, Skeleton, VStack, Link} from "@chakra-ui/react";
import InfoCard from "@/general/components/InfoCard/InfoCard.tsx";
import SingleBanner from "@/general/components/SingleBanner/SingleBanner.tsx";
import {LuArrowUpRight} from "react-icons/lu";
import SDUPNG from '@/general/assets/colors/sdu.png'
import {Container} from "@/general/components/ui/Container/Container.tsx";
import {FONTS} from "@/general/constants";
import QuestionCard  from "@/general/components/QuestionCard/QuestionCard.tsx"
const Carousel = lazy(() => import('./_components/ChakraCarousel.tsx'));

export default function HomePage() {
    const service = useDI<ILoggerService>(CoreTypes.LoggerService)
    const cards = [
        SDUPNG,
        'https://images.unsplash.com/photo-1627875764093-315831ac12f7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=900&q=60',
        'https://images.unsplash.com/photo-1571432248690-7fd6980a1ae2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDl8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=900&q=60',
    ]
    service.log("HomePage")
    return (
        <Container>

            <Suspense fallback={<Skeleton height="200px" />}>

                <Carousel >
                    {cards.map((url, index) => (
                        <Flex
                            key={index}
                            height="720px"
                            position="relative"
                            backgroundPosition="top center"
                            backgroundRepeat="no-repeat"
                            backgroundSize="cover"
                            backgroundImage={`url(${url})`}
                            _before={{
                                content: '""',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                zIndex: 1,
                            }}
                        >
                            <Container
                                position="absolute"
                                bottom={0}
                                left={0}
                                right={0}
                                color="white"
                                p={{ base: 4, md: 8 }}
                                zIndex={2}
                                maxW="100vw"
                            >
                                <HStack justifyContent="space-between" alignItems="center">
                                    <VStack gap="30px" alignItems="start">
                                        <Heading
                                            textStyle="StyreneALCBold"
                                            fontSize="96px"
                                            as="h2"
                                            size={{ base: 'xl', md: '2xl' }}
                                            mb={2}
                                            color="white"
                                        >
                                            SDU Residence
                                        </Heading>
                                        <Text textStyle="StyreneALCMiddle" fontSize="24px" color="white">
                                            Great place to start modern life
                                        </Text>
                                    </VStack>
                                    <VStack>
                                        <Link
                                            marginTop="auto"
                                            href="/slide"
                                            color="white"
                                            textDecoration="none"
                                            _hover={{ textDecoration: 'underline' }}
                                            fontSize="24px"
                                        >
                                            Learn more <LuArrowUpRight size="24px" color="white" />
                                        </Link>
                                    </VStack>
                                </HStack>
                            </Container>
                        </Flex>
                    ))}
                </Carousel>

            </Suspense>

                <Flex gap={'20px'} py={'21px'}  >
                    <InfoCard title="Smart management system" subtitle="Be part of your property"/>
                    <InfoCard title="Stability" subtitle="All crew jumped, Nothing happened"/>
                    <InfoCard title="Installments" subtitle="50% and your three generations of debtors"/>
                </Flex>

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