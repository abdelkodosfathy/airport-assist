"use client";

import { Suggestion } from "@/app/chauffeur-services/components/LoactionInputs";
import { create } from "zustand";

type PickupPointsStore = {
  pickup: Suggestion | null;
  dropoff: Suggestion | null;
  distanceKm: string | null;
  distanceMi: string | null;
  duration: string | null;
  loadingDist: boolean;
  distanceError: string | null;
  setDistanceError: (value: string | null) => void;
  setPickup: (value: Suggestion | null) => void;
  setDropoff: (value: Suggestion | null) => void;
  setDistanceKm: (value: string | null) => void;
  setDistanceMi: (value: string | null) => void;
  setDuration: (value: string | null) => void;
  setLoadingDist: (value: boolean) => void;
  reset: () => void;
};

const initialState = {
  pickup: null,
  dropoff: null,
  distanceKm: null,
  distanceMi: null,
  duration: null,
  loadingDist: false,
  distanceError: null as string | null, // ← أضف دي
};

export const usePickupPointsStore = create<PickupPointsStore>()((set) => ({
  ...initialState,

  setPickup: (value) => set({ pickup: value }),
  setDropoff: (value) => set({ dropoff: value }),
  setDistanceKm: (value) => set({ distanceKm: value }),
  setDistanceMi: (value) => set({ distanceMi: value }),
  setDuration: (value) => set({ duration: value }),
  setLoadingDist: (value) => set({ loadingDist: value }),
  setDistanceError: (value) => set({ distanceError: value }),
  reset: () => set(initialState),
}));
