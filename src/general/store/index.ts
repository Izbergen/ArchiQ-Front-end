import {create} from "zustand";

type IAppAction = {

}

type IAppState = {

}

export type IAppStore = IAppAction & IAppState;

const initialState: IAppStore = {

}

export const createStore = (state: IAppStore = initialState) => {
    return create<IAppStore>(() => ({
        ...state,
    }))

}