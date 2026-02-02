// import SearchWithDropdown from "@/components/custom inputs/search";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import DateOfBirth from "./DateOfBirth";
// import CustomPhoneInput from "@/components/ui/phone-input";
// import { Textarea } from "@/components/ui/textarea";
// interface StepsProps {
//   onFocus?: () => void;
// }

// const PrimaryPassengerForm = ({ onFocus }: StepsProps) => {
//   return (
//     <div
//       onClick={() => {
//         onFocus?.();
//       }}
//       style={{
//         boxShadow: "0px 11.48px 114.76px 0px #A7A7A73D",
//       }}
//       className="px-10 py-6 bg-white rounded-2xl"
//     >
//       <h4 className="font-manrope font-medium text-[18.75px] leading-[1.3] tracking-normal">
//         Primary passenger
//       </h4>
//       <span className="inline-block w-full h-0.5 bg-[#CFCFCF]" />

//       <div className="mt-4 w-full">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6 w-full">
//           <div className="space-y-2">
//             <Label htmlFor="firstName">First Name</Label>
//             <SearchWithDropdown
//               className="h-9 rounded-md"
//               id="firstName"
//               inputClassName="rounded-md pl-4 pr-10 bg-[#F4F4F4] border border-[#E0E0E0]"
//               placeholder="First Name"
//             />
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="lastName">Last Name</Label>
//             <Input
//               id="lastName"
//               placeholder="Last Name"
//               className="pl-4 pr-10 bg-[#F4F4F4] border border-[#E0E0E0]"
//             />
//           </div>
//           <div className="space-y-2">
//             <Label htmlFor="dob">Date of birth</Label>
//             <DateOfBirth />
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="travelClass">Class of travel</Label>
//             <Input
//               id="travelClass"
//               placeholder="Select"
//               className="pl-4 pr-10 bg-[#F4F4F4] border border-[#E0E0E0]"
//             />
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="email">Email</Label>
//             <Input
//               id="email"
//               placeholder="Email address"
//               className="pl-4 pr-10 bg-[#F4F4F4] border border-[#E0E0E0]"
//             />
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="phone">Phone</Label>
//             <CustomPhoneInput className="h-9 rounded-md" radius="7px" />
//           </div>

//           {/* Full width */}
//           <div className="space-y-2 md:col-span-2">
//             <Label htmlFor="pages">Number Of Pages</Label>
//             <Input
//               id="pages"
//               placeholder="Number Of Pages"
//               className="pl-4 pr-10 bg-[#F4F4F4] border border-[#E0E0E0]"
//             />
//           </div>

//           <div className="space-y-2 md:col-span-2">
//             <Label>
//               Other passengers Information{" "}
//               <span className="text-sm text-muted-foreground">(optional)</span>
//             </Label>
//             <Textarea
//               placeholder="Passengers Information"
//               className="pl-4 pr-10 bg-[#F4F4F4] border border-[#E0E0E0]"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PrimaryPassengerForm;

"use client";

import { useEffect, useState } from "react";
import SearchWithDropdown, { OptionType } from "@/components/custom inputs/search";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import DateOfBirth from "./DateOfBirth";
import CustomPhoneInput from "@/components/ui/phone-input";
import { Textarea } from "@/components/ui/textarea";

interface StepsProps {
  onFocus?: () => void;
}

const STORAGE_KEY = "primaryPassenger";

export interface PrimaryPassenger {
  first_name?: string;
  last_name?: string;
  date_of_birth?: string;
  travel_class?: OptionType;
  email?: string;
  phone?: string;
  number_of_pages?: string;
  other_passengers_info?: string;
}

const PrimaryPassengerForm = ({ onFocus }: StepsProps) => {
  const [passenger, setPassenger] = useState<PrimaryPassenger>({});

  // Load from session storage
  useEffect(() => {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) {
      console.log(stored);
      
      setPassenger(JSON.parse(stored));
    }
  }, []);

  const updateSession = (updated: Partial<PrimaryPassenger>) => {
    const newData = { ...passenger, ...updated };
    setPassenger(newData);
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
  };

  const classesOptions = [
    { value: "economy", label: "economy" },
    { value: "business", label: "business" },
    { value: "first", label: "first" },
  ];

  return (
    <div
      onClick={() => onFocus?.()}
      style={{
        boxShadow: "0px 11.48px 114.76px 0px #A7A7A73D",
      }}
      className="px-10 py-6 bg-white rounded-2xl"
    >
      <h4 className="font-manrope font-medium text-[18.75px]">
        Primary passenger
      </h4>
      <span className="inline-block w-full h-0.5 bg-[#CFCFCF]" />

      <div className="mt-4 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6 w-full">
          {/* First Name */}
          <div className="space-y-2">
            <Label>First Name</Label>
            <Input
              placeholder="First Name"
              className="bg-[#F4F4F4]"
              value={passenger.first_name || ""}
              onChange={(e) => {
                console.log("updateing session...");
                
                updateSession({ first_name: e.target.value })}}
            />
          </div>

          {/* Last Name */}
          <div className="space-y-2">
            <Label>Last Name</Label>
            <Input
              placeholder="Last Name"
              className="bg-[#F4F4F4]"
              value={passenger.last_name || ""}
              onChange={(e) => updateSession({ last_name: e.target.value })}
            />
          </div>

          {/* DOB */}
          <div className="space-y-2">
            <Label>Date of birth</Label>
            <DateOfBirth
              value={passenger.date_of_birth || "2020-1-1"}
              onChange={(value: string) =>
                updateSession({ date_of_birth: value })
              }
            />
          </div>

          {/* Travel Class */}
          <div className="space-y-2">
            <Label>Class of travel</Label>
            <SearchWithDropdown
            value={passenger.travel_class}
              options={classesOptions}
              onSelect={(e) => updateSession({ travel_class: e })}
              showRecentSearches={false}
              className="h-9 rounded-md"
              inputClassName="rounded-md pl-4 pr-10 bg-[#F4F4F4] border border-[#E0E0E0]"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              placeholder="Email address"
              className="bg-[#F4F4F4]"
              value={passenger.email || ""}
              onChange={(e) => updateSession({ email: e.target.value })}
            />
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label>Phone</Label>
            <CustomPhoneInput
              value={passenger.phone || "+1"}
              onChange={(value) => updateSession({ phone: value })}
              radius="7px"
            />
          </div>

          {/* Number of pages */}
          <div className="space-y-2 md:col-span-2">
            <Label>Number Of bags</Label>
            <Input
            type="number"
              placeholder="Number Of bags"
              className="bg-[#F4F4F4]"
              value={passenger.number_of_pages || ""}
              onChange={(e) =>
                updateSession({ number_of_pages: e.target.value })
              }
            />
          </div>

          {/* Other passengers */}
          <div className="space-y-2 md:col-span-2">
            <Label>
              Other passengers Information{" "}
              <span className="text-sm text-muted-foreground">(optional)</span>
            </Label>
            <Textarea
              placeholder="Passengers Information"
              className="bg-[#F4F4F4]"
              value={passenger.other_passengers_info || ""}
              onChange={(e) =>
                updateSession({
                  other_passengers_info: e.target.value,
                })
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrimaryPassengerForm;
