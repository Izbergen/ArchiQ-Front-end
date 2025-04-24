import { createContext, ReactNode } from 'react';
import { UseBoundStore, StoreApi } from 'zustand';
import { IAppStore } from '@/general/store';

export const AppStoreContext = createContext<UseBoundStore<StoreApi<IAppStore>> | null>(null);

export function StoreProvider({children, store}: {
    children: ReactNode;
    store: UseBoundStore<StoreApi<IAppStore>>;
}) {
    return (
        <AppStoreContext.Provider value={store}>
            {children}
        </AppStoreContext.Provider>
    );
}

