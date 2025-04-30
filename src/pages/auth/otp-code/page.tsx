import {Field, Button, Flex, Text , PinInput} from "@chakra-ui/react";
import {COLORS, FONTS} from "@/general/constants";
import {useNavigate} from "react-router-dom";

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"


const formSchema = z.object({
    pin: z
        .array(z.string().min(1), { required_error: "Нужно ввести пин код" })
        .length(4, { message: "Пин должен состоять из 4 цифр" }),
})

type FormValues = z.infer<typeof formSchema>


export default function OTPCodePage() {
    const { handleSubmit, control, formState } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
    })

    const onSubmit = handleSubmit((data) => console.log(data))

    const nav = useNavigate();
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
            <Field.Root invalid={!!formState.errors.pin} w={'200px'} mx="auto" mb='4'>
                <Controller
                    control={control}
                    name="pin"
                    render={({ field }) => (
                        <PinInput.Root
                            size={'md'}
                            value={field.value}
                            onValueChange={(e) => field.onChange(e.value)}
                        >
                            <PinInput.HiddenInput />
                            <PinInput.Control>
                                <PinInput.Input index={0} />
                                <PinInput.Input index={1} />
                                <PinInput.Input index={2} />
                                <PinInput.Input index={3} />
                            </PinInput.Control>
                        </PinInput.Root>
                    )}
                />
                <Field.ErrorText fontFamily={FONTS.StyreneALC.BOLD} fontSize={'sm'}>{formState.errors.pin?.message}</Field.ErrorText>
            </Field.Root>



            <Button bg={COLORS.primary} color={'white'}
                    _hover={{ bg: COLORS.oceanBlue ,}}
                    fontFamily={FONTS.StyreneALC.MEDIUM}
                    fontSize="xl"
                    w={'400px'}
                    py={'25px'}
                    borderRadius="15px"
                    mb={'2'}
                    type="submit"
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
        </form>
    );
}
