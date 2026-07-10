import { Feature } from "./package";

export type PackageSlug = "elite" | "elite_plus" | "signature" | "vip";
export interface City {
  city_id: number;
  state_id: number;
  city_name: string;
  status: boolean;
  deleted_at: string | null;
  created_at: string | null;
  updated_at: string | null;
  country_id: number;
  flag_img: string;
  state_name: string;
  iso2: string;
  country_name: string;
}

export interface Airport {
  airport_id: number;
  airport_name: string;
  airport_code: string;
  airport_img: string | null;
  airport_color: string | null;
  location_lat: number;
  location_long: number;
  is_in_popular: boolean;
  is_golf_cart_active: number;

  city_id: number;
  status: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  min_hours_before_booking: number;
  last_minute_strategy: "extra_fees" | "check";
  last_minute_cost: number;
  last_minute_cost_pct?: number;
  number_of_free_bags: number;
  paid_bags_block_size: number;
  paid_bags_block_cost: number;
  is_fast_track_active: number;
  fast_track_cost: number;
  starting_price: number;
  city: City;
  airport_packages: AirportPackage[];

  // not added yet to the response d10/m6/y2026
  closed_dates: ClosedDate[];
}

interface ClosedDate {
  closed_date_id: number;
  airport_id: number;
  closed_date: string; // yyyy-mm-dd
  created_at: string; // ISO datetime
  updated_at: string; // ISO datetime
}

export interface AirportsResponse {
  status: number;
  msg: string | null;
  data: {
    airports: Airport[];
    total_result: number;
  };
}

interface InnerPackage {
  package_id: number;
  service_type: string;
  package_name: string;
  package_description: string;
  package_slug: PackageSlug;
  status: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}
export interface AirportPackage {
  id: number;
  package_id: number;
  airport_id: number;
  infant_cost: number;
  child_cost: number;
  adult_cost: number;
  included_adults_count: number;
  additional_adult_cost: number;
  connection_fees: number;
  additional_hour_cost: number;
  status: boolean;
  created_at: string;
  updated_at: string;
  package: InnerPackage;
}

export interface SingleAirport extends Airport {
  features: Feature[];
  airport_packages: AirportPackage[];
  starting_price: number;
}

export interface SingleAirportResponse {
  status: number;
  msg: string | null;
  data: {
    airport: SingleAirport;
  };
}
