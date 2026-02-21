// "use client";

// import { OptionType } from "@/components/custom inputs/search";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import CustomPhoneInput from "@/components/ui/phone-input";
// import { Textarea } from "@/components/ui/textarea";
// import DateOfBirth from "./DateOfBirth";
// import SelectDropdown from "@/components/custom inputs/SelectList";
// import { useCurrency } from "@/lib/hooks/useCurrency";

// interface StepsProps {
//   onFocus?: () => void;

//   freeBags: number;
//   blockCost: number;
//   blockSize: number;
// }

// export interface PrimaryPassenger {
//   number_of_pages?: string;
// }

// const PrimaryPassengerForm = ({
//   onFocus,
//   freeBags,
//   blockCost,
//   blockSize,
// }: StepsProps) => {
//   const classesOptions = [
//     { value: "economy", label: "economy" },
//     { value: "business", label: "business" },
//     { value: "first", label: "first" },
//   ];

//   const { currency } = useCurrency();

//   // block color #eaeaea
//   const buildBagsOptions = (maxBags: number = 12) => {
//     const options: OptionType[] = [];

//     for (let i = 1; i <= maxBags; i++) {
//       let label = "";
//       let color: string | undefined;

//       if (i <= freeBags) {
//         label = `${i} bag${i > 1 ? "s" : ""} (free)`;
//         color = undefined; // free بدون لون
//       } else {
//         const extraBags = i - freeBags;

//         const blocks = Math.ceil(extraBags / blockSize);
//         const totalCost = blocks * blockCost;

//         label = `${i} bag${i > 1 ? "s" : ""} (+${totalCost} ${currency})`;

//         // كل بلوك له لون (نفس اللون لنفس البلوك)
//         color = blocks % 2 === 1 ? "bg-gray-100" : "";
//       }

//       options.push({
//         value: i.toString(),
//         label,
//         color,
//       });
//     }

//     return options;
//   };

//   const bagsOptions = buildBagsOptions();
//   return (
//     <div
//       onClick={() => onFocus?.()}
//       style={{
//         boxShadow: "0px 11.48px 114.76px 0px #A7A7A73D",
//       }}
//       className="px-10 py-6 bg-white rounded-2xl"
//     >
//       <h4 className="font-manrope font-medium text-[18.75px]">
//         Primary passenger
//       </h4>
//       <span className="inline-block w-full h-0.5 bg-[#CFCFCF]" />

//       <div className="mt-4 w-full">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6 w-full">
//           {/* First Name */}
//           <div className="space-y-2">
//             <Label>First Name</Label>
//             <Input placeholder="First Name" className="bg-[#F4F4F4]" />
//           </div>

//           {/* Last Name */}
//           <div className="space-y-2">
//             <Label>Last Name</Label>
//             <Input placeholder="Last Name" className="bg-[#F4F4F4]" />
//           </div>

//           {/* DOB */}
//           <div className="space-y-2">
//             <Label>Date of birth</Label>
//             <DateOfBirth />
//           </div>

//           {/* Travel Class */}
//           <div className="space-y-2">
//             <Label>Class of travel</Label>
//             <SelectDropdown
//               options={classesOptions}
//               className="h-9 rounded-md"
//               inputClassName="rounded-md pl-4 pr-10 bg-[#F4F4F4] border border-[#E0E0E0]"
//             />
//           </div>

//           {/* Email */}
//           <div className="space-y-2">
//             <Label>Email</Label>
//             <Input placeholder="Email address" className="bg-[#F4F4F4]" />
//           </div>

//           {/* Phone */}
//           <div className="space-y-2">
//             <Label>Phone</Label>
//             <CustomPhoneInput radius="7px" />
//           </div>

//           {/* Number of pages */}
//           <div className="space-y-2 md:col-span-2">
//             <Label>Number Of bags</Label>
//             <SelectDropdown
//               options={bagsOptions}
//               className="h-9 rounded-md"
//               inputClassName="rounded-md pl-4 pr-10 bg-[#F4F4F4] border border-[#E0E0E0]"
//             />
//           </div>

//           {/* Other passengers */}
//           <div className="space-y-2 md:col-span-2">
//             <Label>
//               Other passengers Information{" "}
//               <span className="text-sm text-muted-foreground">(optional)</span>
//             </Label>
//             <Textarea
//               placeholder="Passengers Information"
//               className="bg-[#F4F4F4]"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PrimaryPassengerForm;

"use client";

