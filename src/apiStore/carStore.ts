import { carDetailService, carListService } from "@/apiService/car/carService";
import { CarListResponse, CarListResponseObj } from "@/apiService/car/types";
import { HttpResError } from "@/apiService/types";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

export const useCarInfo = (
  qParam?: {
    page?: number;
    startDate?: string;
    endDate?: string;
    location?: string;
  },
  options?: UseQueryOptions<{}, HttpResError, CarListResponse>
) => {
  const params = {
    page: qParam?.page ?? 1,
    startDate: qParam?.startDate ?? "",
    endDate: qParam?.endDate ?? "",
    location: qParam?.location ?? "",
  };
  return useQuery<{}, HttpResError, CarListResponse>({
    queryKey: ["car-info", { qParam }],
    queryFn: () => carListService(params),
    staleTime: 10000,
    refetchIntervalInBackground: true,
    ...options,
  });
};

export const useCarDetail = (
  id: string,
  options?: UseQueryOptions<{}, HttpResError, CarListResponseObj>
) => {
  return useQuery({
    queryKey: ["car-detail", { id }],
    queryFn: () => carDetailService({ id }),
    staleTime: 10000,
    ...options,
  });
};
