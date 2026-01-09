// app/chauffeur-services/BillingInformationPage/page.tsx

import CarPassengers from "@/components/custom icons/CarPassengers";
import LicensedChaufferus from "@/components/custom icons/licensedChaufferus";
import LuggageAssist from "@/components/custom icons/LuggageAssist";
import LuggagePieces from "@/components/custom icons/luggagePieces";
import WaterDrop from "@/components/custom icons/waterDrop";
import Wifi from "@/components/custom icons/wifi";
import { Button } from "@/components/ui/button";
import Separator from "@/components/ui/formSeparator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PhoneInput } from "@/components/ui/phone-input";
import car1 from "@/public/car1.png";
import Image from "next/image";
import Link from "next/link";

export default function BillingInformationPage() {
  return (
    <div className="flex gap-4">
      <div className="h-full w-full max-w-6/11 space-y-4">
        <div className="shadow-md px-4.5 py-6 bg-white rounded-2xl w-full">
          <div>
            <h3 className="mb-2 font-semibold">Billing Information</h3>
            <p className="text-[#6D6D6D]">
              Main point of communication for this reservation
            </p>
          </div>
          <Separator />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 w-full">
            <div className="space-y-2 col-span-1 mb-6">
              <Label htmlFor="first-name">First Name</Label>
              <Input
                id="first-name"
                placeholder="Enter First Name"
                className="pl-4 pr-10 bg-[#F4F4F4] border border-[#E0E0E0]"
              />
            </div>
            <div className="space-y-2 col-span-1 mb-6">
              <Label htmlFor="last-name">Last Name</Label>
              <Input
                id="last-name"
                placeholder="Enter Last Name"
                className="pl-4 pr-10 bg-[#F4F4F4] border border-[#E0E0E0]"
              />
            </div>

            <div className="space-y-2 col-span-1 mb-6">
              <Label htmlFor="first-name">Email</Label>
              <Input
                id="email"
                placeholder="Example@gamil.com"
                className="pl-4 pr-10 bg-[#F4F4F4] border border-[#E0E0E0]"
              />
            </div>
            <div className="space-y-2 col-span-1 mb-6">
              <Label htmlFor="last-name">Phone</Label>
              <PhoneInput
                id="phone"
                placeholder="0101 434 3413"
                className="bg-[#F4F4F4] rounded-lg"
              />
            </div>
          </div>
        </div>
        <div className="shadow-md px-4.5 py-6 bg-white rounded-2xl w-full">
          <div>
            <h3 className="mb-2 font-semibold">Billing Address</h3>
          </div>
          <Separator />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 w-full">
            <div className="space-y-2 col-span-2 mb-6">
              <Label htmlFor="first-name">Address</Label>
              <Input
                id="address"
                placeholder="Enter First Name"
                className="pl-4 pr-10 bg-[#F4F4F4] border border-[#E0E0E0]"
              />
            </div>
            <div className="space-y-2 col-span-1 mb-6">
              <Label htmlFor="last-name">Town / City</Label>
              <Input
                id="town-city"
                placeholder="City"
                className="pl-4 pr-10 bg-[#F4F4F4] border border-[#E0E0E0]"
              />
            </div>

            <div className="space-y-2 col-span-1 mb-6">
              <Label htmlFor="first-name">Country</Label>
              <Input
                id="country"
                placeholder="Country"
                className="pl-4 pr-10 bg-[#F4F4F4] border border-[#E0E0E0]"
              />
            </div>
            <div className="space-y-2 col-span-1 mb-6">
              <Label htmlFor="last-name">Post Code</Label>
              <Input
                id="post-code"
                placeholder="Enter The Post Code"
                className="pl-4 pr-10 bg-[#F4F4F4] border border-[#E0E0E0]"
              />
            </div>
          </div>
        </div>
      </div>
      <div className=" w-5/11">
        <div className="rounded-lg bg-white p-4">
          <h3 className="font-bold">
            Mercedes S-Class <span className="text-sm font-light">( New Shape )</span>
          </h3>
          <div className="flex gap-10">
            <div className="text-[#74747A] space-y-6 mt-4 flex-1">
              <p>Premium Sedan – Elegant comfort for up to 2 passengers.</p>
              <Image src={car1} width={265} height={132} alt="car" />
            </div>
            <div className="flex-1">
              <ul className="space-y-4">
                <li className="flex gap-2"><CarPassengers/> 2 passengers</li>
                <li className="flex gap-2"><LuggagePieces/> 2 luggage pieces</li>
                <li className="flex gap-2"><LuggageAssist/> Luggage assist</li>
                <li className="flex gap-2"><LicensedChaufferus/> Licensed chauffeurs</li>
                <li className="flex gap-2"><WaterDrop/> Complimentary water</li>
                <li className="flex gap-2"><Wifi/> Complimentary Wi-Fi</li>
              </ul>
            </div>
          </div>
        </div>
        <Button
          asChild
          variant="outline"
          className="
            col-span-2
            mt-4
            w-full
            cursor-pointer 
            border-[#D1D1D1] 
            text-[#7A7A7A] 
            bg-[#ECECEC]
            hover:border-[#664F31]  
            hover:bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)] 
            hover:text-white 
            duration-0
          "
        >
          <Link href={"/chauffeur-services/billing-information/checkout"}>Continue</Link>
        </Button>
      </div>
    </div>
  );
}