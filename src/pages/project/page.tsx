import Header from "./_general/components/header.tsx"
import {Container} from "@/general/components/ui/Container/Container.tsx";
import SDUPNG from '@/general/assets/colors/sdu.png'
import Banner from "@/pages/project/_general/components/Banner.tsx";
import AboutProject from "@/pages/project/_general/components/AboutProject.tsx";
import ChakraCarousel from "@/pages/home/_general/_components/ChakraCarousel.tsx"
import {Box, Flex} from "@chakra-ui/react";
import QuestionCard from "@/general/components/QuestionCard/QuestionCard.tsx";
export default function ProjectPage() {
    const cards = [
        SDUPNG,
        'https://images.unsplash.com/photo-1627875764093-315831ac12f7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=900&q=60',
        'https://images.unsplash.com/photo-1571432248690-7fd6980a1ae2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDl8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=900&q=60',
    ]
    return (
        <Container>
            <Header project={{title: "Project", about_link:"hello", gallery_link: "hello", pdf_link:"hello"}}/>
            <Banner url={SDUPNG}></Banner>
            <AboutProject/>
            <Box pb={'98px'}>
                <ChakraCarousel>
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

                        </Flex>
                    ))}
                </ChakraCarousel>
            </Box>
            <Box pb={'82px'}>
                <QuestionCard/>
            </Box>
        </Container>


    );
};