import React, { forwardRef, useImperativeHandle, useState } from "react";
import { OptionType } from "@/components/custom inputs/search";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CustomPhoneInput from "@/components/ui/phone-input";
import { Textarea } from "@/components/ui/textarea";
import DateOfBirth from "./DateOfBirth";
import SelectDropdown from "@/components/custom inputs/SelectList";
import { useCurrency } from "@/lib/hooks/useCurrency";
import { BagsInput } from "./bags-input";

export interface PrimaryPassengerData {
  firstName: string;
  lastName: string;
  dateOfBirth: string | null;
  travelClass: string | null;
  email: string;
  phone: string;
  numberOfBags: number;
  bagsCost: number;
  otherPassengersInfo: string;
}

interface StepsProps {
  onFocus?: () => void;
  freeBags: number;
  blockCost: number;
  blockSize: number;
  onSelectBags: ({
    bagsNumber,
    cost,
  }: {
    bagsNumber: number;
    cost: number;
  }) => void;
}

export interface PrimaryPassenger {
  number_of_pages?: string;
}

// Define the ref handle type
export type PrimaryPassengerFormHandle = {
  isValid: () => boolean;
};

const PrimaryPassengerForm = forwardRef<PrimaryPassengerFormHandle, StepsProps>(
  ({ onFocus, freeBags, blockCost, blockSize, onSelectBags }, ref) => {
    const { currency } = useCurrency();

    const classesOptions = [
      { value: "economy", label: "Economy" },
      { value: "business", label: "Business" },
      { value: "first", label: "First" },
    ];

    // Form state
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [dob, setDob] = useState<string | null>(null);
    const [travelClass, setTravelClass] = useState<OptionType | null>(null);
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    // const [bags, setBags] = useState<OptionType | null>(null);
    const [otherInfo, setOtherInfo] = useState("");

    // const [bags, setBags] = useState(0);
    // const [bagsCost, setBagsCost] = useState(0);

    // Track validation errors
    const [validationErrors, setValidationErrors] = useState<{
      firstName?: boolean;
      lastName?: boolean;
      dob?: boolean;
      travelClass?: boolean;
      email?: boolean;
      phone?: boolean;
      bags?: boolean;
    }>({});

    // Bags options with color
    // const buildBagsOptions = (maxBags: number = 12) => {
    //   const options: OptionType[] = [];
    //   for (let i = 1; i <= maxBags; i++) {
    //     let label = "";
    //     let color: string | undefined;
    //     let cost = 0;
    //     if (i <= freeBags) {
    //       label = `${i} bag${i > 1 ? "s" : ""} (free)`;
    //       color = undefined;
    //     } else {
    //       const extraBags = i - freeBags;
    //       const blocks = Math.ceil(extraBags / blockSize);
    //       const totalCost = blocks * blockCost;
    //       cost = totalCost;
    //       label = `${i} bag${i > 1 ? "s" : ""} (+${totalCost} ${currency})`;
    //       color = blocks % 2 === 1 ? "bg-gray-100" : "";
    //     }

    //     options.push({
    //       value: i.toString(),
    //       label,
    //       color,
    //       cost,
    //     });
    //   }
    //   return options;
    // };

    // const bagsOptions = buildBagsOptions();

    const validateInputs = () => {
      const errors: typeof validationErrors = {};

      if (!firstName.trim()) errors.firstName = true;
      if (!lastName.trim()) errors.lastName = true;
      if (!dob) errors.dob = true;
      if (!travelClass) errors.travelClass = true;
      if (!email.trim()) errors.email = true;
      if (!phone.trim()) errors.phone = true;
      // if (!bags) errors.bags = true;

      setValidationErrors(errors);

      return Object.keys(errors).length === 0;
    };

    // Expose isValid to parent
    useImperativeHandle(ref, () => ({
      isValid: () => {
        return validateInputs();
      },

      getData: (): PrimaryPassengerData => {
        return {
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          dateOfBirth: dob,
          travelClass: travelClass?.value || null,
          email: email.trim(),
          phone,
          // numberOfBags: bags ? Number(bags.value) : 0,
          numberOfBags: 0,
          // bagsCost: bags?.cost || 0,
          bagsCost: 0,
          otherPassengersInfo: otherInfo.trim(),
        };
      },
    }));

    return (
      <div
        onClick={() => onFocus?.()}
        style={{
          boxShadow: "0px 11.48px 114.76px 0px #A7A7A73D",
        }}
        className="px-10 py-6 bg-white rounded-2xl"
      >
        <h4 className="font-manrope font-medium text-[18.75px]">
          Primary Passenger
        </h4>
        <span className="inline-block w-full h-0.5 bg-[#CFCFCF]" />

        <div className="mt-4 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6 w-full">
            {/* First Name */}
            <div className="space-y-2">
              <Label
                className={validationErrors.firstName ? "text-red-500" : ""}
              >
                First Name {validationErrors?.firstName && "*"}
              </Label>
              <Input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
                className={`bg-[#F4F4F4] ${
                  validationErrors.firstName ? "border-red-500 border" : ""
                }`}
              />
            </div>
            {/* Last Name */}
            <div className="space-y-2">
              <Label
                className={validationErrors.lastName ? "text-red-500" : ""}
              >
                Last Name {validationErrors?.lastName && "*"}
              </Label>
              <Input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
                className={`bg-[#F4F4F4] ${
                  validationErrors.lastName ? "border-red-500 border" : ""
                }`}
              />
            </div>
            {/* DOB */}
            <div className="space-y-2">
              <Label className={validationErrors.dob ? "text-red-500" : ""}>
                Date of birth {validationErrors?.dob && "*"}
              </Label>
              <DateOfBirth
                onChange={setDob}
                value={dob}
                className={validationErrors.dob ? "border-red-500 border" : ""}
              />
            </div>
            {/* Travel Class */}
            <div className="space-y-2">
              <Label
                className={validationErrors.travelClass ? "text-red-500" : ""}
              >
                Class of travel {validationErrors?.travelClass && "*"}
              </Label>
              <SelectDropdown
                value={travelClass}
                onSelect={setTravelClass}
                options={classesOptions}
                className="h-9 rounded-md"
                inputClassName={`rounded-md pl-4 pr-10 bg-[#F4F4F4] border ${
                  validationErrors.travelClass
                    ? "border-red-500"
                    : "border-[#E0E0E0]"
                }`}
              />
            </div>
            {/* Email */}
            <div className="space-y-2">
              <Label className={validationErrors.email ? "text-red-500" : ""}>
                Email {validationErrors?.email && "*"}
              </Label>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className={`bg-[#F4F4F4] ${
                  validationErrors.email ? "border-red-500 border" : ""
                }`}
              />
            </div>
            {/* Phone */}
            <div className="space-y-2">
              <Label className={validationErrors.phone ? "text-red-500" : ""}>
                Phone {validationErrors?.phone && "*"}
              </Label>
              <CustomPhoneInput
                className="h-9 rounded-md"
                radius="7px"
                value={phone}
                onChange={setPhone}
                validationClass={validationErrors.phone}
              />
            </div>
            {/* Number of bags */}
            {/* <div className="space-y-2 md:col-span-2">
              <Label className={validationErrors.bags ? "text-red-500" : ""}>
                Number Of bags {validationErrors?.bags && "*"}
              </Label>
              <SelectDropdown
                options={bagsOptions}
                value={bags}
                onSelect={(e) => {
                  setBags(e);
                  onSelectBags(e);
                }}
                className="h-9 rounded-md"
                inputClassName={`rounded-md pl-4 pr-10 bg-[#F4F4F4] border ${
                  validationErrors.bags ? "border-red-500" : "border-[#E0E0E0]"
                }`}
              />
            </div> */}
            <span className="inline-block col-span-2 h-0.5 bg-[#CFCFCF]" />

            <BagsInput
              // title="Number Of Bags"
              // value={bags}
              freeBags={freeBags}
              blockSize={blockSize}
              blockCost={blockCost}
              currency={currency}
              onChange={(bagsNumber, cost) => {
                // setBags(value);
                // setBagsCost(cost);
                onSelectBags({
                  bagsNumber,
                  cost,
                });
              }}
            />
            {/* Other passengers */}
            <div className="space-y-2 md:col-span-2">
              <Label>
                Other passengers Information{" "}
                <span className="text-sm text-muted-foreground">
                  (optional)
                </span>
              </Label>
              <Textarea
                value={otherInfo}
                onChange={(e) => setOtherInfo(e.target.value)}
                placeholder="Passengers Information"
                className="bg-[#F4F4F4]"
              />
            </div>
          </div>
        </div>
      </div>
    );
  },
);

PrimaryPassengerForm.displayName = "PrimaryPassengerForm";

export default PrimaryPassengerForm;
