import {TokenPair} from "@/general/types/auth.types.ts";

export type CheckPhoneProps = {
    phoneNumber: string;
}

export type LoginProps = {
    phoneNumber: string;
    password: string;
}
export type RegisterProps = {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    password: string;
    confirmPassword: string;
}
export type SendOTPProps = {
    phoneNumber: string;
}
export type SendOTPResponse = {
    success: boolean;
    message: string;
}

export type VerifyOTPProps = {
    phoneNumber: string;
    code: string;
}

export interface IAccountsService {
    checkPhone(props: CheckPhoneProps): Promise<boolean>;
    login(props : LoginProps): Promise<TokenPair>;
    register(props : RegisterProps): Promise<TokenPair>;
    sendOTP(props: SendOTPProps): Promise<SendOTPResponse>;
    verifyOTP(props: VerifyOTPProps): Promise<boolean>;
}