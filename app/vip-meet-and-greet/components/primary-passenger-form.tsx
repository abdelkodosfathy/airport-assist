"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CustomPhoneInput from "@/components/ui/phone-input";
import { Textarea } from "@/components/ui/textarea";
import DateOfBirth from "./DateOfBirth";
import SelectDropdown from "@/components/custom inputs/SelectList";
import { BagsInput } from "./bags-input";
import { usePrimaryPassengerStore } from "@/store/primaryPassengerStore";
import { useFlightFormStore } from "@/store/useFlightFormStore";
import { LibPhoneInput } from "@/components/ui/lib-phone-input";

const classesOptions = [
  { value: "economy", label: "Cabin Economy Class" },
  { value: "business", label: "Cabin Business Class" },
  { value: "first", label: "Cabin First Class" },
];
const PrimaryPassengerForm = ({ onFocus }: { onFocus?: () => void }) => {
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
          <FirstNameInput />
          <LastNameInput />
          <DataOfBirthInput />
          <TravelClassInput />
          <EmailInput />
          <PhoneInput />

          {/* separator */}
          <span className="inline-block col-span-2 h-0.5 bg-[#CFCFCF]" />

          <BagsInput />
          <OtherPassengersInput />
        </div>
      </div>
    </div>
  );
};
export default PrimaryPassengerForm;

const FirstNameInput = () => {
  const firstName = usePrimaryPassengerStore((state) => state.firstName);
  const setFirstName = usePrimaryPassengerStore((state) => state.setFirstName);

  const thereIsError = useFlightFormStore((s) => s.validationError);
  const validationError = thereIsError && !firstName;

  return (
    <div className="space-y-2">
      <Label className={validationError ? "text-red-500" : ""}>
        First Name
        {validationError && "*"}
      </Label>
      <Input
        value={firstName ?? ""}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder="First Name"
        className={`bg-[#F4F4F4]
          ${validationError ? "border-red-500 border" : ""}
          `}
      />
    </div>
  );
};
const LastNameInput = () => {
  const lastName = usePrimaryPassengerStore((state) => state.lastName);
  const setLastName = usePrimaryPassengerStore((state) => state.setLastName);

  const thereIsError = useFlightFormStore((s) => s.validationError);
  const validationError = thereIsError && !lastName;

  return (
    <div className="space-y-2">
      <Label className={validationError ? "text-red-500" : ""}>
        Last Name
        {validationError && "*"}
      </Label>
      <Input
        value={lastName ?? ""}
        onChange={(e) => setLastName(e.target.value)}
        placeholder="Last Name"
        className={`bg-[#F4F4F4] 
          ${validationError ? "border-red-500 border" : ""}
          `}
      />
    </div>
  );
};
const DataOfBirthInput = () => {
  const dateOfBirth = usePrimaryPassengerStore((state) => state.dateOfBirth);
  const setDateOfBirth = usePrimaryPassengerStore(
    (state) => state.setDateOfBirth,
  );

  // const thereIsError = useFlightFormStore((s) => s.validationError);
  // const validationError = thereIsError && !dateOfBirth;

  const validationError = false;

  return (
    <div className="space-y-2">
      <Label className={validationError ? "text-red-500" : ""}>
        Date Of Birth
        {validationError && "*"}
      </Label>
      <DateOfBirth
        onChange={setDateOfBirth}
        value={dateOfBirth}
        className={validationError ? "border-red-500 border" : ""}
      />
    </div>
  );
};
const TravelClassInput = () => {
  const travelClass = usePrimaryPassengerStore((state) => state.classOfTravel);
  const setTravelClass = usePrimaryPassengerStore(
    (state) => state.setClassOfTravel,
  );
  // const thereIsError = useFlightFormStore((s) => s.validationError);
  // const validationError = thereIsError && !travelClass?.value;

  const validationError = false;

  return (
    <div className="space-y-2">
      <Label className={validationError ? "text-red-500" : ""}>
        Class Of Travel
        {validationError && "*"}
      </Label>
      <SelectDropdown
        value={travelClass}
        onSelect={setTravelClass}
        options={classesOptions}
        className="h-9 rounded-md"
        inputClassName={`rounded-md pl-4 pr-10 bg-[#F4F4F4] border
            ${validationError ? "border-red-500" : "border-[#E0E0E0]"}
          `}
      />
    </div>
  );
};
const EmailInput = () => {
  const email = usePrimaryPassengerStore((state) => state.email);
  const setEmail = usePrimaryPassengerStore((state) => state.setEmail);

  const thereIsError = useFlightFormStore((s) => s.validationError);
  const validationError = thereIsError && !email;

  return (
    <div className="space-y-2">
      <Label className={validationError ? "text-red-500" : ""}>
        Email
        {validationError && "*"}
      </Label>
      <Input
        value={email ?? ""}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email address"
        className={`bg-[#F4F4F4] 
          ${validationError ? "border-red-500 border" : ""}
                `}
      />
    </div>
  );
};
const PhoneInput = () => {
  const phone = usePrimaryPassengerStore((state) => state.phone);
  const setPhone = usePrimaryPassengerStore((state) => state.setPhone);

  const thereIsError = useFlightFormStore((s) => s.validationError);
  const validationError = thereIsError && !phone;

  return (
    <div className="space-y-2">
      <Label className={validationError ? "text-red-500" : ""}>
        Phone
        {validationError && "*"}
      </Label>
      <CustomPhoneInput
        className="h-9 rounded-md"
        radius="7px"
        value={phone ?? ""}
        onChange={setPhone}
        validationClass={validationError}
      />
    </div>
    // <div className="space-y-2">
    //   <Label className={validationError ? "text-red-500" : ""}>
    //     Phone {validationError && "*"}
    //   </Label>

    //   {/* <PhoneInputLib
    //     // value={phone ?? ""}
    //     // onChange={(val, formatted, country, isValid) => {
    //     //   setPhone(val);
    //     //   // setValidationError(!isValid);
    //     // }}
    //     // className="w-full"
    //     className=""
    //     // inputClassName={`
    //     //   rounded-md h-9 shadow-xs bg-[#F4F4F4] border
    //     //     ${validationError ? "border-red-500" : "border-[#E0E0E0]"}`}
    //   /> */}
    // </div>
  );
};
const OtherPassengersInput = () => {
  const otherInfo = usePrimaryPassengerStore(
    (state) => state.otherPassengersInfo,
  );
  const setOtherInfo = usePrimaryPassengerStore(
    (state) => state.setOtherPassengersInfo,
  );

  return (
    <div className="space-y-2 md:col-span-2">
      <Label>
        Other Passengers Information{" "}
        <span className="text-sm text-[#7A7A7A] lowercase">(optional)</span>
      </Label>
      <Textarea
        value={otherInfo ?? ""}
        onChange={(e) => setOtherInfo(e.target.value)}
        placeholder="Passengers Information"
        className="bg-[#F4F4F4]"
      />
    </div>
  );
};

