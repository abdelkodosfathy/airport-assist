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
import FlightForm, {
  FlightFormData,
  FlightFormHandle,
} from "./flight-information";
import PrimaryPassengerForm, {
  PrimaryPassengerData,
} from "./primary-passenger-form";
import { SingleAirport } from "@/lib/types/airport";
import UploadFilesSeciton, {
  UploadFilesData,
  UploadFilesSectionHandle,
} from "./upload-files-section";
import CarsSection from "./cars-section";
import { OptionType } from "@/components/custom inputs/search";

// Define the handle type
export type FlightSectionHandle = {
  isValid: () => boolean;
  getInputs: () => FlightSectionData | null;
};
export type PrimaryPassengerFormHandle = {
  isValid: () => boolean;
  getData: () => PrimaryPassengerData; // لو عملت الinterface
};
export type CarFormHandle = {
  isValid: () => boolean;
  getData: () => number; // لو عملت الinterface
};

export type FlightSectionData = {
  flightFormData: FlightFormData;
  primaryPassengerData: PrimaryPassengerData;
  carsSectionData: number;
  uploadFilesData: UploadFilesData;
};

const FlightSection = forwardRef<
  FlightSectionHandle,
  {
    airportData: SingleAirport;
    withChauffuer: boolean;
    onFastTrackEnabeld: (status: boolean) => void;
    durationCost: (e?: number) => void;
    bagsCost: (e?: number) => void;
  }
>(
  (
    { airportData, withChauffuer, durationCost, bagsCost, onFastTrackEnabeld },
    ref,
  ) => {
    // Create refs for child forms if they have validation functions
    // const flightFormRef = useRef<{ isValid: () => boolean, getData: () => {}}>(null);
    const flightFormRef = useRef<FlightFormHandle>(null);

    const primaryPassengerRef = useRef<PrimaryPassengerFormHandle | null>(null);
    const carsSectionRef = useRef<CarFormHandle>(null);
    const uploadFilesRef = useRef<UploadFilesSectionHandle>(null);

    // Expose the isValid function to parent
    useImperativeHandle(ref, () => ({
      isValid: () => {
        // Call isValid of each child form if exists
        const flightValid = flightFormRef.current?.isValid?.() ?? true;
        const primaryValid = primaryPassengerRef.current?.isValid?.() ?? true;

        const carsValid = withChauffuer
          ? (carsSectionRef.current?.isValid?.() ?? true)
          : true;
        const filesValid = uploadFilesRef.current?.isValid?.() ?? true;

        return flightValid && primaryValid && carsValid && filesValid;
        // return false
      },

      getInputs: (): FlightSectionData | null => {
        if (
          !flightFormRef.current ||
          !primaryPassengerRef.current ||
          !uploadFilesRef.current
        ) {
          return null;
        }

        return {
          flightFormData: flightFormRef.current.getData(),
          primaryPassengerData: primaryPassengerRef.current.getData(),
          carsSectionData: carsSectionRef.current?.getData() ?? 0,
          uploadFilesData: uploadFilesRef.current.getData(),
        };
      },
    }));

    const handleDurationChange = (duration: OptionType) => {
      // console.log(duration);
      durationCost(duration.cost);
    };
    return (
      <div className="flex-2 space-y-4 h-auto">
        <FlightForm
          ref={flightFormRef}
          setDuration={handleDurationChange}
          onEnableFastTrack={onFastTrackEnabeld}
          hourCost={airportData.additional_hour_cost}
          // hourCost={10}
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
          onSelectBags={bagsCost}
        />
        {withChauffuer && <CarsSection ref={carsSectionRef} />}

        <UploadFilesSeciton ref={uploadFilesRef} />
      </div>
    );
  },
);

FlightSection.displayName = "FlightSection";

export default FlightSection;
