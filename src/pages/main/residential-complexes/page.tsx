import { Container } from "@/general/components/ui/Container/Container";
import ResidenceComplexCatalog from "@/modules/ResidenceComplexCatalog";
import { Heading } from "@chakra-ui/react";

export default function ResidenceComplexPage() {

    return (
        <Container>
            <Heading size={'4xl'} mb={'2'}>All projects</Heading>
            <ResidenceComplexCatalog />
        </Container>
    )
}