import { Package } from "./package";

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
  city_id: number;
  status: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  min_hours_before_booking: number;
  last_minute_strategy: string;
  last_minute_cost: number;
  number_of_free_bags: number;
  paid_bags_block_size: number;
  paid_bags_block_cost: number;
  is_fast_track_active: number;
  fast_track_cost: number;
  additional_hour_cost: number;
  city: City;
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
  package_slug: string;
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
  status: boolean;
  created_at: string;
  updated_at: string;
  package: InnerPackage;
}

export interface SingleAirport {
  airport_id: number;
  airport_name: string;
  airport_code: string;
  airport_img: string | null;
  airport_color: string | null;
  location_lat: number;
  location_long: number;
  city_id: number;
  status: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  min_hours_before_booking: number;
  last_minute_strategy: string;
  last_minute_cost: number;
  number_of_free_bags: number;
  paid_bags_block_size: number;
  paid_bags_block_cost: number;
  is_fast_track_active: number;
  fast_track_cost: number;
  additional_hour_cost: number;
  city: City;
  features: any[]; // لو عندك type محدد ممكن تغيّره
  airport_packages: AirportPackage[];
}

export interface SingleAirportResponse {
  status: number;
  msg: string | null;
  data: {
    airport: SingleAirport;
  };
}
