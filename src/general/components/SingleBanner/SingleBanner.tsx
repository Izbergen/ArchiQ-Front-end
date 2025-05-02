import React from 'react'
import {
    Box,
    Heading,
    Text,
    Link,
    useBreakpointValue, HStack, Flex,
} from '@chakra-ui/react'
import { LuArrowUpRight } from "react-icons/lu";


interface HeroBannerProps {
    /** URL of the background image */
    backgroundImage: string
    /** Big logo/title in the top-left */
    logoText?: string
    /** The multi-line description text */
    description: string
    /** Href for the “Подробнее” link */
    detailLink: string
    /** Text for the detail link (defaults to “Подробнее”) */
    detailText?: string
}

const SingleBanner: React.FC<HeroBannerProps> = ({
                                                   backgroundImage,
                                                   logoText = 'LOGO',
                                                   description,
                                                   detailLink,
                                                   detailText = 'Подробнее',
                                               }) => {
    // adjust padding/font sizes on mobile vs desktop
    const padding = useBreakpointValue({ base: 6, md: 12 })
    const logoSize = useBreakpointValue({ base: '3xl', md: '5xl' })
    const descSize = useBreakpointValue({ base: 'sm', md: 'md' })
    const linkSize = useBreakpointValue({ base: 'sm', md: 'md' })

    return (

           <Box
               width="100%"
               position="relative"
            bgImage={`url(${backgroundImage})`}
            bgSize="cover"
            bgPos="center"
            borderRadius="25px"
            overflow="hidden"
            minH={{ base: '300px', md: '400px' }}
            >

            <Box
                position="absolute"
                inset={0}
                bg="blackAlpha.600"
            />


            <Box
                position="relative"
                color="white"
                p={padding}
                height={{ base: '300px', md: '400px' }}
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
            >
                <Flex h={'full'} direction={'column'} justifyContent="space-between" >

                    <Heading fontSize={logoSize} fontWeight="bold" mb={4}>
                        {logoText}
                    </Heading>
                    <HStack justifyContent="space-between" alignItems="baseline" >

                        <Text
                            fontSize={descSize}
                            maxW={{ base: 'full', md: '2xl' }}
                            lineHeight="tall"
                        >
                            {description}
                        </Text>


                        <Link

                            href={detailLink}
                            display="inline-flex"
                            alignItems="center"
                            fontSize={linkSize}
                            color={'white'}
                            fontWeight="semibold"
                        >
                            {detailText}
                            <LuArrowUpRight/>
                        </Link>
                    </HStack>
                </Flex>
            </Box>
        </Box>


    )
}

export default SingleBanner
