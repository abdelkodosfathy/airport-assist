// import { forwardRef, useImperativeHandle, useState } from "react";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import CustomPhoneInput from "@/components/ui/phone-input";

// export type BillingInformationRef = {
//   isValid: () => boolean;
//   getData: () => {
//     sameAsPrimary: boolean;
//     firstName: string;
//     lastName: string;
//     email: string;
//     phone: string;
//   };
// };

// const BillingInformation = forwardRef<BillingInformationRef>((_, ref) => {
//   const [sameAsPrimary, setSameAsPrimary] = useState(false);
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");

//   const validate = () => {
//     if (sameAsPrimary) return true;

//     if (!firstName.trim()) return false;
//     if (!lastName.trim()) return false;
//     if (!email.trim()) return false;
//     if (!phone.trim()) return false;

//     // simple email check
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) return false;

//     return true;
//   };

//   useImperativeHandle(ref, () => ({
//     isValid: validate,
//     getData: () => ({
//       sameAsPrimary,
//       firstName,
//       lastName,
//       email,
//       phone,
//     }),
//   }));

//   return (
//     <div
//       className="px-10 py-6 bg-white rounded-2xl"
//       style={{
//         boxShadow: "0px 11.48px 114.76px 0px #A7A7A73D",
//       }}
//     >
//       <h4 className="font-manrope font-medium text-[18.75px] leading-[1.3]">
//         Billing Information
//       </h4>
//       <p className="mb-4 text-[#6D6D6D]">
//         Main point of communication for this reservation
//       </p>

//       <span className="inline-block w-full h-0.5 bg-[#CFCFCF]" />

//       {/* Checkbox */}
//       <div className="flex items-start gap-3 my-4">
//         <Checkbox
//           id="same_as_primary"
//           checked={sameAsPrimary}
//           onCheckedChange={(value) => setSameAsPrimary(value === true)}
//           className="w-6 h-6 rounded-md bg-[#F4F4F4]
//             data-[state=checked]:bg-[#7B5A41]
//             data-[state=checked]:border-[#7B5A41]"
//         />

//         <Label
//           htmlFor="same_as_primary"
//           className="text-sm leading-relaxed cursor-pointer"
//         >
//           Same as a primary passenger
//         </Label>
//       </div>

//       {/* OR divider */}
//       <div className="flex items-center w-full mb-4">
//         <span className="flex-1 h-0.5 bg-linear-to-r from-white/0 to-[#A1453C]" />
//         <p className="text-2xl mx-4 text-[#8A8A8E]">OR</p>
//         <span className="flex-1 h-0.5 bg-linear-to-l from-white/0 to-[#A1453C]" />
//       </div>

//       {/* Inputs */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6 w-full">
//         <div className="space-y-2">
//           <Label htmlFor="firstName">First Name</Label>
//           <Input
//             id="firstName"
//             placeholder="First Name"
//             disabled={sameAsPrimary}
//             value={firstName}
//             onChange={(e) => setFirstName(e.target.value)}
//             className="pl-4 pr-10 bg-[#F4F4F4] border border-[#E0E0E0]
//               disabled:opacity-50 disabled:cursor-not-allowed"
//           />
//         </div>

//         <div className="space-y-2">
//           <Label htmlFor="lastName">Last Name</Label>
//           <Input
//             id="lastName"
//             placeholder="Last Name"
//             disabled={sameAsPrimary}
//             value={lastName}
//             onChange={(e) => setLastName(e.target.value)}
//             className="pl-4 pr-10 bg-[#F4F4F4] border border-[#E0E0E0]
//               disabled:opacity-50 disabled:cursor-not-allowed"
//           />
//         </div>

//         <div className="space-y-2">
//           <Label htmlFor="email">Email</Label>
//           <Input
//             id="email"
//             placeholder="Email address"
//             disabled={sameAsPrimary}
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="pl-4 pr-10 bg-[#F4F4F4] border border-[#E0E0E0]
//               disabled:opacity-50 disabled:cursor-not-allowed"
//           />
//         </div>

//         <div className="space-y-2">
//           <Label htmlFor="phone">Phone</Label>
//           <CustomPhoneInput
//             className="h-9 rounded-md"
//             radius="7px"
//             disabled={sameAsPrimary}
//             value={phone}
//             onChange={setPhone}
//           />
//         </div>
//       </div>
//     </div>
//   );
// });

