import {create} from "zustand";
import {persist} from "zustand/middleware";

import {ICities, IDistrict} from "@/general/types/api.types";

type IAppAction = {
    setCities: (cities: ICities[]) => void,
    setDistricts: (districts: IDistrict[]) => void
}

type IAppState = {
    cities: ICities[],
    districts: IDistrict[]
}

export type IAppStore = IAppAction & IAppState;

const initialState: IAppState = {
    cities: [],
    districts: []
}

export const createStore = (state: IAppState = initialState) => {
    return create<IAppStore>()(persist((set) => ({
        ...state,
        setCities: (cities) => set({cities}),
        setDistricts: (districts) => set({districts})
    }) , {
        name: "global-app-state"
    }))

}