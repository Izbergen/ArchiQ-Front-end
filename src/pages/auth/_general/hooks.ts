import {useDI} from "@/general/hooks/useDI.ts";
import {IAccountsService} from "@/pages/auth/_general/services/accounts";
import {AuthTypes} from "@/pages/auth/_general/authModule";
import {applyServiceMiddleware} from "@/general/utils/applyServiceMiddleware";

import {phoneMiddleware} from "./middlewares.ts";

export const useOTP = () => {
    const accountService = useDI<IAccountsService>(AuthTypes.AccountService)

    const serviceWithMiddleware = applyServiceMiddleware(accountService, [
        phoneMiddleware,
    ]);



    return serviceWithMiddleware;
}


