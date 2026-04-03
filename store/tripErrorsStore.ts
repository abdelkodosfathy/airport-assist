"use client";
import { create } from "zustand";

export type TripErrorFields = {
  from: boolean;
  dropOff: boolean;
  car: boolean;
  date: boolean;
  airline: boolean;
  flightNumber: boolean;

  firstName: boolean;
  lastName: boolean;
  email: boolean;
  phone: boolean;
};

type TripErrorStore = {
  errors: TripErrorFields;

  // تشغيل كل الأيرورز دفعة واحدة لما يدوس Submit
  setErrors: (fields: Partial<TripErrorFields>) => void;

  // تكلير أيرور field معين لما اليوزر يملاه
  clearError: (field: keyof TripErrorFields) => void;

  // تكلير كل حاجة
  clearAll: () => void;
};

const defaultErrors: TripErrorFields = {
  from: false,
  dropOff: false,
  car: false,
  date: false,
  airline: false,
  flightNumber: false,
  firstName: false,
  lastName: false,
  email: false,
  phone: false,
};

export const useTripErrors = create<TripErrorStore>()((set) => ({
  errors: { ...defaultErrors },

  setErrors: (fields) =>
    set((state) => ({
      errors: { ...state.errors, ...fields },
    })),

  clearError: (field) =>
    set((state) => ({
      errors: { ...state.errors, [field]: false },
    })),

  clearAll: () => set({ errors: { ...defaultErrors } }),
}));    