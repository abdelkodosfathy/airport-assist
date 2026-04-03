// lib/hooks/useAirports.ts
"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchAirlines } from "../api/airlines";

export function useAirlines(search = "", enabled = true) {
  return useQuery({
    queryKey: ["airlines", "search", search],
    queryFn: () => fetchAirlines(search),
    enabled,
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 2,
    refetchOnWindowFocus: false,
  });
}
