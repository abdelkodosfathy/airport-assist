// "use client";

// import { Input } from "@/components/ui/input";
// import CustomPhoneInput from "@/components/ui/phone-input";
// import { useBillingStore } from "@/store/billingDataStore";

// const ChauffeurBillingSection = () => {
//   const {
//     firstName,
//     lastName,
//     email,
//     phone,
//     setFirstName,
//     setLastName,
//     setEmail,
//     setPhone,
//   } = useBillingStore();

//   return (
//     <div className="shadow-md px-10 py-6 bg-white rounded-2xl">
//       <h4 className="font-manrope font-medium text-[18.75px] leading-[1.3]">
//         Billing Information
//       </h4>
//       <p className="mt-2 text-[#6D6D6D]">
//         Main point of communication for this reservation
//       </p>

//       <span className="inline-block w-full h-0.5 bg-[#CFCFCF] my-4" />

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6 w-full">
//         {/* First Name */}
//         <Input
//           id="firstName"
//           value={firstName}
//           onChange={(e) => setFirstName(e.target.value)}
//           className="h-11.25 pl-4 bg-[#F4F4F4] border border-[#E0E0E0]"
//           placeholder="First Name"
//         />

//         {/* Last Name */}
//         <Input
//           id="lastName"
//           value={lastName}
//           onChange={(e) => setLastName(e.target.value)}
//           className="h-11.25 pl-4 bg-[#F4F4F4] border border-[#E0E0E0]"
//           placeholder="Last Name"
//         />

//         {/* Email */}
//         <Input
//           id="email"
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Email address"
//           className="h-11.25 pl-4 bg-[#F4F4F4] border border-[#E0E0E0]"
//         />

//         {/* Phone */}
//         <CustomPhoneInput
//           value={phone}
//           onChange={(value: string) => setPhone(value)}
//           className="h-11.25 rounded-md"
//           radius="7px"
//         />
//       </div>
//     </div>
//   );
// };

// export default ChauffeurBillingSection;

"use client";

import { Input } from "@/components/ui/input";
import CustomPhoneInput from "@/components/ui/phone-input";
import { useTripErrors } from "@/store/tripErrorsStore";
import { useTripStore } from "@/store/tripStore";

const ChauffeurBillingSection = () => {
  return (
    <div className="shadow-md px-10 py-6 bg-white rounded-2xl">
      <h4 className="font-manrope font-medium text-[18.75px] leading-[1.3]">
        Contact Information
      </h4>
      <p className="mt-2 text-[#6D6D6D]">
        Main point of communication for this reservation
      </p>

      <span className="inline-block w-full h-0.5 bg-[#CFCFCF] my-4" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6 w-full">
        <FirstName />
        <LastName />
        <Email />
        <Phone />
      </div>
    </div>
  );
};

export default ChauffeurBillingSection;

const FirstName = () => {
  const firstName = useTripStore((state) => state.firstName);
  const setFirstName = useTripStore((state) => state.setFirstName);
  const firstNameError = useTripErrors((state) => state.errors.firstName);
  const clearError = useTripErrors((state) => state.clearError);

  return (
    <Input
      id="firstName"
      value={firstName}
      onChange={(e) => {
        setFirstName(e.target.value);
        if (e.target.value.trim()) clearError("firstName");
      }}
      className={`h-11.25 pl-4 bg-[#F4F4F4] border 
            ${firstNameError ? "border-red-500" : "border-[#E0E0E0]"}
            `}
      placeholder="First Name"
    />
  );
};

const LastName = () => {
  const lastName = useTripStore((state) => state.lastName);
  const setLastName = useTripStore((state) => state.setLastName);
  const clearError = useTripErrors((state) => state.clearError);
  const lastNameError = useTripErrors((state) => state.errors.lastName);

  return (
    <Input
      id="lastName"
      value={lastName}
      onChange={(e) => {
        setLastName(e.target.value);
        if (e.target.value.trim()) clearError("lastName");
      }}
      className={`h-11.25 pl-4 bg-[#F4F4F4] border 
            ${lastNameError ? "border-red-500" : "border-[#E0E0E0]"}
            `}
      placeholder="Last Name"
    />
  );
};

const Email = () => {
  const email = useTripStore((state) => state.email);
  const setEmail = useTripStore((state) => state.setEmail);
  const emailError = useTripErrors((state) => state.errors.email);
  const clearError = useTripErrors((state) => state.clearError);

  return (
    <Input
      id="email"
      type="email"
      value={email}
      onChange={(e) => {
        setEmail(e.target.value);
        if (e.target.value.trim()) clearError("email");
      }}
      placeholder="Email address"
      className={`h-11.25 pl-4 bg-[#F4F4F4] border 
            ${emailError ? "border-red-500" : "border-[#E0E0E0]"}
            `}
    />
  );
};

const Phone = () => {
  const phone = useTripStore((state) => state.phone);
  const setPhone = useTripStore((state) => state.setPhone);
  const phoneError = useTripErrors((state) => state.errors.phone);
  const clearError = useTripErrors((state) => state.clearError);

  return (
    <CustomPhoneInput
      value={phone}
      onChange={(value: string) => {
        setPhone(value);
        if (value) clearError("phone");
      }}
      className={`h-11.25 rounded-md border 
            ${phoneError ? "border-red-500" : "border-transparent"}
            `}
      radius="7px"
    />
  );
};
