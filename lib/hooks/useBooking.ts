// import { BookingContext } from "@/contexts/BookingContext";
// import { useContext } from "react";

import { useQuery } from "@tanstack/react-query";
import { SingleBooking } from "../types/booking";
import { apiGet } from "../api";

// // Custom hook to use the booking context
// export function useBooking() {
//   const context = useContext(BookingContext);
//   if (context === undefined) {
//     throw new Error("useBooking must be used within a BookingProvider");
//   }
//   return context;
// }

export function formatBookingData(data: SingleBooking) {
  return {
    ...data,

    // safe fixes
    package: {
      ...data.package,
      // features: data.package?.features ?? [],
    },

    flightNumber:
      data.service_type === "connection"
        ? {
            arrival: data.flight?.flight_number,
            departure: data.flight_2?.flight_number,
          }
        : data.flight?.flight_number,

    passengersLabel: `${data.adult_passengers} Adults`,
  };
}
export async function fetchSingleBooking(uuid: string): Promise<SingleBooking> {
  const res = await apiGet(`/bookings/${uuid}`, {
    payment_method: "stripe",
  });

  return res.data.booking;
}

export function useSingleBooking(uuid: string | null, enabled = true) {
  return useQuery({
    queryKey: ["singleBooking", uuid],
    queryFn: () => fetchSingleBooking(uuid!),
    enabled: !!uuid && enabled,

    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,

    select: (data) => formatBookingData(data), 
  });
}