import {Text, Box, HStack, VStack, Heading, Link} from "@chakra-ui/react";
import React from "react";
import SDUPNG from "@/general/assets/colors/sdu.png"
import { LuArrowUpRight } from "react-icons/lu";

interface ResidenceProps {
    id?: string;
    name?: string;
    class_type?: string;
    down_payment?: number | string;
    total_apartment?: number | string;
    photo_link?: string;

}
const ResidentialComplex: React.FC<ResidenceProps> = ({id="1", name= "SDU Residence", class_type= "COMFORT",down_payment= 50.0,total_apartment= 252 ,photo_link=SDUPNG,
}) => {
    return (
        <Box minHeight="385px"
             maxWidth="790px"
             p="40px"
             bg={'white'}
             backgroundImage={`url(${photo_link})`}
             backgroundSize="cover"
             color={"white"}
             borderRadius="25px">
            <HStack height={"full"} justifyContent="space-between">

                <VStack height={'full'} justify="space-between">
                    <HStack width={'100%'}>
                        <Box bg={"#52A0FF"} alignItems={"start"} p={'15px'} borderRadius="10px">

                            <Text>{class_type.charAt(0).toUpperCase()+class_type.slice(1).toLowerCase()}.</Text>
                        </Box>
                    </HStack>
                    <VStack >
                        <Heading textAlign={'start'} >{name}</Heading>
                        <Text>from {down_payment} tng</Text>
                        <Text>{total_apartment} apartments on sale</Text>
                    </VStack>
                </VStack>
                <VStack height={"full"}  justifyContent="end">
                    <Link color={"white"} href={'/residential-complexes/' + id} fontSize={'24px'}>
                        More <LuArrowUpRight  size={"26px"}/>
                    </Link>
                </VStack>
            </HStack>
        </Box>
    );
};

export default ResidentialComplex;