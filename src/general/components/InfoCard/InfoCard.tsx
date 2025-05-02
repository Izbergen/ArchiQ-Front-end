import {Card, Heading} from "@chakra-ui/react";
import React from "react";
import {FONTS} from "@/general/constants";

interface CardProps {
    title: string;
    subtitle: string;
}
const InfoCards: React.FC<CardProps> = ({title, subtitle}) => {
    return (
        <Card.Root size="sm" width={"100%"}  borderRadius="25px" px="30px" py={'20px'}  >
                <Card.Header>
                    <Heading    fontFamily={FONTS.StyreneALC.BOLD}
                             fontSize="24px"
                             color="#52A0FF">{title}</Heading>
                </Card.Header>
                <Card.Body fontFamily={FONTS.StyreneALC.REGULAR} fontSize="20px" fontWeight='Regular' color="#181818">
                    {subtitle}
                </Card.Body>

        </Card.Root>
    );
};

export default InfoCards;