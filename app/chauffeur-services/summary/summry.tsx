"use client";
import { Mail, Phone, User } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { apiPost } from "@/lib/api";
import { useCurrencyStore } from "@/store/currencyStore";
import StripeForm from "@/app/vip-meet-and-greet/summry/stripe-form";
import ByDistanceSummary from "./ByDistanceSummary";
import ByHourSummary from "./ByHourSummary";
import { TripSummary } from "@/types/trip";
import { useDateStore } from "@/store/vipInputsStore";
import { useTripStore } from "@/store/tripStore";

export function formatMinutes(totalMinutes: number): string {
  if (!Number.isFinite(totalMinutes) || totalMinutes < 0) {
    return "0m";
  }

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  const paddedMinutes = minutes.toString().padStart(2, "0");

  if (hours === 0) {
    return `${minutes}m`; // من غير h
  }

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

// This is a temporary function until the start time is properly handled in the backend
type DateTime = {
  date: string; // "15 Apr 2026"
  time: string; // "17:50"
};

function subtractMinutes(input: DateTime, minutesToSubtract: number): DateTime {
  // نحول لـ Date object
  const fullDate = new Date(`${input.date} ${input.time}`);

  // نطرح الدقايق
  fullDate.setMinutes(fullDate.getMinutes() - minutesToSubtract);

  // نرجع بنفس الفورمات
  const day = fullDate.getDate().toString().padStart(2, "0");
  const month = fullDate.toLocaleString("en-US", { month: "short" });
  const year = fullDate.getFullYear();

  const hours = fullDate.getHours().toString().padStart(2, "0");
  const minutes = fullDate.getMinutes().toString().padStart(2, "0");

  return {
    date: `${day} ${month} ${year}`,
    time: `${hours}:${minutes}`,
  };
}

const parseDateTime = (value: string): { date: string | null; time: string | null } => {
  if (!value) return { date: null, time: null };

  const [date, time] = value.split(" ");

  return {
    date: date ?? null,
    time: time ?? null,
  };
};

export default function Summry() {
  const currencyMark = useCurrencyStore((state) => state.currencyMark);
  const currency = useCurrencyStore((state) => state.currency);
  const searchParams = useSearchParams();
  const uuid = searchParams.get("uuid");

  const storeDate = useDateStore(s => s.setBookingDate);
  const storePassengers = useTripStore(s => s.set_passengers);

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

        if(result) {
          const resData = result.data.summary
          setData(resData);

          // type BookingDate = {
          //   date: string | null;
          //   time: string | null;
          // };
          const dateTime = parseDateTime(resData.trip_start_time);

          storeDate(dateTime)
          storePassengers(resData.number_of_passengers)

          console.log(resData);
        }
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [uuid]);

  if (loading) {
    return (
      <div className="flex gap-4 animate-pulse">
        {/* LEFT SIDE */}
        <div className="flex-2 flex flex-col gap-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="px-10 py-6 w-full bg-white rounded-2xl"
              style={{
                boxShadow: "0px 11.48px 114.76px 0px #A7A7A73D",
              }}
            >
              {/* title */}
              <div className="h-5 w-40 bg-gray-200 rounded mb-6"></div>

              {/* lines */}
              <div className="space-y-4">
                <div className="h-4 w-full bg-gray-200 rounded"></div>
                <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
                <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT SIDE */}
        <div className="flex-1 space-y-4 sticky top-26">
          <div className="bg-white rounded-2xl p-5 animate-pulse">
            <div className="flex justify-between items-center">
              <div className="h-5 w-20 bg-gray-200 rounded"></div>
              <div className="h-5 w-24 bg-gray-200 rounded"></div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 space-y-3">
            <div className="h-10 w-full bg-gray-200 rounded"></div>
            <div className="h-10 w-full bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }
  if (error) return <div>Error: {error}</div>;
  if (!data) return null;

  const trip = data;
  const user = data.user;

  // const date = formatDateTime(trip.trip_start_time);
  const tripEndTime = formatDateTime(trip.trip_end_time);
  const date = subtractMinutes(tripEndTime, trip.duration_minutes);
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

          {/* trip summry */}
          {/* <div
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
          </div> */}
          {data.trip_type === "by_distance" ? (
            <ByDistanceSummary data={data} />
          ) : (
            <ByHourSummary data={data} />
          )}
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
