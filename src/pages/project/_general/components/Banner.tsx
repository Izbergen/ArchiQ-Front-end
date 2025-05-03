import React from 'react';
import {Container} from "@/general/components/ui/Container/Container.tsx";
import {Flex, Heading, HStack, Link, Text, VStack} from "@chakra-ui/react";
import {LuArrowUpRight} from "react-icons/lu";

interface Props {
    height?: string | number;
    width?: string | number;
    children?: React.ReactNode;
    url?: string;
}
export default function Banner({height = '553px', url}: Props) {
    return (
        <Flex
            height={height}
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
    );
}

