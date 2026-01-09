'use client'
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const BillingInformation = () => {
  const [sameAsPrimary, setSameAsPrimary] = useState(false);

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
      <p className="mb-4">
        Main point of communication for this reservation
      </p>

      <span className="inline-block w-full h-0.5 bg-[#CFCFCF]" />

      {/* Checkbox */}
      <div className="flex items-start gap-3 my-4">
        <Checkbox
          id="same_as_primary"
          checked={sameAsPrimary}
          onCheckedChange={(value) => setSameAsPrimary(!!value)}
          className="w-6 h-6 rounded-md bg-[#F4F4F4]
          data-[state=checked]:bg-[#664F31]
          data-[state=checked]:border-[#664F31]"
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
        <span className="flex-1 h-0.5 bg-gradient-to-r from-white/0 to-[#A1453C]" />
        <p className="text-2xl mx-4 text-[#8A8A8E]">OR</p>
        <span className="flex-1 h-0.5 bg-gradient-to-l from-white/0 to-[#A1453C]" />
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6 w-full">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            placeholder="First Name"
            disabled={sameAsPrimary}
            className="pl-4 pr-10 bg-[#F4F4F4] border border-[#E0E0E0]
            disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            placeholder="Last Name"
            disabled={sameAsPrimary}
            className="pl-4 pr-10 bg-[#F4F4F4] border border-[#E0E0E0]
            disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            placeholder="Email address"
            disabled={sameAsPrimary}
            className="pl-4 pr-10 bg-[#F4F4F4] border border-[#E0E0E0]
            disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            placeholder="Phone"
            disabled={sameAsPrimary}
            className="pl-4 pr-10 bg-[#F4F4F4] border border-[#E0E0E0]
            disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>
      </div>
    </div>
  );
};

export default BillingInformation;