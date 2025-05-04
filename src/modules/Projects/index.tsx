import {StoreProvider} from "@/general/providers/store.provider";
import {useProjectModuleStore} from "./general/store.ts";
import Module from "@/modules/Projects/general/components/Module.tsx";
import {ModuleStoreContext} from "@/modules/Projects/general/contexts.ts";

export default function ProjectsModule() {
    return (
        <StoreProvider store={useProjectModuleStore} Context={ModuleStoreContext}>
           <Module />
        </StoreProvider>
    )
}