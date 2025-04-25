import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios"
import { injectable, inject } from "inversify"

import type {IAxiosService} from './axios.interfaces'

import {CoreTypes} from '@/general/di/modules/core'
import type {ITokenService} from "@/general/services/token"
import type {IApiConstants} from "@/general/constants/api.constants"
import type {ILoggerService} from "@/general/services/logger"


@injectable()
export class AxiosService implements IAxiosService {
    private readonly axiosInstance: AxiosInstance;
    private readonly apiConstants: IApiConstants;
    private readonly loggerService: ILoggerService

    constructor(
        @inject(CoreTypes.ApiConstants) apiConstants: IApiConstants,
        @inject(CoreTypes.TokenService) private readonly tokenService: ITokenService,
        @inject(CoreTypes.LoggerService) loggerService: ILoggerService
    ) {
        this.apiConstants = apiConstants;
        this.loggerService = loggerService;
        this.axiosInstance = axios.create({ baseURL: apiConstants.BASE_URL });

        this.axiosInstance.interceptors.request.use((config) => {
            const token = this.tokenService.getAccessToken();
            if (token) config.headers['Authorization'] = `Bearer ${token}`;
            return config;
        });

        this.axiosInstance.interceptors.response.use(
            res => res,
            async (error) => {
                if (error.response?.status === 401) {
                    await this.refreshAccessToken();
                    const originalRequest = error.config;
                    originalRequest.headers['Authorization'] = `Bearer ${this.tokenService.getAccessToken()}`;
                    return this.axiosInstance(originalRequest);
                }
                this.loggerService.log(error)
                return Promise.reject(error);
            }
        );
    }

    private async refreshAccessToken(): Promise<void> {
        const refreshToken = this.tokenService.getRefreshToken();
        if (refreshToken) {
            const response = await this.axiosInstance.post(this.apiConstants.TOKEN_REFRESH_URL, { refreshToken });
            this.tokenService.setAccessToken(response.data.accessToken);
        }
    }


    public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        return this.axiosInstance.get<T>(url, config)
            .then((response: AxiosResponse<T>) => response.data);
    }

    public async post<T,U = any>(url: string, data?: U, config?: AxiosRequestConfig): Promise<T> {
        return this.axiosInstance.post<T>(url, data, config)
            .then((response: AxiosResponse<T>) => response.data);
    }

    public async put<T,U = any>(url: string, data?: U, config?: AxiosRequestConfig): Promise<T> {
        return this.axiosInstance.put<T>(url, data, config)
            .then((response: AxiosResponse<T>) => response.data);
    }

    public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        return this.axiosInstance.delete<T>(url, config)
            .then((response: AxiosResponse<T>) => response.data);
    }

    public getAxiosInstance(): AxiosInstance {
        return this.axiosInstance;
    }
}


