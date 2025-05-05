import { IResidence } from "@/general/types/api.types";
import List from "./List";
import {useEffect} from "react";
import {useDI} from "@/general/hooks/useDI.ts";
import {IAxiosService} from "@/general/services/axios";
import {CoreTypes} from "@/general/di/modules/core";
import { Flex } from "@chakra-ui/react";
import Filter from "./Filter";
import { useGlobalStore } from "@/general/hooks/useStore";
import { IAPI } from "@/general/constants/api.constants";


export default function Module() {
    const setResidences = useGlobalStore((state) => state.setResidences)
    const residences = useGlobalStore((state) => state.residences)
    const axiosService = useDI<IAxiosService>(CoreTypes.AxiosService)
    const apiConstants = useDI<IAPI>(CoreTypes.ApiConstants)
    useEffect(() => {
        (async() => {
            const response = await axiosService.get<{
                results: IResidence[],
                metadata: any
            }>(apiConstants.URLS.RESIDENTIAL_COMPLEXES)
            setResidences(response.results)
        })()


    }, [])
    return (
        <Flex gap={'3'} direction={'column'}>
            <Filter />
            <List residences={residences} />
        </Flex>
        
    )
}
