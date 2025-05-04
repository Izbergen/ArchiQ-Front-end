import {Box, Text, Heading, VStack, HStack, Button} from "@chakra-ui/react";
import {FONTS} from "@/general/constants";
import { Property } from "@/general/types/property.types";

interface ParkingCardProps {
    property: Property;
}

const ParkingCard = ({ property }: ParkingCardProps) => {
    return (
        <Box width={"300px"} p={"20px"} borderRadius={"15px"} bg={'white'} boxShadow="sm">
            <Heading fontFamily={FONTS.StyreneALC.BOLD} fontSize={'16px'} color="#52A0FF" mb={"10px"}>
                Parking space {property.area}
            </Heading>
            <VStack align="start" fontSize="13px" mb={"15px"}>
                <HStack w="full" justify="space-between">
                    <Text>Project</Text>
                    <Text color="#52A0FF" fontWeight="bold">{property.complex}</Text>
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
                    <Text color="#52A0FF">{property.block.block_number}</Text>
                </HStack>
                <HStack w="full" justify="space-between">
                    <Text>Area</Text>
                    <Text color="#52A0FF" textDecoration="underline">{property.area}</Text>
                </HStack>
            </VStack>
            <Heading fontFamily={FONTS.StyreneALC.BOLD} fontSize={'20px'} color="#52A0FF" mb={"5px"}>
                {property.price} Tng
            </Heading>
            <Button colorScheme="blue" variant="ghost" fontWeight="bold" fontSize="18px" p={0} h="auto">
                Submit request
            </Button>
        </Box>
    );
};

export default ParkingCard; 