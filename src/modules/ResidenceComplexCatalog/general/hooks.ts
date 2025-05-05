import {useStore} from "@/general/hooks/useStore.ts";
import {ModuleStoreContext} from "@/modules/ResidenceComplexCatalog/general/contexts";
import {IModuleStore} from "@/modules/ResidenceComplexCatalog/general/store";

export function useLocalStore<Selected>(
    selector: (state: IModuleStore) => Selected
): Selected {
    return useStore<IModuleStore, Selected>(ModuleStoreContext, selector);
}