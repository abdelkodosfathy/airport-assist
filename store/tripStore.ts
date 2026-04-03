"use client";
import { Car } from "@/lib/types/car";
import { create } from "zustand";
type TripType = "one-way" | "round-trip" | "hourly";

export type TripStore = {
  hours: number;
  passengers: number;
  luggage: number;

  car: Car | null;
  tripType: TripType;
  uuid: string | null;

  set_hours: (value: number) => void;
  set_passengers: (value: number) => void;
  set_luggage: (value: number) => void;

  setTripType: (value: TripType) => void;
  setCar: (value: Car) => void;

  set_uuid: (value: string) => void;

  firstName: string;
  lastName: string;
  email: string;
  phone: string;

  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;
  setEmail: (value: string) => void;
  setPhone: (value: string) => void;

  meetAndGreet: boolean;
  set_meetAndGreet: (value: boolean) => void;

  additionalRequirements: string | null;
  setAdditionalRequirements: (value: string) => void;
};

export const useTripStore = create<TripStore>()(
  // persist(
  (set) => ({
    car: null,
    passengers: 1,
    luggage: 0,
    tripType: "one-way",
    hours: 4, //if trip type by_hour
    additionalRequirements: null,
    meetAndGreet: false,
    set_hours: (value) => set({ hours: value }),
    set_passengers: (value) => set({ passengers: value }),
    set_luggage: (value) => set({ luggage: value }),
    set_meetAndGreet: (value) => set({ meetAndGreet: value }),

    setCar: (value) => set({ car: value }),
    setTripType: (value) => set({ tripType: value }),

    setAdditionalRequirements: (value) =>
      set({ additionalRequirements: value }),
    uuid: null,
    set_uuid: (value) => set({ uuid: value }),

    firstName: "",
    lastName: "",
    email: "",
    phone: "",

    setFirstName: (value) => set({ firstName: value }),
    setLastName: (value) => set({ lastName: value }),
    setEmail: (value) => set({ email: value }),
    setPhone: (value) => set({ phone: value }),
  }),
);
