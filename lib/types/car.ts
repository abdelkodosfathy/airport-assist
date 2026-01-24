export interface Car {
  car_type_id: number;
  car_type_name: string;
  car_type_description: string,
  car_type_img: string;
  price_per_mile: number;
  price_per_hour: number;
  passengers_capacity: number;
  baggage_capacity: number;
  status: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface CarsResponse {
  status: number;
  msg: string | null;
  data: {
    car_types: Car[];
    total_result: number;
  };
}
