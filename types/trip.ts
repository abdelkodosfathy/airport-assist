export interface TripUser {
  user_id: number;
  user_name: string;
  user_img: string | null;
  email: string;
  phone: string;
}

export interface OtherTrip {
  id: number;
  main_trip_id: number;
  added_trip_id: number | null;
  trip_timestamp: string;
  hours_count: number;
  created_at: string;
  updated_at: string;
  added_trip: null;
}

export interface TripSummary {
  trip_id: number;
  trip_uuid: string;
  trip_type: "by_distance" | "by_hour";
  passenger_id: number;
  driver_id: number | null;
  car_type_id: number;
  trip_status: string;
  number_of_passengers: number;
  number_of_bags: number;
  has_meet_and_greet: number;
  other_trips: OtherTrip[];

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

  trip_cost: number;
  promo_code_discount_value: number;
  extra_cost: number;
  subtotal: number;
  tax_value: number;
  total: number;
  payment_fees: number;

  payment_method_id: number;
  promo_code_id: number | null;

  paid_at: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;

  airport_id: number;
  flight_id: number;

  user: TripUser;
}