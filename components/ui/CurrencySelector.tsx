"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCurrencyStore } from "@/store/currencyStore";
import Image from "next/image";

export default function CurrencySelector() {
  const currency = useCurrencyStore((s) => s.currency);
  const setCurrency = useCurrencyStore((s) => s.setCurrency);

  return (
    <Select value={currency} onValueChange={setCurrency}>
      <SelectTrigger
        aria-label="Select currency"
        className="min-h-10 backdrop-blur-md hover:backdrop-blur-xl
        bg-white/10 border border-white/20
        p-2 rounded-xl text-sm text-white
        focus:outline-none focus:ring-2 focus:ring-white/50
        transition w-31 outline-none font-light hover:bg-transparent hover:text-white cursor-pointer"
      >
        <SelectValue placeholder="GBP" />
      </SelectTrigger>

      <SelectContent className="z-90 bg-white text-black" position="popper">
        <SelectItem value="USD">
          <div className="flex items-center gap-3">
            <Image
              alt="US Dollar"
              src="/icons/usd.png"
              width={32}
              height={32}
              className="w-8 h-8 object-cover rounded-2xl"
            />
            USD
          </div>
        </SelectItem>

        <SelectItem value="EUR">
          <div className="flex items-center gap-3">
            <Image
              width={32}
              height={32}
              alt="EUR Euro"
              src="/icons/eur.webp"
              className="w-8 h-8 object-cover rounded-2xl"
            />
            EUR
          </div>
        </SelectItem>

        <SelectItem value="GBP">
          <div className="flex items-center gap-3">
            <Image
              width={32}
              height={32}
              alt="GBP British Pound"
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
