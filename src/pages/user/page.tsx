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
  Input,
  Field,
  Table,
  Spinner,
  Tabs,
} from "@chakra-ui/react";
import { FONTS } from "@/general/constants";
import { useDI } from "@/general/hooks/useDI";
import { CoreTypes } from "@/general/di/modules/core";
import type { IAxiosService } from "@/general/services/axios";
import { FaSignOutAlt, FaExclamationTriangle } from "react-icons/fa";
import { toaster } from "@/general/components/ui/toaster";
import { useTokens } from "@/general/hooks/useToken";
import { useNavigate } from "react-router-dom";

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
  complex: {
    id: number;
    name: string;
    address: string;
    class_type: string;
    district: {
      id: number;
      name: string;
    };
  };
}

interface UserReport {
  id: number;
  title: string;
  content: string;
  status: string;
  created_at: string;
  property: number;
  report_type: string;
}

const REPORT_URL = "https://api.slyamgazy.kz/support/reports/";

// Helper to get property info by id
function getPropertyInfo(propertyId: number, properties: Property[]) {
  const prop = properties.find(p => p.id === propertyId);
  if (!prop) return { name: 'N/A', address: '' };
  return {
    name: prop.complex?.name || 'N/A',
    address: prop.complex?.address || '',
    number: prop.number ? String(prop.number) : '',
  };
}

