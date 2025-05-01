import {Field, Flex, Text } from "@chakra-ui/react";

import {PinInput} from "./../_general/components/PinInput.tsx";
import {Button} from "@/general/components/ui/Button";


import {COLORS, FONTS} from "@/general/constants";
import {useNavigate} from "react-router-dom";

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from "react-hook-form"
import {otpSchema ,otpInterface} from './../_general/schems.ts'




export default function OTPCodePage() {
    const { handleSubmit, control, formState } = useForm<otpInterface>({
        resolver: zodResolver(otpSchema),
    })
    const onSubmit = handleSubmit((data) => console.log(data))



    const navigate = useNavigate();
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
                Введите код из СМС
            </Text>
            <Text
                color={COLORS.secondary}
                fontFamily={FONTS.StyreneALC.REGULAR}
                fontSize="xl"
                mb="6"
            >
                Мы отправили его на указанный вам номер
            </Text>
            <Field.Root invalid={!!formState.errors.pin} w={'275px'} mx="auto" mb='4'>
                <Controller
                    control={control}
                    name="pin"
                    render={({ field }) => (
                        <PinInput
                            value={field.value}
                            onValueChange={(e) => field.onChange(e.value)}
                            count={6}
                        />
                    )}
                />
                <Field.ErrorText fontFamily={FONTS.StyreneALC.BOLD} fontSize={'sm'}>{formState.errors.pin?.message}</Field.ErrorText>
            </Field.Root>


            <Flex w={'400px'} gap={'2'} direction="column">
                <Button type={'submit'}
                >
                    Продолжить
                </Button>
                <Button variant={'ghost'}>
                    Отправить еще код. Осталось {}
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
