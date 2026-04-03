import { ChevronRight } from "lucide-react";
import { currentPage } from "../page";
import React from "react";
import Link from "next/link";

type StepItem = {
  label: string;
  link: string;
};

const steps: StepItem[] = [
  { label: "Choose Service", link: "/vip-meet-and-greet" },
  {
    label: "Passenger & Service Details",
    link: "/vip-meet-and-greet/passenger-details",
  },
  {
    label: "Billing Details",
    link: "/vip-meet-and-greet/billing-info",
  },
  {
    label: "Review & Payment",
    link: "/vip-meet-and-greet/summry",
  },
];

const Steps = ({ currentPage = "packages" }: { currentPage: currentPage }) => {
  const getCurrentStep = () => {
    switch (currentPage) {
      case "packages":
        return 0;
      case "flight":
        return 1;
      case "billing":
        return 2;
      case "summry":
        return 3;
    }
  };
  const currentStep = getCurrentStep();

  return (
    <div className="bg-white rounded-2xl shadow-xs p-5 mb-4">
      <ul className="mt-4 space-y-2 flex justify-between items-center">
        {steps.map((step, i) => {
          const isActive = i === currentStep;
          const isCompleted = i < currentStep;
          const isClickable = isCompleted;

          const content = (
            <p className="leading-[250%] flex items-center px-2">
              <span
                className={`
                  inline-flex items-center justify-center
                  w-6 h-6 mr-2 text-sm font-medium
                  rounded-full transition-all duration-300
                  ${
                    isCompleted
                      ? "bg-[#7B5A41] text-white"
                      : isActive
                        ? "bg-[#7B5A41] text-white"
                        : "bg-[#F4F4F4] text-[#7a7a7a]"
                  }
                `}
              >
                {isCompleted ? "✓" : i + 1}
              </span>

              <span
                className={`transition-colors duration-300 ${
                  isCompleted
                    ? "text-[#7B5A41] font-medium"
                    : isActive
                      ? "text-black font-medium"
                      : "text-[#7a7a7a]"
                }`}
              >
                {step.label}
              </span>
            </p>
          );

          return (
            <React.Fragment key={step.label}>
              <li
                className={`flex items-center rounded-md transition-all duration-300 ${
                  isActive ? "bg-[#7B5A4133]" : ""
                } ${isClickable ? "cursor-pointer hover:bg-[#7B5A4120]" : ""}`}
              >
                {isClickable ? (
                  <Link href={step.link}>{content}</Link>
                ) : (
                  content
                )}
              </li>
              {i !== steps.length - 1 && (
                <li key={`arrow-${step.label}`}>
                  <ChevronRight color="#7B5A41" />
                </li>
              )}
            </React.Fragment>
          );
        })}
      </ul>
    </div>
  );
};

export default Steps;