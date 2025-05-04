import  {use} from 'react';
import {useDI} from "@/general/hooks/useDI.ts";
import type {IBannerService} from "@/general/services/banner";
import {CoreTypes} from "@/general/di/modules/core";
import {Banner} from "@/pages/home/_general/_components/Banner.tsx";
import type {IBanner} from "@/pages/home/_general/types.ts";
const BannerList = () => {
    const bannerService = useDI<IBannerService>(CoreTypes.BannerService);
    const banners: IBanner[] = use(bannerService.getBanners());


    return (
        banners.map(banner => (
            <Banner key={banner.id} {...banner}/>
            )

        )
    );
};

export default BannerList;