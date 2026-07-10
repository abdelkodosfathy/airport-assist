import { ReactNode } from "react";
import { create } from "zustand";

export interface OptionType {
  label: string;
  value: string;
  icon?: ReactNode;
  color?: string;
  cost?: number;
}

export interface OtherPassenger {
  id: string;
  firstName: string | null;
  lastName: string | null;
  dateOfBirth: string | null;
  classOfTravel: OptionType | null;
}

interface OtherPassengersState {
  passengers: OtherPassenger[];

  // Seed the list from counts (call once on mount)
  initPassengers: (count: number) => void;

  // Field setters — addressed by id
  setFirstName: (id: string, value: string) => void;
  setLastName: (id: string, value: string) => void;
  setDateOfBirth: (id: string, value: string | null) => void;
  setClassOfTravel: (id: string, value: OptionType) => void;

  // Add / remove
  addPassenger: () => void;
  removePassenger: (id: string) => void;
}

const makePassenger = (): OtherPassenger => ({
  id: crypto.randomUUID(),
  firstName: null,
  lastName: null,
  dateOfBirth: null,
  classOfTravel: null,
});

export const useOtherPassengersStore = create<OtherPassengersState>((set) => ({
  passengers: [],

  initPassengers: (count) =>
    set({ passengers: Array.from({ length: count }, makePassenger) }),

  setFirstName: (id, value) =>
    set((s) => ({
      passengers: s.passengers.map((p) =>
        p.id === id ? { ...p, firstName: value } : p,
      ),
    })),

  setLastName: (id, value) =>
    set((s) => ({
      passengers: s.passengers.map((p) =>
        p.id === id ? { ...p, lastName: value } : p,
      ),
    })),

  setDateOfBirth: (id, value) =>
    set((s) => ({
      passengers: s.passengers.map((p) =>
        p.id === id ? { ...p, dateOfBirth: value } : p,
      ),
    })),

  setClassOfTravel: (id, value) =>
    set((s) => ({
      passengers: s.passengers.map((p) =>
        p.id === id ? { ...p, classOfTravel: value } : p,
      ),
    })),

  addPassenger: () =>
    set((s) => ({ passengers: [...s.passengers, makePassenger()] })),

  removePassenger: (id) =>
    set((s) => ({
      passengers: s.passengers.filter((p) => p.id !== id),
    })),
}));