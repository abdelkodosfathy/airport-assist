"use client";

import MeetAndGreet from "@/components/custom icons/meetAndGreet";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import Separator from "@/components/ui/formSeparator";
import InnerToast from "@/components/ui/InnerToast";
import DatePickerInput from "@/components/custom inputs/DatePickerInputs";
import TimePickerInput from "@/components/custom inputs/TimePicker";
import PickUpPoints from "./routesCalculator";
import FlightInputs from "./FlightInputs";
import CardPicker from "./CardPicker";
import NumberInput from "./NumberInputs";
import { useTripStore } from "@/store/tripStore";
import TripTypeRow from "./TripTypeRow";
import ChauffeurBillingSection from "./chauffeur-billing-section";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import SubmitButton from "./SubmitButton";
import { TripBasedInputs } from "./TripBasedInputs";

const Pickup = () => {
  return (
    <div className="flex-2 h-full">
      <TripTypeRow />
      <InnerToast text="One-way is a professional chauffeur service from point A to point B." />
      <div className="flex gap-4 ">
        <PickupForm />
        <CardPicker />
      </div>
    </div>
  );
};

export default Pickup;

const PickupForm = () => {
  return (
    <div className=" max-w-6/11 h-full w-full flex flex-col gap-4">
      <div className="shadow-md px-4.5 py-5 bg-white rounded-2xl ">
        <div className="mb-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full ">
            <PickUpPoints />
            <div className="relative space-y-2 col-span-1">
              <DatePickerInput
                className="bg-[#F4F4F4] border border-[#E0E0E0] rounded-lg h-full"
                inputClassName="px-10 h-11.25 bg-[#F4F4F4] border-none w-full rounded-lg"
              />
            </div>
            <div className="space-y-2 col-span-1">
              <TimePickerInput
                className="bg-[#F4F4F4] border border-[#E0E0E0] rounded-lg h-full"
                inputClassName="px-10 h-11.25 bg-[#F4F4F4] border-none w-full rounded-lg"
              />
            </div>
          </div>
        </div>

        <Separator />

        <TripBasedInputs />
        <Separator />
        <PassengersRow />
        <Separator />
        <div>
          <MeetAndGreetRow />
          <AdditionalRequirementsRow />
        </div>
      </div>
      <ChauffeurBillingSection />
      <SubmitButton />
    </div>
  );
};

// const TripBasedInputs = () => {
//   const tripType = useTripStore((state) => state.tripType);
//   const hoursValue = useTripStore((state) => state.hours);
//   const setHoursValue = useTripStore((state) => state.set_hours);
//   const [isMultiDay, setIsMultiDay] = useState(false);

//   return (
//     <>
//       {tripType === "hourly" ? (
//         <div className="mb-2 mt-4">
//           <div className="flex justify-between">
//             <NumberInput
//               min={4}
//               onIncrement={() => setHoursValue(hoursValue + 1)}
//               onDecrement={() =>
//                 setHoursValue(Math.max(4, (hoursValue ?? 0) - 1))
//               }
//               onChangeValue={(e) => setHoursValue(Math.max(4, e))}
//               value={hoursValue ?? 0}
//               title="hours"
//             />
//           </div>
//           <div className="my-2">
//             <InnerToast text="with 40 miles included in the booking price. Any additional mileage will be charged at £4 per mile after the service." />
//           </div>

//           <Separator />

//           {/* Multi-day checkbox */}
//           <label className="flex items-center my-2 gap-4 cursor-pointer p-3 bg-[#FFFBEF] px-4 py-3 rounded-lg border border-[#7B5A414D] text-[#7B5A41] transition-colors">
//             <Checkbox
//               id="multiDay"
//               checked={isMultiDay}
//               onCheckedChange={(v) => setIsMultiDay(v === true)}
//               className="w-6 h-6 rounded-md shadow-none border-[#7B5A414D] bg-[#FFFBEF] data-[state=checked]:bg-[#7B5A41] data-[state=checked]:border-[#7B5A41]"
//             />
//             <span className="text-sm font-medium">
//               Will you use this service for multiple days?
//             </span>
//           </label>

