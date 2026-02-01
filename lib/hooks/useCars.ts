// lib/hooks/useAirports.ts
"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchCars } from "../api/cars";

export function useCars() {
  return useQuery({
    queryKey: ["car-types"],
    queryFn: fetchCars,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes (previously cacheTime)
    retry: 2,
    refetchOnWindowFocus: false,
  });
}
