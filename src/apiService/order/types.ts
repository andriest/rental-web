import { CarListResponseObj } from "../car/types";

export interface OrderDetailObj {
  name: string;
  email: string;
  phone: string;
}

export interface OrderListResponseObj {
  id: number;
  order_date: string;
  pickup_date: string;
  dropoff_date: string;
  pickup_location: string;
  dropoff_location: string;
  car: CarListResponseObj;
  order_detail: OrderDetailObj;
}

export interface OrderListResponseArray extends Array<OrderListResponseObj> {}
export interface OrderListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: OrderListResponseArray;
}
