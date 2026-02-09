"use client";
import { useState } from "react";
import InfoSections, { SectionKey } from "./InfoSection";

const menuItems: { label: string; key: SectionKey }[] = [
  { label: "WHY AIRPORT ASSIST", key: "WHY_AIRPORT_ASSIST" },
  { label: "OUR PRICING", key: "OUR_PRICING" },
  { label: "VIP MEET & GREET", key: "FAQ_VIP_MEET_and_GREET" },
  { label: "PRIVATE SUITE", key: "FAQ_PRIVATE_SUITE" },
  { label: "CHAUFFEUR", key: "FAQ_CHAUFFEUR" },
  { label: "HOTEL", key: "FAQ_HOTEL" },
  { label: "PRIVATE JET", key: "FAQ_PRIVATE_JET" },
];

const InfoContainer = () => {
  const [selectedSection, setSelectedSection] =
    useState<SectionKey>("WHY_AIRPORT_ASSIST");

  return (
    <div className="flex px-10 gap-8 max-w-410 mx-auto">
      <div className="flex-1 py-6.5 px-4 h-fit bg-white rounded-xl">
        <ul className="*:p-2.5 space-y-1 h-fit">
          {menuItems.map((item) => (
            <li
              key={item.key}
              onClick={() => setSelectedSection(item.key)}
              className={`rounded-lg hover:bg-[#7B5A4133] cursor-pointer transition-colors ${
                selectedSection === item.key ? "bg-[#7B5A4133]" : ""
              }`}
            >
              {item.label}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-3 bg-white px-8 py-5 rounded-xl">
        <InfoSections selectedSection={selectedSection} />
      </div>
    </div>
  );
};
export default InfoContainer;
