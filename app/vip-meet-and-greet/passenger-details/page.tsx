"use client";

import { useEffect } from "react";
import SideInformationCard from "../side-informatio-card"; // SideInformationCardRef,
import Steps from "../components/steps";
import FlightSection from "../components/flight-section";
import {
  useDateStore,
  useServiceStore,
  useSingleAirportStore,
} from "@/store/vipInputsStore";
import { useRouter } from "next/navigation";
import { useFlightFormStore } from "@/store/useFlightFormStore";
import { usePrimaryPassengerStore } from "@/store/primaryPassengerStore";
import { useSingleAirport } from "@/lib/hooks/useAirports";
import MainButton from "@/components/MainButton";
export type currentPage = "packages" | "flight" | "billing" | "summry";

const Page = () => {
  const storedAirport = useSingleAirportStore((state) => state.singleAirport);
  const setSingleAirport = useSingleAirportStore(
    (state) => state.setSingleAirport,
  );

  const router = useRouter();
  useEffect(() => {
    if (!storedAirport) {
      router.replace("/");
    }
  }, [storedAirport, router]);

  const { data: airportQuery } = useSingleAirport(
    storedAirport?.airport_id.toString() ?? "",
  );

  useEffect(() => {
    const airportResponse = airportQuery?.data?.airport;
    if (airportResponse) {
      setSingleAirport(airportResponse); // ← يحدث الستور لما العملة تتغير
    }
  }, [airportQuery]);

  if (!storedAirport) return null;

  return (
    <>
      <p className="font-[Manrope] font-medium text-[15.53px] leading-[130%] text-[#8E8E93] mb-3">
        Choose how to travel
      </p>

      <h2 className="font-[Manrope] font-normal text-[22.6px] leading-[100%] tracking-[7.06px] uppercase mb-6">
        Services Level Available
      </h2>

      <Steps currentPage="flight" />

      <div className="flex gap-4 capitalize">
        <FlightSection />
        <SideInformationCard />
      </div>
    </>
  );
};

export default Page;

export const Continue = ({ href }: { href: string }) => {
  const serviceType = useServiceStore((state) => state.serviceType);

  if (serviceType === "connection") {
    return <ConnectionContinue navigateTo={href} />;
  } else {
    return <ArrivalDepartureContinue navigateTo={href} />;
  }
};

const ArrivalDepartureContinue = ({ navigateTo }: { navigateTo: string }) => {
  const router = useRouter();
  const setValidationErrors = useFlightFormStore((s) => s.setValidationError);

  const airline = useFlightFormStore((s) => s.airline);
  const flightNumber = useFlightFormStore((s) => s.flightNumber);
  const arrivalTime = useDateStore((s) => s.bookingDate)?.time;

  const firstName = usePrimaryPassengerStore((s) => s.firstName);
  const lastName = usePrimaryPassengerStore((s) => s.lastName);
  const email = usePrimaryPassengerStore((s) => s.email);
  const phone = usePrimaryPassengerStore((s) => s.phone);

  const isValid =
    (airline ?? "" !== "") &&
    (flightNumber ?? "" !== "") &&
    // Primary Passenger section
    (firstName ?? "" !== "") &&
    (lastName ?? "" !== "") &&
    (email ?? "" !== "") &&
    (phone ?? "" !== "") &&
    (arrivalTime ?? "" !== "");
  return (
    <MainButton
      onClick={() => {
        if (!isValid) {
          setValidationErrors(true);
          return;
        } // يمنع النافيجيت

        router.push(navigateTo);
      }}
    >
      Continue
    </MainButton>
  );
};
const ConnectionContinue = ({ navigateTo }: { navigateTo: string }) => {
  const router = useRouter();
  const setValidationErrors = useFlightFormStore((s) => s.setValidationError);

  const arrivalAirline = useFlightFormStore((s) => s.arrivalAirline);
  const arrivalFlightNumber = useFlightFormStore((s) => s.arrivalFlightNumber);
  const departureAirline = useFlightFormStore((s) => s.departureAirline);
  const departureFlightNumber = useFlightFormStore(
    (s) => s.departureFlightNumber,
  );
  const arrivalTime = useDateStore((s) => s.bookingDate)?.time;

  const firstName = usePrimaryPassengerStore((s) => s.firstName);
  const lastName = usePrimaryPassengerStore((s) => s.lastName);
  const email = usePrimaryPassengerStore((s) => s.email);
  const phone = usePrimaryPassengerStore((s) => s.phone);

  const isValid =
    (arrivalAirline ?? "" !== "") &&
    (arrivalFlightNumber ?? "" !== "") &&
    (departureAirline ?? "" !== "") &&
    (departureFlightNumber ?? "" !== "") &&
    // Primary Passenger section
    (firstName ?? "" !== "") &&
    (lastName ?? "" !== "") &&
    (email ?? "" !== "") &&
    (phone ?? "" !== "") &&
    (arrivalTime ?? "" !== "");

  return (
    <MainButton
      onClick={() => {
        if (!isValid) {
          setValidationErrors(true);
          return;
        } // يمنع النافيجيت
        router.push(navigateTo);
      }}
    >
      Continue
    </MainButton>
  );
};
