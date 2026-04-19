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

import { fetchAirports, fetchSingleAirport } from "@/lib/api/airports";
import { useCurrencyStore } from "@/store/currencyStore";

import { useQuery, keepPreviousData } from "@tanstack/react-query";

// export function useAirportSearch(search: string, enabled = true) {
//   return useQuery({
//     queryKey: ["airports", "search", search],
//     queryFn: () => fetchAirports(search),
//     enabled,
//     placeholderData: keepPreviousData, // ← keeps old results visible during refetch
//     staleTime: 1000 * 60 * 5,
//     gcTime: 1000 * 60 * 10,
//     retry: 1,
//   });
// }
// // Hook for init airports
// export function usePopularAirports() {
//   return useQuery({
//     queryKey: ["airports", "popular"],
//     queryFn: () => fetchAirports(""), // أو fetchAirports("a") لو الـ API مش بيقبل فاضي
//     staleTime: 1000 * 60 * 30,
//     gcTime: 1000 * 60 * 60,
//   });
// }
export function useAirports(search: string) {
  const isSearching = search.trim().length > 0;

  return useQuery({
    queryKey: ["airports", isSearching ? "search" : "popular", search],
    queryFn: () => fetchAirports(isSearching ? search : ""),
    staleTime: isSearching ? 1000 * 60 * 5 : 1000 * 60 * 30,
    gcTime: isSearching ? 1000 * 60 * 10 : 1000 * 60 * 60,
    placeholderData: keepPreviousData,
    retry: 1,
  });
}

// export function useSingleAirport(id: string) {
export function useSingleAirport(id: string, enabled = true) {
  // const currency = useCurrencyStore((s) => s.currency);
  return useQuery({
    // queryKey: ["singleAirport", id, currency],
    queryKey: ["singleAirport", id],
    queryFn: () => fetchSingleAirport(id),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 1,
    // enabled: !!id,
    enabled: !!id && enabled,

    placeholderData: (previousData) => previousData, // ← الداتا القديمة تفضل لحد ما الجديدة ترجع
  });
}
