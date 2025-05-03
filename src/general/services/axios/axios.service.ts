import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { injectable, inject } from "inversify";

import type { IAxiosService } from './axios.interfaces';
import { CoreTypes } from '@/general/di/modules/core';
import type { ITokenService } from '@/general/services/token';
import type { IAPI } from '@/general/constants/api.constants';
import type { ILoggerService } from '@/general/services/logger';
import { TokenPair } from '@/general/types/auth.types';
import { mapTokens } from '@/general/utils/mapTokens';

@injectable()
export class AxiosService implements IAxiosService {
    private readonly axiosInstance: AxiosInstance;
    private readonly refreshClient: AxiosInstance;
    private readonly apiConstants: IAPI;
    private readonly loggerService: ILoggerService;

    constructor(
        @inject(CoreTypes.ApiConstants) apiConstants: IAPI,
        @inject(CoreTypes.TokenService) private readonly tokenService: ITokenService,
        @inject(CoreTypes.LoggerService) loggerService: ILoggerService
    ) {
        this.apiConstants = apiConstants;
        this.loggerService = loggerService;

        this.axiosInstance = axios.create({ baseURL: apiConstants.BASE_URL });

        this.refreshClient = axios.create({ baseURL: apiConstants.BASE_URL });

        this.axiosInstance.interceptors.request.use((config) => {
            const token = this.tokenService.getAccessToken();
            if (token!! && config.headers) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
            config.headers['Content-Type'] = 'application/json';
            return config;
        });

        this.axiosInstance.interceptors.response.use(
            (res) => res,
            async (error: AxiosError & { config: any }) => {
                const originalConfig = error.config;

                if (error.response?.status === 401 && !originalConfig._retry) {
                    originalConfig._retry = true;
                    try {
                        const tokenPair = await this.refreshAccessToken();
                        if (!tokenPair) {
                            return this.handleError(error);
                        }

                        this.tokenService.setAccessToken(tokenPair.accessToken);
                        this.tokenService.setRefreshToken(tokenPair.refreshToken);
                        if (originalConfig.headers) {
                            originalConfig.headers['Authorization'] = `Bearer ${tokenPair.accessToken}`;
                        }

                        return this.axiosInstance.request(originalConfig);
                    } catch (refreshError) {
                        return this.handleError(refreshError as AxiosError);
                    }
                }

                return this.handleError(error);
            }
        );
    }
    private handleError(error: AxiosError): Promise<never> {
        this.loggerService.log(
            `[AxiosError] ${error.message} | URL: ${error.config?.url} | Method: ${error.config?.method} | Status: ${error.response?.status}`
        );
        return Promise.reject(error);
    }

    private async refreshAccessToken(): Promise<TokenPair | null> {
        const refreshToken = this.tokenService.getRefreshToken();
        if (!!refreshToken) {
            return null;
        }

        const response = await this.refreshClient.post<{ access: string; refresh: string }>(
            this.apiConstants.URLS.API_TOKEN.REFRESH_TOKEN,
            { refresh: refreshToken }
        );

        return mapTokens(response.data);
    }

    public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        const response: AxiosResponse<T> = await this.axiosInstance.get<T>(url, config);
        return response.data;
    }

    public async post<T, U = any>(url: string, data?: U, config?: AxiosRequestConfig): Promise<T> {
        const response: AxiosResponse<T> = await this.axiosInstance.post<T>(url, data, config);
        return response.data;
    }

    public async put<T, U = any>(url: string, data?: U, config?: AxiosRequestConfig): Promise<T> {
        const response: AxiosResponse<T> = await this.axiosInstance.put<T>(url, data, config);
        return response.data;
    }

    public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        const response: AxiosResponse<T> = await this.axiosInstance.delete<T>(url, config);
        return response.data;
    }

    public getAxiosInstance(): AxiosInstance {
        return this.axiosInstance;
    }
}
