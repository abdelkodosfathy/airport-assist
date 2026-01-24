import { apiGet } from "@/lib/api";
import { CarsResponse } from "@/lib/types/car";

export async function fetchCars(): Promise<CarsResponse> {
  return apiGet("/car-types");
}
