"use client";

import { memo, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

import {
  useAirportStore,
  useDateStore,
  useServiceStore,
} from "@/store/vipInputsStore";

import type { Errors, TabType } from "./BookingForm";
import { usePickupPointsStore } from "@/store/pickupPointsStore";
import { createBookingQuery } from "@/lib/createBookingQuery";

interface Props {
  activeTab: TabType;
  setErrors: React.Dispatch<React.SetStateAction<Errors>>;
}

const BookNowButton = ({ activeTab, setErrors }: Props) => {
  const router = useRouter();

  const airport = useAirportStore((s) => s.airport);
  const serviceType = useServiceStore((s) => s.serviceType);
  const date = useDateStore((s) => s.bookingDate);

  const from = usePickupPointsStore((s) => s.pickup);
  const dropOff = usePickupPointsStore((s) => s.dropoff);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClick = useCallback(async () => {
    const newErrors: Errors = {};

    if (activeTab === "vip") {
      if (!airport) newErrors.airport = "Airport is required";
      if (!serviceType) newErrors.serviceType = "Service type is required";
      if (!date) newErrors.date = "Date is required";
    } else {
      if (!from) newErrors.from = "Pickup location is required";
      if (!dropOff) newErrors.dropOff = "Drop-off location is required";
      if (!date) newErrors.date = "Date is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length) return;

    setIsSubmitting(true);

    try {

      const query = createBookingQuery({
        airport: airport?.airport_name,
        service: serviceType,
      });


      if (activeTab === "vip") {
        router.push(`/vip-meet-and-greet?${query}`);
      } else {
        router.push(`/chauffeur-services?${query}`);
      }
    } finally {
      setIsSubmitting(false);
    }
  }, [airport, serviceType, date, from, dropOff, activeTab, router, setErrors]);

  return (
    <Button
      onClick={handleClick}
      disabled={isSubmitting}
      //   className="w-full h-10 lg:min-h-12 rounded-lg lg:rounded-none lg:rounded-r-xl border font-light border-white/30 text-white bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)] hover:opacity-90 disabled:opacity-50"

      aria-label="Book now"
      aria-busy={isSubmitting}
      aria-live="polite"
      className="w-full h-10 lg:min-h-12 rounded-lg lg:rounded-none lg:rounded-r-xl border font-light border-white/30 text-white bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)] hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform cursor-pointer col-span-1 sm:col-span-2 lg:col-span-4
              focus:outline-none focus:ring-1 focus:ring-white/40 focus:ring-offset-1 focus:ring-offset-black
              "
    >
      <span className="flex items-center gap-2">
        {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
        {isSubmitting ? "Booking..." : "BOOK NOW"}
      </span>
    </Button>
  );
};

export default memo(BookNowButton);
