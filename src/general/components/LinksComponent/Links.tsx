import React from 'react'
import { Box, VStack, Link, Text } from '@chakra-ui/react'

type SubtitleItem = {
    subtitle: string
    link: string
}

interface SubtitlesProps {
    title: string
    items?: SubtitleItem[]
}

export const LinksComponent: React.FC<SubtitlesProps> = ({ title, items }) => (
    <Box as="section">
        <Text as="h2" textStyle="StyreneALCBold" color={'#52A0FF'} fontSize="36px" mb={4}>
            {title}
        </Text>
        <VStack align="start" gap={2}>
            {items?.map(({ subtitle, link }, i) =>
                link ? (
                    <Link
                        fontStyle="StyreneALCRegular"
                        key={i}
                        href={link}
                        fontSize="20px"
                        color={'#181818'}
                        _hover={{ textDecoration: 'underline', color: 'blue.500' }}
                    >
                        {subtitle}
                    </Link>
                ) : (
                    <Text key={i}  color={'#181818'} fontStyle="StyreneALCRegular" fontSize="20px">
                        {subtitle}
                    </Text>
                )
            )}
        </VStack>
    </Box>
)

export default LinksComponent
