"use client";

import { OptionType } from "@/components/custom inputs/search";
import { create } from "zustand";

type PrimaryPassengerStore = {
  firstName: string | null;
  lastName: string | null;
  dateOfBirth: string | null;
  classOfTravel: OptionType | null;
  email: string | null;
  phone: string | null;
  numberOfBags: number;
  otherPassengersInfo: string | null;

  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;
  setDateOfBirth: (value: string) => void;
  setClassOfTravel: (value: OptionType) => void;
  setEmail: (value: string) => void;
  setPhone: (value: string) => void;
  setNumberOfBags: (value: number) => void;
  setOtherPassengersInfo: (value: string) => void;
  resetPrimaryPassenger: () => void;
};

export const usePrimaryPassengerStore = create<PrimaryPassengerStore>()(
  (set) => ({
    firstName: null,
    lastName: null,
    dateOfBirth: null,
    classOfTravel: null,
    email: null,
    phone: null,
    numberOfBags: 0,
    otherPassengersInfo: null,

    setFirstName: (value) => set({ firstName: value }),
    setLastName: (value) => set({ lastName: value }),
    setDateOfBirth: (value) => set({ dateOfBirth: value }),
    setClassOfTravel: (value) => set({ classOfTravel: value }),
    setEmail: (value) => set({ email: value }),
    setPhone: (value) => set({ phone: value }),
    setNumberOfBags: (value) => set({ numberOfBags: value }),
    setOtherPassengersInfo: (value) => set({ otherPassengersInfo: value }),
    resetPrimaryPassenger: () =>
      set({
        firstName: null,
        lastName: null,
        dateOfBirth: null,
        classOfTravel: null,
        email: null,
        phone: null,
        numberOfBags: 0,
        otherPassengersInfo: null,
      }),
  }),
);
