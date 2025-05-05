import React, { useState } from "react";
import {
    Box,
    Heading,
    Text,
    HStack,
    VStack,
} from "@chakra-ui/react";
import { Button } from "@/general/components/ui/Button";
import { FONTS } from "@/general/constants";
import { Input } from "@/general/components/ui/Input/Input.tsx";
import { PhoneInput } from "@/pages/auth/_general/components";
import { Container } from "@/general/components/ui/Container/Container";
import { useDI } from "@/general/hooks/useDI";
import { CoreTypes } from "@/general/di/modules/core";
import type { IAxiosService } from "@/general/services/axios";
import { toaster } from "@/general/components/ui/toaster";

const API_URL = "applications/apply/";

const QuestionCard: React.FC = () => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");

    const axiosService = useDI<IAxiosService>(CoreTypes.AxiosService);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axiosService.post(API_URL, {
                name,
                phone_number: phone,
            });
            toaster.success("Ваша заявка отправлена! Мы свяжемся с вами.");
            setName("");
            setPhone("");
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            toaster.error("Ошибка при отправке заявки. Попробуйте еще раз.");
        }
    };

    return (
        <Container>
            <Box
                as="form"
                bg="white"
                p={{ base: 6, md: 8 }}
                borderRadius="25px"
                boxShadow="2xl"
                maxW={'895px'}
                mx="auto"
                onSubmit={handleSubmit}
            >
                <VStack>
                    <Heading
                        fontFamily={FONTS.StyreneALC.BOLD}
                        fontSize="36px"
                        textAlign="center"
                        color={'#52A0FF'}
                    >
                        У вас ещё остались вопросы?
                    </Heading>
                    <Text
                        fontFamily={FONTS.StyreneALC.REGULAR}
                        fontSize="20px"
                        width={'500px'}
                        textAlign="center"
                        pt={'10px'}
                        pb={'5px'}
                    >
                        Заполните форму и персональный менеджер свяжется с вами и ответит на все вопросы
                    </Text>
                    <HStack w="full" flexWrap="wrap" justify="center">
                        <Box w={{ base: "100%", md: "45%" }}>
                            <Text
                                fontFamily={FONTS.StyreneALC.BOLD}
                                fontSize="16px"
                                mb={2}
                                textAlign="center"
                            >
                                Ваше имя
                            </Text>
                            <Input
                                placeholder="Ваше имя"
                                fontFamily={FONTS.StyreneALC.REGULAR}
                                fontSize="24px"
                                textAlign="center"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                required
                            />
                        </Box>
                        <Box w={{ base: "100%", md: "45%" }} pt={'5px'} pb={'10px'}>
                            <Text
                                fontFamily={FONTS.StyreneALC.BOLD}
                                fontSize="16px"
                                mb={2}
                                textAlign="center"
                            >
                                Ваш телефон
                            </Text>
                            <PhoneInput
                                placeholder="+7 777 777 77 77"
                                fontFamily={FONTS.StyreneALC.REGULAR}
                                fontSize={'24px'}
                                textAlign="center"
                                value={phone}
                                onChange={e => setPhone(e.target.value)}
                                required
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
                        Заказать консультацию
                    </Button>
                </VStack>
            </Box>
        </Container>
    );
};

export default QuestionCard;
