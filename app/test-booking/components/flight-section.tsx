// import FlightForm from "./flight-information";
// import PrimaryPassengerForm from "./primary-passenger-form";
// import { SingleAirport } from "@/lib/types/airport";
// import UploadFilesSeciton from "./upload-files-section";
// import CarsSection from "./cars-section";

// const FlightSection = ({ airportData }: { airportData: SingleAirport }) => {
//   return (
//     <>
//       <div className="flex-2 space-y-4 h-auto">
//         <FlightForm
//           fastTrackCost={
//             airportData.is_fast_track_active
//               ? airportData.fast_track_cost
//               : "not_active"
//           }
//         />
//         <PrimaryPassengerForm
//           freeBags={airportData.number_of_free_bags}
//           blockCost={airportData.paid_bags_block_cost}
//           blockSize={airportData.paid_bags_block_size}
//         />
//         <CarsSection />
//         <UploadFilesSeciton />
//       </div>
//     </>
//   );
// };

// export default FlightSection;

import React, { forwardRef, useImperativeHandle, useRef } from "react";
import FlightForm from "./flight-information";
import PrimaryPassengerForm from "./primary-passenger-form";
import { SingleAirport } from "@/lib/types/airport";
import UploadFilesSeciton from "./upload-files-section";
import CarsSection from "./cars-section";

// Define the handle type
export type FlightSectionHandle = {
  isValid: () => boolean;
};

const FlightSection = forwardRef<
  FlightSectionHandle,
  { airportData: SingleAirport }
>(({ airportData }, ref) => {
  // Create refs for child forms if they have validation functions
  const flightFormRef = useRef<{ isValid: () => boolean }>(null);
  const primaryPassengerRef = useRef<{ isValid: () => boolean }>(null);
  const carsSectionRef = useRef<{ isValid: () => boolean }>(null);
  const uploadFilesRef = useRef<{ isValid: () => boolean }>(null);

  // Expose the isValid function to parent
  useImperativeHandle(ref, () => ({
    isValid: () => {
      // Call isValid of each child form if exists
      const flightValid = flightFormRef.current?.isValid?.() ?? true;
      const primaryValid = primaryPassengerRef.current?.isValid?.() ?? true;
      const carsValid = carsSectionRef.current?.isValid?.() ?? true;
      const filesValid = uploadFilesRef.current?.isValid?.() ?? true;

      return flightValid && primaryValid && carsValid && filesValid;
      // return false
    },
  }));

  return (
    <div className="flex-2 space-y-4 h-auto">
      <FlightForm
        ref={flightFormRef}
        fastTrackCost={
          airportData.is_fast_track_active
            ? airportData.fast_track_cost
            : "not_active"
        }
      />
      <PrimaryPassengerForm
        ref={primaryPassengerRef}
        freeBags={airportData.number_of_free_bags}
        blockCost={airportData.paid_bags_block_cost}
        blockSize={airportData.paid_bags_block_size}
      />
      <CarsSection 
      ref={carsSectionRef} 
      />
      <UploadFilesSeciton
       ref={uploadFilesRef}
       
       />
    </div>
  );
});

FlightSection.displayName = "FlightSection";

export default FlightSection;
