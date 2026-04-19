"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchCars } from "../api/cars";
// import { useCurrencyStore } from "@/store/currencyStore";

// export function useCars(countryCode?: string) {
//   const currency = useCurrencyStore((s) => s.currency);
//   return useQuery({
//     queryKey: ["car-types", countryCode, currency], // include in key so it refetches on change
//     queryFn: () => fetchCars(countryCode),
//     staleTime: 1000 * 60 * 5,
//     gcTime: 1000 * 60 * 10,
//     retry: 2,
//     refetchOnWindowFocus: false,
//     placeholderData: (previousData) => previousData, // ← الداتا القديمة تفضل لحد ما الجديدة ترجع

//   });
// }
export function useCars({
  countryCode,
  stateId,
}: {
  countryCode?: string;
  stateId?: number;
}) {
  // const currency = useCurrencyStore((s) => s.currency);

  return useQuery({
    // queryKey: ["car-types", countryCode, stateId, currency],
    queryKey: ["car-types", countryCode, stateId],
    queryFn: () => fetchCars({ countryCode, stateId }),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 2,
    refetchOnWindowFocus: false,
    placeholderData: (previousData) => previousData,
  });
}
