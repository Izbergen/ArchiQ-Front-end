import {Context, createContext, ReactNode} from 'react';
import { UseBoundStore, StoreApi } from 'zustand';
import { IAppStore } from '@/general/store';

export const AppStoreContext = createContext<UseBoundStore<StoreApi<IAppStore>> | null>(null);

export function StoreProvider<T, U = UseBoundStore<StoreApi<T>>>({children, store , Context}: {
    children: ReactNode;
    store: U;
    Context: Context<U>
}) {
    return (
        <Context.Provider value={store} >
            {children}
        </Context.Provider>
    );
}

