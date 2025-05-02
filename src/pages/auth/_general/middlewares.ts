import { Middleware } from "@/general/utils/applyServiceMiddleware";
import {toaster} from "@/general/components/ui/toaster.ts";

// export const phoneMiddleware: Middleware = {
//     onCall: (method, args) => {
//         if (method === "checkPhone") {
//             const props = args[0] as { phoneNumber?: string };
//             if (props.phoneNumber) {
//                 localStorage.setItem(PHONE_KEY, props.phoneNumber);
//             }
//         }
//     },
//     onResult: (methodName) => {
//         if(methodName === "login") {
//             localStorage.removeItem(PHONE_KEY);
//         }
//     },
//     onError: (methodName) => {
//         if(methodName === "checkPhone") {
//             localStorage.removeItem(PHONE_KEY);
//         }
//     }
// };


export const toasterMiddleware: Middleware = {
    onError: (methodName , _) => {
        toaster.error("Ошибка при проверке номера");
        if(methodName === "checkPhone") {
            // let message;
            // if(error) {
            //     message = error.response.data;
            // }
            // else{
            //     message = "Неизвестная ошибка."
            // }

        }
    }
}
