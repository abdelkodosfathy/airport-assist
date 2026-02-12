// import { Button } from "@/components/ui/button";
// import CarsList from "./cars-list";

// type Props = {};

// const CarsSection = (props: Props) => {
//   return (
//     <div
//       onClick={() => {
//         // onFocus?.();
//       }}
//       style={{
//         boxShadow: "0px 11.48px 114.76px 0px #A7A7A73D",
//       }}
//       className="px-10 py-6 bg-white rounded-2xl"
//     >
//       <h4 className="font-manrope font-medium text-[18.75px] leading-[1.3] tracking-normal">
//         Chauffeur Services
//       </h4>
//       <span className="inline-block w-full h-0.5 bg-[#CFCFCF] mb-0" />
//       <div className="py-2">
//         <CarsList onSelectCar={(e) => console.log(e)} />
//       </div>

//       <Button
//         style={{
//           background:
//             "linear-gradient(179.26deg, #7B5A41 0.64%, #DFB08D 223.79%)",
//           border: "1.26px solid #966B4B",
//         }}
//         className={
//           "cursor-pointer h-7 font-[Manrope] font-normal py-0 px-8 rounded-full mt-2 border-[#966B4B] text-white"
//         }
//       >
//         Add Chauffeur
//       </Button>
//     </div>
//   );
// };

// export default CarsSection;

import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Button } from "@/components/ui/button";
import CarsList from "./cars-list";

// Ref handle type
export type CarsSectionHandle = {
  isValid: () => boolean;
};

type Props = {};

const CarsSection = forwardRef<CarsSectionHandle, Props>((props, ref) => {
  const [selectedCar, setSelectedCar] = useState<number | null>(null);

  // Expose isValid to parent
  useImperativeHandle(ref, () => ({
    isValid: () => {
      // Validation: a car must be selected
      return selectedCar !== null;
    },
  }));

  return (
    <div
      onClick={() => {
        // onFocus?.();
      }}
      style={{
        boxShadow: "0px 11.48px 114.76px 0px #A7A7A73D",
      }}
      className="px-10 py-6 bg-white rounded-2xl"
    >
      <h4 className="font-manrope font-medium text-[18.75px] leading-[1.3] tracking-normal">
        Chauffeur Services
      </h4>
      <span className="inline-block w-full h-0.5 bg-[#CFCFCF] mb-0" />
      <div className="py-2">
        <CarsList
          onSelectCar={(car) => {
            setSelectedCar(car.car_type_id);
          }}
        />
      </div>

      <Button
        style={{
          background:
            "linear-gradient(179.26deg, #7B5A41 0.64%, #DFB08D 223.79%)",
          border: "1.26px solid #966B4B",
        }}
        className="cursor-pointer h-7 font-[Manrope] font-normal py-0 px-8 rounded-full mt-2 border-[#966B4B] text-white"
      >
        Add Chauffeur
      </Button>
    </div>
  );
});

CarsSection.displayName = "CarsSection";

export default CarsSection;
