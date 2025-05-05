import React, { useState, useEffect } from 'react';
import {
    Box, Button, HStack, VStack, Text, Input, SimpleGrid } from '@chakra-ui/react';

const formatPrice = (value: number) =>
    new Intl.NumberFormat("ru-RU", { style: "currency", currency: "KZT", maximumFractionDigits: 0 }).format(value);

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
    roomsAvailable?: (number | string)[];
    areaRange?: [number, number];
    priceRange?: [number, number];
    floorRange?: [number, number];
}

const classOptions = [
    { label: 'All', value: PropertyClass.ALL },
    { label: 'Standard', value: PropertyClass.STANDARD },
    { label: 'Comfort', value: PropertyClass.COMFORT },
    { label: 'Business', value: PropertyClass.BUSINESS },
    { label: 'Premium', value: PropertyClass.PREMIUM },
];

export const PropertyFilter: React.FC<PropertyFilterProps> = ({ complexes = [], onChange, initialFilters, roomsAvailable = ['ALL'], areaRange = [25, 350], priceRange = [50, 342], floorRange = [1, 5] }) => {
    const defaultFilters: PropertyFilters = initialFilters || {
        propertyClass: PropertyClass.ALL,
        rooms: 'ALL',
        minArea: areaRange[0],
        maxArea: areaRange[1],
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
        minFloor: floorRange[0],
        maxFloor: floorRange[1],
    };
    const [filtersDraft, setFiltersDraft] = useState<PropertyFilters>(defaultFilters);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_ , setAppliedFilters] = useState<PropertyFilters>(defaultFilters);

    useEffect(() => {
        if (initialFilters) {
            setFiltersDraft(initialFilters);
            setAppliedFilters(initialFilters);
        }
    }, [initialFilters]);

    const handleDraftChange = (key: keyof PropertyFilters, value: unknown) => {
        setFiltersDraft({ ...filtersDraft, [key]: value });
    };

    const handleApply = () => {
        setAppliedFilters(filtersDraft);
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        onChange && onChange(filtersDraft);
    };

    const handleReset = () => {
        setFiltersDraft(defaultFilters);
        setAppliedFilters(defaultFilters);
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
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
                            {roomsAvailable.map(opt => (
                                <Button
                                    key={String(opt)}
                                    variant={filtersDraft.rooms === opt ? 'solid' : 'outline'}
                                    colorScheme={filtersDraft.rooms === opt ? 'blue' : 'gray'}
                                    onClick={() => handleDraftChange('rooms', opt)}
                                    size="sm"
                                >
                                    {String(opt)}
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
                                min={areaRange[0]}
                                max={areaRange[1]}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleDraftChange('minArea', Number(e.target.value))}
                                width="70px"
                                size="sm"
                            />
                            <Text>to</Text>
                            <Input
                                type="number"
                                value={filtersDraft.maxArea}
                                min={areaRange[0]}
                                max={areaRange[1]}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleDraftChange('maxArea', Number(e.target.value))}
                                width="70px"
                                size="sm"
                            />
                        </HStack>
                    </Box>

                    {/* Price */}
                    <Box>
                        <Text mb={1}>Price</Text>
                        <HStack>
                            <Input
                                type="number"
                                value={filtersDraft.minPrice}
                                min={priceRange[0]}
                                max={priceRange[1]}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleDraftChange('minPrice', Number(e.target.value))}
                                width="70px"
                                size="sm"
                            />
                            <Text>to</Text>
                            <Input
                                type="number"
                                value={filtersDraft.maxPrice}
                                min={priceRange[0]}
                                max={priceRange[1]}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleDraftChange('maxPrice', Number(e.target.value))}
                                width="70px"
                                size="sm"
                            />
                        </HStack>
                        <Text mt={1} fontSize="xs" color="gray.500">
                            {formatPrice(filtersDraft.minPrice!)} - {formatPrice(filtersDraft.maxPrice!)}
                        </Text>
                    </Box>

                    {/* Floor */}
                    <Box>
                        <Text mb={1}>Floor</Text>
                        <HStack>
                            <Input
                                type="number"
                                value={filtersDraft.minFloor}
                                min={floorRange[0]}
                                max={floorRange[1]}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleDraftChange('minFloor', Number(e.target.value))}
                                width="70px"
                                size="sm"
                            />
                            <Text>to</Text>
                            <Input
                                type="number"
                                value={filtersDraft.maxFloor}
                                min={floorRange[0]}
                                max={floorRange[1]}
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