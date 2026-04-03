// "use client";

// import { create } from "zustand";

// type AdditionalServicesStore = {
//   wheelchair: boolean;
//   additionalRequirements: string;
//   passengerFile: File | null;
//   imageFile: File | null;

//   setWheelchair: (value: boolean) => void;
//   setAdditionalRequirements: (value: string) => void;
//   setPassengerFile: (value: File | null) => void;
//   setImageFile: (value: File | null) => void;
// };

// export const useAdditionalServicesStore = create<AdditionalServicesStore>()(
//   (set) => ({
//     wheelchair: false,
//     additionalRequirements: "",
//     passengerFile: null,
//     imageFile: null,

//     setWheelchair: (value) => set({ wheelchair: value }),
//     setAdditionalRequirements: (value) => set({ additionalRequirements: value }),
//     setPassengerFile: (value) => set({ passengerFile: value }),
//     setImageFile: (value) => set({ imageFile: value }),
//   }),
// );