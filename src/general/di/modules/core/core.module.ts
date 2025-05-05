import { ContainerModule, ContainerModuleLoadOptions } from 'inversify';

import { CoreTypes } from './core.types';

import {API, IAPI} from "@/general/constants/api.constants.ts";
import { ITokenService, BrowserTokenService } from '@/general/services/token';
import {AxiosService, IAxiosService} from "@/general/services/axios";
import {ConsoleLogger, ILoggerService} from "@/general/services/logger";
import {IBannerService} from "@/general/services/banner/banner.interface.ts";
import {BannerService} from "@/general/services/banner/banner.service.ts";

export const createCoreModule = (): ContainerModule =>
    new ContainerModule((options: ContainerModuleLoadOptions) => {
        options.bind<ITokenService>(CoreTypes.TokenService)
            .to(BrowserTokenService)
            .inSingletonScope();

        options.bind<IAPI>(CoreTypes.ApiConstants)
            .toConstantValue(API);

        options.bind<IAxiosService>(CoreTypes.AxiosService)
            .to(AxiosService)
            .inSingletonScope()
        options.bind<ILoggerService>(CoreTypes.LoggerService)
            .to(ConsoleLogger)
            .inSingletonScope()
        options.bind<IBannerService>(CoreTypes.BannerService)
            .to(BannerService)
            .inSingletonScope()
    });
