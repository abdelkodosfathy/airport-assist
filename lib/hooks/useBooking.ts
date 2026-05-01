// import { BookingContext } from "@/contexts/BookingContext";
// import { useContext } from "react";

import { useMutation, useQuery } from "@tanstack/react-query";
import { SingleBooking } from "../types/booking";
import { apiGet, apiPost } from "../api";
import { useRouter } from "next/navigation";

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

export async function confirmBooking(uuid: string): Promise<SingleBooking> {
  const res = await apiPost(`/bookings/${uuid}/confirm`);
  return res.data.booking;
}

export function useConfirmBookingMutation() {
  // // const queryClient = useQueryClient();

  // return useMutation({
  //   mutationFn: (uuid: string) => confirmBooking(uuid),
  //   onSuccess: (data) => {
  //     // تحديث الكاش إذا كنا نريد تحديث بيانات الحجز في أماكن تانية
  //     // queryClient.invalidateQueries({ queryKey: ["booking"] });
  //     console.log("Booking confirmed successfully", data);

  //     console.log(data.booking_uuid);
  //     console.log(data.booking_timestamp);
  //     console.log(data.service_type);

  //   },
  // });

  // const router = useRouter();

  return useMutation({
    mutationFn: (uuid: string) => confirmBooking(uuid),
    onSuccess: (data) => {
      const { booking_uuid, booking_timestamp, service_type } = data;

      // const params = new URLSearchParams({
      //   booking_uuid,
      //   booking_timestamp,
      //   service_type,
      // });

      
      // router.push(`summry/wait-list?${params.toString()}`);
    },
  });
}
