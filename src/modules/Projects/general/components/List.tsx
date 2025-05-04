import {IResidence} from "./../types.ts";
import ResidentialComplexCard from "@/modules/Projects/general/components/Card.tsx";
import {SimpleGrid} from "@chakra-ui/react";

type ResidenceListProps = { residences: IResidence[] }

export default function ResidenceList({residences} : ResidenceListProps){
    return (
        <SimpleGrid gap={20} templateColumns="repeat(2, 1fr)">
            {
                residences.map((residence) => <ResidentialComplexCard {...residence} />)
            }
        </SimpleGrid>


    )
}