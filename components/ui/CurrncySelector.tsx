"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CurrncySelector() {
  const [language, setLanguage] = useState("USD");

  return (
    <Select value={language} onValueChange={setLanguage}>
      <SelectTrigger
        className="
      min-h-[49px]
      backdrop-blur-md hover:backdrop-blur-xl
      bg-white/10 border border-white/20
      px-3 py-2
      rounded-[18px]
      text-white font-light
      transition cursor-pointer
    "
      >
        <SelectValue />
      </SelectTrigger>

      <SelectContent
        side="bottom" // هيتأكد إنه يفتح تحت العنصر
        align="start" // يبدأ من أول الـ trigger
        className="bg-white text-black mt-12" // mt-1 يعطي مسافة بسيطة
      >
        {/* USD */}
        <SelectItem value="USD">
          <div className="flex items-center gap-[9px]">
            <img
              src="/icons/usd.png"
              className="w-[22px] h-[22px] rounded-full object-cover"
            />
            <p className="font-[Nunito] font-medium text-[14.74px] leading-[140%] tracking-[0.05em] text-center">
              USD
            </p>
          </div>
        </SelectItem>

        {/* EUR */}
        <SelectItem value="EUR">
          <div className="flex items-center gap-3">
            <img
              src="/icons/eur.webp"
              className="w-[22px] h-[22px] rounded-full object-cover"
            />
            <p className="font-[Nunito] font-medium text-[14.74px] leading-[140%] tracking-[0.05em]">
              EUR
            </p>
          </div>
        </SelectItem>

        {/* GBP */}
        <SelectItem value="GBP">
          <div className="flex items-center gap-3">
            <img
              src="/icons/gbp.png"
              className="w-[22px] h-[22px] rounded-full object-cover"
            />
            <p className="font-[Nunito] font-medium text-[14.74px] leading-[140%] tracking-[0.05em]">
              GBP
            </p>
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
