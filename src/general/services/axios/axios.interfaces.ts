import {AxiosInstance, AxiosRequestConfig} from "axios";

export interface IAxiosService {
    get<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
    post<T,U = any>(url: string, data?: U, config?: AxiosRequestConfig): Promise<T>;
    put<T,U = any>(url: string, data?: U, config?: AxiosRequestConfig): Promise<T>;
    delete<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
    getAxiosInstance(): AxiosInstance;
}