import React from 'react';
import { Box, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import LinksComponent from "@/general/components/LinksComponent/Links";
import { FONTS } from "@/general/constants";

interface Props {
  address: string;
  floorRange: string;
  area: string;
  ceiling: number;
}

const AboutProject: React.FC<Props> = ({ address, floorRange, area, ceiling }) => {
  return (
    <Box py="34px">
      <HStack height="301px" px="30px" bg="white" borderRadius="25px" justifyContent="space-between">
        <VStack align="start" maxWidth="939px">
          <Heading fontFamily={FONTS.StyreneALC.BOLD} fontSize="24px" fontWeight="bold">
            About project
          </Heading>
          <Text fontFamily={FONTS.StyreneALC.REGULAR} fontSize="20px" fontWeight="regular">
            {/* Можно вставить описание здесь, если нужно дополнительное */}
            Modern residential complex meeting the latest standards and needs of residents.
          </Text>
        </VStack>
        <VStack align="start" maxWidth="939px" gap="20px">
          <LinksComponent title={address} items={[{ subtitle: "Address", link: "" }]} fontSize="24px" subFontSize="14px" gap={0} />
          <HStack gap="62px">
            <LinksComponent title={floorRange} items={[{ subtitle: "Floors", link: "" }]} subFontSize="14px" gap={0} />
            <LinksComponent title={area} items={[{ subtitle: "Area", link: "" }]} subFontSize="14px" gap={0} />
            <LinksComponent title={ceiling.toString()} items={[{ subtitle: "Ceiling", link: "" }]} subFontSize="14px" gap={0} />
          </HStack>
        </VStack>
      </HStack>
    </Box>
  );
};

export default AboutProject;