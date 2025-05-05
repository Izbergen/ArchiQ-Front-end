import  { useEffect, useState } from "react";
import {
  Box, 
  Flex, 
  Heading, 
  Text, 
  Button, 
  HStack, 
  VStack,
  Icon,
  Image,
} from "@chakra-ui/react";
import { FONTS } from "@/general/constants";
import { useDI } from "@/general/hooks/useDI";
import { CoreTypes } from "@/general/di/modules/core";
import type { IAxiosService } from "@/general/services/axios";
import { FaFile, FaFileAlt, FaQuestion } from "react-icons/fa";
import { toaster } from "@/general/components/ui/toaster";
import { Property } from "@/general/types/property.types";

// Types based on API schemas
interface UserProfile {
  id: number;
  phone_number: string;
  first_name: string;
  last_name: string;
}

const UserPage = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const axiosService = useDI<IAxiosService>(CoreTypes.AxiosService);

  // Add this useEffect to log when profile state changes
  useEffect(() => {
    console.log("Profile state updated:", profile);
  }, [profile]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        
        // MOCK API calls - replace with real API URLs in production
        // Profile API: /accounts/profile/
        const profileResponse = await axiosService.get('/accounts/profile/');
        if (profileResponse && typeof profileResponse === 'object' && 'data' in profileResponse) {
          const userData = profileResponse.data as UserProfile;
          console.log("API response data:", userData); // Log the API data directly
          setProfile(userData);
        }
        
        // Properties API: /accounts/properties/
        const propertiesResponse = await axiosService.get('/accounts/properties/');
        if (propertiesResponse && typeof propertiesResponse === 'object' && 'data' in propertiesResponse) {
          const propData = propertiesResponse.data as Property[];
          setProperties(Array.isArray(propData) ? propData : []);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        toaster.error("Error loading user data");
        
        // Set mock data for development/preview if API call fails
        setProfile({
          id: 1,
          phone_number: "+77777777777",
          first_name: "Alexa",
          last_name: "Rawles",

        });
        
        // Sample property data structure matching API schema
        setProperties([
          { 
            id: 1, 
            category: "APARTMENT", 
            complex: { name: "Complex A" }, 
            price: "25000000", 
            price_per_sqm: "87917",
            rental_price: "16",
            floor: "5",
            area: "60", 
            rooms: "2", 
            unit: "Unit 20", 
            application_type: "Purchase", 
            status: "In Process",
            property_photos: [
              { id: 1, photo_link: "https://randomuser.me/api/portraits/women/68.jpg" }
            ]
          },
          { 
            id: 2, 
            category: "APARTMENT", 
            complex: { name: "Complex A" }, 
            price: "30000000", 
            price_per_sqm: "87917",
            rental_price: "16",
            floor: "7",
            area: "75", 
            rooms: "3", 
            unit: "Unit 20", 
            application_type: "Purchase", 
            status: "In Process",
            property_photos: [
              { id: 2, photo_link: "https://randomuser.me/api/portraits/women/69.jpg" }
            ]
          },
          { 
            id: 3, 
            category: "APARTMENT", 
            complex: { name: "Complex B" }, 
            price: "20000000", 
            price_per_sqm: "87917",
            rental_price: "16",
            floor: "3",
            area: "55", 
            rooms: "1", 
            unit: "Unit 20", 
            application_type: "Purchase", 
            status: "In Process",
            property_photos: [
              { id: 3, photo_link: "https://randomuser.me/api/portraits/women/70.jpg" }
            ]
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <Flex justify="center" align="center" py={8} px={4}>
      <Box
        bg="white"
        borderRadius="2xl"
        boxShadow="md"
        w="full"
        maxW="1200px"
      >
        {/* User Profile Section */}
        <Flex p={6} align="center" justify="space-between">
          <Flex align="center">
            <Image 
              src="https://randomuser.me/api/portraits/women/68.jpg" 
              borderRadius="full"
              boxSize="60px"
              mr={4}
              alt="User profile"
            />
            <Box>
              <Heading size="md" fontFamily={FONTS.StyreneALC.MEDIUM}>
                {profile ? `${profile.first_name} ${profile.last_name}` : "Loading..."}
              </Heading>
              <Text color="gray.600" fontSize="sm">
                {profile?.phone_number || "Loading..."}
              </Text>
            </Box>
          </Flex>
          <Button 
            colorScheme="blue" 
            size="sm" 
            borderRadius="md"
          >
            Edit
          </Button>
        </Flex>

        {/* Main Content with Sidebar */}
        <Flex>
          {/* Sidebar */}
          <VStack 
            align="start" 
            width="200px" 
            p={6} 
            gap={4}
            borderRightWidth="1px"
            borderColor="gray.200"
          >
            <HStack color="#52A0FF" fontWeight="bold">
              <Icon as={FaFile} />
              <Text>Мои объекты</Text>
            </HStack>
            <HStack>
              <Icon as={FaFileAlt} />
              <Text>Мои заявки</Text>
              <Box 
                bg="#52A0FF" 
                color="white" 
                borderRadius="full" 
                w="20px" 
                h="20px" 
                display="flex" 
                alignItems="center" 
                justifyContent="center"
                fontSize="xs"
              >
                2
              </Box>
            </HStack>
            <HStack>
              <Icon as={FaQuestion} />
              <Text>Проблемы жк</Text>
              <Box 
                bg="#52A0FF" 
                color="white" 
                borderRadius="full" 
                w="20px" 
                h="20px" 
                display="flex" 
                alignItems="center" 
                justifyContent="center"
                fontSize="xs"
              >
                25
              </Box>
            </HStack>
          </VStack>

          {/* Main Content */}
          <Box flex="1" p={6}>
            <Heading 
              as="h2" 
              size="lg" 
              color="#52A0FF" 
              mb={2}
              fontFamily={FONTS.StyreneALC.MEDIUM}
            >
              Мои объекты
            </Heading>
            <Text mb={6} fontSize="sm" color="gray.600">
              Manage your properties, view details, and submit requests
            </Text>

            {/* Properties Table - Simple version without Chakra UI Table components */}
            <Box overflowX="auto">
              <Box as="table" width="100%" style={{ borderCollapse: "collapse" }}>
                <Box as="thead">
                  <Box as="tr">
                    <Box as="th" textAlign="left" p={3}>Property</Box>
                    <Box as="th" textAlign="left" p={3}>Unit</Box>
                    <Box as="th" textAlign="left" p={3}>Application</Box>
                    <Box as="th" textAlign="left" p={3}>Status</Box>
                  </Box>
                </Box>
                <Box as="tbody">
                  {properties.length > 0 ? (
                    properties.map((property) => (
                      <Box as="tr" key={property.id}>
                        <Box as="td" p={3}>
                          {property.unit && (
                            <Flex align="center">
                              <Image 
                                src={property.property_photos?.[0]?.photo_link || "https://randomuser.me/api/portraits/women/68.jpg"}
                                borderRadius="full"
                                boxSize="30px"
                                mr={3}
                                alt="Property"
                              />
                              {property.unit}
                            </Flex>
                          )}
                        </Box>
                        <Box as="td" p={3}>{property.unit || "Unit 20"}</Box>
                        <Box as="td" p={3}>{property.application_type || "Purchase"}</Box>
                        <Box as="td" p={3}>
                          <Box
                            px={3}
                            py={1}
                            borderRadius="full"
                            bg="gray.100"
                            display="inline-block"
                            textAlign="center"
                          >
                            {property.status || "In Process"}
                          </Box>
                        </Box>
                      </Box>
                    ))
                  ) : (
                    <Box as="tr">
                      <Box 
                        as="td" 
                        p={3} 
                        textAlign="center" 
                      >
                        {loading ? "Loading properties..." : "No properties found"}
                      </Box>
                    </Box>
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};

export default UserPage;