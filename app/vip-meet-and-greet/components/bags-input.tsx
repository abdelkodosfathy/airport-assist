"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useCurrencyStore } from "@/store/currencyStore";
import { useAirportStore } from "@/store/vipInputsStore";
import { usePrimaryPassengerStore } from "@/store/primaryPassengerStore";

type BagsInputProps = {
  max?: number;
};

export const BagsInput = ({
  max = 99,
}: BagsInputProps) => {

  const airport = useAirportStore((state) => state.airport);
  const freeBags = airport?.number_of_free_bags ?? 0;
  const blockCost = airport?.paid_bags_block_cost ?? 0;
  const blockSize = airport?.paid_bags_block_size ?? 0;

  const currency = useCurrencyStore((s) => s.currency);
  // const currencyMark = useCurrencyStore((s) => s.currency);



  const bagsNumber = usePrimaryPassengerStore(state => state.numberOfBags);
  const setBagsNumber = usePrimaryPassengerStore(state => state.setNumberOfBags);

  const [cost, setCost] = useState(0);

  const calculateCost = (bags: number) => {
    if (bags <= freeBags) return 0;

    const extraBags = bags - freeBags;
    const blocks = Math.ceil(extraBags / blockSize);
    return blocks * blockCost;
  };

  const updateValue = (newValue: number) => {
    const safeValue = Math.max(0, Math.min(max, newValue));
    const calculatedCost = calculateCost(safeValue);
    
    setCost(calculatedCost);
    setBagsNumber(safeValue);
  };

  return (
    <div className="flex flex-1 justify-between items-center col-span-2">
      <p className="font-semibold">
        Number Of Bags{" "}
        {bagsNumber > 0 && (cost > 0 ? `(+${cost} ${currency})` : "(free)")}
      </p>

      <div className="flex gap-2 items-center">
        {/* Minus */}
        <button
          type="button"
          onClick={() => updateValue(bagsNumber - 1)}
          disabled={bagsNumber === 0}
          className="grid place-content-center rounded-full w-8 h-8
          text-white bg-[#7B5A41]
          disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Minus size={14} />
        </button>

        {/* Input */}
        <Input
          type="number"
          min={0}
          max={max}
          value={bagsNumber}
          onChange={(e) => updateValue(Number(e.target.value))}
          className="rounded-lg text-center w-16 bg-[#F2F3F5]
          appearance-none
          [&::-webkit-outer-spin-button]:appearance-none
          [&::-webkit-inner-spin-button]:appearance-none
          [&::-moz-appearance]:textfield"
        />

        {/* Plus */}
        <button
          type="button"
          onClick={() => updateValue(bagsNumber + 1)}
          disabled={bagsNumber >= max}
          className="grid place-content-center rounded-full w-8 h-8
          text-white bg-[#7B5A41]
          disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus size={14} />
        </button>
      </div>
    </div>
  );
};
