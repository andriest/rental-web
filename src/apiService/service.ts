import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { HttpResError } from "./types";

type RequestOptions<TParams> = Omit<AxiosRequestConfig, "params"> & {
  uri: string;
  baseUrl?: string;
  params?: TParams;
  contentType?: "json" | "form-data";
};

async function createRequest<TParams, TResponse>(
  props: RequestOptions<TParams>
) {
  const {
    url,
    uri,
    params = {},
    method = "GET",
    baseUrl = location.origin + "/api",
    contentType = "json",
  } = props;

  const service = axios.create();

  service.interceptors.request.use(
    (config) => {
      let newContentType = "application/json";

      if (contentType === "form-data") {
        newContentType = "multipart/form-data";
      }

      config.headers["Content-Type"] = newContentType;

      if (method !== "GET") {
        config.data = config.params;
        config.params = {};
      }

      return config;
    },
    (error) => Promise.reject(error),
    { synchronous: true }
  );

  const res: AxiosResponse<TResponse, HttpResError> = await service({
    url: url || baseUrl + uri,
    method,
    params,
  });

  return res.data;
}

export default createRequest;
