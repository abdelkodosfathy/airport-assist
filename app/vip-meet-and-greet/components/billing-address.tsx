// import { forwardRef, useImperativeHandle, useState } from "react";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

// export type BillingAddressRef = {
//   isValid: () => boolean;
//   getData: () => {
//     address: string;
//     city: string;
//     country: string;
//     postcode: string;
//   };
// };

// const BillingAddress = forwardRef<BillingAddressRef>((_, ref) => {
//   const [address, setAddress] = useState("");
//   const [city, setCity] = useState("");
//   const [country, setCountry] = useState("");
//   const [postcode, setPostcode] = useState("");

//   const validate = () => {
//     if (!address.trim()) return false;
//     if (!city.trim()) return false;
//     if (!country.trim()) return false;
//     if (!postcode.trim()) return false;

//     return true;
//   };

//   useImperativeHandle(ref, () => ({
//     isValid: validate,
//     getData: () => ({ address, city, country, postcode }),
//   }));

//   return (
//     <div
//       style={{
//         boxShadow: "0px 11.48px 114.76px 0px #A7A7A73D",
//       }}
//       className="px-10 py-6 bg-white rounded-2xl"
//     >
//       <h4 className="font-manrope font-medium text-[18.75px] leading-[1.3] tracking-normal">
//         Billing Address
//       </h4>
//       <span className="inline-block w-full h-0.5 bg-[#CFCFCF]" />

//       <div className="mt-4 w-full grid grid-cols-2 gap-4">
//         <div className="space-y-2 md:col-span-2">
//           <Label htmlFor="Address">Address</Label>
//           <Input
//             id="Address"
//             placeholder="Address"
//             value={address}
//             onChange={(e) => setAddress(e.target.value)}
//             className="pl-4 pr-10 bg-[#F4F4F4] border border-[#E0E0E0]"
//           />
//         </div>

//         <div className="space-y-2 col-span-1">
//           <Label htmlFor="city">Town / City</Label>
//           <Input
//             id="city"
//             placeholder="City"
//             value={city}
//             onChange={(e) => setCity(e.target.value)}
//             className="pl-4 pr-10 bg-[#F4F4F4] border border-[#E0E0E0]"
//           />
//         </div>

//         <div className="space-y-2 col-span-1">
//           <Label htmlFor="country">Country</Label>
//           <Input
//             id="country"
//             placeholder="Country"
//             value={country}
//             onChange={(e) => setCountry(e.target.value)}
//             className="pl-4 pr-10 bg-[#F4F4F4] border border-[#E0E0E0]"
//           />
//         </div>

//         <div className="space-y-2 md:col-span-2">
//           <Label htmlFor="postcode">Post Code</Label>
//           <Input
//             id="postcode"
//             placeholder="Post Code"
//             value={postcode}
//             onChange={(e) => setPostcode(e.target.value)}
//             className="pl-4 pr-10 bg-[#F4F4F4] border border-[#E0E0E0]"
//           />
//         </div>
//       </div>
//     </div>
//   );
// });

// BillingAddress.displayName = "BillingAddress";

// export default BillingAddress;

import { forwardRef, useImperativeHandle, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export type BillingAddressRef = {
  isValid: () => boolean;
  getData: () => {
    address: string;
    city: string;
    country: string;
    postcode: string;
  };
};

const BillingAddress = forwardRef<BillingAddressRef>((_, ref) => {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [postcode, setPostcode] = useState("");

  // حساب أخطاء كل فيلد ديناميكيًا
  const errors = {
    address: !address.trim(),
    city: !city.trim(),
    country: !country.trim(),
    postcode: !postcode.trim(),
  };

  const validate = () => !Object.values(errors).some((e) => e);

  useImperativeHandle(ref, () => ({
    isValid: validate,
    getData: () => ({ address, city, country, postcode }),
  }));

  const getInputClass = (hasError: boolean) =>
    `pl-4 pr-10 bg-[#F4F4F4] border ${
      hasError ? "border-red-500" : "border-[#E0E0E0]"
    }`;

  const getLabelClass = (hasError: boolean) =>
    `text-sm leading-relaxed ${hasError ? "text-red-500" : "text-black"}`;

  return (
    <div
      style={{
        boxShadow: "0px 11.48px 114.76px 0px #A7A7A73D",
      }}
      className="px-10 py-6 bg-white rounded-2xl"
    >
      <h4 className="font-manrope font-medium text-[18.75px] leading-[1.3] tracking-normal">
        Billing Address
      </h4>
      <span className="inline-block w-full h-0.5 bg-[#CFCFCF]" />

      <div className="mt-4 w-full grid grid-cols-2 gap-4">
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="Address" className={getLabelClass(errors.address)}>
            Address
          </Label>
          <Input
            id="Address"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className={getInputClass(errors.address)}
          />
        </div>

        <div className="space-y-2 col-span-1">
          <Label htmlFor="city" className={getLabelClass(errors.city)}>
            Town / City
          </Label>
          <Input
            id="city"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className={getInputClass(errors.city)}
          />
        </div>

        <div className="space-y-2 col-span-1">
          <Label htmlFor="country" className={getLabelClass(errors.country)}>
            Country
          </Label>
          <Input
            id="country"
            placeholder="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className={getInputClass(errors.country)}
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="postcode" className={getLabelClass(errors.postcode)}>
            Post Code
          </Label>
          <Input
            id="postcode"
            placeholder="Post Code"
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
            className={getInputClass(errors.postcode)}
          />
        </div>
      </div>
    </div>
  );
});

BillingAddress.displayName = "BillingAddress";

export default BillingAddress;
