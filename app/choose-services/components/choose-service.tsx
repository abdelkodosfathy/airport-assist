"use client";

import { useState } from "react";
import ServiceCard from "./ServiceCard";
import { Service } from "@/types/service";

type Props = {};
const services: Service[] = [
  {
    title: "ELITE",
    sub_title: "VIP Meet & Greet",
    value: "elite",
  },
  {
    title: "ELITE PLUS",
    sub_title: "VIP Meet & Greet Plus Transfer",
    value: "elite_plus",
  },
  {
    title: "SIGNATURE",
    sub_title: "Private Suite",
    value: "signature",
  },
];
const ChooseService = (props: Props) => {
  const [selectedService, setSelectedService] = useState<
    "elite" | "elite_plus" | "signature"
  >("elite");
  return (
    <div className="flex-2 h-full">
    <div
      style={{
        boxShadow: "0px 11.48px 114.76px 0px #A7A7A73D",
      }}
      className="px-10 py-6 bg-white rounded-2xl h-full "
    >
      <h4 className="text-normal">
        Kindly review the service descriptions below and confirm your selection.
      </h4>
      {services.map((s) => {
        return (
          <ServiceCard
            selectedService={selectedService}
            key={s.value}
            service={s}
            onSelect={(value) => setSelectedService(value)}
          />
        );
      })}
    </div>
    </div>
  );
};

export default ChooseService;
