// "use client";

// import { useEffect } from "react";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Trash2, PlusCircle } from "lucide-react";
// import DateOfBirth from "./DateOfBirth";
// import SelectDropdown from "@/components/custom inputs/SelectList";
// import {
//   useOtherPassengersStore,
//   OtherPassenger,
// } from "@/store/OtherPassengersStore";
// import { usePassengersStore } from "@/store/vipInputsStore"; // adjust path if needed
// import { useFlightFormStore } from "@/store/useFlightFormStore";

// const classesOptions = [
//   { value: "economy", label: "Cabin Economy Class" },
//   { value: "business", label: "Cabin Business Class" },
//   { value: "first", label: "Cabin First Class" },
// ];

// // ─── Main component ──────────────────────────────────────────────────────────

// const OtherPassengersForm = ({ onFocus }: { onFocus?: () => void }) => {
//   const storedAdults = usePassengersStore((state) => state.adults);
//   const storedChildren = usePassengersStore((state) => state.children);

//   const passengers = useOtherPassengersStore((s) => s.passengers);
//   const initPassengers = useOtherPassengersStore((s) => s.initPassengers);
//   const addPassenger = useOtherPassengersStore((s) => s.addPassenger);
//   const removePassenger = useOtherPassengersStore((s) => s.removePassenger);

//   // Seed once: primary takes 1 adult slot, rest are extra
//   useEffect(() => {
//     const extraCount = Math.max(0, storedAdults - 1) + storedChildren;
//     initPassengers(extraCount);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [storedAdults, storedChildren]);

//   if (passengers.length === 0 && storedAdults <= 1 && storedChildren === 0) {
//     return null; // nothing to show
//   }

//   return (
//     <div
//       onClick={() => onFocus?.()}
//       style={{ boxShadow: "0px 11.48px 114.76px 0px #A7A7A73D" }}
//       className="p-5 bg-white rounded-2xl space-y-5"
//     >
//       <div className="flex items-center justify-between">
//         <h4 className="font-manrope font-medium text-[18.75px]">
//           Other Passengers
//         </h4>
//         <Button
//           type="button"
//           variant="ghost"
//           size="sm"
//           onClick={addPassenger}
//           className="flex items-center gap-1.5 text-primary"
//         >
//           <PlusCircle className="w-4 h-4" />
//           Add passenger
//         </Button>
//       </div>

//       <span className="inline-block w-full h-0.5 bg-[#CFCFCF]" />

//       <div className="space-y-6">
//         {passengers.map((passenger, index) => (
//           <PassengerCard
//             isLast={passengers.length === index + 1 }
//             key={passenger.id}
//             passenger={passenger}
//             index={index}
//             onRemove={() => removePassenger(passenger.id)}
//             canRemove={passengers.length > 0}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default OtherPassengersForm;

// // ─── Single passenger card ────────────────────────────────────────────────────

// interface PassengerCardProps {
//   passenger: OtherPassenger;
//   index: number;
//   isLast: boolean;
//   onRemove: () => void;
//   canRemove: boolean;
// }

// const PassengerCard = ({
//   passenger,
//   index,
//   isLast,
//   onRemove,
//   canRemove,
// }: PassengerCardProps) => {
//   const setFirstName = useOtherPassengersStore((s) => s.setFirstName);
//   const setLastName = useOtherPassengersStore((s) => s.setLastName);
//   const setDateOfBirth = useOtherPassengersStore((s) => s.setDateOfBirth);
//   const setClassOfTravel = useOtherPassengersStore((s) => s.setClassOfTravel);

//   const thereIsError = useFlightFormStore((s) => s.validationError);

//   const firstNameError = thereIsError && !passenger.firstName;
//   const lastNameError = thereIsError && !passenger.lastName;

