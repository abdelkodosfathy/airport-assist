import { BookingContext } from "@/contexts/BookingContext";
import { useContext } from "react";

// Custom hook to use the booking context
export function useBooking() {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
}