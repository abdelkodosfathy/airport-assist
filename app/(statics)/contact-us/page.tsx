"use client";
import customMail from "@/public/cutomMail.svg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import CustomPhoneInput from "@/components/ui/phone-input";

export default function ContactUsPage() {
  return (
    <div className="flex gap-4">
      <ContactDetails />
      <div className="shadow-md px-9 py-7.5 bg-white rounded-2xl flex-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 w-full">
          <div className="space-y-2 col-span-1 mb-6">
            <Label htmlFor="first-name" className="font-semibold text-[15px]">
              First Name
            </Label>
            <Input
              id="first-name"
              placeholder="Enter First Name"
              className="pl-4 pr-10 py-5.5 rounded-xl bg-[#F4F4F4] border border-[#E0E0E0]"
            />
          </div>
          <div className="space-y-2 col-span-1 mb-6">
            <Label htmlFor="last-name" className="font-semibold text-[15px]">
              Last Name
            </Label>
            <Input
              id="last-name"
              placeholder="Enter Last Name"
              className="pl-4 pr-10 rounded-xl py-5.5 bg-[#F4F4F4] border border-[#E0E0E0]"
            />
          </div>

          <div className="space-y-2 col-span-1 mb-6">
            <Label htmlFor="first-name" className="font-semibold text-[15px]">
              Email
            </Label>
            <Input
              id="email"
              placeholder="Example@gamil.com"
              className="pl-4 pr-10 rounded-xl py-5.5 bg-[#F4F4F4] border border-[#E0E0E0]"
            />
          </div>
          {/* <div className="space-y-2 col-span-1 mb-6">
            <Label htmlFor="last-name" className="font-semibold text-[15px]">
              Phone
            </Label>
            <PhoneInput
              defaultCountry="us"
              placeholder="0101 434 3413"
              inputClassName="bg-[#F4F4F4] rounded-lg w-full h-full pl-4 pr-10  py-5.5 "
            />
          </div> */}
          <div className="space-y-2 col-span-1 mb-6">
            <Label htmlFor="last-name" className="font-semibold text-[15px]">
              Phone
            </Label>
            <CustomPhoneInput />
          </div>
          <div className="space-y-2 col-span-2 mb-6">
            <Label htmlFor="first-name" className="font-semibold text-[15px]">
              Message
            </Label>
            <Textarea
              id="email"
              placeholder="Write your message here..."
              className="p-7.5 rounded-xl bg-[#F4F4F4] border border-[#E0E0E0]"
            />
          </div>
          <Button
            variant="outline"
            className="
              w-max
              mt-4
              px-10
              py-5
              cursor-pointer 
              border-[#D1D1D1] 
              text-[#7A7A7A] 
              bg-[#ECECEC]
              hover:border-[#664F31]  
              hover:bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)] 
              hover:text-white 
              duration-0
              rounded-xl
            "
          >
            Supmit <ArrowRight />
          </Button>
        </div>
      </div>
    </div>
  );
}

const ContactDetails = () => {
  return (
    <div className="flex-1 rounded-2xl bg-[#7B5A411C] px-8 py-2.5 shadow-md">
      <h3 className="font-[Manrope] text-[18.75px] font-semibold leading-[62.19px] tracking-[-0.99px]">
        Contact details
      </h3>

      <p className="font-[Manrope] text-[13.5px] font-normal leading-[27.14px] tracking-[-0.36px] text-[#62697D]">
        Our dedicated team are available to discuss all aspects of our service.
      </p>

      <ul className="space-y-2 mt-2">
        <ContactItem title="Email" content="contact@defichain.com" />
        <ContactItem title="Phone" content="+44 20 7946 0958" />
        <ContactItem title="Whatsapp" content="+44 7700 900123" />
        <ContactItem title="Address" content="221B Baker Street, Marylebone" />
      </ul>
    </div>
  );
};

const ContactItem = ({
  title,
  content,
}: {
  title: string;
  content: string;
}) => {
  return (
    <li className="flex items-center gap-2">
      {/* <CustomMail /> */}
      <Image alt="mail" src={customMail} className="w-11 h-11" />
      <div>
        <p className="font-[Manrope] text-[15px] font-normal leading-[22.61px] tracking-[-0.36px] text-[#62697D]">
          {title}
        </p>
        <p>{content}</p>
      </div>
    </li>
  );
};
