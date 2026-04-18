import { CarSlider } from "./types/carSlider";

import vclass_exterior from "@/public/cars/v-class/v-class_exterior.webp";
import vclass1 from "@/public/cars/v-class/img_1.webp";
import vclass2 from "@/public/cars/v-class/img_2.webp";
import vclass3 from "@/public/cars/v-class/img_3.webp";
import vclass4 from "@/public/cars/v-class/img_4.webp";

import jetClass_exterior from "@/public/cars/jet-class/v-class_exterior.webp";
import jetClass1 from "@/public/cars/jet-class/img_1.webp";
import jetClass2 from "@/public/cars/jet-class/img_2.webp";
import jetClass3 from "@/public/cars/jet-class/img_3.webp";
import jetClass4 from "@/public/cars/jet-class/img_4.webp";
import jetClass5 from "@/public/cars/jet-class/img_5.webp";

import sclass_exterior from "@/public/cars/s-class/s-class_exterior.webp";
import sclass1 from "@/public/cars/jet-class/img_1.webp";
import sclass2 from "@/public/cars/jet-class/img_2.webp";
import sclass3 from "@/public/cars/jet-class/img_3.webp";
import sclass4 from "@/public/cars/jet-class/img_4.webp";
import sclass5 from "@/public/cars/jet-class/img_5.webp";

import rangeRover_exterior from "@/public/cars/range-rover/range-rover_exterior.webp";
import ranegRover_1 from "@/public/cars/range-rover/img_1.webp";
import ranegRover_2 from "@/public/cars/range-rover/img_2.webp";
import ranegRover_3 from "@/public/cars/range-rover/img_3.webp";

import RRPhantom_exterior from "@/public/cars/rolls-royce-phantom/rolls-royce-phantom_exterior.webp";
import RRPhantom_1 from "@/public/cars/rolls-royce-phantom/img_1.webp";
import RRPhantom_2 from "@/public/cars/rolls-royce-phantom/img_2.webp";
import RRPhantom_3 from "@/public/cars/rolls-royce-phantom/img_3.webp";
import RRPhantom_4 from "@/public/cars/rolls-royce-phantom/img_4.webp";

import RRCullinan_exterior from "@/public/cars/rolls-royce-cullinan/rolls-royce-cullinan_exterior.webp";
import RRCullinan_1 from "@/public/cars/rolls-royce-cullinan/img_1.webp";
import RRCullinan_2 from "@/public/cars/rolls-royce-cullinan/img_2.webp";
import RRCullinan_3 from "@/public/cars/rolls-royce-cullinan/img_3.webp";
import RRCullinan_4 from "@/public/cars/rolls-royce-cullinan/img_4.webp";
import RRCullinan_5 from "@/public/cars/rolls-royce-cullinan/img_5.webp";
import RRCullinan_6 from "@/public/cars/rolls-royce-cullinan/img_6.webp";

export const CARS: CarSlider[] = [
  {
    id: "v-class",
    name: "Mercedes V-Class",
    passengers: 7,
    desc: "Premium SUV – Elegant, spacious comfort for up to 7 passengers, ideal for seamless airport transfers.",
    luggage: 7,
    slides: [
      { src: vclass_exterior, label: "EXTERIOR" },
      { src: vclass1, label: "INTERIOR" },
      { src: vclass2, label: "INTERIOR" },
      { src: vclass3, label: "INTERIOR" },
      { src: vclass4, label: "INTERIOR" },
    ],
  },
  {
    id: "jet-class",
    name: "Mercedes Jet-Class",
    passengers: 4,
    desc: "Luxury SUV – Designed for space, privacy, and comfort, accommodating up to 4 passengers in refined luxury.",
    luggage: 5,
    slides: [
      { src: jetClass_exterior, label: "EXTERIOR" },
      { src: jetClass1, label: "INTERIOR" },
      { src: jetClass2, label: "INTERIOR" },
      { src: jetClass3, label: "INTERIOR" },
      { src: jetClass4, label: "INTERIOR" },
      { src: jetClass5, label: "INTERIOR" },
    ],
  },
  {
    id: "s-class",
    name: "Mercedes S-Class",
    passengers: 2,
    desc: "Premium Sedan – A refined and spacious travel experience, offering exceptional comfort for up to 2 passengers.",
    luggage: 2,
    slides: [
      { src: sclass_exterior, label: "EXTERIOR" },
      { src: sclass1, label: "INTERIOR" },
      { src: sclass2, label: "INTERIOR" },
      { src: sclass3, label: "INTERIOR" },
      { src: sclass4, label: "INTERIOR" },
      { src: sclass5, label: "INTERIOR" },
    ],
  },
  {
    id: "range-rover",
    name: "Range Rover",
    passengers: 4,
    desc: "Premium SUV – A refined and spacious travel experience, offering exceptional comfort for up to 4 passengers.",
    luggage: 4,
    slides: [
      { src: rangeRover_exterior, label: "EXTERIOR" },
      { src: ranegRover_1, label: "INTERIOR" },
      { src: ranegRover_2, label: "INTERIOR" },
      { src: ranegRover_3, label: "INTERIOR" },
    ],
  },
  {
    id: "rolls-royce-phantom",
    name: "Rolls Royce Phantom VIII",
    passengers: 3,
    desc: "Luxury Sedan – Designed for space, privacy, and comfort, accommodating up to 3 passengers in refined luxury.",
    luggage: 3,
    slides: [
      { src: RRPhantom_exterior, label: "EXTERIOR" },
      { src: RRPhantom_1, label: "INTERIOR" },
      { src: RRPhantom_2, label: "INTERIOR" },
      { src: RRPhantom_3, label: "INTERIOR" },
      { src: RRPhantom_4, label: "INTERIOR" },
    ],
  },
  {
    id: "rolls-royce-cullinan",
    name: "Rolls Royce Cullinan",
    passengers: 4,
    desc: "Luxury SUV – Designed for space, privacy, and comfort, accommodating up to 4 passengers in refined luxury.",
    luggage: 4,
    slides: [
      { src: RRCullinan_exterior, label: "EXTERIOR" },
      { src: RRCullinan_1, label: "INTERIOR" },
      { src: RRCullinan_2, label: "INTERIOR" },
      { src: RRCullinan_3, label: "INTERIOR" },
      { src: RRCullinan_4, label: "INTERIOR" },
      { src: RRCullinan_5, label: "INTERIOR" },
      { src: RRCullinan_6, label: "INTERIOR" },
    ],
  },
];
