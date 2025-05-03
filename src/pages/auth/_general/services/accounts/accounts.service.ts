import {inject, injectable} from "inversify";
import {
    CheckPhoneProps,
    IAccountsService,
    LoginProps,
    RegisterProps,
    SendOTPProps, SendOTPResponse,
    VerifyOTPProps, VerifyOTPResponse
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

type PasswordPair = {
    password: string
    password2: string
}
type RegisterResponse = Omit<RegisterProps, 'password'| 'confirmPassword' > & PasswordPair


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
    async register({phoneNumber, password, confirmPassword , lastName , firstName} : RegisterProps): Promise<TokenPair> {
        return await this.axiosService.post<TokenPair,KeysToSnakeCase<RegisterResponse>>(this.apiConstants.URLS.ACCOUNTS.REGISTER, {
            phone_number: phoneNumber,
            password: password,
            password2: confirmPassword,
            last_name: lastName,
            first_name: firstName,
        })
    }
    async sendOTP({phoneNumber , ...props} : SendOTPProps): Promise<SendOTPResponse> {
        return await this.axiosService.post<
            SendOTPResponse,
            KeysToSnakeCase<SendOTPProps>>
        (
            this.apiConstants.URLS.ACCOUNTS.SEND_OTP,
            {
                phone_number: phoneNumber,
                ...props
            }
        )

    }
    async verifyOTP({phoneNumber , ...props}: VerifyOTPProps): Promise<VerifyOTPResponse> {
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
        return {
            ...response
        }
    }
}