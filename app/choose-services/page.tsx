import Adults from "@/components/custom icons/adults";
import Arraival from "@/components/custom icons/arraival";
import Calender from "@/components/custom icons/calender";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import hero from "@/public/our-sercives-hero.jpg";
import Image from "next/image";
import ChooseService from "./components/choose-service";
import { Mail } from "lucide-react";
import Link from "next/link";

export default function ChooseServices() {
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
        <p className="font-[Manrope] font-medium text-[15.53px] leading-[130%] text-gray-400 mb-3">
          Choose how to travel
        </p>
        <h2 className="font-[Manrope] font-normal text-[22.6px] leading-[100%] tracking-[7.06px] uppercase mb-6">
          Services Level Available
        </h2>
        <div className="flex gap-4">
          <ChooseService />
          <div className="h-full flex-1 space-y-4">
            <div className="bg-[#7B5A411C] rounded-2xl p-5">
              <h4 className="font-[Manrope] ">
                Quote for Elite Package{" "}
              </h4>
              <span className="block w-full h-0.5 my-2 bg-[#CFCFCF]"></span>
              <ul className="space-y-3">
                <li className=" text-[#62697D] my-2">
                  London Gatwick Airport - LGW{" "}
                </li>
                <li className="flex gap-2 items-center  text-[#62697D]">
                  <Arraival /> Arraival
                </li>
                <li className="flex gap-2 items-center  text-[#62697D]">
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

            <div className="bg-white rounded-2xl p-5">
              <h4 className="font-[Manrope] font-semibold">
                Need more information?
              </h4>
              <p className="text-sm text-[#7a7a7a] leading-[27px]">
                Our dedicated team are available to discuss all aspects of our
                service.
              </p>

              <ul className="text-[#7a7a7a] space-y-2 mt-2">
                <li className="flex gap-2 ">
                  <Mail />
                  <p>Contact@airport-assist.com</p>
                </li>
                <li className="flex gap-2">
                  <Mail />
                  <p>+44 20 4517 7711</p>
                </li>
                <li className="flex gap-2">
                  <Mail />
                  <p>Contact us via WhatsApp</p>
                </li>
              </ul>
            </div>
          </div>
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
          <Link href="/choose-services/flight-information">
            <p className="text-lg font-normal font-[Manrope]">Continue</p>
          </Link>
        </Button>
      </section>
      <Footer />
    </main>
  );
}
