// lib/hooks/useAirports.ts
"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchPackages } from "../api/packages";

export function usePackages() {
  return useQuery({
    queryKey: ["packages"],
    queryFn: fetchPackages,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes (previously cacheTime)
    retry: 2,
    refetchOnWindowFocus: false,
  });
}
