import { IResidence } from "../types";
import ResidenceComplexList from "./List";
import {useState, useEffect} from "react";
import {useDI} from "@/general/hooks/useDI.ts";
import {IAxiosService} from "@/general/services/axios";
import {CoreTypes} from "@/general/di/modules/core";
import { Flex } from "@chakra-ui/react";
import ResidenceComplexFilter from "./Filter";


export default function Module() {
    const [residences , setResidences] = useState<IResidence[]>([]);
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
