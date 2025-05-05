import { Flex, Button } from "@chakra-ui/react";

import { useLocalStore } from "../../hooks";

export function AvailableOnlyButtons() {
    const availableOnly = useLocalStore(state => state.available_only);
    const setAvailableOnly = useLocalStore(state => state.setAvailableOnly);

    return (
        <Flex gap="10px">
            <Button
                variant={availableOnly ? "ghost" : "solid"}
                onClick={() => setAvailableOnly(false)}
            >
                All
            </Button>

            <Button
                variant={availableOnly ? "solid" : "ghost"}
                onClick={() => setAvailableOnly(true)}
            >
                Available
            </Button>
        </Flex>
    );
}
