import {
  createOrder,
  orderDetailService,
  orderListService,
} from "@/apiService/order/orderService";
import {
  OrderListResponse,
  OrderListResponseObj,
} from "@/apiService/order/types";
import { HttpResError } from "@/apiService/types";
import {
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
} from "@tanstack/react-query";

export const useOrderInfo = (
  qParam?: {
    page?: number;
    dropoff?: string;
    orderDate?: string;
    pickupDate?: string;
    pickup?: string;
  },
  options?: UseQueryOptions<{}, HttpResError, OrderListResponse>
) => {
  const params = {
    page: qParam?.page ?? 1,
    dropoffLocation: qParam?.dropoff ?? "",
    orderDate: qParam?.orderDate ?? "",
    pickupDate: qParam?.pickupDate ?? "",
    pickupLocation: qParam?.pickup ?? "",
  };
  return useQuery<{}, HttpResError, OrderListResponse>({
    queryKey: ["order-info", { qParam }],
    queryFn: () => orderListService(params),
    staleTime: 10000,
    refetchIntervalInBackground: true,
    ...options,
  });
};

export const useOrderDetail = (
  id: string,
  options?: UseQueryOptions<{}, HttpResError, OrderListResponseObj>
) => {
  return useQuery({
    queryKey: ["order-detail", { id }],
    queryFn: () => orderDetailService({ id }),
    staleTime: 10000,
    ...options,
  });
};

export const useCreateOrder = (
  options?: UseMutationOptions<{}, HttpResError, {}>
) => {
  return useMutation({
    mutationFn: (params) => createOrder(params),
    ...options,
  });
};
