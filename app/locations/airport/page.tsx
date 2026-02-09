"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import hero from "@/public/our-sercives-hero.jpg";
import { ArrowUpRight, Mail } from "lucide-react";
import Image from "next/image";
import serviceImage from "@/public/arravial package.jpg";
export default function Locations() {
  return (
    <main className="relative font-[Manrope] bg-[#F7F7F6] max-w-screen overflow-hidden">
      <Header />
      <section className="relative w-full h-114 text-white flex items-center justify-center">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={hero}
            alt="background"
            fill
            className="object-cover object-[50%_20%] w-full h-full"
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
        <div className="relative z-10">
          <h1 className=" font-[Manrope] text-[30px] leading-[130%] tracking-[3px] text-center mb-4.25">
            London Gatwick Airport - LGW
          </h1>

          <p className=" font-[Manrope] font-normal w-250 mx-auto text-[14.25px] tracking-[1.5px] text-center text-[rgb(200,200,200)]">
            We enhance every stage of your journey, from arrival and departure
            to connecting flights, with professional VIP assistance—available to
            all passengers, across all airlines and travel classes.
          </p>
        </div>
      </section>
      <section className="my-11.25 px-8">
        <div className=" max-w-410 mx-auto px-10">
          <p className="text-[#8E8E93] font-medium">Choose how to travel</p>
          <h3 className="text-[22px] tracking-[7px] uppercase mb-7">
            Services Level Available{" "}
          </h3>
          <div className="flex gap-6">
            <div className="flex-3 space-y-6">
              <div className="bg-white px-8 py-5 rounded-xl shadow-sm">
                <h2
                  style={{
                    fontFamily: "Manrope",
                    fontWeight: 400,
                    fontStyle: "Regular",
                    fontSize: "20px",
                    color: "#0A0A0A",

                    lineHeight: "40.03px",
                    letterSpacing: "0px",
                  }}
                >
                  ELITE
                </h2>
                <p
                  style={{
                    fontFamily: "Manrope",
                    fontWeight: 400,
                    fontStyle: "Regular",
                    fontSize: "12.51px",
                    lineHeight: "18.77px",
                    letterSpacing: "1.88px",
                    color: "#7B5A41",

                    textTransform: "uppercase",
                  }}
                >
                  VIP Meet & Greet
                </p>

                <p
                  style={{
                    fontFamily: "Manrope",
                    fontWeight: 400,
                    fontStyle: "Regular",
                    fontSize: "13px",
                    color: "#6D6D6D",
                    lineHeight: "28.46px",
                  }}
                >
                  Upon arrival, our airport meet & greet greeter will welcome
                  you at the aircraft or air bridge, escort you through Fast
                  Track immigration, assist with baggage claim, and coordinate
                  your transfer to your waiting chauffeur for a smooth,
                  stress-free airport arrival experience
                </p>
                <div className="flex gap-24 relative">
                  <div
                    className="h-[373px] w-[166px] p-[2px]"
                    style={{
                      background:
                        "linear-gradient(120deg, rgba(161, 101, 56) 0%, rgba(0,0,0,0) 15%, rgba(0,0,0,0) 85%, rgba(161,101,56,1) 100%)",
                    }}
                  >
                    <div className="relative w-full h-full bg-[#f2f1ef]">
                      <Image
                        alt="service image"
                        src={serviceImage}
                        width={180}
                        height={258}
                        className="absolute top-1/2  left-1/2 -translate-y-1/2  w-45 h-64.5 object-cover border border-gray-300"
                      />
                    </div>
                  </div>
                  <div>
                    <p
                      style={{
                        fontFamily: "Manrope",
                        fontWeight: 700,
                        fontStyle: "Bold",
                        fontSize: "16px",
                        lineHeight: "46.04px",
                        letterSpacing: "4.6px",
                        verticalAlign: "middle",
                        color: "#878989",
                        textTransform: "uppercase",
                      }}
                    >
                      Arrival
                    </p>
                    <ul className="list-disc ml-5">
                      <li>Exclusive one-to-one service</li>
                      <li>Meet and Greet at the gate</li>
                      <li>
                        Fast Track or Expedited through immigration and customs
                      </li>
                      <li>Assistance with luggage collection</li>
                      <li>
                        Porter Service (if necessary, additional fees may apply)
                      </li>
                      <li>Escort to your vehicle</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="bg-white px-8 py-5 rounded-xl shadow-sm">
                <h2
                  style={{
                    fontFamily: "Manrope",
                    fontWeight: 400,
                    fontStyle: "Regular",
                    fontSize: "20px",
                    color: "#0A0A0A",

                    lineHeight: "40.03px",
                    letterSpacing: "0px",
                  }}
                >
                  ELITE
                </h2>
                <p
                  style={{
                    fontFamily: "Manrope",
                    fontWeight: 400,
                    fontStyle: "Regular",
                    fontSize: "12.51px",
                    lineHeight: "18.77px",
                    letterSpacing: "1.88px",
                    color: "#7B5A41",

                    textTransform: "uppercase",
                  }}
                >
                  VIP Meet & Greet
                </p>

                <p
                  style={{
                    fontFamily: "Manrope",
                    fontWeight: 400,
                    fontStyle: "Regular",
                    fontSize: "13px",
                    color: "#6D6D6D",
                    lineHeight: "28.46px",
                  }}
                >
                  Upon arrival, our airport meet & greet greeter will welcome
                  you at the aircraft or air bridge, escort you through Fast
                  Track immigration, assist with baggage claim, and coordinate
                  your transfer to your waiting chauffeur for a smooth,
                  stress-free airport arrival experience
                </p>
                <div className="flex gap-24 relative">
                  <div
                    className="h-[373px] w-[166px] p-[2px]"
                    style={{
                      background:
                        "linear-gradient(120deg, rgba(161, 101, 56) 0%, rgba(0,0,0,0) 15%, rgba(0,0,0,0) 85%, rgba(161,101,56,1) 100%)",
                    }}
                  >
                    <div className="relative w-full h-full bg-[#f2f1ef]">
                      <Image
                        alt="service image"
                        src={serviceImage}
                        width={180}
                        height={258}
                        className="absolute top-1/2  left-1/2 -translate-y-1/2  w-45 h-64.5 object-cover border border-gray-300"
                      />
                    </div>
                  </div>
                  <div>
                    <p
                      style={{
                        fontFamily: "Manrope",
                        fontWeight: 700,
                        fontStyle: "Bold",
                        fontSize: "16px",
                        lineHeight: "46.04px",
                        letterSpacing: "4.6px",
                        verticalAlign: "middle",
                        color: "#878989",
                        textTransform: "uppercase",
                      }}
                    >
                      Arrival
                    </p>
                    <ul className="list-disc ml-5">
                      <li>Exclusive one-to-one service</li>
                      <li>Meet and Greet at the gate</li>
                      <li>
                        Fast Track or Expedited through immigration and customs
                      </li>
                      <li>Assistance with luggage collection</li>
                      <li>
                        Porter Service (if necessary, additional fees may apply)
                      </li>
                      <li>Escort to your vehicle</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 h-fit space-y-6">
              <div className="py-6.5 px-4 h-fit bg-white rounded-xl shadow-sm">
                <form action="" className="space-y-3">
                  <h4
                    className=""
                    style={{
                      fontFamily: "Manrope",
                      fontWeight: 600,
                      color: "#878989",
                      fontStyle: "SemiBold",
                      fontSize: "20.3px",
                      lineHeight: "100%",
                      letterSpacing: "0px",
                      textAlign: "center",
                    }}
                  >
                    Quote for VIP Package
                  </h4>
                  <div>
                    <Label htmlFor="airport" className="mb-2">
                      airport
                    </Label>
                    <Input />
                  </div>
                  <div>
                    <Label htmlFor="service_type" className="mb-2">
                      Service Type
                    </Label>
                    <Input />
                  </div>
                  <div>
                    <Label htmlFor="passengers" className="mb-2">
                      Passengers
                    </Label>
                    <Input />
                  </div>
                  <div>
                    <Label htmlFor="date" className="mb-2">
                      Date
                    </Label>
                    <Input />
                  </div>

                  <Button
                    variant="outline"
                    className="w-full mb-3 border-black hover:bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)] hover:text-white hover:border-none duration-0"
                  >
                    Book now <ArrowUpRight />
                  </Button>
                </form>
              </div>
              <div className="py-6.5 px-4 h-fit bg-white rounded-xl shadow-sm">
                <div className="">
                  <h4 className="font-[Manrope] font-semibold">
                    Need more information?
                  </h4>
                  <p className="text-sm text-[#7a7a7a] leading-[27px]">
                    Our dedicated team are available to discuss all aspects of
                    our service.
                  </p>
                  <ul className="text-[#7a7a7a] space-y-2 mt-2">
                    <li className="flex gap-2">
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
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
