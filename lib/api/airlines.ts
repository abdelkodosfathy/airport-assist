import { apiGet } from "@/lib/api";
import { AirlinesResponse } from "@/lib/types/airline";

export async function fetchAirlines(search?: string): Promise<AirlinesResponse> {
  const params = search ? `?search=${encodeURIComponent(search)}` : '';
  return apiGet(`/airlines${params}`);
}