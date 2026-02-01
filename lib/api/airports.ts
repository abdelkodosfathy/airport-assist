import { apiGet } from "@/lib/api";
import { AirportsResponse } from "@/lib/types/airport";

export async function fetchAirports(): Promise<AirportsResponse> {
  return apiGet("/airports");
}
