"use client";

import { Car } from "@/lib/types/car";
import { LatLngLocation } from "@/types/service";
import { create } from "zustand";
type CarStore = {
  car: Car | null;
  setCar: (car: Car | null) => void;
};

export const useCarStore = create<CarStore>()((set, get) => ({
  car: null,
  setCar: (car: Car | null) =>
    set({
      car: car,
    }),
}));

type PickUpStore = {
  setPickUpFrom: (value: LatLngLocation) => void;
  setDropOff: (value: LatLngLocation) => void;
  pickupFrom: LatLngLocation | null;
  dropOff: LatLngLocation | null;
};

export const usePickUpStore = create<PickUpStore>()(
  // persist(
  (set, get) => ({
    pickupFrom: null,
    dropOff: null,

    setPickUpFrom: (value: LatLngLocation) =>
      set({
        pickupFrom: value,
      }),
    setDropOff: (value: LatLngLocation) =>
      set({
        dropOff: value,
      }),
  }),
  //   {
  //     name: "pickup-storage",
  //   },
  // ),
);
