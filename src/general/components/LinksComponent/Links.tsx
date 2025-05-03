import React from 'react'
import { Box, VStack, Link, Text } from '@chakra-ui/react'

type SubtitleItem = {
    subtitle: string
    link: string
}

interface SubtitlesProps {
    title: string
    items?: SubtitleItem[]
    fontSize?: string | number
    subFontSize?: string | number
    gap?: number | string
}

export const LinksComponent: React.FC<SubtitlesProps> = ({ title, items, fontSize='36px', subFontSize="20px", gap=2 }) => (
    <Box as="section">
        <Text as="h2" textStyle="StyreneALCBold" color={'#52A0FF'} fontSize={fontSize} >
            {title}
        </Text>
        <VStack align="start" gap={gap}>
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
                    <Text key={i}  color={'#181818'} fontStyle="StyreneALCRegular" fontSize={subFontSize}>
                        {subtitle}
                    </Text>
                )
            )}
        </VStack>
    </Box>
)

export default LinksComponent
