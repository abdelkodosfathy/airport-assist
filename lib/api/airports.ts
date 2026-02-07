// import { apiGet } from "@/lib/api";
// import { AirportsResponse } from "@/lib/types/airport";

// export async function fetchAirports(): Promise<AirportsResponse> {
//   return apiGet("/airports");
// }

// lib/api/airports.ts
import { apiGet } from "@/lib/api";
import { AirportsResponse, SingleAirportResponse } from "@/lib/types/airport";

export async function fetchAirports(search?: string): Promise<AirportsResponse> {
  const params = search ? `?search=${encodeURIComponent(search)}` : '';
  return apiGet(`/airports${params}`);
}
export async function fetchSingleAirport(airportID?: string): Promise<SingleAirportResponse> {
  return apiGet(`/airports/${airportID}`);
}