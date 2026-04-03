"use client";
import {
  Calendar,
  Clock10,
  Flag,
  Gauge,
  Mail,
  MapPin,
  Phone,
  User,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { apiPost } from "@/lib/api";
import { useCurrencyStore } from "@/store/currencyStore";
import StripeForm from "@/app/vip-meet-and-greet/summry/stripe-form";

export interface TripUser {
  user_id: number;
  user_name: string;
  user_img: string | null;
  email: string;
  phone: string;
}

export interface TripSummary {
  trip_id: number;
  trip_uuid: string;
  trip_type: string;
  passenger_id: number;
  driver_id: number | null;
  car_type_id: number;
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
export function formatMinutes(totalMinutes: number): string {
  if (!Number.isFinite(totalMinutes) || totalMinutes < 0) {
    return "0h 00m";
  }

  const hours = Math.round(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  const paddedMinutes = minutes.toString().padStart(2, "0");

  return `${hours}h ${paddedMinutes}m`;
}
export function formatDateTime(dateTimeString: string): {
  date: string;
  time: string;
} {
  if (!dateTimeString) {
    return { date: "", time: "" };
  }

  // convert to ISO format to avoid Safari issues
  const isoString = dateTimeString.replace(" ", "T");
  const dateObj = new Date(isoString);

  if (isNaN(dateObj.getTime())) {
    return { date: "", time: "" };
  }

  const date = new Intl.DateTimeFormat("en-GB", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(dateObj);

  const time = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(dateObj);

  return { date, time };
}

export function milesToKm(miles: number): number {
  if (!Number.isFinite(miles)) return 0;
  return +(miles * 1.60934).toFixed(2); // 2 decimals
}
type Props = {};

export default function Summry(props: Props) {
  const currencyMark = useCurrencyStore((state) => state.currencyMark);
  const currency = useCurrencyStore((state) => state.currency);
  const searchParams = useSearchParams();
  const uuid = searchParams.get("uuid");

  const [data, setData] = useState<TripSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!uuid) return;

    const fetchData = async () => {
      try {
        const result = await apiPost(`/trips/${uuid}/checkout/summary`, {
          payment_method: "stripe",
        });

        setData(result.data.summary);
        console.log(result.data.summary);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [uuid]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return null;

  const trip = data;
  const user = data.user;

  const date = formatDateTime(trip.trip_end_time);
  return (
    <div>
      <div className="flex gap-4">
        <div className="flex-2 flex flex-col gap-4">
          <div
            className="px-10 py-6 w-full bg-white rounded-2xl"
            style={{
              boxShadow: "0px 11.48px 114.76px 0px #A7A7A73D",
            }}
          >
            <h2 className="text-[18.75px] mb-4 font-semibold">
              Contact Information
            </h2>
            <div className="space-y-4 text-[#4A5565]">
              <div className="flex gap-2">
                <User color="#4A5565" /> <p>{user?.user_name}</p>
              </div>
              <div className="flex gap-4">
                <div className="flex gap-2">
                  <Mail color="#4A5565" /> <p>{user?.email}</p>
                </div>
                <div className="flex gap-2">
                  <Phone color="#4A5565" /> <p>{user?.phone}</p>
                </div>
              </div>
            </div>
          </div>
          <div
            className="px-10 py-6 w-full bg-white rounded-2xl"
            style={{
              boxShadow: "0px 11.48px 114.76px 0px #A7A7A73D",
            }}
          >
            <h2 className="text-[18.75px] mb-4 font-semibold">
              {data.trip_type === "by_distance"
                ? "One Way Transfer"
                : "Hourly trip"}
            </h2>
            <div className="space-y-6 *:hover:bg-gray-100">
              <p className=" flex justify-between">
                <span className="flex-1 flex gap-2">
                  <Calendar color="#7B5A41" /> {date.date}
                </span>
                <span className="flex-1 flex gap-2">
                  <Clock10 color="#7B5A41" />
                  {date.time}
                </span>
              </p>
              <p className="flex justify-between">
                <span className="flex-1 flex gap-2">
                  <MapPin color="#7B5A41" /> {trip.pickup_location_title}
                </span>
              </p>
              <p className="flex justify-between">
                <span className="flex-1 flex gap-2">
                  <Flag color="#7B5A41" /> {trip.dropoff_location_title}
                </span>
              </p>
              <p className="flex justify-between">
                <span className="flex-1 flex gap-2">
                  <Gauge color="#7B5A41" />{" "}
                  {milesToKm(trip.distance_mile).toFixed(2)} km /{" "}
                  {trip.distance_mile.toFixed(2)} mi
                </span>
                <span className="flex-1 flex gap-2">
                  <Clock10 color="#7B5A41" />{" "}
                  {formatMinutes(trip.duration_minutes)}
                </span>
              </p>
            </div>
          </div>
          <div
            className="px-10 py-6 w-full bg-white rounded-2xl"
            style={{
              boxShadow: "0px 11.48px 114.76px 0px #A7A7A73D",
            }}
          >
            <div className="flex gap-2 items-center text-[#364153]">
              <p>Luggage assistance: Porter Services</p>
            </div>
          </div>
          <div
            className="px-10 py-6 w-full bg-white rounded-2xl"
            style={{
              boxShadow: "0px 11.48px 114.76px 0px #A7A7A73D",
            }}
          >
            <div className="flex gap-2 items-center text-[#364153]">
              <p>...</p>
            </div>
          </div>
          <div
            className="px-10 py-6 space-y-2 w-full bg-white rounded-2xl"
            style={{
              boxShadow: "0px 11.48px 114.76px 0px #A7A7A73D",
            }}
          >
            <p className="text-sm flex justify-between">
              {/* Base fare <span>{currency} 1,486.25</span> */}
              Trip Cost
              <span>
                {currency}
                {trip.trip_cost}
              </span>
            </p>
            <p className="text-sm flex justify-between">
              {/* Meet & greet<span>$50.00</span> */}
            </p>
            <p className="text-sm flex justify-between">
              {/* Transactio fee<span>$ 64.65</span> */}
              Tax{" "}
              <span>
                {currency}
                {trip.tax_value}
              </span>
            </p>
            {/* <p className="text-sm flex justify-between">
              payment fees<span>{currency} {trip.payment_fees}</span>
            </p> */}
            <p className="text-lg flex justify-between">
              Total{" "}
              <span>
                {currency} {trip.total}
              </span>
            </p>
          </div>
        </div>
        <div className="h-full flex-1 space-y-4 sticky top-26">
          <div className="bg-white rounded-2xl p-5">
            <div className="font-[Manrope] flex items-center justify-between">
              <p className="text-[18.75px]">Total</p>
              <p className="font-bold font-[Arial]">
                {currencyMark} {trip.total}{" "}
                <span className="font-light text-[#6A7282]">{currency}</span>
              </p>
            </div>
          </div>
          {/* <StripeForm booking_status={data.booking_status} /> */}
          <StripeForm payFor="trips" booking_status={"awaiting_payment"} />
        </div>
      </div>
    </div>
  );
}
