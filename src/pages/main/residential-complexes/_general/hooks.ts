import { useEffect, useState } from "react";
import { useDI } from "@/general/hooks/useDI";
import { IAxiosService } from "@/general/services/axios";
import { CoreTypes } from "@/general/di/modules/core";
import { IAPI } from "@/general/constants/api.constants";
import { ResidentialComplexDetails } from "./types";

export function useProjectDetails(id: number) {
  const axiosService  = useDI<IAxiosService>(CoreTypes.AxiosService);
  const apiConst = useDI<IAPI>(CoreTypes.ApiConstants)
  const [data, setData] = useState<ResidentialComplexDetails | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProject() {
      setIsLoading(true);
      try {
        const response = await axiosService.get<ResidentialComplexDetails>(`${apiConst.URLS.RESIDENTIAL_COMPLEXES}${id}/`);
        setData(response);
      } catch (err) {
        console.error(err);
        setError("Ошибка загрузки проекта");
      } finally {
        setIsLoading(false);
      }
    }

    fetchProject();
  }, [id]);

  return { data, isLoading, error };
}