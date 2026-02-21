// "use client";

// import { useState, useEffect } from "react";

// export const useCurrency = () => {
//   const [currency, setCurrencyState] = useState("USD");

//   useEffect(() => {
//     const saved = localStorage.getItem("currency");
//     if (saved) setCurrencyState(saved);
//   }, []);

//   const setCurrency = (value: string) => {
//     setCurrencyState(value);
//     localStorage.setItem("currency", value);

//     window.location.reload();
//   };

//   return { currency, setCurrency };
// };

"use client";

import { useState, useEffect, useMemo } from "react";

export const useCurrency = () => {
  const [currency, setCurrencyState] = useState("USD");

  useEffect(() => {
    const saved = localStorage.getItem("currency");
    if (saved) setCurrencyState(saved);
  }, []);

  const setCurrency = (value: string) => {
    setCurrencyState(value);
    localStorage.setItem("currency", value);

    window.location.reload();
  };

  const currencyMark = useMemo(() => {
    switch (currency) {
      case "USD":
        return "$";
      case "EUR":
        return "€";
      case "GBP":
        return "£";
      default:
        return "$";
    }
  }, [currency]);

  return { currency, setCurrency, currencyMark };
};
