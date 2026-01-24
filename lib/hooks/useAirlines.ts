// lib/hooks/useAirports.ts
"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchAirlines } from "../api/airlines";

export function useAirlines() {
  return useQuery({
    queryKey: ["airlines"],
    queryFn: fetchAirlines,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes (previously cacheTime)
    retry: 2,
    refetchOnWindowFocus: false,
  });
}
