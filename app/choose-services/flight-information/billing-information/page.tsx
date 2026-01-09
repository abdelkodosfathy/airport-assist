import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import SideInfo from "../../components/side-info";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import BillingInformation from "../components/BillingInformation";

export default function FlightInformation() {
  return (
    <div>
      <Link
        href={"/choose-services/flight-information"}
        className="flex gap-2 mb-2 text-[#8E8E93]"
      >
        <ArrowLeft />
        <p> back to Flight Information</p>
      </Link>
      <div className="flex gap-4">
        <form className="space-y-4 h-auto flex-2">
          <BillingInformation />
          <BillingAddress />
        </form>

        <SideInfo />
      </div>

      <Button
        asChild
        variant="outline"
        className="
            mt-6
            w-max 
            cursor-pointer 
            border-black 
            text-black 
            hover:border-[#664F31]  
            hover:bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)] 
            hover:text-white 
            duration-0
          "
      >
        <Link href="/choose-services/flight-information/billing-information/checkout">
          <p className="text-lg font-normal font-[Manrope]">
            Proceed To Checkout{" "}
          </p>
        </Link>
      </Button>
    </div>
  );
}


const BillingAddress = () => {
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
            placeholder="Last Name"
            className="pl-4 pr-10 bg-[#F4F4F4] border border-[#E0E0E0]"
          />
        </div>

        <div className="space-y-2 col-span-1">
          <Label htmlFor="city">Town / City</Label>
          <Input
            id="city"
            placeholder="city"
            className="pl-4 pr-10 bg-[#F4F4F4] border border-[#E0E0E0]"
          />
        </div>
        <div className="space-y-2 col-span-1">
          <Label htmlFor="country">Country</Label>
          <Input
            id="country"
            placeholder="country"
            className="pl-4 pr-10 bg-[#F4F4F4] border border-[#E0E0E0]"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="postcode">Post Code</Label>
          <Input
            id="postcode"
            placeholder="Post Code"
            className="pl-4 pr-10 bg-[#F4F4F4] border border-[#E0E0E0]"
          />
        </div>
      </div>
    </div>
  );
};
