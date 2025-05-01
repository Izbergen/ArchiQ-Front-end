import {Card, Heading} from "@chakra-ui/react";
import React from "react";
interface CardProps {
    title: string;
    subtitle: string;
}
const InfoCards: React.FC<CardProps> = ({title, subtitle}) => {
    return (
        <Card.Root size="sm" minWidth="520px" maxHeight="138px"  borderRadius="25px" px="40px" paddingBottom={'10px'} paddingTop="10px" >
            <Card.Header>
                <Heading fontStyle="StyreneALCBold"
                         fontSize="24px"
                         color="#52A0FF">{title}</Heading>
            </Card.Header>
            <Card.Body fontStyle="StyreneALCMedium" fontSize="20px" color="#181818">
                {subtitle}
            </Card.Body>
        </Card.Root>
    );
};

export default InfoCards;