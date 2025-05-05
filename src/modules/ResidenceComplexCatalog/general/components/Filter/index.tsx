import {Flex} from "@chakra-ui/react";
import { AvailableOnlyButtons } from "./AvailableOnlyButtons";
import DistrictsSelector from "./DistrictsSelecter";
import { RealEstatePopover } from "./RealEstatePopover";
import { PricementPopover } from "./PricementPopover";
import { SubmitResetButtons } from "./SubmitResetButtons";

export default function Filter(){
    return (
    <Flex gap={'10px'} p={'30px'} alignItems={'center'} justifyItems={'center'} boxShadow={'0px 0px 15px 0px #00000040'} border={'1'} borderRadius={'30px'}>
        <AvailableOnlyButtons />
        <DistrictsSelector />
        <RealEstatePopover />
        <PricementPopover />
        <SubmitResetButtons />
    </Flex>
    )
}

