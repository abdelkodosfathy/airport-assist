import { apiGet } from "@/lib/api";
import { CarsResponse } from "@/lib/types/car";

// export async function fetchCars(countryCode?: string): Promise<CarsResponse> {
//   const params = countryCode ? `?country_code=${countryCode}` : "";
//   console.log(params);

//   return apiGet(`/car-types${params}`);
// }
export async function fetchCars({
  countryCode,
  stateId,
}: {
  countryCode?: string;
  stateId?: number;
}): Promise<CarsResponse> {
  const params = new URLSearchParams();

  if (stateId) {
    params.append("state_id", String(stateId));
  } else if (countryCode) {
    // fallback
    params.append("country_code", countryCode);
  }

  const query = params.toString() ? `?${params.toString()}` : "";

  console.log(query);

  return apiGet(`/car-types${query}`);
}
