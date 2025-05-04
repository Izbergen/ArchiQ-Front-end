import {Heading, SimpleGrid, Skeleton, VStack} from "@chakra-ui/react";
import {Container} from "@/general/components/ui/Container/Container.tsx";
import BoxroomCard from "@/pages/boxrooms/_general/components/BoxroomCard";
import {FONTS} from "@/general/constants";
import { Property, PropertyCategory, BuildingStatus } from "@/general/types/property.types";

const mockBoxrooms: Property[] = [
    {
        id: 1,
        category: PropertyCategory.BOXROOM,
        price: '3 000 000',
        area: '8',
        complex: 'SDU Residence',
        block: {
            id: 1,
            block_number: 'B1',
            entrance_number: '1',
            total_floors: 1,
            building_status: BuildingStatus.ACTIVE,
        },
    },
    {
        id: 2,
        category: PropertyCategory.BOXROOM,
        price: '3 500 000',
        area: '10',
        complex: 'SDU Residence',
        block: {
            id: 2,
            block_number: 'B2',
            entrance_number: '2',
            total_floors: 1,
            building_status: BuildingStatus.ACTIVE,
        },
    },
];

const BoxroomsPage = () => {
    return (
        <Container pb={'65px'}>
            <VStack pb={'65px'} width={'full'} align={'start'} gap={'35px'}>
                <Heading fontFamily={FONTS.StyreneALC.BOLD} fontSize={'48px'} textAlign={'start'}>Boxrooms</Heading>
                <Skeleton width={'full'} height={"239px"} borderRadius={'15px'} pt={'35px'}/>
            </VStack>
            <SimpleGrid columns={4} gap={"20px"}>
                {mockBoxrooms.map((property) => (
                    <BoxroomCard key={property.id} property={property} />
                ))}
            </SimpleGrid>
        </Container>
    );
};

export default BoxroomsPage; 