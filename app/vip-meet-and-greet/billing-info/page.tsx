"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CustomPhoneInput from "@/components/ui/phone-input";
import { useEffect, useState } from "react";
import SideInformationCard from "../side-informatio-card";
import Steps from "../components/steps";
import { useBillingStore } from "@/store/billingDataStore";
import { usePrimaryPassengerStore } from "@/store/primaryPassengerStore";
import { Button } from "@/components/ui/button";
import { useAirportStore } from "@/store/vipInputsStore";
import { useRouter } from "next/navigation";
import SubmitButton from "./submit-button";
import { useAuthStore } from "@/store/authStore";
// import Link from "next/link";

export default function BillingInformation() {
  const storedAirport = useAirportStore((state) => state.airport);

  const router = useRouter();
  useEffect(() => {
    if (!storedAirport) {
      router.replace("/");
    }
  }, [storedAirport, router]);

  if (!storedAirport) return null;

  const primaryFirstName = usePrimaryPassengerStore((state) => state.firstName);
  const primaryLastName = usePrimaryPassengerStore((state) => state.lastName);
  const primaryEmail = usePrimaryPassengerStore((state) => state.email);

  const [sameAsPrimary, setSameAsPrimary] = useState<boolean | "indeterminate">(
    false,
  );

  const firstName = useBillingStore((state) => state.firstName);
  const lastName = useBillingStore((state) => state.lastName);
  const email = useBillingStore((state) => state.email);
  const setFirstName = useBillingStore((state) => state.setFirstName);
  const setLastName = useBillingStore((state) => state.setLastName);
  const setEmail = useBillingStore((state) => state.setEmail);
  // const handleCheck = (checked: boolean | "indeterminate") => {
  //   checkfastTrack(checked === true);
  // };
  useEffect(() => {
    if (sameAsPrimary === true) {
      setFirstName(primaryFirstName ?? "");
      setLastName(primaryLastName ?? "");
      setEmail(primaryEmail ?? "");
    }
  }, [sameAsPrimary]);

  const s = useAuthStore(s => s.user);

  console.log(s);
  
  return (
    <>
      <p className="font-[Manrope] font-medium text-[15.53px] leading-[130%] text-[#8E8E93] mb-3">
        Choose how to travel
      </p>

      <h2 className="font-[Manrope] font-normal text-[22.6px] leading-[100%] tracking-[7.06px] uppercase mb-6">
        Services Level Available
      </h2>

      <Steps currentPage="billing" />

      <div className="flex gap-4">
        <div className="flex-2 space-y-4 h-fit">
          <div
            className="px-10 py-6 bg-white rounded-2xl  "
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
                  value={firstName ?? ""}
                  onChange={(e) => setFirstName(e.target.value)}
                  id="firstName"
                  placeholder="First Name"
                  disabled={sameAsPrimary === true}
                  className="pl-4 h-11.25 pr-10 bg-[#F4F4F4] border border-[#E0E0E0]
            disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  value={lastName ?? ""}
                  onChange={(e) => setLastName(e.target.value)}
                  id="lastName"
                  placeholder="Last Name"
                  disabled={sameAsPrimary === true}
                  className="pl-4 pr-10 h-11.25 bg-[#F4F4F4] border border-[#E0E0E0]
            disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  value={email ?? ""}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  placeholder="Email address"
                  disabled={sameAsPrimary === true}
                  className="pl- h-11.25 pr-10 bg-[#F4F4F4] border border-[#E0E0E0]
            disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>

              <PhoneInput sameAsPrimary={sameAsPrimary === true} />
            </div>
          </div>
          <SubmitButton />
        </div>

        <SideInformationCard/>
      </div>
    </>
  );
}

const PhoneInput = ({ sameAsPrimary }: { sameAsPrimary: boolean }) => {
  const phone = useBillingStore((state) => state.phone);
  const setPhone = useBillingStore((state) => state.setPhone);
  const primaryPhone = usePrimaryPassengerStore((state) => state.phone);

  useEffect(() => {
    setPhone(primaryPhone ?? "");
  }, [sameAsPrimary]);
  return (
    <div className="space-y-2">
      <Label htmlFor="phone">Phone</Label>
      <div className={sameAsPrimary ? "pointer-events-none opacity-50" : ""}>
        <CustomPhoneInput
          onChange={setPhone}
          value={phone}
          className="bg-[#F4F4F4] h-11.25 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </div>
    </div>
  );
};
