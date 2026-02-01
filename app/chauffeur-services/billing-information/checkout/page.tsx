import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ArrowLeft,
  Calendar,
  Clock3,
  Clock4,
  Flag,
  Gauge,
  Info,
  Mail,
  MapPin,
  Phone,
  User,
} from "lucide-react";
import Link from "next/link";
import StrokeBag from "@/components/custom icons/strokeBag";
import FigmaMessage from "@/components/custom icons/adults copy";
import Separator from "@/components/ui/formSeparator";
import Image from "next/image";
import car1 from "@/public/car1.png";
import InnerToast from "@/components/ui/InnerToast";
import IconInput from "@/components/custom inputs/customInput";
import payments from "@/public/payments.png";

export default function Checkout() {
  return (
    <div>
      <Link
        href={"/meet-and-greet/flight-information/billing-information"}
        className="flex gap-2 mb-2 text-[#8E8E93]"
      >
        <ArrowLeft />
        <p> back to Billing Information</p>
      </Link>
      <div className="flex gap-4">
        <div className="flex-2 flex flex-col gap-4">
          <div
            className="px-10 py-6 w-full bg-white rounded-2xl"
            style={{
              boxShadow: "0px 11.48px 114.76px 0px #A7A7A73D",
            }}
          >
            <h2 className="text-[18.75px] mb-4 font-semibold">
              Contact Information
            </h2>
            <div className="space-y-4">
              <div className="flex gap-2">
                <User /> <p>mahmoud</p>
              </div>
              <div className="flex gap-4">
                <div className="flex gap-2">
                  <Mail /> <p>mahmoud@airportassist.com</p>
                </div>
                <div className="flex gap-2">
                  <Phone /> <p>+20 (101) 232-3422</p>
                </div>
              </div>
            </div>
          </div>
          <div
            className="px-10 py-6 w-full bg-white rounded-2xl space-y-4"
            style={{
              boxShadow: "0px 11.48px 114.76px 0px #A7A7A73D",
            }}
          >
            <h2 className="text-[18.75px] mb-4 font-semibold">
              One Way Transfer
            </h2>
            <div className="flex w-full">
              <p className="flex gap-2 flex-1">
                <Calendar color="#7B5A41" />
                Dec 03, 2025
              </p>
              <p className="flex gap-2 flex-1">
                <Clock4 color="#7B5A41" />
                2:50 PM
              </p>
            </div>
            <p className="flex gap-2">
              <MapPin color="#7B5A41" />
              SSS Ranch Napa, Mountain Home Ranch Road, Calistoga, CA, USA
            </p>
            <p className="flex gap-2">
              <Flag color="#7B5A41" />
              SSAM K-BBQ &BAR, Hopyard Road, Pleasanton, CA, USA
            </p>
            <div className="flex w-full">
              <p className="flex gap-2 flex-1">
                <Gauge color="#7B5A41" />
                138.57 km / 86.10 mi
              </p>
              <p className="flex gap-2 flex-1">
                <Clock3 color="#7B5A41" />
                1h 40m
              </p>
            </div>
          </div>
          <div
            className="px-10 py-6 w-full bg-white rounded-2xl"
            style={{
              boxShadow: "0px 11.48px 114.76px 0px #A7A7A73D",
            }}
          >
            <div className="flex gap-2 mb-2">
              <Image width={216} height={108.75} src={car1} alt="car image" />
              <div>
                <p className="flex gap-8 mb-2 font-semibold items-center">
                  S-Class Mercedes <Info className="w-5 h-5 text-[#99A1AF]" />
                </p>
                <p className="text-sm text-[#4A5565]">
                  Cadillac Escalade, Mercedes S-Class, or similar.
                </p>
              </div>

              {/* <div className="mb-4 flex gap-4 rounded-lg bg-[#FFFBEF] px-4 py-3 border border-[#7B5A414D] text-[#7B5A41]">
                <div className="min-w-6 min-h-6 w-6 h-6 bg-[#7B5A41] rounded-full grid place-content-center">
                  <Clock4 className="w-5 h-5 text-white" />
                </div>
                <p>Chauffeur will wait 15 minutes free of charge</p>
              </div> */}
            </div>
            <InnerToast
              icon={
                <div className="min-w-6 min-h-6 w-6 h-6 bg-[#7B5A41] rounded-full grid place-content-center">
                  <Clock4 className="w-5 h-5 text-white" />
                </div>
              }
              text="Chauffeur will wait 15 minutes free of charge"
            />
          </div>
          <div
            className="px-10 py-6 w-full bg-white rounded-2xl"
            style={{
              boxShadow: "0px 11.48px 114.76px 0px #A7A7A73D",
            }}
          >
            <div className="flex gap-2 items-center text-[#364153]">
              <StrokeBag />
              <p>Luggage assistance: $50</p>
            </div>
          </div>
          <div
            className="px-10 py-6 w-full bg-white rounded-2xl"
            style={{
              boxShadow: "0px 11.48px 114.76px 0px #A7A7A73D",
            }}
          >
            <div className="flex gap-2 items-center text-[#364153]">
              <FigmaMessage />
              <p>...</p>
            </div>
          </div>
          <div
            className="px-10 py-6 space-y-2 w-full bg-white rounded-2xl"
            style={{
              boxShadow: "0px 11.48px 114.76px 0px #A7A7A73D",
            }}
          >
            <p className="text-sm flex justify-between">
              Base fare <span>$1,486.25</span>
            </p>
            <p className="text-sm flex justify-between">
              Meet & greet<span>$50.00</span>
            </p>
            <p className="text-sm flex justify-between">
              Transactio fee<span>$64.65</span>
            </p>
            <Separator />
            <p  className="text-lg flex justify-between">
              Total <span>$1,600.90</span>
            </p>
          </div>
        </div>
        <div className="h-full flex-1 space-y-4 sticky top-26">
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
              <IconInput
                iconPosition="right"
                icon={
                  <Image
                    alt="payment ways"
                    src={payments}
                    width={105}
                    height={40}
                  />
                }
                id="cardNumber"
                className="pl-4 rounded-md pr-16 bg-[#F4F4F4] border border-[#E0E0E0]"
                inputClassName="border-none shadow-none "
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
                className="cursor-pointer w-6 h-6 rounded-md bg-[#F4F4F4] data-[state=checked]:bg-[#664F31] data-[state=checked]:border-[#664F31]"
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
                className="cursor-pointer w-6 h-6 rounded-md bg-[#F4F4F4] data-[state=checked]:bg-[#664F31] data-[state=checked]:border-[#664F31]"
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
								rounded-lg
								py-5
								px-7
								"
						>
              <p className="text-sm font-normal font-[Manrope]">
                Proceed To Checkout{" "}
              </p>
            </Button>
            <p className="text-[#74747A]  col-span-2 text-center">
              Secure checkout powered by{" "}
              <span className="font-bold">stripe</span>
            </p>
          </form>
        </div>
      </div>

    </div>
  );
}
