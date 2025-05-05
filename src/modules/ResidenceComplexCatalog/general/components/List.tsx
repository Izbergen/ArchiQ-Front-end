
import { IResidence } from "@/general/types/api.types";
import Card from "./Card.tsx";
import {SimpleGrid} from "@chakra-ui/react";
import { EmptyList } from "./EmptyList.tsx";

type ResidenceListProps = { residences: IResidence[] }

export default function List({residences} : ResidenceListProps){
    return (<>
        <SimpleGrid gap={20} templateColumns="repeat(3, 1fr)">
            {
                residences.map((residence) => <Card key={residence.id} {...residence} />)
            }
        </SimpleGrid>
        {
                residences.length <= 0 &&
                <EmptyList />
            }
        </>


    )
}