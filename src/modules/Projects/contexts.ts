import {IModuleStore} from "@/modules/Projects/store.ts";
import {createContext} from 'react'
import {StoreApi, UseBoundStore} from "zustand/index";

export const ModuleStoreContext = createContext<UseBoundStore<StoreApi<IModuleStore>> | null>(null);
