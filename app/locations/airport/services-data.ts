import { AirportPackage } from "@/lib/types/airport";
import { StaticImageData } from "next/image";

export type PackageCardProps = {
  pkg: AirportPackage;
  index: number;
  serviceImage: StaticImageData;
};
// ---- Service Item ----
export type ServiceItem = {
  title: string;
  description: string;
};

// ---- Package ----
export type Package = {
  title: string;
  service: ServiceItem[];
  features: string[];
};

// ---- All Packages Object ----
export type PkgData = {
  elite: Package;
  elite_plus: Package;
  signature: Package;
  vip: Package;
};

export const pkgData: PkgData = {
  elite: {
    title: "Elite",
    service: [
      {
        title: "ARRIVAL",
        description:
          "Upon arrival, our airport meet & greet greeter will welcome you at the aircraft or air bridge, escort you through Fast Track immigration, assist with baggage claim, and coordinate your transfer to your waiting chauffeur for a smooth, stress-free airport arrival experience.",
      },
      {
        title: "Departure",
        description:
          "For departures, our airport meet & greet service welcomes you at the terminal, fast-tracks you through check-in and security, and escorts you to the lounge and boarding gate for a smooth, stress-free journey.",
      },
      {
        title: "Connections",
        description:
          "For flight connections, our airport meet & greet service welcomes you at the aircraft or air bridge, escorts you through security, and guides you to the lounge (if applicable) and onward to your connecting flight for a smooth, stress-free transfer.",
      },
    ],
    features: [
      "Exclusive one-to-one service",
      "Meet and Greet at the gate",
      "Fast Track or Expedited through immigration and customs",
      "Assistance with luggage collection",
      "Porter Service (if necessary, additional fees may apply)",
      "Escort to your vehicle",
    ],
  },
  elite_plus: {
    title: "Elite Plus",
    service: [
      {
        title: "ARRIVAL",
        description:
          "Upon arrival, our airport meet & greet greeter will welcome you at the aircraft or air bridge, escort you through Fast Track immigration, assist with baggage claim, and coordinate your transfer to your waiting chauffeur for a smooth, stress-free airport arrival experience.",
      },
      {
        title: "Departure",
        description:
          "For departures, our airport meet & greet service welcomes you at the terminal, fast-tracks you through check-in and security, and escorts you to the lounge and boarding gate for a smooth, stress-free journey.",
      },
      {
        title: "Connections",
        description:
          "For flight connections, our airport meet & greet service welcomes you at the aircraft or air bridge, escorts you through security, and guides you to the lounge (if applicable) and onward to your connecting flight for a smooth, stress-free transfer.",
      },
    ],
    features: [
      "Exclusive one-to-one service",
      "Meet and Greet at the gate",
      "Fast Track or Expedited through immigration and customs",
      "Assistance with luggage collection",
      "Porter Service (if necessary, additional fees may apply)",
      "Escort to your vehicle",
    ],
  },
  signature: {
    title: "Signature",
    service: [
      {
        title: "ARRIVAL",
        description:
          "Upon arrival, our airport meet & greet greeter will welcome you at the aircraft or air bridge, escort you through Fast Track immigration, assist with baggage claim, and coordinate your transfer to your waiting chauffeur for a smooth, stress-free airport arrival experience.",
      },
      {
        title: "Departure",
        description:
          "For departures, our airport meet & greet service welcomes you at the terminal, fast-tracks you through check-in and security, and escorts you to the lounge and boarding gate for a smooth, stress-free journey.",
      },
      {
        title: "Connections",
        description:
          "For flight connections, our airport meet & greet service welcomes you at the aircraft or air bridge, escorts you through security, and guides you to the lounge (if applicable) and onward to your connecting flight for a smooth, stress-free transfer.",
      },
    ],
    features: [
      "Exclusive one-to-one service",
      "Meet and Greet at the gate",
      "Fast Track or Expedited through immigration and customs",
      "Assistance with luggage collection",
      "Porter Service (if necessary, additional fees may apply)",
      "Escort to your vehicle",
    ],
  },
  vip: {
    title: "Signature",
    service: [
      {
        title: "ARRIVAL",
        description:
          "Upon arrival, our airport meet & greet greeter will welcome you at the aircraft or air bridge, escort you through Fast Track immigration, assist with baggage claim, and coordinate your transfer to your waiting chauffeur for a smooth, stress-free airport arrival experience.",
      },
      {
        title: "Departure",
        description:
          "For departures, our airport meet & greet service welcomes you at the terminal, fast-tracks you through check-in and security, and escorts you to the lounge and boarding gate for a smooth, stress-free journey.",
      },
      {
        title: "Connections",
        description:
          "For flight connections, our airport meet & greet service welcomes you at the aircraft or air bridge, escorts you through security, and guides you to the lounge (if applicable) and onward to your connecting flight for a smooth, stress-free transfer.",
      },
    ],
    features: [
      "Exclusive one-to-one service",
      "Meet and Greet at the gate",
      "Fast Track or Expedited through immigration and customs",
      "Assistance with luggage collection",
      "Porter Service (if necessary, additional fees may apply)",
      "Escort to your vehicle",
    ],
  },
};
