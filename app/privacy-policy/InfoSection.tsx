"use client";
import { useState } from "react";

import {
  Section,
  PRIVACY_POLICY,
} from "./sections-data";

export interface InfoSectionProps {
  section: Section;
}

const InfoSection = ({ section }: InfoSectionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mb-8">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="cursor-pointer w-full flex items-center justify-between font-semibold tracking-[2.25px] mb-3 text-left"
      >
        <h3>{section.title}</h3>
        <svg
          className={`w-5 h-5 transition-transform duration-200 ${
            isExpanded ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isExpanded
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          {section.blocks.map((block, index) => {
            if (block.type === "paragraph") {
              return (
                <p
                  key={index}
                  className={`text-sm text-[#6D6D6D] ${index > 0 ? "mt-3" : ""}`}
                >
                  {block.content as string}
                </p>
              );
            }

            if (block.type === "list") {
              return (
                <ul key={index} className="mb-3 list-disc ml-5">
                  {(block.content as string[]).map((item, itemIndex) => (
                    <li key={itemIndex} className="text-sm text-[#6D6D6D]">
                      {item}
                    </li>
                  ))}
                </ul>
              );
            }

            return null;
          })}
        </div>
      </div>
    </div>
  );
};

export type SectionKey =
  "PRIVACY_POLICY";

// Main component
export default function InfoSections({
  selectedSection = "PRIVACY_POLICY",
}: {
  selectedSection?: SectionKey;
}) {
  const sectionsArray: Record<SectionKey, Section[]> = {
    PRIVACY_POLICY: PRIVACY_POLICY,
  };

  return (
    <div className="max-w-4xl p-6">
      {sectionsArray[selectedSection]?.map((section, index) => (
        <InfoSection key={index} section={section} />
      ))}
    </div>
  );
}
