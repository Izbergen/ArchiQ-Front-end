import {Field, Flex, Text, Input,Box } from "@chakra-ui/react";
import {Button} from "@/general/components/ui/Button";
import {useNavigate} from "react-router-dom"
import {COLORS } from "@/general/constants";
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from "react-hook-form"

import {registerSchema ,registerInterface} from './../_general/schems.ts'
import {useAuth, usePhoneNumber} from "./../_general/hooks.ts";

import {toaster} from "@/general/components/ui/toaster.ts";
import {FlexColumn} from "@/pages/auth/_general/components";

import {useTokens} from '@/general/hooks/useToken.ts'



export default function RegisterPage() {
    const { phoneNumber } = usePhoneNumber({redirectOnMissing: false})
    const navigate = useNavigate()
    const {register} = useAuth()
    const { handleSubmit, control, formState } = useForm<registerInterface>({
        resolver: zodResolver(registerSchema),
    })
    const tokenService = useTokens();

    const onSubmit = handleSubmit(async (data) => {
        try {
            if(!phoneNumber) throw new Error("Phone number is required");

            const {accessToken , refreshToken} = await register({
                phoneNumber,
                ...data,
            });
            tokenService.setAccessToken(accessToken);
            tokenService.setRefreshToken(refreshToken);

            navigate('/')
        } catch (error) {
            if(error instanceof Error){
                toaster.error(error.message)
            }
        }
    })


    return (
        <form onSubmit={onSubmit} >
        <FlexColumn>
            <Text color={COLORS.primary} mb="2" textStyle={'authTitle'}>
                Зарегистрироваться
            </Text>
                <Box w={'325px'} mx={'auto'}>
                <Text textStyle={'authFieldLabel'} textAlign={'center'} alignSelf={'center'} mb={'2'}>
                    Имя и Фамилия
                </Text>
                <Field.Root invalid={!!formState.errors.firstName} mb='4'>
                    <Controller
                        control={control}
                        name="firstName"
                        render={({ field }) => (
                            <Input textStyle={'authField'} borderRadius={'12px'}  {...field} placeholder="Alex"  />
                        )}
                    />
                    <Field.ErrorText textStyle={'authFieldError'}>{formState.errors.firstName?.message}</Field.ErrorText>
                </Field.Root>
                <Field.Root invalid={!!formState.errors.lastName} mb='8'>
                    <Controller
                        control={control}
                        name="lastName"
                        render={({ field }) => (
                            <Input textStyle={'authField'} borderRadius={'12px'}  {...field} placeholder="Toleberdiev"  />
                        )}
                    />
                    <Field.ErrorText textStyle={'authFieldError'}>{formState.errors.lastName?.message}</Field.ErrorText>
                </Field.Root>

                <Text textStyle={'authFieldLabel'} textAlign={'center'} alignSelf={'center'} mb={'2'}>
                    Пароль и Подтверждения
                </Text>
                <Field.Root invalid={!!formState.errors.password} mb='4'>
                    <Controller
                        control={control}
                        name="password"
                        render={({ field }) => (
                            <Input textStyle={'authField'} borderRadius={'12px'}  {...field} type={'password'} placeholder="AlexUnderAtaka"  />
                        )}
                    />
                    <Field.ErrorText textStyle={'authFieldError'}>{formState.errors.password?.message}</Field.ErrorText>
                </Field.Root>
                <Field.Root invalid={!!formState.errors.confirmPassword} mb='4'>
                    <Controller
                        control={control}
                        name="password"
                        render={({ field }) => (
                            <Input textStyle={'authField'} borderRadius={'12px'}  {...field} type={'password'} placeholder="AlexUnderAtaka"  />
                        )}
                    />
                    <Field.ErrorText textStyle={'authFieldError'}>{formState.errors.password?.message}</Field.ErrorText>
                </Field.Root>
                </Box>
                <Flex w={'400px'} gap={'2'} direction="column">
                    <Button type={'submit'}
                    >
                        Войти
                    </Button>

                    <Button variant={'ghost'}
                            onClick={() => navigate(-1)}
                    >
                        Назад
                    </Button>
                </Flex>
        </FlexColumn>
        </form>
    );
}