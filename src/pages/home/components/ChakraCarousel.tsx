'use client'

import React from 'react'
import {Box, Text, IconButton, useBreakpointValue, Heading, Link, Flex,  VStack} from '@chakra-ui/react'
import { LuChevronRight , LuChevronLeft } from "react-icons/lu";
import Slider, {Settings} from 'react-slick'
import { LuArrowUpRight } from "react-icons/lu";


const settings: Settings = {
  dots: false,
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
             height={'720px'}

          // height="100vh" // на весь экран по высоте
             width="100vw" >
        <Box position={'relative'} width={'90vw'} height={'720px'} >
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
          <Box  borderRadius={'25px'} width={'90vw'} height={'720px'} overflow={'hidden'}>
            <Slider  {...settings} ref={(slider) => setSlider(slider)}>
              {cards.map((url, index) => (
                  <Box
                      key={index}
                      height={'6xl'}
                      position="relative"
                      justifyContent={"end"}
                      backgroundPosition="center"
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
                        backgroundColor: 'rgba(0, 0, 0, 0.5)', // This creates the tinted overlay
                        zIndex: 1,

                      }}
                  >
                    {/*<Text textStyle={'StyreneALCBold'} fontSize={'96px'} color={"white"}>SDU Residence</Text>*/}
                    {/*<Text textStyle={'StyreneALCMiddle'} fontSize={'24px'} color={'white'}>Your perfect choice for modern life</Text>*/}

                    <Flex
                        position="relative"
                        bottom={0}
                        top={550}
                        left={0}
                        right={0}
                        justifyContent="space-between"
                        alignItems="center"
                        color="white"
                        p={{ base: 4, md: 8 }}
                        zIndex={2}
                    >
                      <VStack gap={"30px"} alignItems="start" >
                        <Heading


                            textStyle={'StyreneALCBold'}
                            fontSize={'96px'}
                            as="h2"
                            size={{ base: 'xl', md: '2xl' }}
                            mb={2}
                            color="white"
                        >
                          SDU Residence
                        </Heading>
                        <Text  textStyle={'StyreneALCMiddle'} fontSize={'24px'} color="white">
                          Great place to start modern life
                        </Text>
                      </VStack>
                      <Flex height={"100%"} direction="column" alignItems="center" justifyContent="flex-end">
                        <Link
                            marginTop={"auto"}
                            href="/slide"
                            color="white"
                            textDecoration="none"
                            _hover={{ textDecoration: 'underline' }}
                            fontSize={'24px'}

                        >
                          Learn more <LuArrowUpRight  size={'24px'} color={'white'} />

                        </Link>

                      </Flex>
                    </Flex>
                  </Box>

              ))}

            </Slider>
          </Box>
        </Box>
      </Box>
  )
}