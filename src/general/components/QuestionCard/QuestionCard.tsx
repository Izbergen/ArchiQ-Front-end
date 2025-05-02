import {
    Box,
    Heading,
    Text,
    HStack,
    VStack,
} from "@chakra-ui/react";
import { Button } from "@/general/components/ui/Button";
import { FONTS } from "@/general/constants";
import {Input} from "@/general/components/ui/Input/Input.tsx";
import React from "react";
import {PhoneInput} from "@/pages/auth/_general/components";
import {Container} from "@/general/components/ui/Container/Container";
const QuestionCard: React.FC = () => (
    <Container py={"82px"}>

        <Box

            as="form"
            bg="white"
            p={{ base: 6, md: 8 }}
            borderRadius="25px"
            boxShadow="2xl"
            maxW={'895px'}
            mx="auto"
        >
            <VStack>
                <Heading
                    fontFamily={FONTS.StyreneALC.BOLD}
                    fontSize="36px"
                    textAlign="center"
                    color={'#52A0FF'}
                >
                    Any questions left?
                </Heading>

                <Text
                    fontFamily={FONTS.StyreneALC.REGULAR}
                    fontSize="20px"
                    width={'500px'}
                    textAlign="center"
                    pt={'10px'}
                    pb={'5px'}
                >
                    Fill out the form and a personal manager will contact you and answer all
                    your questions
                </Text>

                <HStack
                    w="full"

                    flexWrap="wrap"
                    justify="center"
                >
                    <Box w={{ base: "100%", md: "45%" }}>
                        <Text
                            fontFamily={FONTS.StyreneALC.BOLD}
                            fontSize="16px"
                            mb={2}
                            textAlign="center"
                        >
                            Your name
                        </Text>
                        <Input
                            placeholder="Your name"
                            fontFamily={FONTS.StyreneALC.REGULAR}
                            fontSize="24px"
                            textAlign="center"
                        />
                    </Box>

                    <Box w={{ base: "100%", md: "45%" }} pt={'5px'} pb={'10px'}>
                        <Text
                            fontFamily={FONTS.StyreneALC.BOLD}
                            fontSize="16px"
                            mb={2}
                            textAlign="center"
                        >
                            Your phone
                        </Text>
                        <PhoneInput
                            placeholder="+7 777 777 77 77"
                            fontFamily={FONTS.StyreneALC.REGULAR}
                            fontSize={'24px'}
                            textAlign="center"

                        />
                    </Box>
                </HStack>

                <Button
                    type="submit"
                    borderRadius="15px"
                    py="20px"
                    px="40px"
                    fontFamily={FONTS.StyreneALC.BOLD}
                >
                    Order consultation
                </Button>
            </VStack>
        </Box>
    </Container>
);

export default QuestionCard;
