import createRequest from "@/apiService/service";
import { CarListResponse } from "./types";

export const carListService = (urlParams: {
  page: number;
  endDate: string;
  startDate: string;
  location: string;
}) => {
  const page = urlParams.page ? `?page=${urlParams.page}` : "";
  const endDate = urlParams.endDate
    ? `&end_date__lte=${urlParams.endDate}`
    : "";
  const startDate = urlParams.startDate
    ? `&start_date__gte=${urlParams.startDate}`
    : "";
  const location = urlParams.location
    ? `&location__icontains=${urlParams.location}`
    : "";
  return createRequest<{}, CarListResponse>({
    uri: `/car/list/${page}${endDate}${startDate}${location}`,
  });
};

export const carDetailService = (urlParams: { id: string }) =>
  createRequest<{}, CarListResponse>({
    uri: `/car/${urlParams?.id}`,
  });
