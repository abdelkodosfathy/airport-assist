"use client";

import { Suggestion } from "@/app/chauffeur-services/components/LoactionInputs";
import { BookingDate } from "@/components/custom inputs/DatePickerInputs";
import { Airport, SingleAirport } from "@/lib/types/airport";
import { create } from "zustand";
import { persist } from "zustand/middleware";

/* -------------------------------------------------------------------------- */
/*                               Airport Store                                */
/* -------------------------------------------------------------------------- */
/**
 * Holds the selected airport across the app.
 * Persisted to localStorage to survive page refreshes.
 */
type AirportStore = {
  /** Currently selected airport */
  airport: Airport | null;

  /** Update selected airport */
  setAirport: (value: Airport | null) => void;
  resetAirport: () => void;
};

export const useAirportStore = create<AirportStore>()(
  persist(
    (set) => ({
      airport: null,
      setAirport: (value) => set({ airport: value }),
      resetAirport: () => set({ airport: null }), // ← reset action
    }),
    {
      /** Storage key used in localStorage */
      name: "airport-storage",
    },
  ),
);
type SingleAirportStore = {
  /** Currently selected airport */
  singleAirport: SingleAirport | null;
  /** Update selected airport */
  setSingleAirport: (value: SingleAirport) => void;
  resetSingleAirport: () => void;
};

export const useSingleAirportStore = create<SingleAirportStore>()(
  persist(
    (set) => ({
      singleAirport: null,
      setSingleAirport: (value) => {
        console.log("assing single airport");

        return set({ singleAirport: value });
      },
      resetSingleAirport: () => set({ singleAirport: null }), // ← reset action
    }),
    {
      /** Storage key used in localStorage */
      name: "single-airport-storage",
    },
  ),
);

/* -------------------------------------------------------------------------- */
/*                               Service Store                                */
/* -------------------------------------------------------------------------- */

/**
 * Supported service types for booking flow
 */
export type ServiceType = "arrival" | "departure" | "connection";

/**
 * Manages the selected service type (arrival / departure / connection).
 * Useful for multi-step booking forms.
 */
type ServiceStore = {
  /** Currently selected service type */
  serviceType: ServiceType | null;

  /** Set the active service type */
  setServiceType: (value: ServiceType | null) => void;

  /** Reset service type (e.g. when user goes back or changes airport) */
  clearServiceType: () => void;
  resetServiceType: () => void;
};

export const useServiceStore = create<ServiceStore>()(
  persist(
    (set) => ({
      serviceType: null,
      setServiceType: (value) => set({ serviceType: value }),
      clearServiceType: () => set({ serviceType: null }),
      resetServiceType: () => ({ serviceType: null }),
    }),
    {
      /** Storage key used in localStorage */
      name: "service-storage",
    },
  ),
);

// type DateStore = {
//   bookingDate: BookingDate | null;
//   setBookingDate: (value: BookingDate) => void;
// };
// export const useDateStore = create<DateStore>()((set) => ({
//   bookingDate: null,
//   setBookingDate: (value) => set({ bookingDate: value }),
// }));
type DateStore = {
  bookingDate: BookingDate | null;
  setBookingDate: (value: BookingDate) => void;
  resetBookingDate: () => void;
};

export const useDateStore = create<DateStore>()(
  persist(
    (set) => ({
      bookingDate: null,
      setBookingDate: (value) => set({ bookingDate: value }),
      resetBookingDate: () => set({ bookingDate: null }),
    }),
    {
      /** Storage key used in localStorage */
      name: "date-storage",
    },
  ),
);

type PassengersStore = {
  adults: number;
  children: number;
  setAdults: (value: number) => void;
  setChildren: (value: number) => void;
  resetPassengers: () => void;
};
export const usePassengersStore = create<PassengersStore>()(
  persist(
    (set) => ({
      adults: 1,
      children: 0,
      setAdults: (value) => set({ adults: value }),
      setChildren: (value) => set({ children: value }),

      resetPassengers: () => set({ adults: 1, children: 0 }),
    }),
    {
      /** Storage key used in localStorage */
      name: "passengers-storage",
    },
  ),
);

// ── Local store for chauffeur destination ─────────────────────────────────────
type ChauffeurDestinationStore = {
  country: string | null;
  miles: number | null;
  destination: Suggestion | null;
  supplementFee: number;
  withTrip: boolean;

  setWithTrip: (s: boolean) => void;
  setDestination: (s: Suggestion | null) => void;
  setMiles: (m: number | null) => void;
  setSupplementFee: (s: number) => void;
  setCountry: (c: string) => void;
  resetChauffeurDestination: () => void;

  withAdditionalChauffeur: boolean;
  setWithAdditionalChauffeur: (v: boolean) => void;
};

const initialState = {
  miles: 0,
  country: null,
  supplementFee: 0,
  destination: null,
  withTrip: false,
  withAdditionalChauffeur: false,
};

export const useChauffeurDestinationStore = create<ChauffeurDestinationStore>(
  (set) => ({
    ...initialState,

    setWithTrip: (s) => set({ withTrip: s }),
    setMiles: (m) => set({ miles: m }),
    setCountry: (s) => set({ country: s }),
    setSupplementFee: (s) => set({ supplementFee: s }),
    setDestination: (s) => set({ destination: s }),
    resetChauffeurDestination: () => set(initialState),

    setWithAdditionalChauffeur: (value: boolean) =>
      set({ withAdditionalChauffeur: value }),
  }),
);
