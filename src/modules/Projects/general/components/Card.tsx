import {
    Box,
    Flex,
    VStack,
    Heading,
    Text,
    LinkBox,
    LinkOverlay,
    Badge,
  } from "@chakra-ui/react";
  import { FC } from "react";
  import { LuArrowUpRight } from "react-icons/lu";
  import { IResidence } from "../types";
  import ImageSlider from "./ImageSlider";
  import { COLORS } from "@/general/constants";
  
  interface ResidenceCardProps extends IResidence {}
  
  const ResidentialComplexCard: FC<ResidenceCardProps> = ({
    id,
    name,
    class_type,
    description_short,
    residential_complex_photos,
  }) => {
    const formattedClass =
      class_type.charAt(0).toUpperCase() +
      class_type.slice(1).toLowerCase();
  
    // Gradient overlay from bg-1 to transparent
    const bgOverlay = `linear(to-r, ${COLORS['bg-1']}, transparent)`;
  
    return (
      <LinkBox
        as="article"
        position="relative"
        maxW="xl"
        bg={COLORS['bg-1']}
        borderRadius="2xl"
        overflow="hidden"
        boxShadow="lg"
        transition="transform 0.3s, box-shadow 0.3s"
        _hover={{ transform: "scale(1.02)", boxShadow: "xl" }}
      >
        {/* Слайдер как фон */}
        <Box position="absolute" inset={0} zIndex={0}>
          <ImageSlider
            photos={residential_complex_photos.map((p) => ({
              id: p.id,
              photo_link: p.photo_link,
            }))}
          />
          {/* Градиентный оверлей */}
          <Box
            position="absolute"
            inset={0}
            bgGradient={bgOverlay}
            zIndex={1}
          />
        </Box>
  
        {/* Контент */}
        <Flex
          position="relative"
          zIndex={2}
          p={6}
          direction="column"
          justify="space-between"
          h="full"
          color={COLORS.secondary}
        >
          <VStack align="start" >
            <Badge
              bg={COLORS.primary}
              color="white"
              fontSize="sm"
              px={2}
              py={1}
              borderRadius="md"
            >
              {formattedClass}
            </Badge>
            <Heading size="md" color={'white'}>{name}</Heading>
            <Text fontSize="sm" color={'white'}>
              {description_short}
            </Text>
          </VStack>
  
          <Box pt={4}>
            <LinkOverlay
              href={`/residential-complexes/${id}`}
              display="inline-flex"
              alignItems="center"
              fontWeight="bold"
              color={'white'}
            >
              Подробнее&nbsp;
              <LuArrowUpRight />
            </LinkOverlay>
          </Box>
        </Flex>
      </LinkBox>
    );
  };
  
  export default ResidentialComplexCard;
  