//           {/* Animated endup section */}
//           <div
//             className={[
//               " transition-all duration-350 ease-[cubic-bezier(0.4,0,0.2,1)]",
//               isMultiDay ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0",
//             ].join(" ")}
//           >
//             {/* <Separator /> */}
//             <p className="font-semibold capitalize">Day one:</p>
//             <div className="grid grid-cols-2 gap-2 my-2">
//               <div className="relative space-y-2 col-span-1">
//                 <DatePickerInput
//                   className="bg-[#F4F4F4] border border-[#E0E0E0] rounded-lg h-full"
//                   inputClassName="px-10 h-11.25 bg-[#F4F4F4] border-none w-full rounded-lg"
//                 />
//               </div>
//               <div className="space-y-2 col-span-1">
//                 <TimePickerInput
//                   className="bg-[#F4F4F4] border border-[#E0E0E0] rounded-lg h-full"
//                   inputClassName="px-10 h-11.25 bg-[#F4F4F4] border-none w-full rounded-lg"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <div className="my-2">
//           <h3 className="mb-2 font-semibold">Flight</h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6 w-full">
//             <FlightInputs />
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

const PassengersRow = () => {
  const car = useTripStore((state) => state.car);
  const passengersValue = useTripStore((state) => state.passengers);
  const luggageValue = useTripStore((state) => state.luggage);

  const setPassengersValue = useTripStore((state) => state.set_passengers);
  const setLuggageValue = useTripStore((state) => state.set_luggage);

  const maxPassengers = car?.passengers_capacity ?? Infinity;
  const maxLuggage = car?.baggage_capacity ?? Infinity;

  useEffect(() => {
    if (car && luggageValue > maxLuggage) {
      toast.warning(`This car fits a maximum of ${maxLuggage} bags`, {
        position: "top-center",
      });
      setLuggageValue(maxLuggage);
    }
    if (car && passengersValue > maxPassengers) {
      toast.warning(`This car fits a maximum of ${maxPassengers} passengers`, {
        position: "top-center",
      });
      setPassengersValue(maxPassengers);
    }
  }, [car]);

  return (
    <div className="grid grid-cols-2 gap-6 mt-3">
      <NumberInput
        min={1}
        onIncrement={() => {
          if (passengersValue < maxPassengers) {
            setPassengersValue(passengersValue + 1);
          } else {
            toast.warning(
              `This car fits a maximum of ${maxPassengers} passengers`,
              {
                position: "top-center",
              },
            );
          }
        }}
        onDecrement={() => {
          setPassengersValue(Math.max(1, (passengersValue ?? 0) - 1));
        }}
        onChangeValue={(e) => {
          setPassengersValue(e);
        }}
        value={passengersValue}
        title="passengers"
      />
      <NumberInput
        onIncrement={() => {
          if (luggageValue < maxLuggage) {
            setLuggageValue(luggageValue + 1);
          } else {
            toast.warning(`This car fits a maximum of ${maxLuggage} bags`, {
              position: "top-center",
            });
          }
        }}
        onDecrement={() => {
          setLuggageValue(Math.max(0, (luggageValue ?? 0) - 1));
        }}
        onChangeValue={(e) => {
          setLuggageValue(e);
        }}
        value={luggageValue}
        title="luggage"
      />
    </div>
  );
};

const MeetAndGreetRow = () => {
  const isChecked = useTripStore((s) => s.meetAndGreet);
  const setIsChecked = useTripStore((s) => s.set_meetAndGreet);

  return (
    <div className="flex justify-between p-4 items-center bg-[#F2F3F5] rounded-md my-4">
      <p className="flex gap-2 text-lg items-center">
        <MeetAndGreet />
        Airport Meet & greet service
      </p>
      <Switch
        checked={isChecked}
        onCheckedChange={setIsChecked}
        className="scale-110 data-[state=checked]:bg-[#7B5A41]"
      />
    </div>
  );
};

const AdditionalRequirementsRow = () => {
  const additionalRequirements = useTripStore((s) => s.additionalRequirements);
  const setAdditionalRequirements = useTripStore(
    (s) => s.setAdditionalRequirements,
  );

  return (
    <>
      <h3 className="font-semibold mb-2">
        Additional requirements{" "}
        <span className="text-sm font-light text-[#7A7A7A]">(optional)</span>
      </h3>
      <Textarea
        placeholder="Any Special Notes"
        value={additionalRequirements ?? ""}
        onChange={(e) => setAdditionalRequirements(e.target.value)}
        className="pl-4 pr-10 bg-[#F4F4F4] border border-[#E0E0E0]"
      />
    </>
  );
};
