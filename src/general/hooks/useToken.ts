import {useDI} from "@/general/hooks/useDI.ts";
import {ITokenService} from "@/general/services/token";
import {CoreTypes} from "@/general/di/modules/core";

export const useTokens = () => {
    return useDI<ITokenService>(CoreTypes.TokenService);
}