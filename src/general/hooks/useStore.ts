import { useContext, Context } from "react";
import { StoreApi, UseBoundStore } from "zustand";

import {AppStoreContext} from "@/general/providers/store.provider";
import { IAppStore } from "@/general/store";

export function useStore<TState, Selected>(
    StoreContext: Context<UseBoundStore<StoreApi<TState>> | null>,
    selector: (state: TState) => Selected
): Selected {
    const store = useContext(StoreContext);
    if (!store) {
        throw new Error(
            "Store не найден в контексте. Убедитесь, что обернули компонент в провайдер."
        );
    }
    return store(selector);
}

export function useGlobalStore<Selected>(
    selector: (state: IAppStore) => Selected
): Selected {
    return useStore<IAppStore, Selected>(AppStoreContext, selector);
}