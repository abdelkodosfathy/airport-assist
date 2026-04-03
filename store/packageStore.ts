"use client";

import { AirportPackage } from "@/lib/types/airport";
import { create } from "zustand";

type PackageStore = {
  airportPackage: AirportPackage | null;
  setAirportPackage: (value: AirportPackage) => void;
  resetAirportPackage: () => void;
};

export const useAirportPackageStore = create<PackageStore>()((set, get) => ({
  airportPackage: null,
  setAirportPackage: (value: AirportPackage) =>
    set({
      airportPackage: value,
    }),
  resetAirportPackage: () => set({ airportPackage: null }),
}));
