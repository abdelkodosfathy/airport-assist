import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";

const BillingAddress = () => {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [postcode, setPostcode] = useState("");

  // Load saved data from sessionStorage on mount
//   useEffect(() => {
//     // const saved = sessionStorage.getItem(STORAGE_KEY);
//     if (saved) {
//       const data = JSON.parse(saved);
//       setAddress(data.address || "");
//       setCity(data.city || "");
//       setCountry(data.country || "");
//       setPostcode(data.postcode || "");
//     }
//   }, []);

  // Save data to sessionStorage whenever it changes
//   useEffect(() => {
//     const data = { address, city, country, postcode };
//     sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
//   }, [address, city, country, postcode]);

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
          <Label htmlFor="Address">Address</Label>
          <Input
            id="Address"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="pl-4 pr-10 bg-[#F4F4F4] border border-[#E0E0E0]"
          />
        </div>

        <div className="space-y-2 col-span-1">
          <Label htmlFor="city">Town / City</Label>
          <Input
            id="city"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="pl-4 pr-10 bg-[#F4F4F4] border border-[#E0E0E0]"
          />
        </div>

        <div className="space-y-2 col-span-1">
          <Label htmlFor="country">Country</Label>
          <Input
            id="country"
            placeholder="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="pl-4 pr-10 bg-[#F4F4F4] border border-[#E0E0E0]"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="postcode">Post Code</Label>
          <Input
            id="postcode"
            placeholder="Post Code"
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
            className="pl-4 pr-10 bg-[#F4F4F4] border border-[#E0E0E0]"
          />
        </div>
      </div>
    </div>
  );
};

export default BillingAddress;