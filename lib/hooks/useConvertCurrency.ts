// hooks/useConvertPrice.ts

import { useCurrencyStore } from "@/store/currencyStore";
// import { formatNumber } from "../formatNumbers";
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

// export function useConvertCurrency() {
//   const currency = useCurrencyStore((s) => s.currency);
//   const rates = useCurrencyStore((s) => s.rates);

//   const convert = (gbpAmount: number) => {
//     if (!rates) {
//       return  formatNumber(gbpAmount)
//     }

//     const value = Number((gbpAmount * rates[currency]).toFixed(2));
//     const formatedValue = formatNumber(value)
//     return formatedValue;
//   };

//   return { convert, currency };
// }
