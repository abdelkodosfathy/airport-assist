// hooks/useConvertPrice.ts

import { useCurrencyStore } from "@/store/currencyStore";
export function useConvertCurrency() {
  const currency = useCurrencyStore((s) => s.currency);
  const rates = useCurrencyStore((s) => s.rates);

  const convert = (gbpAmount: number): number => {
    if (!rates) return gbpAmount;

    const converted = gbpAmount * rates[currency];

    return Number(converted.toFixed(2)); // 👈 يرجع number مش string
  };

  return { convert, currency };
}