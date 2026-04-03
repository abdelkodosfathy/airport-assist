import { PackageSlug } from "@/lib/types/airport";

export type Service = {
  title: string;
  sub_title: string;
  value: PackageSlug;
};

export type LatLngLocation = { lat: number; lng: number };
