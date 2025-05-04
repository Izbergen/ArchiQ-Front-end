import {create} from "zustand";
import {persist} from "zustand/middleware";

type IAction = {

}

type IState = {

}

export type IModuleStore = IAction & IState;

const initialState: IState = {

}

export const createStore = (state: IState = initialState) => {
    return create<IModuleStore>()(persist(() => ({
        ...state,
    }) , {
        name: "projects-module-state"
    }))

}