const UserPage = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState<UserProfile | null>(null);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const axiosService = useDI<IAxiosService>(CoreTypes.AxiosService);
  const tokenService = useTokens();
  const navigate = useNavigate();
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reportPropertyId, setReportPropertyId] = useState<number | null>(null);
  const [reportType, setReportType] = useState("");
  const [reportTitle, setReportTitle] = useState("");
  const [reportDescription, setReportDescription] = useState("");
  const [reportFiles, setReportFiles] = useState<FileList | null>(null);
  const [reportSubmitting, setReportSubmitting] = useState(false);
  const [reports, setReports] = useState<UserReport[]>([]);
  const [reportsLoading, setReportsLoading] = useState(false);

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

        // Fetch user reports
        setReportsLoading(true);
        try {
          const accessToken = localStorage.getItem('access_token') || tokenService.getAccessToken();
          const res = await fetch(REPORT_URL, {
            headers: {
              ...(accessToken ? { 'Authorization': `Bearer ${accessToken}` } : {})
            },
          });
          if (res.ok) {
            const data = await res.json();
            setReports(Array.isArray(data) ? data : data.results || []);
          } else {
            setReports([]);
          }
        } catch (err) {
          setReports([]);
        }
        setReportsLoading(false);
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

  const handleLogout = () => {
    // Clear the tokens from localStorage
    tokenService.setAccessToken('');
    tokenService.setRefreshToken('');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    
    toaster.success("Successfully logged out");
    navigate('/auth');
  };

  const openReportModal = (propertyId: number) => {
    setReportPropertyId(propertyId);
    setReportType("");
    setReportTitle("");
    setReportDescription("");
    setReportFiles(null);
    setReportModalOpen(true);
  };

  const closeReportModal = () => {
    setReportModalOpen(false);
    setReportPropertyId(null);
    setReportType("");
    setReportTitle("");
    setReportDescription("");
    setReportFiles(null);
  };

  const handleSubmitReport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportPropertyId || !reportTitle.trim() || !reportDescription.trim()) {
      toaster.error("Title and content are required.");
      return;
    }
    setReportSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("property", reportPropertyId.toString());
      formData.append("report_type", reportType);
      formData.append("title", reportTitle);
      formData.append("content", reportDescription);
      if (reportFiles && reportFiles.length > 0) {
        for (let i = 0; i < reportFiles.length; i++) {
          formData.append("attachments", reportFiles[i]);
        }
      }
      const accessToken = localStorage.getItem('access_token') || tokenService.getAccessToken();
      const res = await fetch(REPORT_URL, {
        method: "POST",
        body: formData,
        headers: {
          ...(accessToken ? { 'Authorization': `Bearer ${accessToken}` } : {})
        },
      });
      if (!res.ok) throw new Error("Failed to submit report");
      toaster.success("Report submitted successfully");
      closeReportModal();
    } catch (error) {
      console.error("Error submitting report:", error);
      toaster.error("Failed to submit report. Please try again.");
    } finally {
      setReportSubmitting(false);
    }
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
            <HStack gap={2}>
              {editMode ? (
                  <Button colorScheme="green" size="sm" borderRadius="md" onClick={handleSave}>
                    Save
                  </Button>
              ) : (
                  <>
                    <Button colorScheme="blue" size="sm" borderRadius="md" onClick={handleEditClick}>
                      Edit
                    </Button>
                    <Button 
                      colorScheme="red" 
                      size="sm" 
                      borderRadius="md" 
                      onClick={handleLogout}
                    >
                      <Icon as={FaSignOutAlt} mr={2} />
                      Logout
                    </Button>
                  </>
              )}
            </HStack>
          </Flex>

          <Flex>


            <Box flex="1" p={6}>
              <Tabs.Root defaultValue="properties" colorScheme="blue" variant="enclosed">
                <Tabs.List>
                  <Tabs.Trigger value="properties">My Properties</Tabs.Trigger>
                  <Tabs.Trigger value="reports">My Reports</Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content value="properties">
                  <Box px={0}>
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
                    <Box overflowX="auto">
                      <Table.Root>
                        <Table.Header>
                          <Table.Row>
                            <Table.ColumnHeader>Property</Table.ColumnHeader>
                            <Table.ColumnHeader>Unit Number</Table.ColumnHeader>
                            <Table.ColumnHeader>Floor</Table.ColumnHeader>
                            <Table.ColumnHeader>Building Status</Table.ColumnHeader>
                            <Table.ColumnHeader>Actions</Table.ColumnHeader>
                          </Table.Row>
                        </Table.Header>
                        <Table.Body>
                          {properties.length > 0 ? (
                            properties.map((property) => (
                              <Table.Row key={property.id}>
                                <Table.Cell>
                                  <Flex align="center">
                                    {property.complex.name} {property.complex.address}
                                  </Flex>
                                </Table.Cell>
                                <Table.Cell>{property.number}</Table.Cell>
                                <Table.Cell>{property.floor}</Table.Cell>
                                <Table.Cell>{property.block?.building_status || "N/A"}</Table.Cell>
                                <Table.Cell>
                                  <Button
                                    size="xs"
                                    colorScheme="red"
                                    onClick={() => openReportModal(property.id)}
                                  >
                                    <Icon as={FaExclamationTriangle} mr={1} /> Report
                                  </Button>
                                </Table.Cell>
                              </Table.Row>
                            ))
                          ) : (
                            <Table.Row>
                              <Table.Cell colSpan={5} style={{ textAlign: "center" }}>
                                No properties found
                              </Table.Cell>
                            </Table.Row>
                          )}
                        </Table.Body>
                      </Table.Root>
                    </Box>
                  </Box>
                </Tabs.Content>
                <Tabs.Content value="reports">
                  <Box px={0}>
                    <Heading
                      as="h2"
                      size="lg"
                      color="#52A0FF"
                      mb={2}
                      fontFamily={FONTS.StyreneALC.MEDIUM}
                    >
                      My Reports
                    </Heading>
                    <Text mb={6} fontSize="sm" color="gray.600">
                      View all your submitted reports and their statuses
                    </Text>
                    <Box overflowX="auto">
                      <Table.Root>
                        <Table.Header>
                          <Table.Row>
                            <Table.ColumnHeader>Title</Table.ColumnHeader>
                            <Table.ColumnHeader>Property</Table.ColumnHeader>
                            <Table.ColumnHeader>Status</Table.ColumnHeader>
                            <Table.ColumnHeader>Created</Table.ColumnHeader>
                          </Table.Row>
                        </Table.Header>
                        <Table.Body>
                          {reportsLoading ? (
                            <Table.Row>
                              <Table.Cell colSpan={4} style={{ textAlign: "center" }}>
                                <Spinner size="sm" /> Loading reports...
                              </Table.Cell>
                            </Table.Row>
                          ) : reports.length > 0 ? (
                            reports.map((report) => (
                              <Table.Row key={report.id}>
                                <Table.Cell>{report.title}</Table.Cell>
                                <Table.Cell>
                                  {(() => {
                                    const info = getPropertyInfo(report.property, properties);
                                    let result = info.name;
                                    if (info.address) result += ' - ' + info.address;
                                    if (info.number) result += ' (Apt. ' + info.number + ')';
                                    return result;
                                  })()}
                                </Table.Cell>
                                <Table.Cell>{report.status}</Table.Cell>
                                <Table.Cell>{new Date(report.created_at).toLocaleString()}</Table.Cell>
                              </Table.Row>
                            ))
                          ) : (
                            <Table.Row>
                              <Table.Cell colSpan={4} style={{ textAlign: "center" }}>
                                No reports found
                              </Table.Cell>
                            </Table.Row>
                          )}
                        </Table.Body>
                      </Table.Root>
                    </Box>
                  </Box>
                </Tabs.Content>
              </Tabs.Root>
            </Box>
          </Flex>

          {/* Report Modal */}
          {reportModalOpen && (
            <Box
              position="fixed"
              top="0"
              left="0"
              width="100%"
              height="100%"
              bg="rgba(0,0,0,0.5)"
              zIndex={1000}
              display="flex"
              alignItems="center"
              justifyContent="center"
              onClick={closeReportModal}
            >
              <Box
                bg="white"
                borderRadius="xl"
                p={8}
                minW="350px"
                maxW="90vw"
                onClick={e => e.stopPropagation()}
              >
                <Heading size="md" color="#52A0FF" mb={4} fontFamily={FONTS.StyreneALC.BOLD}>
                  Report Property
                </Heading>
                <form onSubmit={handleSubmitReport}>
                  <VStack gap={4} align="stretch">
                    <Field.Root>
                      <Field.Label>Title</Field.Label>
                      <Input
                        value={reportTitle}
                        onChange={e => setReportTitle(e.target.value)}
                        placeholder="Enter a short title for the issue"
                        fontFamily={FONTS.StyreneALC.REGULAR}
                        required
                      />
                    </Field.Root>
                    <Field.Root>
                      <Field.Label>Content</Field.Label>
                      <textarea
                        rows={4}
                        value={reportDescription}
                        onChange={e => setReportDescription(e.target.value)}
                        placeholder="Describe the issue in detail..."
                        style={{
                          fontFamily: FONTS.StyreneALC.REGULAR,
                          width: '100%',
                          padding: '8px',
                          borderRadius: '8px',
                          border: '1px solid #E2E8F0',
                        }}
                        required
                      />
                    </Field.Root>
                    <Field.Root>
                      <Field.Label>Attach Files (optional)</Field.Label>
                      <Input
                        type="file"
                        multiple
                        onChange={e => setReportFiles(e.target.files)}
                        accept="image/*,.pdf,.doc,.docx"
                        fontFamily={FONTS.StyreneALC.REGULAR}
                        p={1}
                      />
                    </Field.Root>
                  </VStack>
                  <HStack justify="flex-end" gap={3} mt={6}>
                    <Button variant="ghost" onClick={closeReportModal}>
                      Cancel
                    </Button>
                    <Button
                      colorScheme="red"
                      type="submit"
                      loading={reportSubmitting}
                      loadingText="Submitting..."
                      fontFamily={FONTS.StyreneALC.BOLD}
                      disabled={reportSubmitting}
                    >
                      Submit Report
                    </Button>
                  </HStack>
                </form>
              </Box>
            </Box>
          )}
        </Box>
      </Flex>
  );
};

export default UserPage;
