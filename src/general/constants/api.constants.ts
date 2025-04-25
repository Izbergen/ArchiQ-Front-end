import { API_URL } from "@/general/config/env.config";

export const ApiConstants = {
    BASE_URL: API_URL,
    TOKEN_REFRESH_URL: `${API_URL}/refresh`,
} as const;

export type IApiConstants = typeof ApiConstants;
