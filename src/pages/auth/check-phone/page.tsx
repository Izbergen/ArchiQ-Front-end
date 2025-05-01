import {Flex, Text, Input, Field} from "@chakra-ui/react";
import {Button} from "@/general/components/ui/Button"
import { withMask } from "use-mask-input";

import { COLORS, FONTS } from "@/general/constants";

import {useNavigate} from "react-router-dom";
import {useForm, Controller} from "react-hook-form";

import {checkPhoneInterface, checkPhoneSchema} from "@/pages/auth/_general/schems.ts";
import {zodResolver} from "@hookform/resolvers/zod";


const normalizeData = (data: checkPhoneInterface): checkPhoneInterface => {
    return {
        phoneNumber: data.phoneNumber.replace(/[^+\d]/g, "")
    }
}

export default function CheckPhonePage() {
    const navigate = useNavigate();
    const { handleSubmit, control, formState } = useForm<checkPhoneInterface>({
        resolver: zodResolver(checkPhoneSchema),
    })
    const onSubmit = handleSubmit(
        (data) => {
            console.log(data);
            console.log(normalizeData(data))
            navigate('/auth/otp-code')
        }
    )

    return (
        <form onSubmit={onSubmit}>
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
            <Field.Root invalid={!!formState.errors.phoneNumber}  w="270px" mx="auto" mb='4'>
                <Controller
                    control={control}
                    name="phoneNumber"
                    render={({ field }) => (
                        <Input
                            {...field}
                            w={'100%'}
                            ref={withMask("+7 999-999-99-99")}
                            placeholder="+7 776-148-70-88"
                            border="none"
                            outline="none"
                            fontFamily={FONTS.StyreneALC.REGULAR}
                            fontSize="2xl"
                        />
                    )}
                />
               <Field.ErrorText fontFamily={FONTS.StyreneALC.BOLD} fontSize={'sm'}>{formState.errors.phoneNumber?.message}</Field.ErrorText>
            </Field.Root>

            <Flex w={'400px'} gap={'2'} direction="column">
                <Button type={'submit'}
                >
                    Продолжить
                </Button>
                <Button variant={'ghost'}
                        onClick={() => navigate(-1)}
                >
                    Назад
                </Button>
            </Flex>
        </Flex>
        </form>
    );
}
