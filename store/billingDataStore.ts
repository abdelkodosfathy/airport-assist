import { create } from "zustand";

type BillingState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;

  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;
  setEmail: (value: string) => void;
  setPhone: (value: string) => void;

  reset: () => void;
};

export const useBillingStore = create<BillingState>(
  (set) => ({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",

    setFirstName: (value) => set({ firstName: value }),
    setLastName: (value) => set({ lastName: value }),
    setEmail: (value) => set({ email: value }),
    setPhone: (value) => set({ phone: value }),

    reset: () =>
      set({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
      }),
  })
);



export type BillingErrorFields = {
  firstName: boolean;
  lastName: boolean;
  email: boolean;
  phone: boolean;
};

type BillingErrorStore = {
  errors: BillingErrorFields;
  setErrors: (fields: Partial<BillingErrorFields>) => void;
  clearError: (field: keyof BillingErrorFields) => void;
  clearAll: () => void;
};

const defaultErrors: BillingErrorFields = {
  firstName: false,
  lastName: false,
  email: false,
  phone: false,
};

export const useBillingErrors = create<BillingErrorStore>()((set) => ({
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