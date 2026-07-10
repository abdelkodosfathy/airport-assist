import { StaticImageData } from "next/image";

export type CarSlide = {
  src: StaticImageData;
  label: string;
};

export type CarSlider = {
  id: string;
  name: string;
  desc: string;
  newShape?: boolean;
  slides: CarSlide[];
  passengers: number;
  luggage: number;
};