// =========================================================================================
// =========================================================================================
// =========================================================================================

// import React, { useState, useMemo, useEffect } from "react";
// import {
//   AsYouType,
//   parsePhoneNumberFromString,
//   CountryCode,
// } from "libphonenumber-js";

// type PhoneMeta = {
//   isValid: boolean;
//   country?: CountryCode;
//   international?: string;
//   national?: string;
// };

// type Props = {
//   value?: string;
//   onChange?: (value: string, meta: PhoneMeta) => void;
//   defaultCountry?: CountryCode;
//   className?: string;
//   placeholder?: string;
// };

// function PhoneInputLib({
//   value = "",
//   onChange,
//   defaultCountry = "EG",
//   className = "",
//   placeholder = "Enter phone number",
// }: Props) {
//   const [input, setInput] = useState(value);
//   const [country, setCountry] = useState<CountryCode>(defaultCountry);

//   // sync external value
//   useEffect(() => {
//     setInput(value);
//   }, [value]);

//   // 🔥 parse (source of truth for validation)
//   const parsed = useMemo(() => {
//     const phone = parsePhoneNumberFromString(input || "");

//     if (!phone) {
//       return {
//         isValid: false,
//         country: undefined,
//         international: undefined,
//         national: undefined,
//       };
//     }

//     return {
//       isValid: phone.isValid(),
//       country: phone.country,
//       international: phone.formatInternational(),
//       national: phone.formatNational(),
//     };
//   }, [input]);

//   const formatNumber = (value: string) => {
//     const formatter = new AsYouType(country);
//     formatter.input(value);

//     return formatter.getChars();
//   };
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const raw = e.target.value;

//     // UI formatting only
//     const formatted = formatNumber(raw);

//     setInput(formatted);

//     // parse once (source of truth)
//     const phone = parsePhoneNumberFromString(raw);

//     // auto detect country safely
//     if (phone?.country) {
//       setCountry(phone.country);
//     }

//     const meta: PhoneMeta = {
//       isValid: phone?.isValid() ?? false,
//       country: phone?.country,
//       international: phone?.formatInternational(),
//       national: phone?.formatNational(),
//     };

//     onChange?.(formatted, meta);
//   };

//   return (
//     <div className={`flex items-center gap-2 ${className}`}>
//       <input
//         type="tel"
//         value={input}
//         onChange={handleChange}
//         placeholder={placeholder}
//         className="w-full px-3 py-2 border rounded-lg outline-none"
//       />

//       <div
//         className={`w-3 h-3 rounded-full ${
//           parsed.isValid ? "bg-green-500" : input ? "bg-red-500" : "bg-gray-300"
//         }`}
//       />
//     </div>
//   );
// }
