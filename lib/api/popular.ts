import { Airport, SingleAirport } from "../types/airport";
import { apiGet } from "./http";

export interface PopularAirportsResponse {
  status: number;
  msg: string | null;
  data: {
    // airports: (Airport & { starting_price: number })[];
    airports: SingleAirport[];
    total_result: number;
  };
}

export const getPopularAirports = async (): Promise<
  PopularAirportsResponse["data"]["airports"]
> => {
  const res = await apiGet(`/airports?is_in_popular=1`);

  console.log(res);
  
  if (res.status !== 200) throw new Error("Failed to fetch popular airports");

  return res.data.airports;
};
