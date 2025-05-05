import { useEffect, useState } from "react";
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
  Input,
  Field,
  Table,
  Spinner,
} from "@chakra-ui/react";
import { FONTS } from "@/general/constants";
import { useDI } from "@/general/hooks/useDI";
import { CoreTypes } from "@/general/di/modules/core";
import type { IAxiosService } from "@/general/services/axios";
import { FaFile } from "react-icons/fa";
import { toaster } from "@/general/components/ui/toaster";

interface UserProfile {
  id: number;
  phone_number: string;
  first_name: string;
  last_name: string;
}

interface Property {
  id: number;
  category: string;
  number: number;
  price: string;
  price_per_sqm: string;
  rental_price: string;
  floor: number;
  area: string;
  rooms: number;
  layout: string;
  property_photos: { id: number; photo_link: string }[];
  property_videos: { id: number; video_link: string }[];
  block: {
    id: number;
    block_number: number;
    entrance_number: number;
    total_floors: number;
    building_status: string;
  };
  complex: string;
}

const UserPage = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState<UserProfile | null>(null);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const axiosService = useDI<IAxiosService>(CoreTypes.AxiosService);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);

        const profileResponse = await axiosService.get<UserProfile>('/accounts/profile/');
        if (profileResponse) {
          setProfile(profileResponse);
          setEditData(profileResponse);
        }

        const propertiesResponse = await axiosService.get<Property[]>('/accounts/properties/');
        if (propertiesResponse) {
          setProperties(propertiesResponse);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        toaster.error("Error loading profile data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSave = async () => {
    if (!editData) return;
    try {
      await axiosService.patch('/accounts/profile/', {
        phone_number: editData.phone_number,
        first_name: editData.first_name,
        last_name: editData.last_name,
      });
      setProfile(editData);
      setEditMode(false);
      toaster.success("Profile updated successfully!");
    } catch (error) {
      console.error('Error updating profile:', error);
      toaster.error("Failed to update profile");
    }
  };

  const handleChange = (field: keyof UserProfile, value: string) => {
    if (!editData) return;
    setEditData({
      ...editData,
      [field]: value,
    });
  };

  if (loading) {
    return (
        <Flex align="center" justify="center" minH="100vh">
          <Spinner size="xl" />
        </Flex>
    );
  }

  return (
      <Flex justify="center" py={8} px={4}>
        <Box bg="white" borderRadius="2xl" boxShadow="md" w="full" maxW="1200px">
          <Flex p={6} align="center" justify="space-between">
            <Flex align="center">
              <Box>
                {editMode && editData ? (
                    <>
                      <Field.Root id="first_name" mb={2}>
                        <Field.Label>First Name</Field.Label>
                        <Input
                            value={editData.first_name}
                            onChange={(e) => handleChange("first_name", e.target.value)}
                        />
                      </Field.Root>
                      <Field.Root id="last_name" mb={2}>
                        <Field.Label>Last Name</Field.Label>
                        <Input
                            value={editData.last_name}
                            onChange={(e) => handleChange("last_name", e.target.value)}
                        />
                      </Field.Root>
                      <Field.Root id="phone_number" mb={2}>
                        <Field.Label>Phone Number</Field.Label>
                        <Input
                            value={editData.phone_number}
                            onChange={(e) => handleChange("phone_number", e.target.value)}
                        />
                      </Field.Root>
                    </>
                ) : (
                    <>
                      <Heading size="md" fontFamily={FONTS.StyreneALC.MEDIUM}>
                        {profile ? `${profile.first_name} ${profile.last_name}` : "Loading..."}
                      </Heading>
                      <Text color="gray.600" fontSize="sm">
                        {profile?.phone_number || ""}
                      </Text>
                    </>
                )}
              </Box>
            </Flex>
            {editMode ? (
                <Button colorScheme="green" size="sm" borderRadius="md" onClick={handleSave}>
                  Save
                </Button>
            ) : (
                <Button colorScheme="blue" size="sm" borderRadius="md" onClick={handleEditClick}>
                  Edit
                </Button>
            )}
          </Flex>

          <Flex>
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
                <Text>My Properties</Text>
              </HStack>
            </VStack>

            <Box flex="1" p={6}>
              <Heading
                  as="h2"
                  size="lg"
                  color="#52A0FF"
                  mb={2}
                  fontFamily={FONTS.StyreneALC.MEDIUM}
              >
                My Properties
              </Heading>
              <Text mb={6} fontSize="sm" color="gray.600">
                Manage your properties, view details, and submit requests
              </Text>

              {/* Properties Table */}
              <Box overflowX="auto">
                <Table.Root>
                  <Table.Header>
                    <Table.Row>
                      <Table.ColumnHeader>Property</Table.ColumnHeader>
                      <Table.ColumnHeader>Unit Number</Table.ColumnHeader>
                      <Table.ColumnHeader>Floor</Table.ColumnHeader>
                      <Table.ColumnHeader>Building Status</Table.ColumnHeader>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {properties.length > 0 ? (
                        properties.map((property) => (
                            <Table.Row key={property.id}>
                              <Table.Cell>
                                <Flex align="center">
                                  <Image
                                      src={property.property_photos?.[0]?.photo_link || "https://via.placeholder.com/60"}
                                      borderRadius="md"
                                      boxSize="40px"
                                      objectFit="cover"
                                      mr={3}
                                      alt="Property"
                                  />
                                  {property.category}
                                </Flex>
                              </Table.Cell>
                              <Table.Cell>{property.number}</Table.Cell>
                              <Table.Cell>{property.floor}</Table.Cell>
                              <Table.Cell>{property.block?.building_status || "N/A"}</Table.Cell>
                            </Table.Row>
                        ))
                    ) : (
                        <Table.Row>
                          <Table.Cell colSpan={4} style={{ textAlign: "center" }}>
                            No properties found
                          </Table.Cell>
                        </Table.Row>
                    )}
                  </Table.Body>
                </Table.Root>
              </Box>
            </Box>
          </Flex>
        </Box>
      </Flex>
  );
};

export default UserPage;
