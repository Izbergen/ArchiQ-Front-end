import "reflect-metadata"
import {Container} from "inversify"
import {createCoreModule} from "@/general/di/modules/core";
import {DIModule as AuthDIModule} from "@/pages/auth";

export const createRootDIContainer = async () => {
    const rootContainer: Container = new Container()
    const coreModule = createCoreModule()
    const authModule = AuthDIModule.createAuthModule()
    await rootContainer.load(coreModule)
    await rootContainer.load(authModule)
    return rootContainer
}