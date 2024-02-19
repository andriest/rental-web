import createRequest from "@/apiService/service";
import { OrderListResponse } from "./types";

export const orderListService = (urlParams: {
  page: number;
  dropoffLocation: string;
  orderDate: string;
  pickupDate: string;
  pickupLocation: string;
}) => {
  const page = urlParams.page ? `?page=${urlParams.page}` : "";
  const dropoff = urlParams.dropoffLocation
    ? `&dropoff_location__icontains=${urlParams.dropoffLocation}`
    : "";
  const orderDate = urlParams.orderDate
    ? `&order_date=${urlParams.orderDate}`
    : "";
  const pickupDate = urlParams.pickupDate
    ? `&pickup_date=${urlParams.pickupDate}`
    : "";
  const pickup = urlParams.pickupLocation
    ? `&pickup_location__icontains=${urlParams.pickupLocation}`
    : "";
  return createRequest<{}, OrderListResponse>({
    uri: `/order/list/${page}${dropoff}${orderDate}${pickupDate}${pickup}`,
  });
};

export const orderDetailService = (urlParams: { id: string }) =>
  createRequest<{}, OrderListResponse>({
    uri: `/order/${urlParams?.id}`,
  });

export const createOrder = (params: {}) =>
  createRequest<{}, {}>({
    uri: `/order/add/`,
    params,
    method: "POST",
  });
