import { Middleware } from "@/general/utils/applyServiceMiddleware";

const PHONE_KEY = "PHONE_NUMBER";
// const TIMER_TIMEOUT = 30000;
// let Timer;

export const phoneMiddleware: Middleware = {
    onCall: (method, args) => {
        if (method === "checkPhone" || method === "sendOTP" || method === "verifyOTP") {
            const props = args[0] as { phoneNumber?: string };
            if (props.phoneNumber) {
                localStorage.setItem(PHONE_KEY, props.phoneNumber);
            }
        }
    },
    onResult: (methodName) => {
        if(methodName === "login") {
            localStorage.removeItem(PHONE_KEY);
        }
    },
    onError: (methodName) => {
        if(methodName === "checkPhone") {
            localStorage.removeItem(PHONE_KEY);
        }
    }
};

