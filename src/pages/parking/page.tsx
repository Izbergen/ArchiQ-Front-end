import {Heading, SimpleGrid, Skeleton, VStack} from "@chakra-ui/react";
import {Container} from "@/general/components/ui/Container/Container.tsx";
import ParkingCard from "@/pages/parking/_general/components/ParkingCard";
import {FONTS} from "@/general/constants";
import { Property, PropertyCategory, BuildingStatus } from "@/general/types/property.types";

const mockParking: Property[] = [
    {
        id: 1,
        category: PropertyCategory.PARKING,
        price: '5 000 000',
        area: '15',
        complex: 'SDU Residence',
        block: {
            id: 1,
            block_number: 'P1',
            entrance_number: '1',
            total_floors: 1,
            building_status: BuildingStatus.ACTIVE,
        },
    },
    {
        id: 2,
        category: PropertyCategory.PARKING,
        price: '6 000 000',
        area: '18',
        complex: 'SDU Residence',
        block: {
            id: 2,
            block_number: 'P2',
            entrance_number: '2',
            total_floors: 1,
            building_status: BuildingStatus.ACTIVE,
        },
    },
];

const ParkingPage = () => {
    return (
        <Container pb={'65px'}>
            <VStack pb={'65px'} width={'full'} align={'start'} gap={'35px'}>
                <Heading fontFamily={FONTS.StyreneALC.BOLD} fontSize={'48px'} textAlign={'start'}>Parking</Heading>
                <Skeleton width={'full'} height={"239px"} borderRadius={'15px'} pt={'35px'}/>
            </VStack>
            <SimpleGrid columns={4} gap={"20px"}>
                {mockParking.map((property) => (
                    <ParkingCard key={property.id} property={property} />
                ))}
            </SimpleGrid>
        </Container>
    );
};

export default ParkingPage; 