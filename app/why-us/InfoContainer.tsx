"use client";
import { useState, useEffect } from "react";
import InfoSections, { SectionKey } from "./InfoSection";

const menuItems: { label: string; key: SectionKey }[] = [
  { label: "WHY AIRPORT ASSIST", key: "WHY_AIRPORT_ASSIST" },
  { label: "OUR PRICING", key: "OUR_PRICING" },
  { label: "FAQ | VIP MEET & GREET", key: "FAQ_VIP_MEET_and_GREET" },
  { label: "FAQ | PRIVATE SUITE", key: "FAQ_PRIVATE_SUITE" },
  { label: "FAQ | CHAUFFEUR", key: "FAQ_CHAUFFEUR" },
  { label: "FAQ | HOTEL", key: "FAQ_HOTEL" },
  { label: "FAQ | PRIVATE JET", key: "FAQ_PRIVATE_JET" },
];

const InfoContainer = () => {
  const [selectedSection, setSelectedSection] =
    useState<SectionKey>("WHY_AIRPORT_ASSIST");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("faq") === "true") {
      setSelectedSection("FAQ_VIP_MEET_and_GREET");
    }
  }, []);

  // return (
  //   <div className="flex px-10 gap-8 max-w-410 mx-auto">
  //     <div className="flex-1 py-6.5 px-4 h-fit bg-white rounded-xl">
  //       <ul className="*:p-2.5 space-y-1 h-fit">
  //         {menuItems.map((item) => (
  //           <li
  //             key={item.key}
  //             onClick={() => setSelectedSection(item.key)}
  //             className={`rounded-lg hover:bg-[#7B5A4133] cursor-pointer transition-colors ${
  //               selectedSection === item.key ? "bg-[#7B5A4133]" : ""
  //             }`}
  //           >
  //             {item.label}
  //           </li>
  //         ))}
  //       </ul>
  //     </div>
  //     <div className="flex-3 bg-white px-8 py-5 rounded-xl">
  //       <InfoSections selectedSection={selectedSection} />
  //     </div>
  //   </div>
  // );
  return (
    <div className="max-w-[1440px] mx-auto px-5 sm:px-8 xl:px-12">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <aside
          className="
          lg:w-[320px]
          lg:shrink-0

          bg-white
          rounded-2xl

          p-4
          h-fit
        "
        >
          <ul
            className="
            flex
            lg:flex-col

            gap-2

            overflow-x-auto
            lg:overflow-visible

            whitespace-nowrap

            scrollbar-hide
          "
          >
            {menuItems.map((item) => (
              <li
                key={item.key}
                onClick={() => setSelectedSection(item.key)}
                className={`
                px-4
                py-3

                rounded-xl

                cursor-pointer

                transition-all

                text-sm

                ${
                  selectedSection === item.key
                    ? "bg-[#7B5A4133] text-[#7B5A41]"
                    : "hover:bg-[#7B5A4118]"
                }
              `}
              >
                {item.label}
              </li>
            ))}
          </ul>
        </aside>

        {/* Content */}
        <div
          className="
          flex-1

          bg-white

          rounded-2xl

          px-6
          sm:px-8

          py-6
        "
        >
          <InfoSections selectedSection={selectedSection} />
        </div>
      </div>
    </div>
  );
};
export default InfoContainer;
