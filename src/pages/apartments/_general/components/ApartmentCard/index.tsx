import {Box, Image, Text, Heading, VStack, HStack} from "@chakra-ui/react";
import plan from "./apartment_plan.png"
import {FONTS} from "@/general/constants";
import { Property } from "@/general/types/property.types";

interface ApartmentCardProps {
    property: Property;
}

const ApartmentCard = ({ property }: ApartmentCardProps) => {
    return (
        <Box height={"461px"} width={"375px"} py={"15px"} px={"30px"} borderRadius={"15px"} bg={'white'}>
            <VStack>
                <VStack width={'full'} align={'start'}>
                    <Heading fontFamily={FONTS.StyreneALC.BOLD} fontSize={'16px'} color={"#52A0FF"}>
                        {property.rooms ? `${property.rooms} - Bedroom apartment` : 'Apartment'}
                    </Heading>
                    <Text fontFamily={FONTS.StyreneALC.MEDIUM} fontSize={'13px'}>{property.complex}</Text>
                </VStack>
            </VStack>
            <Image src={plan}/>
            <HStack justify={'space-between'}>
                <Heading fontFamily={FONTS.StyreneALC.BOLD} fontSize={'20px'} color={"#52A0FF"}>{property.area} м² </Heading>
                <Heading fontFamily={FONTS.StyreneALC.BOLD} fontSize={'20px'} color={"#52A0FF"}>{property.price} Tng</Heading>
            </HStack>
        </Box>
    );
};

export default ApartmentCard;