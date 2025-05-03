import {useEffect, useState} from 'react'
import {Field, Flex, Text } from "@chakra-ui/react";

import {Button} from "@/general/components/ui/Button";


import {COLORS} from "@/general/constants";
import {useNavigate} from "react-router-dom";

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from "react-hook-form"

import {otpSchema ,otpInterface} from './../_general/schems.ts'
import {useAuth, usePhoneNumber} from "./../_general/hooks.ts";

import {toaster} from "@/general/components/ui/toaster.ts";
import {FlexColumn, PinInput} from "@/pages/auth/_general/components";



const normalizeData = (data: otpInterface) => {
    return {
        code: data.pin.reduce((prev, current) => prev + current),
    }
}

export default function OTPCodePage() {
    const { phoneNumber } = usePhoneNumber({redirectOnMissing: true})
    const {verifyOTP, sendOTP , isCooldown , secondsLeft} = useAuth()
    const { handleSubmit, control, formState } = useForm<otpInterface>({
        resolver: zodResolver(otpSchema),
    })

    const [hasSent, setHasSent] = useState(false);

    useEffect(() => {

        if (phoneNumber && !hasSent) {
            sendOTP({ phoneNumber })
                .then(result => {
                    if (!result.success) toaster.error(result.message);
                })
                .catch(err => {
                    toaster.error(err.message);
                })
                .finally(() => setHasSent(true));
        }
    }, [phoneNumber, hasSent, sendOTP]);

    const onSubmit = handleSubmit(async (data) => {
        try {
            const normalizedData = normalizeData(data);
            if (!phoneNumber) throw new Error("Phone number is required");

            const { success, message } = await verifyOTP({
                phoneNumber,
                ...normalizedData
            });

            if (!success) {
                toaster.error(message || "Ошибка верификации кода");
                return;
            }

            // 3) абсолютный путь и замена записи истории
            navigate("/auth/register", { replace: true });
        } catch (error) {
            if (error instanceof Error) {
                toaster.error(error.message);
            }
        }
    });


    const navigate = useNavigate();

    return (
        <FlexColumn>
            <Text color={COLORS.primary} mb="2" textStyle={'authTitle'}>
                Введите код из СМС
            </Text>
            <Text color={COLORS.secondary} mb="6" textStyle={'authSubTitle'}>
                Мы отправили его на указанный вам номер
            </Text>

            <form onSubmit={onSubmit}>
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
                <Field.ErrorText textStyle={'authFieldError'}>{formState.errors.pin?.message}</Field.ErrorText>
            </Field.Root>


            <Flex w={'400px'} gap={'2'} direction="column">
                <Button type={'submit'}
                >
                    Продолжить
                </Button>
                <Button variant={'ghost'} type={'button'} disabled={isCooldown} onClick={async () => {
                    if (phoneNumber) await sendOTP({phoneNumber})
                }}>
                    Отправить еще код. Осталось {secondsLeft}
                </Button>
                <Button variant={'ghost'}
                        onClick={() => navigate(-1)}
                >
                    Назад
                </Button>
            </Flex>
            </form>
        </FlexColumn>
    );
}
