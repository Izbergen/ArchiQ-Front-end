import {
    Text,
    Box,
    HStack,
    VStack,
    Heading,
    Link,
} from "@chakra-ui/react";
import { FC } from "react";
import { LuArrowUpRight } from "react-icons/lu";
import { IResidence } from "../types";
import ImageSlider from "./ImageSlider";

interface ResidenceCardProps extends IResidence {}

const ResidentialComplexCard: FC<ResidenceCardProps> = ({id, name, class_type, description_short, residential_complex_photos,}) => {
    const formattedClass =
        class_type.charAt(0).toUpperCase() +
        class_type.slice(1).toLowerCase();

    return (
        <Box
            position="relative"
            minHeight="385px"
            maxWidth="790px"
            p="40px"
            bg="white"
            borderRadius="25px"
            color="white"
            overflow="hidden"
        >
            <ImageSlider
                photos={residential_complex_photos.map((p) => ({
                    id: p.id,
                    photo_link: p.photo_link,
                }))}
            />

            <HStack
                height="full"
                justifyContent="space-between"
                position="relative"
                zIndex={2}
            >
                <VStack height="full" justify="space-between">
                    <Box bg="#52A0FF" p="15px" borderRadius="10px">
                        <Text>{formattedClass}.</Text>
                    </Box>
                    <VStack>
                        <Heading textAlign="start">{name}</Heading>
                        <Text color="whiteAlpha.900">{description_short}</Text>
                    </VStack>
                </VStack>
                <VStack height="full" justifyContent="end">
                    <Link
                        color="white"
                        href={`/residential-complexes/${id}`}
                        fontSize="24px"
                        display="flex"
                        alignItems="center"
                    >
                        More&nbsp;<LuArrowUpRight size="26px" />
                    </Link>
                </VStack>
            </HStack>
        </Box>
    );
};

export default ResidentialComplexCard;
