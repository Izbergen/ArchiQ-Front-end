import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box, 
  Container,
  VStack,
  HStack,
  Heading,
  Text,
  Image,
  Grid,
  GridItem,
  Button,
  Flex,
  Badge,
  AspectRatio,
  Skeleton,
  Icon,
  Input,
} from "@chakra-ui/react";
import { FONTS } from "@/general/constants";
import { useDI } from "@/general/hooks/useDI";
import { CoreTypes } from "@/general/di/modules/core";
import type { IAxiosService } from "@/general/services/axios";
import { toaster } from "@/general/components/ui/toaster";
import { Property, PropertyPhoto, PropertyVideo } from "@/general/types/property.types";
import { FaBed, FaRuler, FaBuilding, FaChevronLeft, FaPhone } from "react-icons/fa";
import { PhoneInput } from "@/pages/auth/_general/components";

const API_URL = "https://api.slyamgazy.kz/properties/";
const APPLICATION_URL = "applications/apply/";

// Placeholder image in case property has no photos
const PLACEHOLDER_IMAGE = "https://via.placeholder.com/800x600?text=No+Image+Available";

const ApartmentDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  
  const axiosService = useDI<IAxiosService>(CoreTypes.AxiosService);

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const response = await axiosService.get<Property>(`${API_URL}${id}/`);
        setProperty(response);
      } catch (error) {
        console.error("Error fetching property details:", error);
        toaster.error("Failed to load apartment details");
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyDetails();
  }, [id]);

  const handleSubmitRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!property) return;
    
    setSubmitting(true);
    try {
      await axiosService.post(APPLICATION_URL, {
        name,
        phone_number: phone,
        property: property.id,
      });
      
      toaster.success("Your request has been submitted! We'll contact you soon.");
      setName("");
      setPhone("");
      setShowContactForm(false);
    } catch (error) {
      console.error("Error submitting application:", error);
      toaster.error("Failed to submit request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Determine complex name safely
  const getComplexName = () => {
    if (!property) return "";
    
    const complexRaw = property.complex as any;
    return complexRaw && typeof complexRaw === 'object'
      ? complexRaw.name ?? JSON.stringify(complexRaw)
      : String(property.complex);
  };

  if (loading) {
    return (
      <Container maxW="1200px" py={8}>
        <VStack gap={8} align="stretch">
          <Skeleton height="60px" width="300px" />
          <Skeleton height="400px" borderRadius="lg" />
          <Grid templateColumns="repeat(2, 1fr)" gap={6}>
            <Skeleton height="100px" />
            <Skeleton height="100px" />
          </Grid>
        </VStack>
      </Container>
    );
  }

  if (!property) {
    return (
      <Container maxW="1200px" py={8}>
        <VStack gap={8} align="center">
          <Heading color="red.500">Apartment Not Found</Heading>
          <Text>The apartment you're looking for doesn't exist or has been removed.</Text>
          <Button 
            onClick={() => navigate('/apartments')}
            colorScheme="blue"
          >
            <Icon as={FaChevronLeft} mr={2} />
            Back to Apartments
          </Button>
        </VStack>
      </Container>
    );
  }

  // Get the current photo to display
  const photos = property.property_photos || [];
  
  // Determine photos to display, with layout as first if available
  let currentPhoto = PLACEHOLDER_IMAGE;
  
  if (property.layout) {
    currentPhoto = property.layout;
    if (currentPhotoIndex > 0 && photos.length > 0) {
      currentPhoto = photos[currentPhotoIndex - 1].photo_link;
    }
  } else if (photos.length > 0) {
    currentPhoto = photos[currentPhotoIndex].photo_link;
  }

  return (
    <Container maxW="1200px" py={8}>
      {/* Back Button */}
      <Button 
        variant="ghost" 
        mb={6} 
        onClick={() => navigate('/apartments')}
        fontSize="md"
      >
        <Icon as={FaChevronLeft} mr={2} />
        Back to Apartments
      </Button>

      {/* Main Content */}
      <Grid templateColumns={{ base: "1fr", lg: "1fr 380px" }} gap={8}>
        {/* Left Column - Photos and Details */}
        <GridItem>
          <VStack gap={6} align="stretch">
            {/* Title & Complex */}
            <Box>
              <Heading 
                fontFamily={FONTS.StyreneALC.BOLD} 
                fontSize="32px" 
                color="#52A0FF"
                mb={2}
              >
                {property.rooms ? `${property.rooms}-Bedroom Apartment` : 'Apartment'}
              </Heading>
              <Text 
                fontFamily={FONTS.StyreneALC.MEDIUM} 
                fontSize="20px" 
                color="gray.700"
              >
                {getComplexName()}
              </Text>
              
              {property.block?.building_status && (
                <Badge 
                  colorPalette={property.block?.building_status === "UNDER CONSTRUCTION" ? "orange" : "green"}
                  mt={2}
                  fontSize="sm"
                  px={2}
                  py={1}
                  borderRadius="full"
                >
                  {property.block.building_status}
                </Badge>
              )}
            </Box>

            {/* Main Photo */}
            <Box 
              borderRadius="lg" 
              overflow="hidden" 
              boxShadow="md"
              position="relative"
            >
              <Image 
                src={currentPhoto} 
                alt={`Apartment ${property.id}`}
                width="100%"
                height="720px"
                objectFit="cover"
              />
            </Box>

            {/* Photo Gallery Thumbnails */}
            {(property.layout || photos.length > 0) && (
              <Flex overflowX="auto" gap={2} py={2}>
                {property.layout && (
                  <Box 
                    cursor="pointer"
                    borderWidth={currentPhotoIndex === 0 ? "2px" : "0"}
                    borderColor="blue.500"
                    borderRadius="md"
                    overflow="hidden"
                    onClick={() => setCurrentPhotoIndex(0)}
                  >
                    <Image 
                      src={property.layout} 
                      alt="Layout"
                      width="100px"
                      height="70px"
                      objectFit="cover"
                    />
                  </Box>
                )}
                {photos.map((photo: PropertyPhoto, index: number) => (
                  <Box 
                    key={photo.id}
                    cursor="pointer"
                    borderWidth={property.layout ? (index + 1 === currentPhotoIndex ? "2px" : "0") : (index === currentPhotoIndex ? "2px" : "0")}
                    borderColor="blue.500"
                    borderRadius="md"
                    overflow="hidden"
                    onClick={() => setCurrentPhotoIndex(property.layout ? index + 1 : index)}
                  >
                    <Image 
                      src={photo.photo_link} 
                      alt={`Thumbnail ${index + 1}`}
                      width="100px"
                      height="70px"
                      objectFit="cover"
                    />
                  </Box>
                ))}
              </Flex>
            )}

            {/* Videos Content */}
            {(property.property_videos?.length || 0) > 0 && (
              <Box borderRadius="lg" boxShadow="sm" p={6}>
                <Heading size="md" mb={4} fontFamily={FONTS.StyreneALC.MEDIUM}>Videos</Heading>
                <VStack gap={6} py={4}>
                  {property.property_videos?.map((video: PropertyVideo) => (
                    <Box key={video.id} width="100%">
                      <AspectRatio ratio={16/9}>
                        <iframe
                          src={video.video_link}
                          title={`Apartment Video ${video.id}`}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </AspectRatio>
                    </Box>
                  ))}
                </VStack>
              </Box>
            )}
          </VStack>
        </GridItem>

        {/* Right Column - Price & All Details */}
        <GridItem>
          <Box
            borderRadius="lg" 
            boxShadow="md" 
            bg="white"
            mt={'140px'}
            p={6}
            position="sticky"
            top="20px"
          >
            <VStack  gap={6} align="stretch">
              <Heading 
                fontFamily={FONTS.StyreneALC.BOLD} 
                fontSize="28px" 
                color="#52A0FF"
              >
                {property.price.toLocaleString('ru-RU')} ₸
              </Heading>
              
              <Box h="1px" bg="gray.200" />
              
              {/* Apartment Details */}
              <VStack align="stretch" gap={4}>
                <Heading size="md" fontFamily={FONTS.StyreneALC.MEDIUM}>Apartment Details</Heading>
                
                <HStack>
                  <Icon as={FaBed} color="blue.500" boxSize={5} />
                  <Text fontFamily={FONTS.StyreneALC.MEDIUM}>
                    {property.rooms || "N/A"} Bedrooms
                  </Text>
                </HStack>
                
                <HStack>
                  <Icon as={FaRuler} color="blue.500" boxSize={5} />
                  <Text fontFamily={FONTS.StyreneALC.MEDIUM}>
                    {property.area} m²
                  </Text>
                </HStack>
                
                <HStack>
                  <Icon as={FaBuilding} color="blue.500" boxSize={5} />
                  <Text fontFamily={FONTS.StyreneALC.MEDIUM}>
                    Floor: {property.floor || "N/A"}
                  </Text>
                </HStack>
                
                {property.price_per_sqm && (
                  <HStack justifyContent="space-between">
                    <Text fontFamily={FONTS.StyreneALC.MEDIUM}>Price per m²</Text>
                    <Text fontWeight="bold">{property.price_per_sqm.toLocaleString('ru-RU')} ₸</Text>
                  </HStack>
                )}
                
                {property.rental_price && (
                  <HStack justifyContent="space-between">
                    <Text fontFamily={FONTS.StyreneALC.MEDIUM}>Rental Price</Text>
                    <Text fontWeight="bold">{property.rental_price}</Text>
                  </HStack>
                )}
              </VStack>
              
              {/* Block Information */}
              {property.block && (
                <>
                  <Box h="1px" bg="gray.200" />
                  <VStack align="stretch" gap={4}>
                    <Heading size="md" fontFamily={FONTS.StyreneALC.MEDIUM}>Building Information</Heading>
                    <HStack justifyContent="space-between">
                      <Text fontFamily={FONTS.StyreneALC.MEDIUM}>Block</Text>
                      <Text fontWeight="bold">{getComplexName()} {property.block.block_number}</Text>
                    </HStack>
                    <HStack justifyContent="space-between">
                      <Text fontFamily={FONTS.StyreneALC.MEDIUM}>Apartment number</Text>
                      <Text fontWeight="bold">{property.number}</Text>
                    </HStack>
                    <HStack justifyContent="space-between">
                      <Text fontFamily={FONTS.StyreneALC.MEDIUM}>Entrance number</Text>
                      <Text fontWeight="bold">{property.block.entrance_number}</Text>
                    </HStack>
                  </VStack>
                </>
              )}
              
              <Box h="1px" bg="gray.200" />
              
              <VStack gap={4}>
                <Button 
                  colorScheme="blue" 
                  size="lg" 
                  width="100%"
                  height="60px"
                  onClick={() => setShowContactForm(true)}
                  fontFamily={FONTS.StyreneALC.BOLD}
                >
                  <Icon as={FaPhone} mr={2} />
                  Request a Consultation
                </Button>
                
                <Text fontSize="sm" color="gray.600" textAlign="center">
                  Contact us to get more information about this apartment or to schedule a viewing
                </Text>
              </VStack>
            </VStack>
          </Box>
        </GridItem>
      </Grid>

      {/* Contact Form */}
      {showContactForm && (
        <Box 
          position="fixed" 
          top="0" 
          left="0" 
          width="100%" 
          height="100%" 
          bg="rgba(0,0,0,0.5)" 
          zIndex="modal"
          onClick={() => setShowContactForm(false)}
        >
          <Box 
            position="relative"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            maxW="md"
            width="90%"
            bg="white"
            borderRadius="2xl"
            p={6}
            onClick={(e) => e.stopPropagation()}
          >
            <VStack align="stretch" gap={6}>
              <Heading 
                fontFamily={FONTS.StyreneALC.BOLD}
                color="#52A0FF"
                textAlign="center"
                fontSize="24px"
              >
                Request Consultation
              </Heading>
              
              <form onSubmit={handleSubmitRequest}>
                <VStack gap={6}>
                  <Input
                    placeholder="Your Name"
                    fontFamily={FONTS.StyreneALC.REGULAR}
                    fontSize="18px"
                    textAlign="center"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                    borderRadius="12px"
                    height="50px"
                  />
                  
                  <PhoneInput
                    placeholder="+7 777 777 77 77"
                    fontFamily={FONTS.StyreneALC.REGULAR}
                    fontSize="18px"
                    textAlign="center"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    required
                  />
                  
                  <Text fontSize="sm" color="gray.600" textAlign="center">
                    Our manager will contact you shortly to provide more information and answer your questions
                  </Text>
                </VStack>
                
                <Button
                  type="submit"
                  colorScheme="blue"
                  width="100%"
                  height="50px"
                  fontFamily={FONTS.StyreneALC.BOLD}
                  disabled={submitting}
                  borderRadius="12px"
                  mt={6}
                >
                  {submitting ? "Submitting..." : "Submit Request"}
                </Button>
              </form>
            </VStack>
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default ApartmentDetailPage;