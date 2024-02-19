export interface CarListResponseObj {
  id: number;
  name: string;
  image: string;
  day_rate: number;
  start_date: string;
  end_date: string;
  location: string;
  created_at: string;
}

export interface CarListResponseArray extends Array<CarListResponseObj> {}
export interface CarListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: CarListResponseArray;
}
