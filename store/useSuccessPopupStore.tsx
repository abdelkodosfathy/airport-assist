// lib/stores/useSuccessPopupStore.ts
import { create } from "zustand";

type PopupState = {
  isOpen: boolean;
  clientSecret: string | null;
  open: (clientSecret: string) => void;
  close: () => void;
};

export const useSuccessPopupStore = create<PopupState>((set) => ({
  isOpen: false,
  clientSecret: null,
  open: (clientSecret) => set({ isOpen: true, clientSecret }),
  close: () => set({ isOpen: false, clientSecret: null }),
}));
export const useWaitListPopupStore = create<PopupState>((set) => ({
  isOpen: false,
  clientSecret: null,
  open: (clientSecret) => set({ isOpen: true, clientSecret }),
  close: () => set({ isOpen: false, clientSecret: null }),
}));