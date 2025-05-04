import {StoreProvider} from "@/general/providers/store.provider";
import {createStore} from "./store";
import Module from "./components/Module.tsx";
import {ModuleStoreContext} from "@/modules/Projects/contexts.ts";

export default function ProjectsModule() {
    const store = createStore()
    return (
        <StoreProvider store={store} Context={ModuleStoreContext}>
           <Module />
        </StoreProvider>
    )
}