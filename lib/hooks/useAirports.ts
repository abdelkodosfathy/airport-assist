// // lib/hooks/useAirports.ts
// "use client";

// import { useQuery } from "@tanstack/react-query";
// import { fetchAirports } from "@/lib/api/airports";

// export function useAirports() {
//   return useQuery({
//     queryKey: ["airports"],
//     queryFn: fetchAirports,
//     staleTime: 1000 * 60 * 5, // 5 minutes
//     gcTime: 1000 * 60 * 10, // 10 minutes (previously cacheTime)
//     retry: 2,
//     refetchOnWindowFocus: false,
//   });
// }

// lib/hooks/useAirportSearch.ts
"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchAirports, fetchSingleAirport } from "@/lib/api/airports";

export function useAirportSearch(search: string, enabled = true) {
  return useQuery({
    queryKey: ["airports", "search", search],
    queryFn: () => fetchAirports(search),
    enabled: enabled, // ← Remove the search.length check
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 1,
  });
}
// export function useAirportSearch(search: string, enabled = true) {
//   return useQuery({
//     queryKey: ["airports", "search", search],
//     queryFn: () => fetchAirports(search),
//     enabled: enabled && search.length > 0,
//     staleTime: 1000 * 60 * 5,
//     gcTime: 1000 * 60 * 10,
//     retry: 1,
//   });
// }
export function useSingleAirport(id: string) {
  return useQuery({
    queryKey: ["singleAirport", id],
    queryFn: () => fetchSingleAirport(id),
    staleTime: 1000 * 60 * 5,
    
    gcTime: 1000 * 60 * 10,
    retry: 1,
    enabled: !!id,
  });
}
