import Adults from "@/components/custom icons/adults";
import Arraival from "@/components/custom icons/arraival";
import Calender from "@/components/custom icons/calender";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import hero from "@/public/our-sercives-hero.jpg";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import car1 from "@/public/car1.png";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import SearchWithDropdown from "@/components/custom inputs/search";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowDownToLineIcon,
  Clock11,
  Clock4,
  Timer,
  UploadCloud,
} from "lucide-react";

export default function FlightInformation() {
  return (
    <main className="bg-[#F7F7F6] font-[Manrope]">
      <Header />
      <section className="relative w-full h-[456px] text-white flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={hero}
            alt="background"
            fill
            className="object-cover w-full h-full"
            priority
          />

          {/* Gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(14.45deg, rgba(2, 2, 2, 0.0546) -17.37%, rgba(11, 11, 11, 0.78) 21.48%)",
            }}
          />
        </div>

        {/* Hero content */}
        <div className="relative z-10 h-full flex flex-col justify-center mx-auto">
          <p className="text-center mb-7.5 font-[Manrope] text-normal">
            ARRIVAL TO
          </p>
          <h1 className=" font-[Manrope] font-light text-3xl leading-[130%] tracking-[8.25px] text-center mb-7.5">
            London Gatwick Airport - LGW
          </h1>
          <div className="flex justify-around">
            <p className="font-[Manrope] font-normal text-[18px] leading-[100%]  tracking-[8.25px] text-center text-[rgb(200,200,200)]">
              30 Nov 2025
            </p>
            <p className="font-[Manrope] font-normal text-[18px] leading-[100%]  tracking-[8.25px] text-center text-[rgb(200,200,200)]">
              3 Passengers
            </p>
          </div>
          <Button
            variant="ghost"
            className="
            absolute
            bottom-6
              h-[48px]
              bg-white/10
              border border-white/20
              rounded-[12px]
              px-[24px]
              py-[12px]
              flex items-center justify-center gap-[8px]
              backdrop-blur-md
              hover:bg-white/20

             left-1/2 -translate-x-1/2

            "
          >
            <p
              className="
                text-white 
                font-normal 
                text-[16px] 
                leading-[24px]
                tracking-[0px]
                font-[Manrope]
              "
            >
              Change Services
            </p>
          </Button>
        </div>
      </section>

      <section className="overflow-visible w-full max-w-[1240px] mx-auto mt-20 mb-26 px-4 relative">
        <div className="flex gap-4">
          <form className="space-y-4 h-auto flex-2">
            <BillingInformation />
            <BillingAddress />
          </form>

          <div className="h-full flex-1 space-y-4">
            <div className="bg-[#7B5A411C] rounded-2xl p-5">
              <h4 className="font-[Manrope] font-semibold">
                Quote for Elite Package{" "}
              </h4>
              <span className="block w-full h-0.5 my-2 bg-[#CFCFCF]"></span>
              <ul className="space-y-3">
                <li className="font-semibold text-[#62697D] my-2">
                  London Gatwick Airport - LGW{" "}
                </li>
                <li className="flex gap-2 items-center font-semibold text-[#62697D]">
                  <Arraival /> Arraival
                </li>
                <li className="flex gap-2 items-center font-semibold text-[#62697D]">
                  <Calender /> 30 Nov 2025
                </li>
              </ul>
              <span className="block w-full h-0.5 my-2 bg-[#CFCFCF]"></span>
              <ul className="space-y-3">
                <li className="flex gap-2 items-center font-semibold text-[#62697D]">
                  <Adults /> 1 Adult
                </li>
                <li className="flex gap-2 items-center font-semibold text-[#62697D]">
                  <Adults /> 2 Children
                </li>
              </ul>
              <span className="block w-full h-0.5 my-2 bg-[#CFCFCF]"></span>
              <p className="flex justify-between font-semibold">
                Total: <span>100$</span>
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5">
              <h4 className="font-[Manrope] font-semibold">Steps</h4>
              <ul className="space-y-2 mt-2">
                {/* current tap */}
                <li className="p-2 flex items-center bg-[#7B5A4133] rounded-md">
                  <p>
                    <span className="inline-block text-center rounded-full w-6 h-6 mr-2 bg-[#7B5A41] text-white">
                      1
                    </span>{" "}
                    Choose Service
                  </p>
                </li>

                <li className="p-2 flex items-center">
                  <p>
                    <span className="inline-block text-center rounded-full w-6 h-6 mr-2 bg-[#F4F4F4] text-[#7a7a7a]">
                      2
                    </span>
                    Flight Information
                  </p>
                </li>
                <li className="p-2 flex items-center">
                  <p>
                    <span className="inline-block text-center rounded-full w-6 h-6 mr-2 bg-[#F4F4F4] text-[#7a7a7a]">
                      3
                    </span>
                    Passengers details
                  </p>
                </li>
                <li className="p-2 flex items-center">
                  <p>
                    <span className="inline-block text-center rounded-full w-6 h-6 mr-2 bg-[#F4F4F4] text-[#7a7a7a]">
                      4
                    </span>
                    Additional Services
                  </p>
                </li>
                <li className="p-2 flex items-center">
                  <p>
                    <span className="inline-block text-center rounded-full w-6 h-6 mr-2 bg-[#F4F4F4] text-[#7a7a7a]">
                      5
                    </span>
                    Billing Information
                  </p>
                </li>
              </ul>
            </div>
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
          <p className="text-sm font-normal font-[Manrope]">Proceed To Checkout </p>
        </Button>
      </section>
      <Footer />
    </main>
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
        <Checkbox id="as_primary_passengers" />
        <Label
          htmlFor="as_primary_passengers"
          className="text-sm leading-relaxed cursor-pointer"
        >
          Same as a primary passenger
        </Label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6 w-full">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <SearchWithDropdown
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
