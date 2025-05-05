import React from 'react';
import {Box, Heading, HStack, Text, VStack} from "@chakra-ui/react";
import LinksComponent from "@/general/components/LinksComponent/Links.tsx";
import {Button} from "@/general/components/ui/Button";
import {FONTS} from "@/general/constants";
interface Props {
    address?: string
    floorRange?: string
    area?: string
    ceiling?: number

}
const AboutProject: React.FC<Props> = ({address = "Ablaikhan, 1/1", floorRange="1-5", area="42-56 м²", ceiling=2.7} ) => {
    return (
        <Box py={"34px"} >
            <HStack height={'301px'} px={"30px"} bg={"white"} borderRadius={'25px'} justifyContent="space-between">
            <VStack align="start" maxWidth={"939px"}>
                <Heading fontFamily={FONTS.StyreneALC.BOLD} fontSize="24px" fontWeight="bold">
                    About project
                </Heading>
                <Text fontFamily={FONTS.StyreneALC.REGULAR}  fontSize="20px" fontWeight="regular">
                    SDU Residence is a modern residential complex designed to meet the latest standards and residents' needs. Situated in a picturesque area of the city, it offers comfortable and safe living surrounded by nature and convenient infrastructure.
                </Text>
            </VStack>
            <VStack align="start" maxWidth={"939px"} gap={"20px"}>
                <LinksComponent title={address} items={[{subtitle:"Address", link:""}]} fontSize={"24px"} subFontSize={"14px"} gap={0}/>
                <HStack gap={"62px"}>
                    <LinksComponent title={floorRange} items={[{subtitle:"Floors", link:""}]} subFontSize={"14px"} gap={0}/>
                    <LinksComponent title={area} items={[{subtitle:"Area", link:""}]} subFontSize={"14px"} gap={0}/>
                    <LinksComponent title={ceiling.toString()} items={[{subtitle:"ceiling", link:""}]} subFontSize={"14px"} gap={0}/>
                </HStack>
                <Button p={"20px"} borderRadius={"10px"} type="button">Choose apartment</Button>
            </VStack>
        </HStack>
        </Box>

    );
};

export default AboutProject;