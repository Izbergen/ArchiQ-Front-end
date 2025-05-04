import {useStore} from "@/general/hooks/useStore.ts";
import {ModuleStoreContext} from "@/modules/Projects/general/contexts.ts";
import {IModuleStore} from "@/modules/Projects/general/store.ts";

export function useLocalStore<Selected>(
    selector: (state: IModuleStore) => Selected
): Selected {
    return useStore<IModuleStore, Selected>(ModuleStoreContext, selector);
}