import { ContainerModule } from 'inversify';


//
// import {ApiConstants, IApiConstants} from "@/general/constants/api.constants.ts";
// import { ITokenService, BrowserTokenService } from '@/general/services/token';
// import {AxiosService, IAxiosService} from "@/general/services/axios";
// import {ConsoleLogger, ILoggerService} from "@/general/services/logger";

export const createAuthModule = (): ContainerModule =>
    new ContainerModule(
        (
            //options: ContainerModuleLoadOptions
        ) => {
        // options.bind<ITokenService>(CoreTypes.TokenService)
        //     .to(BrowserTokenService)
        //     .inSingletonScope();
        //
        // options.bind<IApiConstants>(CoreTypes.ApiConstants)
        //     .toConstantValue(ApiConstants);
        //
        // options.bind<IAxiosService>(CoreTypes.AxiosService)
        //     .to(AxiosService)
        //     .inSingletonScope()
        // options.bind<ILoggerService>(CoreTypes.LoggerService)
        //     .to(ConsoleLogger)
        //     .inSingletonScope()
});
