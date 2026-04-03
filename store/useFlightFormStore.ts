// "use client";

// import { OptionType } from "@/components/custom inputs/search";
// import { Airline } from "@/lib/types/airline";
// import { create } from "zustand";

// type FlightFormStore = {
//   airline: Airline | null;
//   flightNumber: string | null;
//   arrivalTime: OptionType | null;
//   serviceDuration: OptionType | null;
//   fastTrack: boolean;

//   setAirline: (value: Airline) => void;
//   setFlightNumber: (value: string) => void;
//   setArrivalTime: (value: OptionType) => void;
//   setServiceDuration: (value: OptionType | null) => void;
//   setFastTrack: (value: boolean) => void;
//   resetForm: () => void;
// };

// export const useFlightFormStore = create<FlightFormStore>()((set) => ({
//   airline: null,
//   flightNumber: null,
//   arrivalTime: null,
//   serviceDuration: null,
//   fastTrack: false,

//   setAirline: (value) => set({ airline: value }),
//   setFlightNumber: (value) => set({ flightNumber: value }),
//   setArrivalTime: (value) => set({ arrivalTime: value }),
//   setServiceDuration: (value) => set({ serviceDuration: value }),
//   setFastTrack: (value) => set({ fastTrack: value }),

//   resetForm: () =>
//     set({
//       airline: null,
//       flightNumber: null,
//       arrivalTime: null,
//       serviceDuration: null,
//       fastTrack: false,
//     }),
// }));

"use client";

import { OptionType } from "@/components/custom inputs/search";
import { Airline } from "@/lib/types/airline";
import { create } from "zustand";

type FlightFormStore = {
  // arrival / departure
  airline: Airline | null;
  flightNumber: string | null;
  arrivalTime: OptionType | null;
  serviceDuration: OptionType | null;
  fastTrack: boolean;

  // connection-specific
  arrivalAirline: Airline | null;
  arrivalFlightNumber: string | null;
  departureAirline: Airline | null;
  departureFlightNumber: string | null;

  setAirline: (value: Airline) => void;
  setFlightNumber: (value: string) => void;
  setArrivalTime: (value: OptionType) => void;
  setServiceDuration: (value: OptionType | null) => void;
  setFastTrack: (value: boolean) => void;

  setArrivalAirline: (value: Airline) => void;
  setArrivalFlightNumber: (value: string) => void;
  setDepartureAirline: (value: Airline) => void;
  setDepartureFlightNumber: (value: string) => void;

  resetForm: () => void;
};

const initialState = {
  airline: null,
  flightNumber: null,
  arrivalTime: null,
  serviceDuration: null,
  fastTrack: false,
  arrivalAirline: null,
  arrivalFlightNumber: null,
  departureAirline: null,
  departureFlightNumber: null,
};

export const useFlightFormStore = create<FlightFormStore>()((set) => ({
  ...initialState,

  setAirline: (value) => set({ airline: value }),
  setFlightNumber: (value) => set({ flightNumber: value }),
  setArrivalTime: (value) => set({ arrivalTime: value }),
  setServiceDuration: (value) => set({ serviceDuration: value }),
  setFastTrack: (value) => set({ fastTrack: value }),

  setArrivalAirline: (value) => set({ arrivalAirline: value }),
  setArrivalFlightNumber: (value) => set({ arrivalFlightNumber: value }),
  setDepartureAirline: (value) => set({ departureAirline: value }),
  setDepartureFlightNumber: (value) => set({ departureFlightNumber: value }),

  resetForm: () => set(initialState),
}));
