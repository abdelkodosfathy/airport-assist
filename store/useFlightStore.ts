"use client";

import { OptionType } from "@/components/custom inputs/search";
import { create } from "zustand";

type FlightStore = {
  airline: OptionType | null;
  setAirline: (value: OptionType) => void;

  flightNumber: string | null;
  setFlightNumber: (value: string) => void;

  arrivalTime: OptionType | null;
  setArrivalTime: (value: OptionType) => void;

  serviceDuration: OptionType | null;
  setServiceDuration: (value: OptionType) => void;

  setFastTrack: (value: { state: boolean; value: number }) => void;
  fastTrack: {
    state: boolean;
    value: number;
  };
};

export const useFlightStore = create<FlightStore>()((set) => ({
  airline: null,
  flightNumber: null,
  arrivalTime: null,
  serviceDuration: null,
  fastTrack: {
    state: false,
    value: 0,
  },

  setAirline: (value) => set({ airline: value }),
  setFlightNumber: (value) => set({ flightNumber: value }),

  setArrivalTime: (value) => set({ arrivalTime: value }),
  setServiceDuration: (value) => set({ serviceDuration: value }),
  setFastTrack: (value) => set({ fastTrack: value }),
}));
