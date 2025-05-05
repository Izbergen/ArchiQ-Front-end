import { useState } from "react";
import {Box, Image, Text, Heading, VStack, HStack, Popover, Portal} from "@chakra-ui/react";
import { Button } from "@/general/components/ui/Button";
import plan from "./apartment_plan.png"
import {FONTS} from "@/general/constants";
import { Property } from "@/general/types/property.types";
import { Input } from "@/general/components/ui/Input/Input.tsx";
import { PhoneInput } from "@/pages/auth/_general/components";
import { useDI } from "@/general/hooks/useDI";
import { CoreTypes } from "@/general/di/modules/core";
import type { IAxiosService } from "@/general/services/axios";
import { toaster } from "@/general/components/ui/toaster";

interface ApartmentCardProps {
    property: Property;
}

const API_URL = "applications/apply/";

const ApartmentCard = ({ property }: ApartmentCardProps) => {
    const [popoverOpen, setPopoverOpen] = useState(false);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);
    const axiosService = useDI<IAxiosService>(CoreTypes.AxiosService);

    // Determine complex name safely
    const complexRaw = (property.complex as any);
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
        } catch (err) {
            toaster.error("Ошибка при отправке заявки. Попробуйте еще раз.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box height={"461px"} width={"375px"} py={"15px"} px={"30px"} borderRadius={"15px"} bg={'white'}>
            <VStack>
                <VStack width={'full'} align={'start'}>
                    <Heading fontFamily={FONTS.StyreneALC.BOLD} fontSize={'16px'} color={"#52A0FF"}>
                        {property.rooms ? `${property.rooms} - Bedroom apartment` : 'Apartment'}
                    </Heading>
                    <Text fontFamily={FONTS.StyreneALC.MEDIUM} fontSize={'13px'}>
                        {complexName}
                    </Text>
                </VStack>
            </VStack>
            <Image src={plan}/>
            <HStack justify={'space-between'}>
                <Heading fontFamily={FONTS.StyreneALC.BOLD} fontSize={'20px'} color={"#52A0FF"}>{property.area} м² </Heading>
                <Heading fontFamily={FONTS.StyreneALC.BOLD} fontSize={'20px'} color={"#52A0FF"}>{property.price} Tng</Heading>
            </HStack>
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
                        style={{ marginTop: 16, width: "100%" }}
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
                                    Оставить заявку на квартиру
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

export default ApartmentCard;