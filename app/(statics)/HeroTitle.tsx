// app/statics/HeroTitle.tsx
"use client";

import { useSelectedLayoutSegment } from "next/navigation";

export default function HeroTitle() {
  const segment = useSelectedLayoutSegment();

  const titleMap: Record<string, string> = {
    "frequently-asked-questions": "Frequently Asked Questions",
    "contact-us": "Contact Us",
  };

  const breadcrumbMap: Record<string, string> = {
    "frequently-asked-questions": "Home / FAQ",
    "contact-us": "Home / Contact Us",
  };

  return (
    <>
      <h1 className="font-light text-3xl tracking-[8.25px] text-center mb-7.5">
        {titleMap[segment ?? ""] ?? ""}
      </h1>

      <p className="font-normal text-2xl text-center text-[rgb(200,200,200)]">
        {breadcrumbMap[segment ?? ""] ?? ""}
      </p>
    </>
  );
}
