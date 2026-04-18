import { StaticImageData } from "next/image";

export type CarSlide = {
  src: StaticImageData;
  label: string;
};

export type CarSlider = {
  id: string;
  name: string;
  desc: string;
  slides: CarSlide[];
  passengers: number;
  luggage: number;
};