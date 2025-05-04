import {Heading, SimpleGrid, Skeleton, VStack} from "@chakra-ui/react";
import {Container} from "@/general/components/ui/Container/Container.tsx";
import ApartmentCard from "@/pages/apartments/_general/components/ApartmentCard";
import {FONTS} from "@/general/constants";
import { Property, PropertyCategory, BuildingStatus } from "@/general/types/property.types";
import { PropertyFilter, ComplexOption, PropertyFilters } from "@/general/components/PropertyFilter";

const mockComplexes: ComplexOption[] = [
    { id: 1, name: 'SDU Residence' },
    { id: 2, name: 'Green Valley' },
    { id: 3, name: 'Sunset Park' },
];

const mockApartments: Property[] = [
    {
        id: 1,
        category: PropertyCategory.APARTMENT,
        price: '23 364 000',
        area: '39.6',
        rooms: 1,
        complex: 'SDU Residence',
        block: {
            id: 1,
            block_number: 'A',
            entrance_number: '1',
            total_floors: 5,
            building_status: BuildingStatus.ACTIVE,
        },
    },
    {
        id: 2,
        category: PropertyCategory.APARTMENT,
        price: '30 000 000',
        area: '50.0',
        rooms: 2,
        complex: 'SDU Residence',
        block: {
            id: 2,
            block_number: 'B',
            entrance_number: '2',
            total_floors: 7,
            building_status: BuildingStatus.ACTIVE,
        },
    },
];

const ApartmentsPage = () => {
    const handleFilterChange = (filters: PropertyFilters) => {
        // For now, just log the filters. You can implement filtering logic here.
        console.log('Filters changed:', filters);
    };

    return (
        <Container pb={'65px'}>
            <VStack pb={'35px'} width={'full'} align={'start'} gap={'35px'}>
                <Heading fontFamily={FONTS.StyreneALC.BOLD} fontSize={'48px'} textAlign={'start'}>Apartments</Heading>
                <PropertyFilter complexes={mockComplexes} onChange={handleFilterChange} />
                <Skeleton width={'full'} height={"239px"} borderRadius={'15px'} pt={'35px'}/>
            </VStack>
            <SimpleGrid columns={4} gap={"20px"}>
                {mockApartments.map((property) => (
                    <ApartmentCard key={property.id} property={property} />
                ))}
            </SimpleGrid>
        </Container>
    );
};

export default ApartmentsPage;