import { Container } from "@/general/components/ui/Container/Container";
import { Flex, Heading, HStack, Link, Text, VStack } from "@chakra-ui/react";
import { LuArrowUpRight } from "react-icons/lu";

interface Props {
  title: string;
  description: string;
  url?: string;
  height?: string | number;
}

export default function Banner({ title, description, url, height = "553px" }: Props) {
  return (
    <Flex
      borderRadius="25px"
      height={height}
      position="relative"
      backgroundPosition="top center"
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
      backgroundImage={`url(${url})`}
      _before={{
        borderRadius: "25px",
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 1,
      }}
    >
      <Container
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        color="white"
        p={{ base: 4, md: 8 }}
        zIndex={2}
        maxW="100vw"
      >
        <HStack justifyContent="space-between" alignItems="center">
          <VStack gap="30px" alignItems="start">
            <Heading
              textStyle="StyreneALCBold"
              fontSize="96px"
              as="h2"
              mb={2}
              color="white"
            >
              {title}
            </Heading>
            <Text textStyle="StyreneALCMiddle" fontSize="24px" color="white">
              {description}
            </Text>
          </VStack>
          <VStack>
            <Link
              marginTop="auto"
              href=""
              color="white"
              textDecoration="none"
              _hover={{ textDecoration: "underline" }}
              fontSize="24px"
            >
              Learn more <LuArrowUpRight size="24px" color="white" />
            </Link>
          </VStack>
        </HStack>
      </Container>
    </Flex>
  );
}