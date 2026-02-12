"use client";

import { useState, useEffect } from "react";

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

  return { currency, setCurrency };
};
