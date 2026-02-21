"use client";

import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCurrency } from "@/lib/hooks/useCurrency";

export default function CurrencySelector() {
  const { currency, setCurrency } = useCurrency();

  useEffect(() => {}, [currency]);
  return (
    <Select value={currency} onValueChange={setCurrency}>
      <SelectTrigger
        className=" min-h-10 backdrop-blur-md hover:backdrop-blur-xl
               bg-white/10 border border-white/20
              p-2 rounded-xl text-sm text-white
              transition
              w-31
              outline-none
              font-light hover:bg-transparent hover:text-white cursor-pointer"
      >
        <SelectValue />
      </SelectTrigger>

      <SelectContent className="bg-white text-black" position="popper">
        <SelectItem value="USD">
          <div className="flex items-center gap-3">
            <img
              src="/icons/usd.png"
              className="w-8 h-8 object-cover rounded-2xl"
            />
            USD
          </div>
        </SelectItem>

        <SelectItem value="EUR">
          <div className="flex items-center gap-3">
            <img
              src="/icons/eur.webp"
              className="w-8 h-8 object-cover rounded-2xl"
            />
            EUR
          </div>
        </SelectItem>

        <SelectItem value="GBP">
          <div className="flex items-center gap-3">
            <img
              src="/icons/gbp.png"
              className="w-8 h-8 object-cover rounded-2xl"
            />
            GBP
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  );
}

