import { TripSummary } from "@/types/trip";
import { Airport, City } from "./airport";
import { Package } from "./package";

export interface TripUser {
  user_id: number;
  user_name: string;
  user_img: string | null;
  email: string;
  phone: string;
}

export type BookingStatus =
  | "scheduled"
  | "awaiting_payment"
  | "checking_availability"
  | "in_progress"
  | "rejected"
  | "completed_successfully"
  | "faild";
export interface BookingSummary {
  booking_id: number;
  booking_uuid: string;
  user_id: number;
  package_id: number;
  package: Package;
  airport_id: number;
  flight_id: number;
  flight_2_id: number | null;

  airport: Airport;

  // booking_status: string;
  booking_status: BookingStatus;
  service_type: string;
  booking_timestamp: string;

  user_notes: string | null;
  adult_passengers: number;
  child_passengers: number;
  infant_passengers: number;
  number_of_bags: number;
  additional_hours: number;

  fast_track_enabled: number; // 0 | 1
  wheelchair_assistance: number; // 0 | 1

  trip_id: number | null;

  infants_cost: number;
  children_cost: number;
  adults_cost: number;
  bags_cost: number;
  fast_track_cost: number;
  last_minute_fees: number;
  additional_hours_cost: number;
  service_cost: number;
  trip: TripSummary | null;
  trip_cost: number;
  promo_code_discount_value: number;
  extra_cost: number;
  subtotal: number;
  tax_value: number;
  total: number;
  payment_fees: number;

  promo_code_id: number | null;
  payment_method_id: number | null;
  paid_at: string | null;

  created_at: string;
  updated_at: string;
  deleted_at: string | null;

  user: TripUser;
}

type BooleanNumber = 0 | 1;

export interface BookingStatusTracking {
  id: number;
  booking_id: number;
  pending_at: string | null;
  awaiting_payment_at: string | null;
  scheduled_at: string | null;
  in_progress_at: string | null;
  rejected_at: string | null;
  canceled_at: string | null;
  completed_successfully_at: string | null;
  not_completed_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Passenger {
  id: number;
  booking_id: number;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  birthdate: string | null;
  class: string;
  other_passengers: unknown;
  passengers_data_file: string | null;
  created_at: string;
  updated_at: string;
}

export interface Flight {
  flight_id: number;
  airline_id: number;
  flight_number: string;
  passenger_arrival_time: string | null;
  airline_name: string;
  airline_code: string;
  airline_img: string;
}

export interface Contact {
  id: number;
  booking_id: number;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  user_name: string;
}

export interface Trip {
  trip_id: number;
  trip_uuid: string;
  trip_type: string;
  passenger_id: number;
  driver_id: number | null;
  car_type_id: number;
  car_type: {
    car_type_id: number;
    car_type_img: string;
    car_type_name: string;
    price_per_hour: number;
    price_per_mile: number;
    supplement_fee: number;
  };

  trip_status: string;

  pickup_location_lat: number;
  pickup_location_long: number;
  pickup_location_title: string;

  dropoff_location_lat: number;
  dropoff_location_long: number;
  dropoff_location_title: string;

  distance_mile: number;
  duration_minutes: number;

  trip_start_time: string;
  trip_end_time: string;

  hours_count: number | null;

  number_of_passengers: number;
  number_of_bags: number;

  has_meet_and_greet: BooleanNumber;
  meet_and_greet_cost: string;
  supplement_fee: string;

  trip_cost: number;
  promo_code_discount_value: number;
  extra_cost: number;

  subtotal: number;
  tax_value: number;
  total: number;
  payment_fees: number;

  payment_method_id: number | null;
  promo_code_id: number | null;
  paid_at: string | null;

  created_at: string;
  updated_at: string;
  deleted_at: string | null;

  airport_id: number;
  flight_id: number;

  display_trip_status: string;
  display_trip_type: string;

  payment_method: unknown;
}

export interface SingleBooking extends Omit<BookingSummary, "trip"> {
  trip: Trip | null;

  display_booking_status: string;
  display_service_type: string;

  can_be_canceled: boolean;
  can_be_refunded: boolean;

  payment_method_name: string | null;
  payment_method_type: string | null;

  connection_fees: number;

  booking_status_tracking: BookingStatusTracking;

  payments: unknown[];

  city: City;
  passenger: Passenger;

  booking_tickets: unknown[];

  flight: Flight;
  flight_2: Flight | null;

  contact: Contact;

  cancel_request: unknown;
  refund_request: unknown;

  payment_method: unknown;
}
