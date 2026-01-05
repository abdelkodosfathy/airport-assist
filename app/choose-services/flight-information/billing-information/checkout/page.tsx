import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Mail, Phone, User } from "lucide-react";
import Link from "next/link";

export default function FlightInformation() {
  return (
    <div>
      <Link
        href={"/choose-services/flight-information/billing-information"}
        className="flex gap-2 mb-2 text-[#8E8E93]"
      >
        <ArrowLeft/>
        <p> back to Billing Information</p>
      </Link>
      <div className="flex gap-4">
        {/* <BillingInformation /> */}
        {/* <BillingAddress /> */}
        <div
          className="px-10 py-6 bg-white rounded-2xl flex-2"
          style={{
            boxShadow: "0px 11.48px 114.76px 0px #A7A7A73D",
          }}
        >
          <h2 className="text-[18.75px] font-semibold">Contact Information</h2>
          <div className="space-y-2">
            <div className="flex gap-2">
              <User /> <p>mahmoud</p>
            </div>
            <div className="flex gap-2">
              <Mail /> <p>mahmoud@airportassist.com</p>
            </div>
            <div className="flex gap-2">
              <Phone /> <p>+20 (101) 232-3422</p>
            </div>
          </div>
        </div>
        <div className="h-full flex-1 space-y-4 sticky top-4">
          <div className="bg-white rounded-2xl p-5">
            <div className="font-[Manrope] flex items-center justify-between">
              <p className="text-[18.75px]">Total</p>
              <p className="font-bold font-[Arial]">
                $1,600.90 <span className="font-light text-[#6A7282]">USD</span>
              </p>
            </div>
          </div>
          <form className="bg-white rounded-2xl p-5 grid gap-2 space-y-2">
            {/* <h4 className="font-[Manrope] font-semibold"></h4> */}
            <div className="space-y-2 col-span-2">
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                id="cardNumber"
                className="pl-4 rounded-md pr-10 bg-[#F4F4F4] border border-[#E0E0E0]"
                placeholder="4242 4242 4242 4242"
              />
            </div>

            <div className="space-y-2 col-span-1">
              <Label htmlFor="expiry-date">Expiry date</Label>
              <Input
                id="expiry-date"
                className="pl-4 rounded-md pr-10 bg-[#F4F4F4] border border-[#E0E0E0]"
                placeholder="M M  / Y Y "
              />
            </div>
            <div className="space-y-2 col-span-1">
              <Label htmlFor="security-code">Security code</Label>
              <Input
                id="security-code"
                className="pl-4 rounded-md pr-10 bg-[#F4F4F4] border border-[#E0E0E0]"
                placeholder="CVC"
              />
            </div>
            <div className="space-y-2 col-span-2">
              <Label htmlFor="name-on-card">Name on Card</Label>
              <Input
                id="name-on-card"
                className="pl-4 rounded-md pr-10 bg-[#F4F4F4] border border-[#E0E0E0]"
                placeholder="Card Holder Name"
              />
            </div>

            {/* Fast Track Checkbox */}
            <div className="flex items-start gap-3 col-span-2">
              <Checkbox
                id="i-confirm"
                className="w-6 h-6 rounded-md bg-[#F4F4F4] data-[state=checked]:bg-[#664F31] data-[state=checked]:border-[#664F31]"
              />
              <Label
                htmlFor="i-confirm"
                className="text-sm leading-relaxed cursor-pointer"
              >
                I confirm that I have reviewed and verified the accuracy of this
                reservation.
              </Label>
            </div>
            <div className="flex items-start gap-3 col-span-2">
              <Checkbox
                id="i-agree"
                className="w-6 h-6 rounded-md bg-[#F4F4F4] data-[state=checked]:bg-[#664F31] data-[state=checked]:border-[#664F31]"
              />
              <Label
                htmlFor="i-agree"
                className="text-sm leading-relaxed cursor-pointer"
              >
                I have read and agree to the website terms and conditions *{" "}
              </Label>
            </div>

            <Button
              variant="outline"
              className="
              col-span-2
          w-full
          cursor-pointer 
          border-black 
          text-black 
          hover:border-[#664F31]  
          hover:bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)] 
          hover:text-white 
          duration-0
          rounded-xl
          py-5
          px-7
          "
            >
              <p className="text-sm font-normal font-[Manrope]">
                Proceed To Checkout{" "}
              </p>
            </Button>
          </form>

          {/* <SideInfo /> */}
        </div>
      </div>
      <Button
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
          rounded-xl
          py-5
          px-7
          "
      >
        <p className="text-sm font-normal font-[Manrope]">
          Proceed To Checkout{" "}
        </p>
      </Button>
    </div>
  );
}
