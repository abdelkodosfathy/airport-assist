"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CustomPhoneInput from "@/components/ui/phone-input";
import { Textarea } from "@/components/ui/textarea";
import DateOfBirth from "./DateOfBirth";
import SelectDropdown from "@/components/custom inputs/SelectList";
import { BagsInput } from "./bags-input";
import { usePrimaryPassengerStore } from "@/store/primaryPassengerStore";

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

  return (
    <div className="space-y-2">
      <Label
      // className={validationErrors.firstName ? "text-red-500" : ""}
      >
        First Name
        {/* {validationErrors?.firstName && "*"} */}
      </Label>
      <Input
        value={firstName ?? ""}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder="First Name"
        className={`bg-[#F4F4F4]`}
        // ${validationErrors.firstName ? "border-red-500 border" : ""}
      />
    </div>
  );
};
const LastNameInput = () => {
  const lastName = usePrimaryPassengerStore((state) => state.lastName);
  const setLastName = usePrimaryPassengerStore((state) => state.setLastName);

  return (
    <div className="space-y-2">
      <Label
      // className={validationErrors.lastName ? "text-red-500" : ""}
      >
        Last Name
        {/* {validationErrors?.lastName && "*"} */}
      </Label>
      <Input
        value={lastName ?? ""}
        onChange={(e) => setLastName(e.target.value)}
        placeholder="Last Name"
        className={`bg-[#F4F4F4] 
          `}
        // ${validationErrors.lastName ? "border-red-500 border" : ""}
      />
    </div>
  );
};
const DataOfBirthInput = () => {
  const dateOfBirth = usePrimaryPassengerStore((state) => state.dateOfBirth);
  const setDateOfBirth = usePrimaryPassengerStore(
    (state) => state.setDateOfBirth,
  );
  return (
    <div className="space-y-2">
      <Label
      //  className={validationErrors.dob ? "text-red-500" : ""}
      >
        Date Of Birth
        {/* {validationErrors?.dob && "*"} */}
      </Label>
      <DateOfBirth
        onChange={setDateOfBirth}
        value={dateOfBirth}
        // className={validationErrors.dob ? "border-red-500 border" : ""}
      />
    </div>
  );
};
const TravelClassInput = () => {
  const travelClass = usePrimaryPassengerStore((state) => state.classOfTravel);
  const setTravelClass = usePrimaryPassengerStore(
    (state) => state.setClassOfTravel,
  );
  return (
    <div className="space-y-2">
      <Label
      // className={validationErrors.travelClass ? "text-red-500" : ""}
      >
        Class Of Travel
        {/* {validationErrors?.travelClass && "*"} */}
      </Label>
      <SelectDropdown
        value={travelClass}
        onSelect={setTravelClass}
        options={classesOptions}
        className="h-9 rounded-md"
        inputClassName={`rounded-md pl-4 pr-10 bg-[#F4F4F4] border
                `}
        //  ${validationErrors.travelClass
        //   ? "border-red-500"
        // : "border-[#E0E0E0]"}
      />
    </div>
  );
};
const EmailInput = () => {
  const email = usePrimaryPassengerStore((state) => state.email);
  const setEmail = usePrimaryPassengerStore((state) => state.setEmail);

  return (
    <div className="space-y-2">
      <Label
      // className={validationErrors.email ? "text-red-500" : ""}
      >
        Email
        {/* {validationErrors?.email && "*"} */}
      </Label>
      <Input
        value={email ?? ""}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email address"
        className={`bg-[#F4F4F4] 
                `}
        // ${validationErrors.email ? "border-red-500 border" : ""}
      />
    </div>
  );
};
const PhoneInput = () => {
  const phone = usePrimaryPassengerStore((state) => state.phone);
  const setPhone = usePrimaryPassengerStore((state) => state.setPhone);

  return (
    <div className="space-y-2">
      <Label
      //  className={validationErrors.phone ? "text-red-500" : ""}
      >
        Phone
        {/* {validationErrors?.phone && "*"} */}
      </Label>
      <CustomPhoneInput
        className="h-9 rounded-md"
        radius="7px"
        value={phone ?? ""}
        onChange={setPhone}
        // validationClass={validationErrors.phone}
      />
    </div>
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
        <span className="text-sm text-muted-foreground">(optional)</span>
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
