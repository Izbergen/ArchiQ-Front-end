import React from "react";
import { Heading, HStack, Link } from "@chakra-ui/react";
import { FONTS } from "@/general/constants";

type ProjectHeaderData = {
  title: string;
  about_link?: string;
  gallery_link?: string;
  pdf_link?: string;
};

interface Props {
  project: ProjectHeaderData;
}

const Header: React.FC<Props> = ({ project }) => {
  return (
    <HStack justify="space-between" pb="34px">
      <HStack gap="50px">
        <Heading
          fontFamily={FONTS.StyreneALC.BOLD}
          fontSize="48px"
          color="#181818"
        >
          {project.title}
        </Heading>
        <HStack gap="20px">
          <Link
            href={project.about_link ?? "#"}
            fontFamily={FONTS.StyreneALC.MEDIUM}
            fontSize="16px"
            _hover={{ textDecoration: "none", color: "blue.600" }}
          >
            about project
          </Link>
          <Link
            href={project.gallery_link ?? "#"}
            fontFamily={FONTS.StyreneALC.MEDIUM}
            fontSize="16px"
            _hover={{ textDecoration: "none", color: "blue.600" }}
          >
            gallery
          </Link>
          <Link
            href={project.pdf_link ?? "#"}
            fontFamily={FONTS.StyreneALC.MEDIUM}
            fontSize="16px"
            _hover={{ textDecoration: "none", color: "blue.600" }}
          >
            PDF booklet
          </Link>
        </HStack>
      </HStack>

    </HStack>
  );
};

export default Header;