// BillingInformation.displayName = "BillingInformation";

// export default BillingInformation;

import { forwardRef, useImperativeHandle, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CustomPhoneInput from "@/components/ui/phone-input";

export type BillingInformationRef = {
  isValid: () => boolean;
  getData: () => {
    sameAsPrimary: boolean;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
};

const BillingInformation = forwardRef<BillingInformationRef>((_, ref) => {
  const [sameAsPrimary, setSameAsPrimary] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // حساب أخطاء كل فيلد ديناميكيًا
  const errors = {
    firstName: !sameAsPrimary && !firstName.trim(),
    lastName: !sameAsPrimary && !lastName.trim(),
    email:
      !sameAsPrimary &&
      (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)),
    phone: !sameAsPrimary && !phone.trim(),
  };

  const validate = () => {
    if (sameAsPrimary) return true;
    return !Object.values(errors).some((e) => e);
  };

  useImperativeHandle(ref, () => ({
    isValid: validate,
    getData: () => ({
      sameAsPrimary,
      firstName,
      lastName,
      email,
      phone,
    }),
  }));

  const getInputClass = (hasError: boolean) =>
    `pl-4 pr-10 bg-[#F4F4F4] border ${
      hasError ? "border-red-500" : "border-[#E0E0E0]"
    } disabled:opacity-50 disabled:cursor-not-allowed`;

  const getLabelClass = (hasError: boolean) =>
    `text-sm leading-relaxed ${hasError ? "text-red-500" : "text-black"}`;

  return (
    <div
      className="px-10 py-6 bg-white rounded-2xl"
      style={{
        boxShadow: "0px 11.48px 114.76px 0px #A7A7A73D",
      }}
    >
      <h4 className="font-manrope font-medium text-[18.75px] leading-[1.3]">
        Billing Information
      </h4>
      <p className="mb-4 text-[#6D6D6D]">
        Main point of communication for this reservation
      </p>

      <span className="inline-block w-full h-0.5 bg-[#CFCFCF]" />

      {/* Checkbox */}
      <div className="flex items-start gap-3 my-4">
        <Checkbox
          id="same_as_primary"
          checked={sameAsPrimary}
          onCheckedChange={(value) => setSameAsPrimary(value === true)}
          className="w-6 h-6 rounded-md bg-[#F4F4F4]
            data-[state=checked]:bg-[#7B5A41]
            data-[state=checked]:border-[#7B5A41]"
        />

        <Label
          htmlFor="same_as_primary"
          className="text-sm leading-relaxed cursor-pointer"
        >
          Same as a primary passenger
        </Label>
      </div>

      {/* OR divider */}
      <div className="flex items-center w-full mb-4">
        <span className="flex-1 h-0.5 bg-linear-to-r from-white/0 to-[#A1453C]" />
        <p className="text-2xl mx-4 text-[#8A8A8E]">OR</p>
        <span className="flex-1 h-0.5 bg-linear-to-l from-white/0 to-[#A1453C]" />
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6 w-full">
        <div className="space-y-2">
          <Label
            htmlFor="firstName"
            className={getLabelClass(errors.firstName)}
          >
            First Name
          </Label>
          <Input
            id="firstName"
            placeholder="First Name"
            disabled={sameAsPrimary}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className={getInputClass(errors.firstName)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName" className={getLabelClass(errors.lastName)}>
            Last Name
          </Label>
          <Input
            id="lastName"
            placeholder="Last Name"
            disabled={sameAsPrimary}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className={getInputClass(errors.lastName)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className={getLabelClass(errors.email)}>
            Email
          </Label>
          <Input
            id="email"
            placeholder="Email address"
            disabled={sameAsPrimary}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={getInputClass(errors.email)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className={getLabelClass(errors.phone)}>
            Phone
          </Label>
          <CustomPhoneInput
            className={`h-9 rounded-md ${errors.phone ? "border-red-500" : ""}`}
            radius="7px"
            disabled={sameAsPrimary}
            value={phone}
            onChange={setPhone}
          />
        </div>
      </div>
    </div>
  );
});

BillingInformation.displayName = "BillingInformation";

export default BillingInformation;
