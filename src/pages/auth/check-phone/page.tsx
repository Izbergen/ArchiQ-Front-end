import {Flex, Text, Box, Input, Button} from "@chakra-ui/react";
import { withMask } from "use-mask-input";
import { COLORS, FONTS } from "@/general/constants";
import {useNavigate} from "react-router-dom";

export default function CheckPhonePage() {
    const nav = useNavigate();
    return (
        <Flex
            direction="column"
            align="center"
            justify="center"
            p={4}
        >
            <Text
                color={COLORS.primary}
                fontFamily={FONTS.StyreneALC.BOLD}
                fontSize="4xl"
                mb="2"
            >
                Введите номер телефона
            </Text>
            <Text
                color={COLORS.secondary}
                fontFamily={FONTS.StyreneALC.REGULAR}
                fontSize="xl"
                mb="6"
            >
                Чтобы войти или зарегистрироваться
            </Text>
            <Box w="250px" mx="auto" mb='4'>
                <Input
                    ref={withMask("9 999-999-99-99")}
                    placeholder="8 776-148-70-88"
                    w="100%"
                    border="none"
                    outline="none"
                    fontFamily={FONTS.StyreneALC.REGULAR}
                    fontSize="2xl"
                />
            </Box>
            <Button bg={COLORS.primary} color={'white'}
                    _hover={{ bg: COLORS.oceanBlue ,}}
                    fontFamily={FONTS.StyreneALC.MEDIUM}
                    fontSize="xl"
                    w={'400px'}
                    py={'25px'}
                    borderRadius="15px"
                    mb={'2'}
                    onClick={() => {
                        nav('/auth/otp-code')
                    }}
            >
                Продолжить
            </Button>
            <Button bg={'white'} color={COLORS.primary}
                    _hover={{ bg: COLORS.oceanBlue , color: 'white' }}
                    fontFamily={FONTS.StyreneALC.MEDIUM}
                    fontSize="xl"
                    w={'400px'}
                    py={'25px'}
                    borderRadius="15px"
                    onClick={() => {
                        nav(-1)
                    }}
            >
                Назад
            </Button>
        </Flex>
    );
}
