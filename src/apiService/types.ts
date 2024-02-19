import { AxiosError } from "axios";

export interface HttpResSuccess<T> {
  data: T;
  status: "success";
}

export type HttpResError = AxiosError<HttpError>;

export interface HttpError {
  [key: string]: string;
  message: string;
  time: string;
}
