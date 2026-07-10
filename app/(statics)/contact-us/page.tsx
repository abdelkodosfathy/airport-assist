"use client";
// import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight } from "lucide-react";
import CustomPhoneInput from "@/components/ui/phone-input";
// import { ReactNode } from "react";

import { Mail, Phone } from "lucide-react";
// import Whatsapp from "@/components/custom icons/whatsapp";
import MainButton from "@/components/MainButton";

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
          <MainButton>
          Supmit <ArrowRight />

          </MainButton>
          {/* <Button
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
          </Button> */}
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

     
      <ul className="normal-case text-[#7a7a7a] space-y-2 mt-2">
        <li className="flex gap-2 items-center ">
          <div className="w-8 h-8 rounded-full bg-white shadow-sm grid place-items-center border border-[#E0E0E0]">
            <Mail size={16} color="#a7a7a7" />
          </div>
          <p>Contact@airport-assist.com</p>
        </li>
        <li className="flex gap-2 items-center ">
          <div className="w-8 h-8 rounded-full bg-white shadow-sm grid place-items-center border border-[#E0E0E0]">
            <Phone size={16} color="#a7a7a7" />
          </div>

          <p>+44 20 4517 7711</p>
        </li>
        <li className="flex gap-2 items-center ">
          <div className="w-8 h-8 rounded-full bg-white shadow-sm grid place-items-center border border-[#E0E0E0]">
            <svg viewBox="0 0 24 24" fill="none" width={16} height={16}>
              <path
                d="M12 2a10 10 0 00-8.5 15.3L2 22l4.8-1.5A10 10 0 1012 2z"
                stroke="#a7a7a7"
                strokeWidth={1.6}
              />
              <path
                d="M8.5 8.5c0 3 3 6 6 6 .8 0 1.3-.4 1.6-1l-1.8-1-1 .8c-1.2-.5-2.3-1.6-2.8-2.8l.8-1-1-1.8c-.6.3-1 .8-.8 1.8z"
                fill="currentColor"
              />
            </svg>
          </div>

          <p>Contact us via WhatsApp</p>
        </li>
      </ul>
    </div>
  );
};

// const ContactItem = ({
//   title,
//   content,
//   icon,
// }: {
//   title: string;
//   content: string;
//   icon: ReactNode;
// }) => {
//   return (
//     <li className="flex items-center gap-2">
//       {/* <Image alt="mail" src={icon} className="w-11 h-11" /> */}
//       {icon}
//       <div>
//         <p className="font-[Manrope] text-[15px] font-normal leading-[22.61px] tracking-[-0.36px] text-[#62697D]">
//           {title}
//         </p>
//         <p>{content}</p>
//       </div>
//     </li>
//   );
// };
