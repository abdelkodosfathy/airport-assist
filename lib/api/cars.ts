import { apiGet } from "@/lib/api";
import { CarsResponse } from "@/lib/types/car";

export async function fetchCars(countryCode?: string): Promise<CarsResponse> {
  const params = countryCode ? `?country_code=${countryCode}` : "";
  console.log(params);
  
  return apiGet(`/car-types${params}`);
}