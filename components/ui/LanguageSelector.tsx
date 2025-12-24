"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function LanguageSelect() {
  const [language, setLanguage] = useState("USD");

  const icons: Record<string, string> = {
    USD: "/icons/usd.png",
    EUR: "/icons/eur.webp",
    GBP: "/icons/gbp.png",
  };

  return (
    <Select value={language} onValueChange={setLanguage}>
      <SelectTrigger
        // className="h-10 flex items-center gap-3 backdrop-blur-md hover:backdrop-blur-2xl transform duration-300 cursor-pointer bg-white/10 border-2 border-white/20 px-8 py-4 rounded-3xl font-light text-white leading-8 tracking-[0px] hover:bg-white/10"
        className=" min-h-10 backdrop-blur-md hover:backdrop-blur-xl
               bg-white/10 border border-white/20
              p-2 rounded-xl text-sm text-white
              transition
              font-light hover:bg-transparent hover:text-white cursor-pointer"
      >
        <SelectValue />
      </SelectTrigger>

      <SelectContent className="bg-white text-black">
        <SelectItem value="USD">
          <div className="flex items-center gap-3">
            <img src="/icons/usd.png" className="w-8 h-8 object-contain" />
            USD
          </div>
        </SelectItem>

        <SelectItem value="EUR">
          <div className="flex items-center gap-3">
            <img src="/icons/eur.webp" className="w-8 h-8 object-contain" />
            EUR
          </div>
        </SelectItem>

        <SelectItem value="GBP">
          <div className="flex items-center gap-3">
            <img src="/icons/gbp.png" className="w-8 h-8 object-contain" />
            GBP
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
