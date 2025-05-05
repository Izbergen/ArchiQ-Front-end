import { Container } from "@/general/components/ui/Container/Container";
import { Box, Skeleton, SkeletonText, Flex } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import Header from "./_general/components/Header";
import Banner from "./_general/components/Banner";
import AboutProject from "./_general/components/AboutProject";
import ChakraCarousel from "@/pages/main/home/_general/_components/ChakraCarousel";
import QuestionCard from "@/general/components/QuestionCard/QuestionCard";
import { useProjectDetails } from "./_general/hooks";

export default function ProjectPage() {
  const { id } = useParams<{ id: string }>();
  const numericId = Number(id);
  const { data: projectDetails, isLoading, error } = useProjectDetails(numericId);

  if (isNaN(numericId)) {
    return <Container><Box py="50px" textAlign="center">Неверный ID</Box></Container>;
  }

  if (isLoading) {
    return (
      <Container>
        <Box py="50px">
          <Skeleton height="60px" mb="20px" />
          <Skeleton height="553px" mb="40px" />
          <SkeletonText noOfLines={6} gap="4" />
        </Box>
      </Container>
    );
  }

  if (error || !projectDetails) {
    return (
      <Container>
        <Box py="50px" textAlign="center">
          Проект не найден
        </Box>
      </Container>
    );
  }

  const {
    name,
    address,
    ceiling_height,
    district,
    residential_complex_photos,
    description_short,
    description_full,
      blocks
  } = projectDetails;
  const floors = blocks.map(block => block.total_floors).sort((a , b) => a - b)

  const images = residential_complex_photos.map((photo: { photo_link: string }) => photo.photo_link);
  return (
    <Container>
      <Header
        project={{
          title: name,
          about_link: "#about",
          gallery_link: "#gallery",
          pdf_link: "#pdf",
        }}
      />
      <Banner
        url={images[0]}
        title={name}
        description={description_short || description_full}
      />
      <AboutProject
        address={`${district?.name || ""}, ${address}`}
        floorRange={`1-${floors[floors.length - 1]}`}
        area="42-56 м²"
        ceiling={parseFloat(ceiling_height)}
      />
      <Box pb="98px">
        <ChakraCarousel>
          {images.map((url, index) => (
            <Flex
              key={index}
              height="720px"
              backgroundImage={`url(${url})`}
              backgroundSize="cover"
              backgroundPosition="top center"
              backgroundRepeat="no-repeat"
              position="relative"
              _before={{
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                zIndex: 1,
              }}
            />
          ))}
        </ChakraCarousel>
      </Box>
      <Box pb="82px">
        <QuestionCard />
      </Box>
    </Container>
  );
}