import {IBanner, IBannerService} from './banner.interface.ts';
import {inject, injectable} from "inversify";
import {CoreTypes} from "@/general/di/modules/core";
import type {IAxiosService} from "@/general/services/axios";
import type {IAPI} from "@/general/constants/api.constants.ts";

@injectable()
export class BannerService implements IBannerService {
    constructor(
        @inject(CoreTypes.AxiosService) private readonly axiosService: IAxiosService,
        @inject(CoreTypes.ApiConstants) private readonly apiConstants: IAPI
    ) {
    }

    async getBanners(): Promise<IBanner[]> {
        return this.axiosService.get<IBanner[]>(this.apiConstants.URLS.BANNERS.BANNERS)
    }
}