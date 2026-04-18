"use client";
import { BookingDate } from "@/components/custom inputs/DatePickerInputs";
import { Car } from "@/lib/types/car";
import { create } from "zustand";
type TripType = "one-way" | "round-trip" | "hourly";
type BookingDateEntry = BookingDate & { id: string };

export type TripStore = {
  hours: number;
  passengers: number;
  luggage: number;

  isMultiDay: boolean;

  car: Car | null;
  tripType: TripType;
  uuid: string | null;

  set_hours: (value: number) => void;
  set_passengers: (value: number) => void;
  set_luggage: (value: number) => void;

  setTripType: (value: TripType) => void;
  setCar: (value: Car | null) => void;

  set_uuid: (value: string) => void;

  firstName: string;
  lastName: string;
  email: string;
  phone: string;

  dateTimeList: BookingDateEntry[];
  setDateTimeList: React.Dispatch<React.SetStateAction<BookingDateEntry[]>>;

  setIsMultiDay: (value: boolean) => void;
  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;
  setEmail: (value: string) => void;
  setPhone: (value: string) => void;

  meetAndGreet: boolean;
  set_meetAndGreet: (value: boolean) => void;

  additionalRequirements: string | null;
  setAdditionalRequirements: (value: string) => void;
};

export const useTripStore = create<TripStore>()((set) => ({
  car: null,
  passengers: 1,
  isMultiDay: false,
  luggage: 0,
  tripType: "one-way",
  hours: 4, //if trip type by_hour
  additionalRequirements: null,
  meetAndGreet: false,
  set_hours: (value) => set({ hours: value }),
  set_passengers: (value) => set({ passengers: value }),
  set_luggage: (value) => set({ luggage: value }),
  set_meetAndGreet: (value) => set({ meetAndGreet: value }),

  setIsMultiDay: (value) => set({ isMultiDay: value }),
  dateTimeList: [],
  setDateTimeList: (value) =>
    set((state) => ({
      dateTimeList:
        typeof value === "function"
          ? value(state.dateTimeList) // لو passed updater fn  زي: prev => [...prev, newItem]
          : value, // لو passed value مباشرة زي: []
    })),

  setCar: (value) => set({ car: value }),
  setTripType: (value) => set({ tripType: value }),

  setAdditionalRequirements: (value) => set({ additionalRequirements: value }),

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
}));
