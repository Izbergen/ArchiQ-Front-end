import React from 'react'
import {
    Box,
    Heading,
    Text,
    Link,
    useBreakpointValue,
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
            width={'90vw'}
            position="relative"
            bgImage={`url(${backgroundImage})`}
            bgSize="cover"
            bgPos="center"
            borderRadius="2xl"
            overflow="hidden"
            minH={{ base: '300px', md: '400px' }}
        >
            {/* dark overlay */}
            <Box
                position="absolute"
                inset={0}
                bg="blackAlpha.600"
            />

            {/* content */}
            <Box
                position="relative"
                color="white"
                p={padding}
                height="100%"
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
            >
                <Box>
                    <Heading fontSize={logoSize} fontWeight="bold" mb={4}>
                        {logoText}
                    </Heading>

                    <Text
                        fontSize={descSize}
                        maxW={{ base: 'full', md: '2xl' }}
                        lineHeight="tall"
                    >
                        {description}
                    </Text>
                </Box>

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
            </Box>
        </Box>
    )
}

export default SingleBanner
