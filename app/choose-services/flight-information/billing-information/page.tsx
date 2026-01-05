import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import SideInfo from "../../components/side-info";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

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

const BillingInformation = () => {
  return (
    <div
      className="px-10 py-6 bg-white rounded-2xl"
      style={{
        boxShadow: "0px 11.48px 114.76px 0px #A7A7A73D",
      }}
    >
      <h4 className="font-manrope font-medium text-[18.75px] leading-[1.3] tracking-normal">
        Billing Information
      </h4>
      <p className="mb-4">Main point of communication for this reservation</p>
      <span className="inline-block w-full h-0.5 bg-[#CFCFCF]" />
      <div className="flex items-start gap-3 my-4">
        {/* <Checkbox id="same_as_primary" /> */}
        <Checkbox
          id="same_as_primary"
          className="w-6 h-6 rounded-md bg-[#F4F4F4] data-[state=checked]:bg-[#664F31] data-[state=checked]:border-[#664F31]"
        />
        <Label
          htmlFor="same_as_primary"
          className="text-sm leading-relaxed cursor-pointer"
        >
          Same as a primary passenger
        </Label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6 w-full">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          {/* <SearchWithDropdown
            id="firstName"
            placeholder="First Name"
            className="pl-4 pr-10 bg-[#F4F4F4] border border-[#E0E0E0]"
          /> */}
          <Input
            id="firstName"
            placeholder="First Name"
            className="pl-4 pr-10 bg-[#F4F4F4] border border-[#E0E0E0]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            placeholder="Last Name"
            className="pl-4 pr-10 bg-[#F4F4F4] border border-[#E0E0E0]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            placeholder="Email address"
            className="pl-4 pr-10 bg-[#F4F4F4] border border-[#E0E0E0]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            placeholder="Phone"
            className="pl-4 pr-10 bg-[#F4F4F4] border border-[#E0E0E0]"
          />
        </div>
      </div>
    </div>
  );
};
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
