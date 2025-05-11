import {Box, Text, Heading, VStack, HStack, Link} from "@chakra-ui/react";
import {FONTS} from "@/general/constants";
import { LuArrowUpRight } from "react-icons/lu";
import bg from "./commerce_plan.png";
import { Property } from "@/general/types/property.types";

interface CommerceCardProps {
    property: Property;
}

const CommerceCard = ({ property }: CommerceCardProps) => {
    // Safely extract complex name
    const complexRaw = property.complex as any;
    const complexName = complexRaw && typeof complexRaw === 'object'
        ? complexRaw.name ?? JSON.stringify(complexRaw)
        : String(property.complex);
    return (
        <Box
            width={"770px"}
            height={"385px"}
            borderRadius={"25px"}
            position="relative"
            backgroundImage={`url(${bg})`}
            backgroundSize="cover"
            backgroundPosition="center"
            overflow="hidden"
        >
            <Box
                position="absolute"
                top={0}
                left={0}
                right={0}
                bottom={0}
                bg="rgba(0,0,0,0.4)"
                borderRadius={"15px"}
                zIndex={1}
            />
            <VStack
                align="start"
                position="absolute"
                left={"20px"}
                bottom={"20px"}
                zIndex={2}
                color="white"
            >
                <Heading fontFamily={FONTS.StyreneALC.BOLD} fontSize={'32px'}>{complexName}</Heading>
                <Text fontFamily={FONTS.StyreneALC.REGULAR} fontSize="16px">Rent - {property.rental_price ?? property.price} ₸</Text>
                <Text fontFamily={FONTS.StyreneALC.REGULAR} fontSize="16px">{property.area} square meters</Text>
                <HStack pt={2}>
                    <Link fontFamily={FONTS.StyreneALC.REGULAR} href="#" color="white" fontSize="26px" display="flex" alignItems="center">
                        Learn more <LuArrowUpRight size={'26px'} style={{marginTop :"6px", marginLeft: 4}} />
                    </Link>
                </HStack>
            </VStack>
        </Box>
    );
};

export default CommerceCard; 