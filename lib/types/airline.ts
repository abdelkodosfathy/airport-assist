export interface Airline {
  airline_id: number;
  airline_name: string;
  airline_img: string;
  country_id: number;
  country: {
    country_id: number;
    flag_img: string;
    country_name: string;
  };
}

export interface AirlinesResponse {
  status: number;
  msg: string | null;
  data: {
    airlines: Airline[];
    total_result: number;
  };
}
