import { ServiceType } from "@/store/vipInputsStore";
import { ServiceTypeData } from "./types/package";
import { PackageSlug } from "./types/airport";
import {
  AirportAgent,
  AirportExiting,
  BaggageHandling,
  Boarding,
  ChauffeurServiceIcon,
  CheckIn,
  FastTrackSecurity,
  FastTrackSpecialLane,
  GolfCart,
  PassportControl,
  PrivateImmigration,
  PrivateLounge,
  PrivateSecurity,
  TransferToSecondGate,
} from "@/components/custom icons/feature-icons";
export type fixedPackageData = {
  subTitle: string;
} & Record<ServiceType, ServiceTypeData>;

// export const packageFeatures: Record<
//   PackageSlug,
//   Record<ServiceType, ServiceTypeData>
// > = {

export const packageFeatures: Record<PackageSlug, fixedPackageData> = {
  elite: {
    subTitle: "VIP Meet & Greet",
    arrival: {
      description:
        "Upon arrival, your greeter will meet you at the aircraft or airbridge, escort you through fast-track immigration, assist with baggage claim, and coordinate your transfer to the waiting driver—ensuring a smooth and effortless airport arrival experience.",
      features: [
        {
          icon: AirportAgent,
          title: "Airport Agent",
          description: "Personalised sign meet at gate",
        },
        {
          icon: GolfCart,
          title: "Golf Cart",
          description: "Buggy to immigration (where available).",
        },
        {
          icon: PassportControl,
          title: "Passport Control",
          description: "Guided to immigration.",
        },
        {
          icon: FastTrackSpecialLane,
          title: "Fast Track - Special lane",
          description: "Immigration fast-track",
        },
        {
          icon: BaggageHandling,
          title: "Baggage Handling",
          description: "Baggage assistance",
        },
        {
          icon: AirportExiting,
          title: "Airport Exiting",
          description: "Escorted to the curbside.",
        },
      ],
    },
    departure: {
      description:
        "On departure, our greeter will contact you in advance to arrange a meeting point. Upon arrival at the airport, you will be met at the entrance and fast-tracked through check-in and security, then escorted to the lounge (if applicable) and onward to your boarding gate for a seamless departure experience.",
      features: [
        {
          icon: AirportAgent,
          title: "Airport Agent",
          description: "Personalised sign meet at gate",
        },
        {
          icon: BaggageHandling,
          title: "Baggage Handling",
          description: "Baggage assistance",
        },
        {
          icon: CheckIn,
          title: "Check In.",
          description: "Assistance with check-in.",
        },
        {
          icon: FastTrackSecurity,
          title: "Fast Track - Security.",
          description: "Escort passengers to security",
        },
        {
          icon: GolfCart,
          title: "Golf Cart",
          description: "Buggy to gate (where available).",
        },
        {
          icon: Boarding,
          title: "Boarding.",
          description: "Escort to the boarding gate.",
        },
      ],
    },
    connection: {
      description:
        "On connection, our greeters will meet you at the aircraft or the air bridge carrying identifying signs. They will escort you through security and to the lounge (if applicable) and your connecting flight.",
      features: [
        {
          icon: AirportAgent,
          title: "Airport Agent",
          description: "Personalised sign meet at gate",
        },
        {
          icon: GolfCart,
          title: "Golf Cart",
          description: "Buggy to immigration (where available).",
        },

        {
          icon: TransferToSecondGate,
          title: "Transfer to the second gate.",
          description: "Escort to same or other terminal.",
        },
        {
          icon: FastTrackSecurity,
          title: "Fast Track - Security.",
          description: "Escort passengers to security",
        },
        {
          icon: Boarding,
          title: "Boarding",
          description: "Escort to the boarding gate",
        },
      ],
    },
  },

  elite_plus: {
    subTitle: "VIP Meet & Greet Plus Transfer",

    arrival: {
      description:
        "Upon arrival, your greeter will meet you at the aircraft or airbridge, escort you through fast-track immigration, assist with baggage claim, and coordinate your transfer to the waiting driver—ensuring a smooth and effortless airport arrival experience.",
      features: [
        // ممكن تاخد elite وتزود عليه
        {
          icon: AirportAgent,
          title: "Airport Agent",
          description: "Personalised sign meet at gate",
        },
        {
          icon: GolfCart,
          title: "Golf Cart",
          description: "Buggy to immigration (where available).",
        },
        {
          icon: PassportControl,
          title: "Passport Control",
          description: "Guided to immigration.",
        },
        {
          icon: FastTrackSpecialLane,
          title: "Fast Track - Special lane",
          description: "Immigration fast-track",
        },
        {
          icon: BaggageHandling,
          title: "Baggage Handling",
          description: "Baggage assistance",
        },
        {
          icon: AirportExiting,
          title: "Airport Exiting",
          description: "Escorted to the curbside.",
        },
        {
          icon: ChauffeurServiceIcon,
          title: "Chauffeur Service",
          description: "Greeted by a professional chauffeur.",
        },
      ],
    },
    departure: {
      description:
        "On departure, one of our professional chauffeurs will collect you from your door and transport you to the airport. Upon arrival, you will be met at the terminal entrance, fast-tracked through check-in and security, and escorted to the lounge (if applicable) and onward to your boarding gate for a smooth and effortless departure experience.",
      features: [
        {
          icon: ChauffeurServiceIcon,
          title: "Chauffeur Service",
          description:
            "Greeted at your door by one of our professional chauffeurs.",
        },
        {
          icon: AirportAgent,
          title: "Airport Agent",
          description: "Personalised sign meet at gate",
        },
        {
          icon: BaggageHandling,
          title: "Baggage Handling",
          description: "Baggage assistance",
        },
        {
          icon: CheckIn,
          title: "Check In.",
          description: "Assistance with check-in.",
        },
        {
          icon: FastTrackSecurity,
          title: "Fast Track - Security.",
          description: "Escort passengers to security",
        },
        {
          icon: GolfCart,
          title: "Golf Cart",
          description: "Buggy to gate (where available).",
        },
        {
          icon: Boarding,
          title: "Boarding.",
          description: "Escort to the boarding gate.",
        },
      ],
    },
    connection: {
      description:
        "Our greeters will meet you at the aircraft or air bridge with a personalised sign, escort you through immigration, assist with luggage collection, and arrange a private transfer to the second terminal if required. They will also assist with check-in, escort you through security, and guide you to the lounge (if applicable) and your connecting flight.",
      features: [
        {
          icon: AirportAgent,
          title: "Airport Agent",
          description: "Personalised sign meet at gate",
        },
        {
          icon: GolfCart,
          title: "Golf Cart",
          description: "Buggy to immigration (where available).",
        },
        {
          icon: PassportControl,
          title: "Passport Control",
          description: "Immigration fast-track",
        },
        {
          icon: BaggageHandling,
          title: "Baggage Handling",
          description: "Baggage assistance",
        },
        {
          icon: ChauffeurServiceIcon,
          title: "Chauffeur Service",
          description: "Landside chauffeur transfer to second terminal.",
        },
        {
          icon: CheckIn,
          title: "Check In.",
          description: "Assistance with check-in.",
        },
        {
          icon: FastTrackSecurity,
          title: "Fast Track - Security ",
          description: "Escort passengers to security",
        },
        {
          icon: Boarding,
          title: "Boarding",
          description: "Escort to the boarding gate",
        },
      ],
    },
  },

  signature: {
    subTitle: "Private Suite",

    arrival: {
      description:
        "Elevate your journey with our VIP Private Suite, created for travellers seeking ultimate privacy and exclusivity. Enjoy a personal greeting at the aircraft, private luxury vehicle transfer, and discreet escort to an exclusive VVIP lounge, with luggage handled seamlessly for a truly effortless arrival.",
      features: [
        {
          icon: AirportAgent,
          title: "Airport Agent",
          description: "Personalised sign meet at gate",
        },
        {
          icon: ChauffeurServiceIcon,
          title: "Chauffeur Service",
          description: "Greeted by a professional chauffeur.",
        },
        {
          icon: PrivateImmigration,
          title: "Private immigration.",
          description: "Exclusive immigration service",
        },
        {
          icon: PrivateLounge,
          title: "Private Lounge.",
          description: "Access to a private lounge.",
        },
        {
          icon: BaggageHandling,
          title: "Baggage Handling",
          description: "Baggage assistance",
        },
        {
          icon: ChauffeurServiceIcon,
          title: "Chauffeur Service",
          description: "Greeted by a professional chauffeur.",
        },
      ],
    },
    departure: {
      description:
        "Welcome to our private suite, where a dedicated doorman and personal butler await your arrival. Relax in your exclusive lounge while security and immigration formalities are handled seamlessly. When it’s time to depart, enjoy a luxury private transfer directly to your aircraft for a truly effortless experience.",
      features: [
        {
          icon: ChauffeurServiceIcon,
          title: "Chauffeur Service",
          description:
            "Greeted at your door by one of our professional chauffeurs.",
        },
        {
          icon: AirportAgent,
          title: "Airport Agent",
          description: "Personalised sign meet at gate",
        },
        {
          icon: BaggageHandling,
          title: "Baggage Handling",
          description: "Baggage assistance",
        },
        {
          icon: CheckIn,
          title: "Check In.",
          description: "Assistance with check-in.",
        },
        {
          icon: PrivateLounge,
          title: "Private Lounge.",
          description: "Access to a private lounge.",
        },
        {
          icon: PrivateSecurity,
          title: "Private Security.",
          description: "Exclusive Secuirty service",
        },
        {
          icon: ChauffeurServiceIcon,
          title: "Chauffeur Service",
          description: "Chauffeur transfer to the plane .",
        },
      ],
    },

    connection: {
      description:
        "Enjoy a seamless arrival with our VVIP airport concierge service. Be greeted at the aircraft, transferred by private luxury vehicle, and welcomed into an exclusive VIP lounge. Relax or dine from a seasonal gourmet menu. When it’s time, pass through private security and be driven to your aircraft in a luxury car.",
      features: [
        {
          icon: AirportAgent,
          title: "Airport Agent",
          description: "Personalised sign meet at gate",
        },
        {
          icon: ChauffeurServiceIcon,
          title: "Chauffeur Service",
          description: "Chauffeur transfer to the private lounge.",
        },
        {
          icon: PrivateImmigration,
          title: "Private immigration.",
          description: "Exclusive immigration service",
        },
        {
          icon: PrivateLounge,
          title: "Private Lounge.",
          description: "Access to a private lounge.",
        },
        {
          icon: PrivateSecurity,
          title: "Private Security.",
          description: "Exclusive Secuirty service",
        },
        {
          icon: ChauffeurServiceIcon,
          title: "Chauffeur Service",
          description: "Chauffeur transfer to the plane .",
        },
      ],
    },
  },

  vip: {
    subTitle: "The Salon",
    arrival: {
      description:
        "Elevate your journey with our VIP Private Suite, created for travellers seeking ultimate privacy and exclusivity. Enjoy a personal greeting at the aircraft, private luxury vehicle transfer, and discreet escort to an exclusive VVIP lounge, with luggage handled seamlessly for a truly effortless arrival.",
      features: [
        {
          icon: AirportAgent,
          title: "Airport Agent",
          description: "Personalised sign meet at gate",
        },
        {
          icon: ChauffeurServiceIcon,
          title: "Chauffeur Service",
          description: "Greeted by a professional chauffeur.",
        },
        {
          icon: PrivateImmigration,
          title: "Private immigration.",
          description: "Exclusive immigration service",
        },
        {
          icon: PrivateLounge,
          title: "Private Lounge.",
          description: "Access to a private lounge.",
        },
        {
          icon: BaggageHandling,
          title: "Baggage Handling",
          description: "Baggage assistance",
        },
        {
          icon: ChauffeurServiceIcon,
          title: "Chauffeur Service",
          description: "Greeted by a professional chauffeur.",
        },
      ],
    },
    departure: {
      description:
        "Welcome to our private suite, where a dedicated doorman and personal butler await your arrival. Relax in your exclusive lounge while security and immigration formalities are handled seamlessly. When it’s time to depart, enjoy a luxury private transfer directly to your aircraft for a truly effortless experience.",
      features: [
        {
          icon: ChauffeurServiceIcon,
          title: "Chauffeur Service",
          description:
            "Greeted at your door by one of our professional chauffeurs.",
        },
        {
          icon: AirportAgent,
          title: "Airport Agent",
          description: "Personalised sign meet at gate",
        },
        {
          icon: BaggageHandling,
          title: "Baggage Handling",
          description: "Baggage assistance",
        },
        {
          icon: CheckIn,
          title: "Check In.",
          description: "Assistance with check-in.",
        },
        {
          icon: PrivateLounge,
          title: "Private Lounge.",
          description: "Access to a private lounge.",
        },
        {
          icon: PrivateSecurity,
          title: "Private Security.",
          description: "Exclusive Secuirty service",
        },
        {
          icon: ChauffeurServiceIcon,
          title: "Chauffeur Service",
          description: "Chauffeur transfer to the plane .",
        },
      ],
    },
    connection: {
      description:
        "Enjoy a seamless arrival with our VVIP airport concierge service. Be greeted at the aircraft, transferred by private luxury vehicle, and welcomed into an exclusive VIP lounge. Relax or dine from a seasonal gourmet menu. When it’s time, pass through private security and be driven to your aircraft in a luxury car.",
      features: [
        {
          icon: AirportAgent,
          title: "Airport Agent",
          description: "Personalised sign meet at gate",
        },
        {
          icon: ChauffeurServiceIcon,
          title: "Chauffeur Service",
          description: "Chauffeur transfer to the private lounge.",
        },
        {
          icon: PrivateImmigration,
          title: "Private immigration.",
          description: "Exclusive immigration service",
        },
        {
          icon: PrivateLounge,
          title: "Private Lounge.",
          description: "Access to a private lounge.",
        },
        {
          icon: PrivateSecurity,
          title: "Private Security.",
          description: "Exclusive Secuirty service",
        },
        {
          icon: ChauffeurServiceIcon,
          title: "Chauffeur Service",
          description: "Chauffeur transfer to the plane .",
        },
      ],
    },
  },
};
