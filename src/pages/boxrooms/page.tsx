import {Heading, SimpleGrid, Skeleton, VStack} from "@chakra-ui/react";
import {Container} from "@/general/components/ui/Container/Container.tsx";
import BoxroomCard from "@/pages/boxrooms/_general/components/BoxroomCard";
import {FONTS} from "@/general/constants";
import {Property} from "@/general/types/property.types";
import { PropertyFilter, PropertyFilters } from '@/general/components/PropertyFilter';
import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = "https://api.slyamgazy.kz/properties/";

interface FilterParams {
    category: string;
    complex_id?: string | number;
    class_type?: string;
    rooms?: string | number;
    min_area?: number;
    max_area?: number;
    min_price?: number;
    max_price?: number;
    min_floor?: number;
    max_floor?: number;
}

export function mapFiltersToParams(
    filters: PropertyFilters
): FilterParams {
    const params: FilterParams = {category: ""};

    if (filters.complexId != null) {
        params.complex_id = filters.complexId;
    }
    if (filters.propertyClass && filters.propertyClass !== "ALL") {
        params.class_type = filters.propertyClass;
    }
    if (filters.rooms != null && filters.rooms !== "ALL") {
        params.rooms = filters.rooms;
    }
    if (filters.minArea != null) {
        params.min_area = filters.minArea;
    }
    if (filters.maxArea != null) {
        params.max_area = filters.maxArea;
    }
    if (filters.minPrice != null) {
        params.min_price = filters.minPrice;
    }
    if (filters.maxPrice != null) {
        params.max_price = filters.maxPrice;
    }
    if (filters.minFloor != null) {
        params.min_floor = filters.minFloor;
    }
    if (filters.maxFloor != null) {
        params.max_floor = filters.maxFloor;
    }

    return params;
}

const BoxroomsPage = () => {
    const [boxrooms, setBoxrooms] = useState<Property[]>([]);
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState<PropertyFilters>({});

    useEffect(() => {
        fetchProperties(filters);
    }, [filters]);

    const fetchProperties = async (filters: PropertyFilters) => {
        setLoading(true);
        try {
            const params = mapFiltersToParams(filters);
            params.category = 'BOXROOM';
            const response = await axios.get(API_URL, { params });
            const data = response.data;
            setBoxrooms(Array.isArray(data) ? data : data.results || []);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            setBoxrooms([]);
        }
        setLoading(false);
    };

    const handleFilter = (f: PropertyFilters) => {
        setFilters(f);
    };

    return (
        <Container pb={'65px'}>
            <VStack pb={'65px'} width={'full'} align={'start'} gap={'35px'}>
                <Heading fontFamily={FONTS.StyreneALC.BOLD} fontSize={'48px'} textAlign={'start'}>Boxrooms</Heading>
                <PropertyFilter onChange={handleFilter} initialFilters={filters} />
                {loading && <Skeleton width={'full'} height={'239px'} borderRadius={'15px'} pt={'35px'} />}
            </VStack>
            <SimpleGrid columns={4} gap={'20px'}>
                {boxrooms.map((property) => (
                    <BoxroomCard key={property.id} property={property} />
                ))}
            </SimpleGrid>
        </Container>
    );
};

export default BoxroomsPage; 