// "use client";

// import { create } from "zustand";
// import { persist } from "zustand/middleware";

// type Currency = "USD" | "EUR" | "GBP";

// type CurrencyStore = {
//   currency: Currency;
//   setCurrency: (value: Currency) => void;
//   currencyMark: string;
// };

// export const useCurrencyStore = create<CurrencyStore>()(
//   persist(
//     (set, get) => ({
//       currency: "GBP",

//       setCurrency: (value: Currency) =>
//         set({
//           currency: value,
//           currencyMark:
//             value === "USD" ? "$" : value === "EUR" ? "€" : "£",
//         }),
//       // مشتقة مباشرة من قيمة العملة الافتراضية
//       currencyMark: "$",
//     }),
//     {
//       name: "currency-storage",
//     }
//   )
// );

// store/currencyStore.ts

import { apiGet } from "@/lib/api";
import { create } from "zustand";

type Currency = "USD" | "EUR" | "GBP";
type CurrencyMark = "$" | "€" | "£";

interface ExchangeRates {
  USD: number;
  EUR: number;
  GBP: number;
}

interface CurrencyStore {
  currencyMark: CurrencyMark;
  currency: Currency;
  rates: ExchangeRates | null;
  ratesLoading: boolean;
  setCurrency: (currency: Currency) => void;
  fetchRates: () => Promise<void>;
}

export const useCurrencyStore = create<CurrencyStore>((set, get) => ({
  currencyMark: "£",
  currency: "GBP",
  rates: null,
  ratesLoading: false,

  setCurrency: (currency) => set({ currency, 
    currencyMark: currency === "USD" ? "$" : currency === "EUR" ? "€" : "£",
   }),

  fetchRates: async () => {
    if (get().rates) return;

    set({ ratesLoading: true });

    try {
      const res = await apiGet("/exchange-rates");
      // const data = await res.json();

      const rates = res?.data?.rates;
      console.log(rates);
      
      if (!rates) {
        console.error("Rates API failed");
        return;
      }
      set({
        rates: {
          GBP: 1,
          USD: rates?.USD ?? 1,
          EUR: rates?.EUR ?? 1,
        },
      });
    } finally {
      set({ ratesLoading: false });
    }
  },
}));
