import { apiGet } from "@/lib/api";
import { AirlinesResponse } from "@/lib/types/airline";

export async function fetchAirlines(): Promise<AirlinesResponse> {
  return apiGet("/airlines");
}
