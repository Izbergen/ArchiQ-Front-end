import {Heading, SimpleGrid, Skeleton, VStack} from "@chakra-ui/react";
import {Container} from "@/general/components/ui/Container/Container.tsx";
import CommerceCard from "@/pages/commerce/_general/components/CommerceCard";
import {FONTS} from "@/general/constants";
import { Property, PropertyCategory, BuildingStatus } from "@/general/types/property.types";

const mockCommerce: Property[] = [
    {
        id: 1,
        category: PropertyCategory.COMMERCE,
        price: '30 000 000',
        rental_price: '1 100 000',
        area: '230',
        complex: 'SDU Residence',
        block: {
            id: 1,
            block_number: 'C1',
            entrance_number: '1',
            total_floors: 1,
            building_status: BuildingStatus.ACTIVE,
        },
    },
    {
        id: 2,
        category: PropertyCategory.COMMERCE,
        price: '40 000 000',
        rental_price: '1 500 000',
        area: '300',
        complex: 'SDU Residence',
        block: {
            id: 2,
            block_number: 'C2',
            entrance_number: '2',
            total_floors: 1,
            building_status: BuildingStatus.ACTIVE,
        },
    },
];

const CommercePage = () => {
    return (
        <Container pb={'65px'}>
            <VStack pb={'65px'} width={'full'} align={'start'} gap={'35px'}>
                <Heading fontFamily={FONTS.StyreneALC.BOLD} fontSize={'48px'} textAlign={'start'}>Commerce</Heading>
                <Skeleton width={'full'} height={"239px"} borderRadius={'15px'} pt={'35px'}/>
            </VStack>
            <SimpleGrid columns={2} gap={"21px"}>
                {mockCommerce.map((property) => (
                    <CommerceCard key={property.id} property={property} />
                ))}
            </SimpleGrid>
        </Container>
    );
};

export default CommercePage; 