import { Box, Heading, Text, VStack, Container, Flex } from "@chakra-ui/react";

const AboutUserPage = () => (
  <Box bg="#F8F8F8" minH="100vh" py={8}>
    <Container maxW="1200px">
      {/* Banner Section */}
      <Box
        borderRadius="2xl"
        overflow="hidden"
        mb={8}
        boxShadow="md"
        position="relative"
      >
        <Box
          bgImage="url('https://images.wallpaperscraft.com/image/single/skyscraper_building_architecture_112550_1600x900.jpg')"
          bgSize="cover"
          bgPos="center"
          minH={{ base: '220px', md: '320px' }}
          display="flex"
          alignItems="center"
          px={{ base: 6, md: 12 }}
          py={{ base: 8, md: 16 }}
        >
          <Box bg="blackAlpha.600" position="absolute" inset={0} zIndex={1} />
          <VStack align="start" gap={4} position="relative" zIndex={2} maxW="lg">
            <Heading color="white" fontSize={{ base: '2xl', md: '4xl' }} fontWeight="bold">
              ArchiQ
            </Heading>
            <Text color="white" fontSize={{ base: 'md', md: 'xl' }}>
              ArchiQ combines cutting-edge design with unmatched craftsmanship to deliver innovative, sustainable construction solutions that stand the test of time. From groundbreaking architectural planning to flawless project execution, ArchiQ transforms visions into enduring structures tailored to each client’s unique needs.            </Text>
          </VStack>
        </Box>
      </Box>

      {/* Info Card Section */}
      <Flex
        bg="white"
        borderRadius="xl"
        boxShadow="sm"
        p={{ base: 4, md: 8 }}
        mb={8}
        alignItems={{ base: 'flex-start', md: 'center' }}
        direction={{ base: 'column', md: 'row' }}
        gap={8}
      >
        <Box flex={2}>
          <Heading as="h3" size="md" color="#52A0FF" mb={2}>
            About us
          </Heading>
          <Text fontSize="md">
            ArchiQ is a modern construction company built on the highest industry standards and a deep understanding of client needs. With a focus on sustainable design and seamless integration into both urban and natural environments, it delivers safe, comfortable, and future-ready projects backed by cutting-edge infrastructure.          </Text>
        </Box>
        <Flex flex={1} direction="column" gap={2} minW="260px">
          <Text color="#52A0FF" fontWeight="bold" fontSize="md">
            Ablai khan st. 1/1
          </Text>
          <Text color="gray.500" fontSize="sm">Address</Text>

        </Flex>
      </Flex>

      {/* Gallery Section (static image, no controls) */}
      <Box
        borderRadius="2xl"
        overflow="hidden"
        boxShadow="md"
        mb={8}
      >
        <img
          src="https://images.wallpaperscraft.com/image/single/skyscraper_building_architecture_112550_1600x900.jpg"
          alt="SDU Residence"
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />
      </Box>
    </Container>
  </Box>
);

export default AboutUserPage; 