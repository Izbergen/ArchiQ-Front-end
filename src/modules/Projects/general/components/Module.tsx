import { IResidence } from "@/general/types/api.types";
import ResidenceComplexList from "./List";
import {useEffect} from "react";
import {useDI} from "@/general/hooks/useDI.ts";
import {IAxiosService} from "@/general/services/axios";
import {CoreTypes} from "@/general/di/modules/core";
import { Flex } from "@chakra-ui/react";
import ResidenceComplexFilter from "./Filter";
import { useGlobalStore } from "@/general/hooks/useStore";


export default function Module() {
    const setResidences = useGlobalStore((state) => state.setResidences)
    const residences = useGlobalStore((state) => state.residences)
    const axiosService = useDI<IAxiosService>(CoreTypes.AxiosService)
    useEffect(() => {
        (async() => {
            const response = await axiosService.get<{
                results: IResidence[],
                metadata: any
            }>('residential-complexes/')
            setResidences(response.results)
        })()


    }, [])
    return (
        <Flex gap={'3'} direction={'column'}>
            <ResidenceComplexFilter />
            <ResidenceComplexList residences={residences} />
        </Flex>
        
    )
}
