import {StoreProvider} from "@/general/providers/store.provider";
import {useProjectModuleStore} from "./general/store.ts";
import Module from "./general/components/Module.tsx";
import {ModuleStoreContext} from "@/modules/ResidenceComplexCatalog/general/contexts.ts";

export default function ResidenceComplexCatalog() {
    return (
        <StoreProvider store={useProjectModuleStore} Context={ModuleStoreContext}>
           <Module />
        </StoreProvider>
    )
}