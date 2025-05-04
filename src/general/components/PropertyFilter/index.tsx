import React, { useState } from 'react';
import {
    Box, Button, HStack, VStack, Text, Input, SimpleGrid, Select } from '@chakra-ui/react';

export enum PropertyClass {
    ALL = 'ALL',
    STANDARD = 'STANDARD',
    COMFORT = 'COMFORT',
    BUSINESS = 'BUSINESS',
    PREMIUM = 'PREMIUM',
}

export interface ComplexOption {
    id: number;
    name: string;
}

export interface PropertyFilters {
    complexId?: number;
    propertyClass?: PropertyClass;
    rooms?: number | 'ST' | 'ALL' | '4+';
    minArea?: number;
    maxArea?: number;
    minPrice?: number;
    maxPrice?: number;
    minFloor?: number;
    maxFloor?: number;
}

interface PropertyFilterProps {
    complexes?: ComplexOption[];
    onChange?: (filters: PropertyFilters) => void;
    initialFilters?: PropertyFilters;
}

const roomOptions = ['ALL', 'ST', 1, 2, 3, '4+'] as const;
const classOptions = [
    { label: 'All', value: PropertyClass.ALL },
    { label: 'Standard', value: PropertyClass.STANDARD },
    { label: 'Comfort', value: PropertyClass.COMFORT },
    { label: 'Business', value: PropertyClass.BUSINESS },
    { label: 'Premium', value: PropertyClass.PREMIUM },
];

export const PropertyFilter: React.FC<PropertyFilterProps> = ({ complexes = [], onChange, initialFilters }) => {
    const defaultFilters: PropertyFilters = initialFilters || {
        propertyClass: PropertyClass.ALL,
        rooms: 'ALL',
        minArea: 25,
        maxArea: 350,
        minPrice: 50,
        maxPrice: 342,
        minFloor: 1,
        maxFloor: 5,
    };
    const [filtersDraft, setFiltersDraft] = useState<PropertyFilters>(defaultFilters);
    const [appliedFilters, setAppliedFilters] = useState<PropertyFilters>(defaultFilters);

    const handleDraftChange = (key: keyof PropertyFilters, value: any) => {
        setFiltersDraft({ ...filtersDraft, [key]: value });
    };

    const handleApply = () => {
        setAppliedFilters(filtersDraft);
        onChange && onChange(filtersDraft);
    };

    const handleReset = () => {
        setFiltersDraft(defaultFilters);
        setAppliedFilters(defaultFilters);
        onChange && onChange(defaultFilters);
    };

    return (
        <Box bg="white" borderRadius="20px" p={6} boxShadow="md" w="full" >
            <VStack align="start" w="full">
                <SimpleGrid columns={[1, 2, 3]} w="full" >
                    {/* Complex Dropdown */}
                    <Box width={'70%'}>
                        <Text mb={1}>Residential complex</Text>
                        <select
                            value={filtersDraft.complexId ?? ''}
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleDraftChange('complexId', e.target.value ? Number(e.target.value) : undefined)}
                            style={{
                                width: '100%',
                                padding: '8px',
                                borderRadius: '8px',
                                border: '1px solid #E2E8F0',
                                fontSize: '16px',
                                background: 'white',
                                marginBottom: '4px',
                            }}
                        >
                            <option value="">All</option>
                            {complexes.map(c => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                        </select>
                    </Box>

                    {/* Property Class */}
                    <Box>
                        <Text mb={1}>Property class</Text>
                        <HStack>
                            {classOptions.map(opt => (
                                <Button
                                    key={opt.value}
                                    variant={filtersDraft.propertyClass === opt.value ? 'solid' : 'outline'}
                                    colorScheme={filtersDraft.propertyClass === opt.value ? 'blue' : 'gray'}
                                    onClick={() => handleDraftChange('propertyClass', opt.value)}
                                    size="sm"
                                >
                                    {opt.label}
                                </Button>
                            ))}
                        </HStack>
                    </Box>

                    {/* Rooms */}
                    <Box>
                        <Text mb={1}>Rooms</Text>
                        <HStack>
                            {roomOptions.map(opt => (
                                <Button
                                    key={opt}
                                    variant={filtersDraft.rooms === opt ? 'solid' : 'outline'}
                                    colorScheme={filtersDraft.rooms === opt ? 'blue' : 'gray'}
                                    onClick={() => handleDraftChange('rooms', opt)}
                                    size="sm"
                                >
                                    {opt}
                                </Button>
                            ))}
                        </HStack>
                    </Box>
                </SimpleGrid>

                {/* Sliders */}
                <SimpleGrid columns={[1, 2, 3]} w="full">
                    {/* Area */}
                    <Box>
                        <Text mb={1}>Area, m²</Text>
                        <HStack>
                            <Input
                                type="number"
                                value={filtersDraft.minArea}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleDraftChange('minArea', Number(e.target.value))}
                                width="70px"
                                size="sm"
                            />
                            <Text>to</Text>
                            <Input
                                type="number"
                                value={filtersDraft.maxArea}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleDraftChange('maxArea', Number(e.target.value))}
                                width="70px"
                                size="sm"
                            />
                        </HStack>
                    </Box>

                    {/* Price */}
                    <Box>
                        <Text mb={1}>Price, mln Tng</Text>
                        <HStack>
                            <Input
                                type="number"
                                value={filtersDraft.minPrice}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleDraftChange('minPrice', Number(e.target.value))}
                                width="70px"
                                size="sm"
                            />
                            <Text>to</Text>
                            <Input
                                type="number"
                                value={filtersDraft.maxPrice}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleDraftChange('maxPrice', Number(e.target.value))}
                                width="70px"
                                size="sm"
                            />
                        </HStack>
                    </Box>

                    {/* Floor */}
                    <Box>
                        <Text mb={1}>Floor</Text>
                        <HStack>
                            <Input
                                type="number"
                                value={filtersDraft.minFloor}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleDraftChange('minFloor', Number(e.target.value))}
                                width="70px"
                                size="sm"
                            />
                            <Text>to</Text>
                            <Input
                                type="number"
                                value={filtersDraft.maxFloor}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleDraftChange('maxFloor', Number(e.target.value))}
                                width="70px"
                                size="sm"
                            />
                        </HStack>
                    </Box>
                </SimpleGrid>

                <HStack w="full" justify="flex-end" mt={2}>
                    <Button colorScheme="gray" variant="ghost" onClick={handleReset}>
                        Reset filters
                    </Button>
                    <Button colorScheme="blue" onClick={handleApply}>
                        Apply
                    </Button>
                </HStack>
            </VStack>
        </Box>
    );
};

export default PropertyFilter; 