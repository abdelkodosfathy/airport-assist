import { useQuery } from "@tanstack/react-query";
import { apiGet } from "../api";

export type OrdersResponse = any; // عدّلها حسب الـ API الحقيقي

export function useOrders() {
  return useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrders,
    staleTime: 1000 * 60 * 5, // 5 min
    gcTime: 1000 * 60 * 30,   // 30 min
    retry: 1,
  });
}

export async function fetchOrders(): Promise<OrdersResponse> {
  return apiGet("/bookings");
}