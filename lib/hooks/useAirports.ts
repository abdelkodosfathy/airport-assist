// lib/hooks/useAirports.ts
"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchAirports } from "@/lib/api/airports";

export function useAirports() {
  return useQuery({
    queryKey: ["airports"],
    queryFn: fetchAirports,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes (previously cacheTime)
    retry: 2,
    refetchOnWindowFocus: false,
  });
}
