import {useEffect} from "react";
import {Field, Flex, Text } from "@chakra-ui/react";

import {PinInput} from "./../_general/components/PinInput.tsx";
import {Button} from "@/general/components/ui/Button";


import {COLORS, FONTS} from "@/general/constants";
import {useNavigate} from "react-router-dom";

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from "react-hook-form"

import {otpSchema ,otpInterface} from './../_general/schems.ts'
import {useAuth} from "./../_general/hooks.ts";
import {PHONE_KEY} from "./../_general/constants.ts";
import {VerifyOTPProps} from "./../_general/services/accounts";

import {toaster} from "@/general/components/ui/toaster.ts";
import {FlexColumn} from "./../_general/components/FlexColumn.tsx";



const normalizeData = (data: otpInterface): VerifyOTPProps | null => {
    const phoneNumber = localStorage.getItem(PHONE_KEY)
    if(!phoneNumber) return null;
    return {
        code: data.pin.reduce((prev, current) => prev + current),
        phoneNumber,
    }
}

export default function OTPCodePage() {
    const phoneNumber = localStorage.getItem(PHONE_KEY)
    const {verifyOTP, sendOTP , isCooldown , secondsLeft} = useAuth()
    const { handleSubmit, control, formState } = useForm<otpInterface>({
        resolver: zodResolver(otpSchema),
    })
    const onSubmit = handleSubmit(async (data) => {
        const normalizedData = normalizeData(data);
        if(!normalizedData) return null;
        const verified = await verifyOTP(normalizedData);
        if(!verified) {
            toaster.error("Otp Code Verification.")
        }
        navigate('auth/register')
    })

    useEffect(() => {
        if(!phoneNumber){
            toaster.warning("Phone number doesn't exist.")
        }
    },[])




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
                <Field.ErrorText fontFamily={FONTS.StyreneALC.BOLD} fontSize={'sm'}>{formState.errors.pin?.message}</Field.ErrorText>
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
