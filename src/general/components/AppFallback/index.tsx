import {Center, Flex, Spinner, Text} from "@chakra-ui/react";
import {COLORS} from "@/general/constants/colors.constants.ts";


export function AppFallback() {
    return (
        <Center height={'100vh'} bgColor={COLORS["bg-1"]}>
            <Flex direction={'column'} justify={'space-between'} alignItems={'center'} gap={'3'}>
                <Spinner size={'lg'} color={COLORS['secondary']} />
                <Text color={COLORS['secondary']} fontSize={'lg'}>Application loading ...</Text>
            </Flex>
        </Center>
    )
}