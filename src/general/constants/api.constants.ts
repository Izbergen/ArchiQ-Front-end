import { API_URL } from "@/general/config/env.config";

const API_TOKEN = Object.freeze({
    TOKEN: 'api/token/',
    REFRESH_TOKEN: 'api/token/refresh/',
    VERIFY_TOKEN: 'api/token/verify/'
})

const ACCOUNTS = Object.freeze({
    CHECK_PHONE: 'accounts/check-phone/',
    LOGIN: 'accounts/login/',
    REGISTER: 'accounts/register/',
    SEND_OTP: 'accounts/send-otp/',
    VERIFY_OTP: 'accounts/verify-otp/',
})

export const API = {
    BASE_URL: API_URL,
    URLS: {
        API_TOKEN,
        ACCOUNTS
    }
} as const;

export type IAPI = typeof API;


