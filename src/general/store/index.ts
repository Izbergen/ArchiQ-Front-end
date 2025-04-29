import {create} from "zustand";
import {persist} from "zustand/middleware";

type IAppAction = {

}

type IAppState = {

}

export type IAppStore = IAppAction & IAppState;

const initialState: IAppState = {

}

export const createStore = (state: IAppStore = initialState) => {
    return create<IAppStore>()(persist(() => ({
        ...state,
    }) , {
        name: "global-app-state"
    }))

}