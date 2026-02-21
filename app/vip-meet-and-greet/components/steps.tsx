// import { useEffect, useRef } from "react";
// import { gsap } from "gsap";

// const Steps = ({
//   currentStep = 0,
//   withoutChauffuer = false,
// }: {
//   withoutChauffuer?: boolean;
//   currentStep: number;
// }) => {
//   const chauffeurRef = useRef<HTMLLIElement>(null);
//   const prevIsEliteRef = useRef(withoutChauffuer);

//   const steps = [
//     "Choose Service",
//     "Flight Information",
//     "Primary passenger",
//     "Chauffeur Services",
//     "Additional Services",
//     "Billing Information",
//   ];

//   useEffect(() => {
//     if (chauffeurRef.current) {
//       const wasElite = prevIsEliteRef.current;
//       const isNowElite = withoutChauffuer;

//       // Hiding animation (when becoming elite)
//       if (!wasElite && isNowElite) {
//         gsap.to(chauffeurRef.current, {
//           height: 0,
//           opacity: 0,
//           //   padding: 0,
//           //     marginTop: 0,
//           //     marginBottom: 0,
//           duration: 0.4,
//           ease: "power2.inOut",
//         });
//       }
//       // Showing animation (when no longer elite)
//       else if (wasElite && !isNowElite) {
//         gsap.fromTo(
//           chauffeurRef.current,
//           {
//             height: 0,
//             opacity: 0,
//             // marginTop: 0,
//             // padding: 0,
//             // marginBottom: 0,
//           },
//           {
//             height: "auto",
//             opacity: 1,
//             // marginTop: '0.5rem',
//             // padding: "0.5rem",
//             // marginBottom: '0.5rem',
//             duration: 0.4,
//             ease: "power2.inOut",
//           },
//         );
//       }
//       // Initial state
//       else if (withoutChauffuer) {
//         gsap.set(chauffeurRef.current, {
//           height: 0,
//           opacity: 0,
//           //   marginTop: 0,
//           //   marginBottom: 0,
//           //   padding: 0,
//         });
//       }

//       prevIsEliteRef.current = withoutChauffuer;
//     }
//   }, [withoutChauffuer]);

//   return (
//     <div className="bg-white rounded-2xl p-5">
//       <h4 className="font-[Manrope] font-semibold">Steps</h4>
//       <ul className="mt-2">
//         {steps.map((step, i) => {
//           const isChauffeur = step === "Chauffeur Services";
//           const displayIndex = withoutChauffuer && i > 3 ? i - 1 : i;

//           return (
//             <li
//               key={step}
//               ref={isChauffeur ? chauffeurRef : null}
//               className={` flex items-center ${
//                 displayIndex === currentStep ? "bg-[#7B5A4133]" : ""
//               } rounded-md overflow-hidden`}
//               style={isChauffeur ? { transformOrigin: "top" } : undefined}
//             >
//               <p className="leading-[250%] flex items-center px-2">
//                 <span
//                   className={`leading-normal inline-block text-center rounded-full w-6 h-6 mr-2 ${
//                     displayIndex === currentStep
//                       ? "bg-[#7B5A41] text-white"
//                       : "bg-[#F4F4F4] text-[#7a7a7a]"
//                   }`}
//                 >
//                   {displayIndex + 1}
//                 </span>
//                 {step}
//               </p>
//             </li>
//           );
//         })}
//       </ul>
//     </div>
//   );
// };

// export default Steps;

import { ChevronRight } from "lucide-react";
import { currentPage } from "../page";
import React from "react";

type StepItem = {
  label: string;
};

const steps: StepItem[] = [
  { label: "Choose Service" },
  { label: "Passenger & Service Details" },
  { label: "Billing Details" },
  { label: "Review & Payment" },
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
  // console.log(steps);
  return (
    <div className="bg-white rounded-2xl shadow-xs p-5 mb-4">
      {/* <h4 className="font-[Manrope] font-semibold">Steps</h4> */}

      <ul className="mt-4 space-y-2 flex justify-between items-center">
        {steps.map((step, i) => {
          const isActive = i === currentStep;
          const isCompleted = i < currentStep;
          // console.log(step.label);

          return (
            <React.Fragment key={step.label}>
              <li
                key={step.label}
                className={`flex items-center rounded-md transition-all duration-300 ${
                  isActive ? "bg-[#7B5A4133]" : ""
                }`}
              >
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
              </li>
              {i !== 3 && (
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
