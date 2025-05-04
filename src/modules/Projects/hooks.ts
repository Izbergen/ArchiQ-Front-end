import {useStore} from "@/general/hooks/useStore.ts";
import {ModuleStoreContext} from "@/modules/Projects/contexts.ts";
import {IModuleStore} from "@/modules/Projects/store.ts";

export function useLocalStore<Selected>(
    selector: (state: IModuleStore) => Selected
): Selected {
    return useStore<IModuleStore, Selected>(ModuleStoreContext, selector);
}