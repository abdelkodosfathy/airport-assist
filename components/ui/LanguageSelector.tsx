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
  const [language, setLanguage] = useState("EN");

  return (
    <Select
      value={language}
      onValueChange={setLanguage}
    >
      <SelectTrigger 
       className="min-h-16 backdrop-blur-md hover:backdrop-blur-2xl transform duration-300 cursor-pointer bg-white/10 border-2 border-white/20 px-8 py-4 rounded-3xl font-light text-xl leading-8 tracking-[0px] hover:bg-white/10"
      >
        <SelectValue placeholder="EN" />
      </SelectTrigger>
      <SelectContent className="bg-white text-black">
        <SelectItem value="EN">EN</SelectItem>
        <SelectItem value="RU">RU</SelectItem>
      </SelectContent>
    </Select>
  );
}
