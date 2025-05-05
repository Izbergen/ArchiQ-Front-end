import { Flex, Button } from "@chakra-ui/react";

import { useLocalStore } from "../../hooks";
import { IAxiosService } from "@/general/services/axios";
import { CoreTypes } from "@/general/di/modules/core";
import { useDI } from "@/general/hooks/useDI";
import { useGlobalStore } from "@/general/hooks/useStore";
import { IResidence } from "@/general/types/api.types";


export function SubmitResetButtons() {
    const get = useLocalStore((state) => state.getFilledFields);
    const reset = useLocalStore((state) => state.reset);
    const setResidences = useGlobalStore((state) => state.setResidences)
    const axiosService = useDI<IAxiosService>(CoreTypes.AxiosService);

    return (
        <Flex gap="10px">
            <Button
                variant={"ghost"}
                onClick={() => reset()}
            >
                Reset
            </Button>

            <Button
                variant={"solid"}
                onClick={async () => {
                    console.log(get());
                    const response = await axiosService.get<{
                        results: IResidence[],
                        metadata: any
                    }>("residential-complexes/", {
                        params: {
                            ...get()
                        }
                    });
                    setResidences(response.results)
                }}
            >
                Submit
            </Button>
        </Flex>
    );
}
