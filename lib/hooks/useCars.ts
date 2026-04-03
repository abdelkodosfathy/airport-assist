"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchCars } from "../api/cars";

export function useCars(countryCode?: string) {
  return useQuery({
    queryKey: ["car-types", countryCode], // include in key so it refetches on change
    queryFn: () => fetchCars(countryCode),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 2,
    refetchOnWindowFocus: false,
  });
}