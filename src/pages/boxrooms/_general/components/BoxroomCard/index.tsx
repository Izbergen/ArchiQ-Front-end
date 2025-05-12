import { useState } from "react";
import {Box, Text, Heading, VStack, HStack, Popover, Portal} from "@chakra-ui/react";
import { Button } from "@/general/components/ui/Button";
import {FONTS} from "@/general/constants";
import { Property } from "@/general/types/property.types";
import { Input } from "@/general/components/ui/Input/Input.tsx";
import { PhoneInput } from "@/pages/auth/_general/components";
import { useDI } from "@/general/hooks/useDI";
import { CoreTypes } from "@/general/di/modules/core";
import type { IAxiosService } from "@/general/services/axios";
import { toaster } from "@/general/components/ui/toaster";

interface BoxroomCardProps {
    property: Property;
}

const API_URL = "applications/apply/";

const BoxroomCard = ({ property }: BoxroomCardProps) => {
    const [popoverOpen, setPopoverOpen] = useState(false);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);
    const axiosService = useDI<IAxiosService>(CoreTypes.AxiosService);

    // Safely extract complex name
    const complexRaw = property.complex;
    const complexName = complexRaw && typeof complexRaw === 'object'
        ? complexRaw.name ?? JSON.stringify(complexRaw)
        : String(property.complex);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axiosService.post(API_URL, {
                name,
                phone_number: phone,
                property: property.id,
            });
            toaster.success("Ваша заявка отправлена! Мы свяжемся с вами.");
            setName("");
            setPhone("");
            setPopoverOpen(false);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            toaster.error("Ошибка при отправке заявки. Попробуйте еще раз.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box width={"300px"} p={"20px"} borderRadius={"15px"} bg={'white'} boxShadow="sm">
            <Heading fontFamily={FONTS.StyreneALC.BOLD} fontSize={'16px'} color="#52A0FF" mb={"10px"}>
                Boxroom {property.area}
            </Heading>
            <VStack align="start" fontSize="13px" mb={"15px"}>
                <HStack w="full" justify="space-between">
                    <Text>Project</Text>
                    <Text color="#52A0FF" fontWeight="bold">{complexName}</Text>
                </HStack>
                <HStack w="full" justify="space-between">
                    <Text>Queue</Text>
                    <Text color="#52A0FF">{property.floor ?? '-'}</Text>
                </HStack>
                <HStack w="full" justify="space-between">
                    <Text>Class</Text>
                    <Text color="#52A0FF">Standard</Text>
                </HStack>
                <HStack w="full" justify="space-between">
                    <Text>Block</Text>
                    <Text color="#52A0FF">{property.block?.block_number}</Text>
                </HStack>
                <HStack w="full" justify="space-between">
                    <Text>Area</Text>
                    <Text color="#52A0FF" textDecoration="underline">{property.area}</Text>
                </HStack>
            </VStack>
            <Heading fontFamily={FONTS.StyreneALC.BOLD} fontSize={'20px'} color="#52A0FF" mb={"5px"}>
                {property.price} ₸
            </Heading>
            <Popover.Root open={popoverOpen} onOpenChange={details => setPopoverOpen(details.open)}>
                <Popover.Trigger asChild>
                    <Button
                        colorScheme="blue"
                        variant="ghost"
                        fontWeight="bold"
                        fontSize="18px"
                        p={0}
                        h="auto"
                        type="button"
                    >
                        Submit request
                    </Button>
                </Popover.Trigger>
                <Portal>
                    <Popover.Positioner>
                        <Popover.Content borderRadius="25px" maxW="450px" p={6}>
                            <form onSubmit={handleSubmit}>
                                <Heading
                                    fontFamily={FONTS.StyreneALC.BOLD}
                                    color="#52A0FF"
                                    textAlign="center"
                                    fontSize="24px"
                                    mb={4}
                                >
                                    Оставить заявку на кладовую
                                </Heading>
                                <VStack gap={4}>
                                    <Input
                                        placeholder="Ваше имя"
                                        fontFamily={FONTS.StyreneALC.REGULAR}
                                        fontSize="24px"
                                        textAlign="center"
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                        required
                                    />
                                    <PhoneInput
                                        placeholder="+7 777 777 77 77"
                                        fontFamily={FONTS.StyreneALC.REGULAR}
                                        fontSize={'24px'}
                                        textAlign="center"
                                        value={phone}
                                        onChange={e => setPhone(e.target.value)}
                                        required
                                    />
                                </VStack>
                                <Button
                                    type="submit"
                                    borderRadius="15px"
                                    py="20px"
                                    px="40px"
                                    fontFamily={FONTS.StyreneALC.BOLD}
                                    variant="solid"
                                    disabled={loading}
                                    style={{ marginTop: 24, width: "100%" }}
                                >
                                    {loading ? "Отправка..." : "Заказать консультацию"}
                                </Button>
                            </form>
                        </Popover.Content>
                    </Popover.Positioner>
                </Portal>
            </Popover.Root>
        </Box>
    );
};

export default BoxroomCard; 