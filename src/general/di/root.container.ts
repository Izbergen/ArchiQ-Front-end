import "reflect-metadata"
import {Container} from "inversify"
import {createCoreModule} from "@/general/di/modules/core";

export const createRootDIContainer = async () => {
    const rootContainer: Container = new Container()
    const coreModule = createCoreModule()
    await rootContainer.load(coreModule)
    return rootContainer
}