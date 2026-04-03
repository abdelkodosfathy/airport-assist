"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type Currency = "USD" | "EUR" | "GBP";

type CurrencyStore = {
  currency: Currency;
  setCurrency: (value: Currency) => void;
  currencyMark: string;
};

export const useCurrencyStore = create<CurrencyStore>()(
  persist(
    (set, get) => ({
      currency: "USD",

      setCurrency: (value: Currency) =>
        set({
          currency: value,
          currencyMark:
            value === "USD" ? "$" : value === "EUR" ? "€" : "£",
        }),
      // مشتقة مباشرة من قيمة العملة الافتراضية
      currencyMark: "$",
    }),
    {
      name: "currency-storage",
    }
  )
);