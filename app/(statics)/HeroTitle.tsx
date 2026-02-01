// app/statics/HeroTitle.tsx
"use client";

import { useSelectedLayoutSegment } from "next/navigation";

export default function HeroTitle() {
  const segment = useSelectedLayoutSegment();

  const titleMap: Record<string, string> = {
    "frequently-asked-questions": "Frequently Asked Questions",
    "contact-us": "Contact Us",
    "private-suite": "Private Suite Services",
  };
  
  const breadcrumbMap: Record<string, string> = {
    "frequently-asked-questions": "Home / FAQ",
    "contact-us": "Home / Contact Us",
    "private-suite": "For the discerning traveller, the Private Suite experience is the ultimate way to travel.",
  };

  return (
    <>
      <h1 className="font-light text-3xl tracking-[8.25px] text-center mb-7.5">
        {titleMap[segment ?? ""] ?? ""}
      </h1>

      <p className="font-[Manrope] text-[21.75px] max-w-250 text-center tracking-[1.09] text-[rgb(200,200,200)]">
        {breadcrumbMap[segment ?? ""] ?? ""}
      </p>
    </>
  );
}
