import {StoreProvider} from "@/general/providers/store.provider";
import {createStore} from "./general/store.ts";
import Module from "@/modules/Projects/general/components/Module.tsx";
import {ModuleStoreContext} from "@/modules/Projects/general/contexts.ts";

export default function ProjectsModule() {
    const store = createStore()
    return (
        <StoreProvider store={store} Context={ModuleStoreContext}>
           <Module />
        </StoreProvider>
    )
}