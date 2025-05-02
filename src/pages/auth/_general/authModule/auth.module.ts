import { ContainerModule, ContainerModuleLoadOptions } from 'inversify';
import {AccountsService, IAccountsService} from "@/pages/auth/_general/services/accounts";
import {AuthTypes} from "@/pages/auth/_general/authModule/auth.types.ts";

export const createAuthModule = (): ContainerModule =>
    new ContainerModule(
        (
            options: ContainerModuleLoadOptions
        ) => {
                options.bind<IAccountsService>(AuthTypes.AccountService)
                    .to(AccountsService)
                    .inSingletonScope()
});
