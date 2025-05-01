'use client'

import React from 'react'
import { Box, Text, IconButton, useBreakpointValue } from '@chakra-ui/react'
import { LuChevronRight , LuChevronLeft } from "react-icons/lu";
import Slider, {Settings} from 'react-slick'

const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true
}

export default function Carousel() {
    const [slider, setSlider] = React.useState<Slider | null>(null)

    const top = useBreakpointValue({ base: '90%', md: '50%' })
    // const side = useBreakpointValue({ base: '30%', md: '-30%' })

    const cards = [
        'https://images.unsplash.com/photo-1612852098516-55d01c75769a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDR8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=900&q=60',
        'https://images.unsplash.com/photo-1627875764093-315831ac12f7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=900&q=60',
        'https://images.unsplash.com/photo-1571432248690-7fd6980a1ae2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDl8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=900&q=60',
    ]

    return (
        <Box   display="flex"
               justifyContent="center"
               alignItems="center"
               // height="100vh" // на весь экран по высоте
               width="100vw" >
            <Box position={'relative'} width={'90vw'} height={'720px'}>
                {/* CSS files for react-slick */}
                <link
                    rel="stylesheet"
                    type="text/css"
                    href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
                />
                <link
                    rel="stylesheet"
                    type="text/css"
                    href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
                />
                <IconButton
                    aria-label="left-arrow"
                    colorScheme="messenger"
                    borderRadius="full"
                    position="absolute"
                    backgroundColor="#52A0FF"
                    width={'48px'}
                    height={'48px'}
                    left={'-24px'}
                    borderWidth={'5px'}
                    borderColor={'white'}
                    top={top}
                    transform={'translate(0%, -50%)'}
                    zIndex={100}
                    _hover={{bg: '#31619C'}}
                    onClick={() => slider?.slickPrev()}>
                    <LuChevronLeft width={100} />
                </IconButton>

                <IconButton
                    aria-label="right-arrow"
                    colorScheme="messenger"
                    borderRadius="full"
                    borderWidth={'5px'}
                    backgroundColor={'#52A0FF'}
                    width={'48px'}
                    height={'48px'}
                    borderColor={'white'}
                    position="absolute"
                    right={'-24px'}
                    top={top}
                    transform={'translate(0%, -50%)'}
                    zIndex={100}
                    _hover={{bg: '#31619C'}}
                    onClick={() => slider?.slickNext()}>
                    <LuChevronRight width={10} />
                </IconButton>
                <Box width={'90vw'} height={'720px'} overflow={'hidden'}>
                    <Slider  {...settings} ref={(slider) => setSlider(slider)}>
                        {cards.map((url, index) => (
                            <Box
                                key={index}
                                height={'6xl'}
                                position="relative"
                                backgroundPosition="center"
                                backgroundRepeat="no-repeat"
                                backgroundSize="cover"
                                backgroundImage={`url(${url})`}
                            >
                                <Text textStyle={'StyreneALCBold'} fontSize={'96px'} color={"white"}>SDU Residence</Text>
                                <Text textStyle={'StyreneALCMiddle'} fontSize={'24px'} color={'white'}>Your perfect choice for modern life</Text>
                            </Box>

                        ))}

                    </Slider>
                </Box>
            </Box>
        </Box>
    )
}