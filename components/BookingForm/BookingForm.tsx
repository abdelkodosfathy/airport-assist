"use client";
import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { Loader2 } from "lucide-react";
import VipInputs from "./vip-inputs";
import {
  useAirportStore,
  useChauffeurDestinationStore,
  useDateStore,
  usePassengersStore,
  useServiceStore,
  useSingleAirportStore,
} from "@/store/vipInputsStore";
import ChauffeurInputs from "./chauffeur-inputs";
import { useFlightFormStore } from "@/store/useFlightFormStore";
import { usePrimaryPassengerStore } from "@/store/primaryPassengerStore";
import { useAdditionalServicesStore } from "@/store/useAdditionalServices";
import { useAirportPackageStore } from "@/store/packageStore";
import { useBillingStore } from "@/store/billingDataStore";
import { usePickupPointsStore } from "@/store/pickupPointsStore";

export interface VipBookingData {
  airport_id: string;
  airport_name: string;
  serviceType: string;
  date: string;
  adults: number;
  children: number;
}

export interface ChauffeurBookingData {
  pickUp: string;
  dropOff: string;
  date: string;
  time: string;
  adults: number;
  children: number;
}
export type Errors = {
  [key: string]: string;
};

export type TabType = "vip" | "chauffeur-services";

export default function BookingForm() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>("vip");

  const from = usePickupPointsStore((state) => state.pickup);
  const dropOff = usePickupPointsStore((state) => state.dropoff);

  const airport = useAirportStore((state) => state.airport);
  const setServiceType = useServiceStore((state) => state.setServiceType);
  const serviceType = useServiceStore((state) => state.serviceType);
  const date = useDateStore((state) => state.bookingDate);
  const [errors, setErrors] = useState<Errors>({});

  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetPackages = useAirportPackageStore((s) => s.resetAirportPackage);
  const resetPassengers = usePassengersStore((s) => s.resetPassengers);
  const resetDate = useDateStore((s) => s.resetBookingDate);
  const resetFlight = useFlightFormStore((s) => s.resetForm);
  const resetPrimary = usePrimaryPassengerStore((s) => s.resetPrimaryPassenger);
  const resetChauffeurDestinations = useChauffeurDestinationStore(
    (s) => s.resetChauffeurDestination,
  );
  const resetAdditionalData = useAdditionalServicesStore((s) => s.reset);
  const resetBillingData = useBillingStore((s) => s.reset);
  const resetAirport = useAirportStore((s) => s.resetAirport);
  const resetSingleAirport = useSingleAirportStore((s) => s.resetSingleAirport);

  // const resetData = () => {
  //   resetPackages();
  //   resetFlight();
  //   resetPrimary();
  //   resetChauffeurDestinations();
  //   resetAdditionalData();
  //   resetBillingData();
  // };
  const resetData = useCallback(() => {
    resetPackages();
    resetFlight();
    resetPrimary();
    resetChauffeurDestinations();
    resetAdditionalData();
    resetBillingData();
  }, [
    resetPackages,
    resetFlight,
    resetPrimary,
    resetChauffeurDestinations,
    resetAdditionalData,
    resetBillingData,
  ]);

  // const resetForm = () => {
  //   console.log("form rednered");
  //   resetData();

  //   resetDate();
  //   resetAirport();
  //   resetPassengers();
  //   resetSingleAirport();
  //   setServiceType(null);
  // };
  const resetForm = useCallback(() => {
    resetData();
    resetDate();
    resetAirport();
    resetPassengers();
    resetSingleAirport();
    setServiceType(null);
  }, [
    resetData,
    resetDate,
    resetAirport,
    resetPassengers,
    resetSingleAirport,
    setServiceType,
  ]);

  // const handleTabChange = useCallback(
  //   (tab: TabType) => {
  //     resetForm();
  //     setActiveTab(tab);
  //     setErrors({});
  //   },
  //   [
  //     resetPackages,
  //     resetFlight,
  //     resetPrimary,
  //     resetChauffeurDestinations,
  //     resetAdditionalData,
  //     resetBillingData,
  //   ],
  // );
  const handleTabChange = useCallback(
    (tab: TabType) => {
      resetForm();
      setActiveTab(tab);
      setErrors({});
    },
    [resetForm],
  );

  const validateForm = useCallback((): boolean => {
    const newErrors: Record<string, string> = {};

    if (activeTab === "vip") {
      if (!airport) {
        newErrors.airport = "Please select an airport";
      }
      if (!serviceType) {
        newErrors.serviceType = "Please select a service type";
      }
      if (!date) {
        newErrors.date = "Please select a date";
      }
    } else if (activeTab === "chauffeur-services") {
      if (!from) {
        newErrors.from = "Please select pickup location";
      }
      if (!dropOff) {
        newErrors.dropOff = "Please select drop off location";
      }
      if (!date) {
        newErrors.date = "Please select a date";
      }
    }
    console.log(newErrors);

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [airport, serviceType, date, from, dropOff]);

  const handleBookNow = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      const isValid = validateForm();
      console.log(isValid);

      setIsSubmitting(isValid); // ← missing

      try {
        if (activeTab === "vip" && isValid) {
          router.push("/vip-meet-and-greet");
        } else if (activeTab === "chauffeur-services" && isValid) {
          router.push("/chauffeur-services");
        }
      } catch (err) {
        console.error("Booking failed:", err);
        setIsSubmitting(false);
      } finally {
        setIsSubmitting(false);
      }
    },
    [validateForm, activeTab],
  );
  console.log(activeTab);

  useEffect(() => {
    resetForm();
  }, []);
  return (
    <Card className="gap-4 xs:gap-6 lg:gap-4 booking-form opacity mx-auto backdrop-blur-md bg-white/10 border-white/20 mt-8 md:mt-12 w-full max-w-[1272px] p-6 lg:p-7.5 transition-all duration-300">
      {/* Tabs */}
      <div className="flex flex-col items-start flex-row xs:items-center flex-wrap gap-2 md:gap-4 justify-center lg:justify-start lg:mb-6">
        <Button
          variant="ghost"
          onClick={() => handleTabChange("vip")}
          className="cursor-pointer relative px-3 sm:px-4 py-2 text-white font-medium md:text-lg lg:text-xl hover:bg-transparent hover:text-[#AB9B90] transition-all duration-300"
          aria-pressed={activeTab === "vip"}
          aria-label="VIP Meet & Greet Service Tab"
        >
            VIP Meet & Greet
            <span className="hidden sm:block">Service</span>
          <span
            className={clsx(
              "absolute left-0 right-0 bottom-0.5 xs:-bottom-2 h-0.5 rounded-full transition-all duration-300",
              activeTab === "vip"
                ? "opacity-100 scale-x-100 bg-linear-to-r from-[#99785F00]/0 via-[#EBA068] to-[#99785F00]/0"
                : "opacity-0 scale-x-0",
            )}
          />
        </Button>
        <span className="inline-block w-0.75 h-9 rounded-3xl bg-linear-to-b from-white to-white/10" />
        <Button
          variant="ghost"
          onClick={() => handleTabChange("chauffeur-services")}
          className="cursor-pointer relative px-3 sm:px-4 py-2 text-white font-medium md:text-lg lg:text-xl hover:bg-transparent hover:text-[#AB9B90] transition-all duration-300"
          aria-pressed={activeTab === "chauffeur-services"}
          aria-label="Chauffeur Services Tab"
        >
          Chauffeur
            <span className="hidden sm:block">Service</span>

          <span
            className={clsx(
              "absolute left-0 right-0 bottom-0.5 xs:-bottom-2 h-0.5 rounded-full transition-all duration-300",
              activeTab === "chauffeur-services"
                ? "opacity-100 scale-x-100 bg-linear-to-r from-[#99785F00]/0 via-[#EBA068] to-[#99785F00]/0"
                : "opacity-0 scale-x-0",
            )}
          />
        </Button>
      </div>

      {/* Form Inputs */}
      <div className="space-y-4">
        <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-20 gap-0.5 lg:gap-1">
          {activeTab === "vip" ? (
            <VipInputs
              onReset={resetData}
              errors={errors}
              activeTab={activeTab}
            />
          ) : (
            <ChauffeurInputs onReset={resetData} errors={errors} />
          )}
          {/* <button
            onClick={handleBookNow}
            disabled={isSubmitting}
            className="w-full h-10  lg:min-h-12 rounded-lg lg:rounded-none lg:rounded-r-xl border text-lg font-light border-white/30 text-white px-6 py-3 bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)] hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform cursor-pointer col-span-1 sm:col-span-2 lg:col-span-4"
            aria-label="Book now"
          >
            <p className="text-normal h-full font-light flex items-center justify-center gap-2">
              {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
              {isSubmitting ? "BOOKING..." : "BOOK NOW"}
            </p>
          </button> */}
          <button
            onClick={handleBookNow}
            disabled={isSubmitting}
            aria-label="Book now"
            aria-busy={isSubmitting}
            aria-live="polite"
            className="w-full h-10 lg:min-h-12 rounded-lg lg:rounded-none lg:rounded-r-xl border text-lg font-light border-white/30 text-white px-6 py-3 bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)] hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform cursor-pointer col-span-1 sm:col-span-2 lg:col-span-4
              focus:outline-none focus:ring-1 focus:ring-white/40 focus:ring-offset-1 focus:ring-offset-black"
          >
            <span className="flex items-center justify-center gap-2">
              {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
              {isSubmitting ? "Booking..." : "BOOK NOW"}
            </span>
          </button>
        </div>
        {/* Global error message */}
      </div>
    </Card>
  );
}