//   return (
//     <div className="space-y-4">
//       {/* Header row */}
//       <div className="flex items-center justify-between">
//         <span className="text-sm font-medium text-muted-foreground">
//           Passenger {index + 2} {/* +2 because passenger 1 is primary */}
//         </span>
//         {canRemove && (
//           <button
//             type="button"
//             onClick={onRemove}
//             className="text-red-400 hover:text-red-600 transition-colors"
//             aria-label={`Remove passenger ${index + 2}`}
//           >
//             <Trash2 className="w-4 h-4" />
//           </button>
//         )}
//       </div>

//       {/* Fields grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
//         {/* First Name */}
//         <div className="space-y-2">
//           <Label className={firstNameError ? "text-red-500" : ""}>
//             First Name{firstNameError && "*"}
//           </Label>
//           <Input
//             value={passenger.firstName ?? ""}
//             onChange={(e) => setFirstName(passenger.id, e.target.value)}
//             placeholder="First Name"
//             className={`bg-[#F4F4F4] ${firstNameError ? "border border-red-500" : ""}`}
//           />
//         </div>

//         {/* Last Name */}
//         <div className="space-y-2">
//           <Label className={lastNameError ? "text-red-500" : ""}>
//             Last Name{lastNameError && "*"}
//           </Label>
//           <Input
//             value={passenger.lastName ?? ""}
//             onChange={(e) => setLastName(passenger.id, e.target.value)}
//             placeholder="Last Name"
//             className={`bg-[#F4F4F4] ${lastNameError ? "border border-red-500" : ""}`}
//           />
//         </div>

//         {/* Date of Birth */}
//         <div className="space-y-2">
//           <Label>Date Of Birth</Label>
//           <DateOfBirth
//             value={passenger.dateOfBirth}
//             onChange={(val) => setDateOfBirth(passenger.id, val)}
//           />
//         </div>

//         {/* Cabin Class */}
//         <div className="space-y-2">
//           <Label>Cabin class</Label>
//           <SelectDropdown
//             value={passenger.classOfTravel}
//             onSelect={(val) => setClassOfTravel(passenger.id, val)}
//             options={classesOptions}
//             className="h-9 rounded-md"
//             inputClassName="rounded-md pl-4 pr-10 bg-[#F4F4F4] border border-[#E0E0E0]"
//           />
//         </div>
//       </div>

//       {/* Divider between passengers */}
//       {isLast ? null : (
//         <span className="inline-block w-full h-0.5 bg-[#CFCFCF]" />
//       )}
//     </div>
//   );
// };

"use client";

import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ChevronUp, ChevronDown } from "lucide-react";
import DateOfBirth from "./DateOfBirth";
import SelectDropdown from "@/components/custom inputs/SelectList";
// import {
//   useOtherPassengersStore,
//   OtherPassenger,
//   OptionType,
// } from ;
import { usePassengersStore } from "@/store/vipInputsStore";
import { useFlightFormStore } from "@/store/useFlightFormStore";
import {
  OptionType,
  OtherPassenger,
  useOtherPassengersStore,
} from "@/store/OtherPassengersStore";
import Optional from "@/components/custom inputs/Optional";

const classesOptions = [
  { value: "economy", label: "Cabin Economy Class" },
  { value: "business", label: "Cabin Business Class" },
  { value: "first", label: "Cabin First Class" },
];

// ─── Main component ──────────────────────────────────────────────────────────

