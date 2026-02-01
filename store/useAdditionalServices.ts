import { create } from "zustand";

interface AdditionalServicesState {
  passengerFile?: File | null;
  imageFile?: File | null;
  wheelchair: boolean;
  additionalRequirements: string;
  setPassengerFile: (file: File | null) => void;
  setImageFile: (file: File | null) => void;
  setWheelchair: (value: boolean) => void;
  setAdditionalRequirements: (value: string) => void;
}

export const useAdditionalServicesStore = create<
  AdditionalServicesState & { reset: () => void }
>((set) => ({
  passengerFile: null,
  imageFile: null,
  wheelchair: false,
  additionalRequirements: "",
  setPassengerFile: (file) => set({ passengerFile: file }),
  setImageFile: (file) => set({ imageFile: file }),
  setWheelchair: (value) => set({ wheelchair: value }),
  setAdditionalRequirements: (value) => set({ additionalRequirements: value }),
  reset: () =>
    set({
      passengerFile: null,
      wheelchair: false,
      additionalRequirements: "",
    }),
}));
