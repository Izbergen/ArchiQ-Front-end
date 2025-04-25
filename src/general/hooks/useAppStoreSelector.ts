import { useContext } from "react";
import { AppStoreContext } from "../providers/store.provider.tsx";
import { IAppStore } from "../store";

export function useAppStoreSelector<T>(selector: (state: IAppStore) => T): T {
    const store = useContext(AppStoreContext);
    if (!store) {
        throw new Error("Store is not provided");
    }
    return store(selector);
}
