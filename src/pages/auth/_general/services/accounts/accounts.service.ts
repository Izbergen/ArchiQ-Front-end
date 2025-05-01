import {inject, injectable} from "inversify";
import {
    CheckPhoneProps,
    IAccountsService,
    LoginProps,
    RegisterProps,
    SendOTPProps, SendOTPResponse,
    VerifyOTPProps
} from "./accounts.interface";
import { TokenPair } from "@/general/types/auth.types";

import {CoreTypes} from "@/general/di/modules/core";
import type {IAxiosService} from "@/general/services/axios";
import type {IAPI} from "@/general/constants/api.constants.ts";
import {KeysToSnakeCase} from "@/general/types/normalize.types.ts";
import {mapTokens} from "@/general/utils/mapTokens.ts";


type CheckPhoneResponse = {
    exists:	boolean,
    next: 'register' | 'login'
}

type VerifyOTPResponse = {
    verified: boolean,
    message: string
}


@injectable()
export class AccountsService implements IAccountsService {
    constructor(
        @inject(CoreTypes.AxiosService) private readonly axiosService: IAxiosService,
        @inject(CoreTypes.ApiConstants) private readonly apiConstants: IAPI
    ) {
    }
    async checkPhone({phoneNumber}: CheckPhoneProps): Promise<boolean> {
        const response = await this.axiosService.post<
            CheckPhoneResponse,
            KeysToSnakeCase<CheckPhoneProps>>
        (
            this.apiConstants.URLS.ACCOUNTS.CHECK_PHONE,
            {phone_number: phoneNumber,}
        )
        return response.exists;
    }
    async login({phoneNumber, ...props}: LoginProps): Promise<TokenPair> {
        const response = await this.axiosService.post<
            any,
            KeysToSnakeCase<LoginProps>>
        (
            this.apiConstants.URLS.ACCOUNTS.LOGIN,
            {phone_number: phoneNumber, ...props,}
        )
        return mapTokens(response.data);

    }
    async register({} : RegisterProps): Promise<TokenPair> {
        throw new Error("Method not implemented.");
    }
    async sendOTP({phoneNumber , ...props} : SendOTPProps): Promise<SendOTPResponse> {
        return await this.axiosService.post<
            SendOTPResponse,
            KeysToSnakeCase<SendOTPProps>>
        (
            this.apiConstants.URLS.ACCOUNTS.VERIFY_OTP,
            {
                phone_number: phoneNumber,
                ...props
            }
        )

    }
    async verifyOTP({phoneNumber , ...props}: VerifyOTPProps): Promise<boolean> {
        const response = await this.axiosService.post<
            VerifyOTPResponse,
            KeysToSnakeCase<VerifyOTPProps>>
        (
            this.apiConstants.URLS.ACCOUNTS.VERIFY_OTP,
            {
                phone_number: phoneNumber,
                    ...props
            }
        )
        return response.verified
    }
}