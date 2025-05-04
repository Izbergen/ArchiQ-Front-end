import React from 'react';
import {Heading, Skeleton, VStack} from "@chakra-ui/react";
import {Container} from "@/general/components/ui/Container/Container.tsx";
const ApartmentsPage = () => {

    return (
            <Container>
                <VStack pb={'65px'}>
                    <Heading>Apartments</Heading>
                    <Skeleton bg={'gray.400'} height={"293px"} borderRadius={'15px'} pt={'35px'}/>
                </VStack >
                <Grid>

                </Grid>
            </Container>
    );
};

export default ApartmentsPage;