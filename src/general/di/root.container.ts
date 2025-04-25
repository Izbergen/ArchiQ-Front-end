import "reflect-metadata"
import {Container} from "inversify"
import {createCoreModule} from "@/general/di/modules/core";

export const createRootDIContainer = () => {
    const rootContainer: Container = new Container()
    const coreModule = createCoreModule()
    rootContainer.load(coreModule)
    return rootContainer
}