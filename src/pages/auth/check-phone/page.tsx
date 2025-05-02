import {Flex, Text, Field} from "@chakra-ui/react";
import {Button} from "@/general/components/ui/Button"

import { COLORS, FONTS} from "@/general/constants";

import {useNavigate} from "react-router-dom";
import {useForm, Controller} from "react-hook-form";

import {zodResolver} from "@hookform/resolvers/zod";

import {useAuth} from "./../_general/hooks.ts";
import {FlexColumn, PhoneInput} from "./../_general/components";
import {checkPhoneInterface, checkPhoneSchema} from "@/pages/auth/_general/schems.ts";


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
    const {checkPhone} = useAuth();

    const onSubmit = handleSubmit(
        async (data) => {
            const normalizedData = normalizeData(data);
            const exist = await checkPhone(normalizedData);
            if(exist) {
                navigate("/auth/login");
            }
            else{
                navigate('/auth/otp-code')
            }
        }
    )

    return (
        <FlexColumn>
            <Text color={COLORS.primary} mb="2" textStyle={'authTitle'}>
                Введите номер телефона
            </Text>
            <Text color={COLORS.secondary} mb="6" textStyle={'authSubTitle'}>
                Чтобы войти или зарегистрироваться
            </Text>

            <form onSubmit={onSubmit}>
            <Field.Root invalid={!!formState.errors.phoneNumber}  w="270px" mx="auto" mb='4'>
                <Controller
                    control={control}
                    name="phoneNumber"
                    render={({ field }) => (
                        <PhoneInput
                            {...field}
                            value={field.value ?? ""}
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
            </form>
        </FlexColumn>
    );
}
