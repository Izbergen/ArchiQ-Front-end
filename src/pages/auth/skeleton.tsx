import {Flex, SkeletonText , Skeleton} from "@chakra-ui/react";


export default function AuthSkeleton() {
    return (
        <Flex
            direction="column"
            align="center"
            justify="center"
            p={4}
        >
            <SkeletonText
                fontSize="4xl"
                mb="2"
            />
            <SkeletonText
                fontSize="xl"
                mb="6"
                />
            <Skeleton w="250px" mx="auto" mb='4' />
            <Skeleton
                    w={'400px'}
                    py={'25px'}
                    borderRadius="15px"
                    mb={'2'}
           />
            <Skeleton
                w={'400px'}
                py={'25px'}
                borderRadius="15px"
                mb={'2'}
            />
        </Flex>
    )
}


