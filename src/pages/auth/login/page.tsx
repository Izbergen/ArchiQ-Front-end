import {Field, Flex, Text, Input } from "@chakra-ui/react";
import {Button} from "@/general/components/ui/Button";
import {useNavigate} from "react-router-dom"
import {COLORS } from "@/general/constants";
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from "react-hook-form"

import {loginSchema ,loginInterface} from './../_general/schems.ts'
import {useAuth, usePhoneNumber} from "./../_general/hooks.ts";

import {toaster} from "@/general/components/ui/toaster.ts";
import {FlexColumn} from "@/pages/auth/_general/components";

import {useTokens} from '@/general/hooks/useToken.ts'



export default function LoginPage() {
    const { phoneNumber } = usePhoneNumber({redirectOnMissing: false})
    const navigate = useNavigate()
    const {login} = useAuth()
    const { handleSubmit, control, formState } = useForm<loginInterface>({
        resolver: zodResolver(loginSchema),
    })
    const tokenService = useTokens();
    const onSubmit = handleSubmit(async (data) => {
        try {
            if(!phoneNumber) throw new Error("Phone number is required");

            const {accessToken , refreshToken} = await login({
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
        <FlexColumn>
            <Text color={COLORS.primary} mb="2" textStyle={'authTitle'}>
                {phoneNumber ?? "+777 777 77 77"}
            </Text>

            <form onSubmit={onSubmit}>
                <Field.Root invalid={!!formState.errors.password} w={'275px'} mx="auto" mb='4'>
                    <Field.Label textStyle={'authFieldLabel'} textAlign={'center'} alignSelf={'center'} mb={'2'}>
                        Ваш пароль
                    </Field.Label>
                    <Controller
                        control={control}
                        name="password"
                        render={({ field }) => (
                            <Input textStyle={'authField'} borderRadius={'12px'}  {...field} placeholder="Password"  />
                        )}
                    />
                    <Field.ErrorText textStyle={'authFieldError'}>{formState.errors.password?.message}</Field.ErrorText>
                </Field.Root>


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
            </form>
        </FlexColumn>
    );
}