const OtherPassengersForm = ({ onFocus }: { onFocus?: () => void }) => {
  const storedAdults = usePassengersStore((state) => state.adults);
  const storedChildren = usePassengersStore((state) => state.children);

  const passengers = useOtherPassengersStore((s) => s.passengers);
  const initPassengers = useOtherPassengersStore((s) => s.initPassengers);

  const [expanded, setExpanded] = useState(false);

  // Seed once: primary takes 1 adult slot, rest are extra
  useEffect(() => {
    const extraCount = Math.max(0, storedAdults - 1) + storedChildren;
    initPassengers(extraCount);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storedAdults, storedChildren]);

  if (passengers.length === 0 && storedAdults <= 1 && storedChildren === 0) {
    return null;
  }

  return (
    <div
      onClick={() => onFocus?.()}
      className="p-5 shadow-sm bg-white rounded-2xl space-y-5"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h4 className="font-manrope font-medium">
            Other Passengers <Optional />
          </h4>
          {!expanded && passengers.length > 0 && (
            <span className="inline-flex items-center justify-center h-5 min-w-5 px-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold">
              {passengers.length}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
          aria-label={expanded ? "Collapse passengers" : "Expand passengers"}
        >
          {expanded ? (
            <>
              <span>Collapse</span>
              <ChevronUp className="w-4 h-4" />
            </>
          ) : (
            <>
              <span>Expand</span>
              <ChevronDown className="w-4 h-4" />
            </>
          )}
        </button>
      </div>

      {expanded && (
        <>
          <span className="inline-block w-full h-0.5 bg-[#CFCFCF]" />

          <div className="space-y-6">
            {passengers.map((passenger, index) => (
              <PassengerCard
                optional
                key={passenger.id}
                passenger={passenger}
                index={index}
                isLast={passengers.length === index + 1}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default OtherPassengersForm;

// ─── Single passenger card ────────────────────────────────────────────────────

interface PassengerCardProps {
  passenger: OtherPassenger;
  index: number;
  isLast: boolean;
  optional?: boolean;
}

const PassengerCard = ({ passenger, index, isLast, optional }: PassengerCardProps) => {
  const setFirstName = useOtherPassengersStore((s) => s.setFirstName);
  const setLastName = useOtherPassengersStore((s) => s.setLastName);
  const setDateOfBirth = useOtherPassengersStore((s) => s.setDateOfBirth);
  const setClassOfTravel = useOtherPassengersStore((s) => s.setClassOfTravel);

  const thereIsError = useFlightFormStore((s) => s.validationError);

  const firstNameError = !optional && thereIsError && !passenger.firstName;
  const lastNameError = !optional && thereIsError && !passenger.lastName;

  return (
    <div className="space-y-4">
      {/* Header row */}
      <span className="text-sm font-medium text-muted-foreground">
        Passenger {index + 2} {/* +2 because passenger 1 is primary */}
      </span>

      {/* Fields grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
        {/* First Name */}
        <div className="space-y-2">
          <Label className={firstNameError ? "text-red-500" : ""}>
            First Name{firstNameError && "*"}
          </Label>
          <Input
            value={passenger.firstName ?? ""}
            onChange={(e) => setFirstName(passenger.id, e.target.value)}
            placeholder="First Name"
            className={`bg-[#F4F4F4] ${firstNameError ? "border border-red-500" : ""}`}
          />
        </div>

        {/* Last Name */}
        <div className="space-y-2">
          <Label className={lastNameError ? "text-red-500" : ""}>
            Last Name{lastNameError && "*"}
          </Label>
          <Input
            value={passenger.lastName ?? ""}
            onChange={(e) => setLastName(passenger.id, e.target.value)}
            placeholder="Last Name"
            className={`bg-[#F4F4F4] ${lastNameError ? "border border-red-500" : ""}`}
          />
        </div>

        {/* Date of Birth */}
        <div className="space-y-2">
          <Label>Date Of Birth</Label>
          <DateOfBirth
            value={passenger.dateOfBirth}
            onChange={(val) => setDateOfBirth(passenger.id, val)}
          />
        </div>

        {/* Cabin Class */}
        <div className="space-y-2">
          <Label>Cabin class</Label>
          <SelectDropdown
            value={passenger.classOfTravel}
            onSelect={(val: OptionType) => setClassOfTravel(passenger.id, val)}
            options={classesOptions}
            className="h-9 rounded-md"
            inputClassName="rounded-md pl-4 pr-10 bg-[#F4F4F4] border border-[#E0E0E0]"
          />
        </div>
      </div>

      {/* Divider between passengers (skip after last) */}
      {!isLast && <span className="inline-block w-full h-0.5 bg-[#CFCFCF]" />}
    </div>
  );
};
