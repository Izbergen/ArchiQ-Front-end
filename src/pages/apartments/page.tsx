import { Heading, SimpleGrid, Skeleton, VStack } from "@chakra-ui/react";
import { Container } from "@/general/components/ui/Container/Container.tsx";
import ApartmentCard from "@/pages/apartments/_general/components/ApartmentCard";
import { FONTS } from "@/general/constants";
import { Property } from "@/general/types/property.types";
import { PropertyFilter, ComplexOption, PropertyFilters } from "@/general/components/PropertyFilter";
import axios from "axios";
import {useEffect, useState} from "react";

const API_URL = "https://api.slyamgazy.kz/properties/";

// define default (empty) filters for initial fetch
const defaultFilters: PropertyFilters = {};

function mapFiltersToParams(filters: PropertyFilters) {
    const params: any = {};
    if (filters.complexId) params.complex_id = filters.complexId;
    if (filters.propertyClass && filters.propertyClass !== 'ALL') params.class_type = filters.propertyClass;
    if (filters.rooms && filters.rooms !== 'ALL') params.rooms = filters.rooms;
    if (filters.minArea) params.min_area = filters.minArea;
    if (filters.maxArea) params.max_area = filters.maxArea;
    if (filters.minPrice) params.min_price = filters.minPrice;
    if (filters.maxPrice) params.max_price = filters.maxPrice;
    if (filters.minFloor) params.min_floor = filters.minFloor;
    if (filters.maxFloor) params.max_floor = filters.maxFloor;
    return params;
}

const ApartmentsPage = () => {
    const [apartments, setApartments] = useState<Property[]>([]);
    const [loading, setLoading] = useState(false);
    const [complexes, setComplexes] = useState<ComplexOption[]>([]);
    const [roomsAvailable, setRoomsAvailable] = useState<(number | string)[]>(['ALL']);
    const [areaRange, setAreaRange] = useState<[number, number]>([25, 350]);
    const [priceRange, setPriceRange] = useState<[number, number]>([50, 342]);
    const [floorRange, setFloorRange] = useState<[number, number]>([1, 5]);

    // track currently applied filters
    const [filters, setFilters] = useState<PropertyFilters>(defaultFilters);
    // track if we've applied the initial metadata from the first fetch
    const [metadataInitialized, setMetadataInitialized] = useState(false);

    // whenever filters change, refetch properties
    useEffect(() => {
        fetchProperties(filters);
    }, [filters]);

    const fetchProperties = async (filters: PropertyFilters) => {
        setLoading(true);
        try {
            const params = mapFiltersToParams(filters);
            params.category = 'APARTMENT';
            const response = await axios.get(API_URL, { params });
            const data = response.data;

            setApartments(Array.isArray(data) ? data : data.results || []);

            // only set filter options and ranges once from initial metadata
            if (data.metadata && !metadataInitialized) {
                if (data.metadata.available_residential_complexes?.length) {
                    setComplexes(
                        data.metadata.available_residential_complexes.map((c: any) => ({
                            id: c.id,
                            name: c.name,
                        }))
                    );
                }
                if (data.metadata.rooms_available?.length) {
                    setRoomsAvailable(['ALL', ...data.metadata.rooms_available]);
                }
                if (data.metadata.min_area != null && data.metadata.max_area != null) {
                    setAreaRange([data.metadata.min_area, data.metadata.max_area]);
                }
                if (
                    data.metadata.min_total_price != null &&
                    data.metadata.max_total_price != null
                ) {
                    setPriceRange([
                        data.metadata.min_total_price,
                        data.metadata.max_total_price,
                    ]);
                }
                if (data.metadata.min_floor != null && data.metadata.max_floor != null) {
                    setFloorRange([data.metadata.min_floor, data.metadata.max_floor]);
                }
                // mark metadata as initialized so we don't overwrite again
                setMetadataInitialized(true);
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            setApartments([]);
        }
        setLoading(false);
    };

    // update filter state on Apply; useEffect will trigger fetch
    const handleFilterChange = (newFilters: PropertyFilters) => {
        setFilters(newFilters);
    };

    return (
        <Container pb={'65px'}>
            <VStack pb={'35px'} width={'full'} align={'start'} gap={'35px'}>
                <Heading fontFamily={FONTS.StyreneALC.BOLD} fontSize={'48px'} textAlign={'start'}>Apartments</Heading>
                <PropertyFilter
                    initialFilters={filters}
                    complexes={complexes}
                    onChange={handleFilterChange}
                    roomsAvailable={roomsAvailable}
                    areaRange={areaRange}
                    priceRange={priceRange}
                    floorRange={floorRange}
                />
                {loading && <Skeleton width={'full'} height={"239px"} borderRadius={'15px'} pt={'35px'} />}
            </VStack>
            <SimpleGrid columns={4} gap={"20px"}>
                {apartments.map((property) => (
                    <ApartmentCard key={property.id} property={property} />
                ))}
            </SimpleGrid>
        </Container>
    );
};

export default ApartmentsPage;