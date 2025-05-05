import {create} from "zustand";
import {persist} from "zustand/middleware";

import {ICities, IDistrict, IResidence} from "@/general/types/api.types";

type IAppAction = {
    setCities: (cities: ICities[]) => void,
    setDistricts: (districts: IDistrict[]) => void
    setResidences: (residences: IResidence[]) => void
}

type IAppState = {
    cities: ICities[],
    districts: IDistrict[]
    residences: IResidence[]
}

export type IAppStore = IAppAction & IAppState;

const initialState: IAppState = {
    cities: [],
    districts: [],
    residences: []
}

export const createStore = (state: IAppState = initialState) => {
    return create<IAppStore>()(persist((set) => ({
        ...state,
        setCities: (cities) => set({cities}),
        setDistricts: (districts) => set({districts}),
        setResidences: (residences) => set({residences})
    }) , {
        name: "global-app-state"
    }))

}