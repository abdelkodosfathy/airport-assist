"use client";
import { Mail, Phone, User } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { apiPost } from "@/lib/api";
import { useCurrencyStore } from "@/store/currencyStore";
import StrokeBag from "@/components/custom icons/strokeBag";
import FigmaMessage from "@/components/custom icons/adults copy";
import { Separator } from "@/components/ui/separator";
import StripeForm from "./stripe-form";

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

export interface TripUser {
  user_id: number;
  user_name: string;
  user_img: string | null;
  email: string;
  phone: string;
}

export interface BookingSummary {
  booking_id: number;
  booking_uuid: string;
  user_id: number;
  package_id: number;
  airport_id: number;
  flight_id: number;
  flight_2_id: number | null;

  booking_status: string;
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
  trip_cost: number;
  promo_code_discount_value: number;
  extra_cost: number;
  subtotal: number;
  tax_value: number;
  total: number;
  payment_fees: number;

  promo_code_id: number | null;
  payment_method_id: number;
  paid_at: string | null;

  created_at: string;
  updated_at: string;
  deleted_at: string | null;

  user: TripUser;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                             */
/* ------------------------------------------------------------------ */

export function formatDateTime(dateTimeString: string): {
  date: string;
  time: string;
} {
  if (!dateTimeString) return { date: "", time: "" };

  const isoString = dateTimeString.replace(" ", "T");
  const dateObj = new Date(isoString);

  if (isNaN(dateObj.getTime())) return { date: "", time: "" };

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

function capitalise(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1).replace(/_/g, " ");
}

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

type Props = {};

export default function Summary(props: Props) {
  const currencyMark = useCurrencyStore((state) => state.currencyMark);
  const currency = useCurrencyStore((state) => state.currency);

  const searchParams = useSearchParams();
  const uuid = searchParams.get("uuid");

  const [data, setData] = useState<BookingSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!uuid) return;

    const fetchData = async () => {
      try {
        const result = await apiPost(`/bookings/${uuid}/checkout/summary`, {
          payment_method: "stripe",
        });

        // API returns the booking object directly inside result.data
        setData(result.data.summary);
        console.log(result.data);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [uuid]);

  if (loading) return <SummarySkeleton />;
  if (error) return <div>Error: {error}</div>;
  if (!data) return null;

  const user = data.user;
  const bookingDate = formatDateTime(data.booking_timestamp);

  console.log(data);

  return (
    <div>
      <div className="flex gap-4">
        {/* ── Left column ─────────────────────────────────────────── */}
        <div className="flex-2 space-y-4">
          {/* Contact Info */}
          <div className=" px-10 py-6 w-full bg-white rounded-2xl shadow-md">
            <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
            <div className="text-[#4A5565] space-y-2">
              <div className="flex gap-2 items-center">
                <User />
                <p>{user.user_name}</p>
              </div>
              <div className="flex gap-4">
                <div className="flex gap-2 items-center">
                  <Mail />
                  <p className="lowercase">{user.email}</p>
                </div>
                <div className="flex gap-2 items-center">
                  <Phone />
                  <p>{user.phone}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Booking / Flight Info */}
          <div className="px-10 py-6 w-full bg-white rounded-2xl shadow-md">
            <h2 className="text-lg font-semibold mb-4">
              Booking Details &mdash; {capitalise(data.service_type)}
            </h2>
            <div className="space-y-2 text-[#4A5565]">
              <p className="flex justify-between">
                <span>Booking Date:</span>
                <span>
                  {bookingDate.date} {bookingDate.time}
                </span>
              </p>
              <p className="flex justify-between">
                <span>Flight Time:</span>
                <span>{data.flight_id}</span>
              </p>
              <p className="flex justify-between">
                <span>Flight Number:</span>
                <span>{data.flight_id}</span>
              </p>
              <p className="flex justify-between">
                <span>Number of Passengers:</span>
                <span>{data.adult_passengers} Adults</span>
              </p>
              <p className="flex justify-between">
                <span>Number of Children:</span>
                <span>
                  {data.child_passengers} 
                  {data.child_passengers !== 1 ? " Children" : "Child"}
                </span>
              </p>
              <p className="flex justify-between">
                <span>Number of Bags:</span>
                <span>{data.number_of_bags}</span>
              </p>
              <p className="flex justify-between">
                <span>Fast Track:</span>
                <span>
                  {data.fast_track_enabled ? "Included" : "Not included"}
                </span>
              </p>
              <p className="flex justify-between">
                <span>Special Requests:</span>
                <span>
                  {data.wheelchair_assistance
                    ? "Wheelchair assistance"
                    : data.user_notes || "None"}
                </span>
              </p>
              <p className="flex justify-between">
                <span>Chauffeur Include:</span>
              </p>
              <p className="flex justify-between">
                <span>Distance:</span>
              </p>
              <p className="flex justify-between">
                <span>From Address:</span>
              </p>
              <p className="flex justify-between">
                <span>To Address:</span>
              </p>
            </div>
          </div>

          {/* Luggage assistance */}
          <div className="px-10 py-6 w-full bg-white rounded-2xl shadow-md flex gap-2 items-center">
            <StrokeBag />
            <p>Luggage assistance: Porter Services</p>
          </div>

          {/* Passenger file */}
          <div className="px-10 py-6 w-full bg-white rounded-2xl shadow-md flex gap-2 items-center">
            <FigmaMessage />
            <p>Booking status: {capitalise(data.booking_status)}</p>
          </div>

          {/* Payment breakdown */}
          <div className="px-10 py-6 w-full bg-white rounded-2xl shadow-md space-y-2">
            <p>{data.airport_id} {data.service_type} {data.package_id}</p>
            
            {data.tax_value > 0 && (
              <p className="flex justify-between">
                <span>VAT</span>
                <span>{/* {currencyMark} {data.tax_value.toFixed(2)} */}</span>
              </p>
            )}
            {data.total > 0 && (
              <p className="flex justify-between">
                <span>Total</span>
                <span>{currencyMark} {data.total.toFixed(2)}</span>
              </p>
            )}
            {data.payment_fees > 0 && (
              <p className="flex justify-between">
                <span>Processing fee</span>
                <span>{/* {currencyMark} {data.tax_value.toFixed(2)} */}</span>
              </p>
            )}
            <Separator />
            <p className="flex justify-between font-bold">
              <span>Subtotal:</span>
              <span>
                {currencyMark} {data.subtotal.toFixed(2)}
              </span>
            </p>
          </div>
        </div>

        {/* ── Right column (sticky) ────────────────────────────────── */}
        <div className="h-full flex-1 space-y-4 sticky top-26">
          {/* Total pill */}
          <div className="bg-white rounded-2xl p-5 shadow-md">
            <div className="font-[Manrope] flex items-center justify-between">
              <p className="text-[18.75px]">Total</p>
              <p className="font-bold font-[Arial]">
                {currencyMark} {data.total.toFixed(2)}{" "}
                <span className="font-light text-[#6A7282]">{currency}</span>
              </p>
            </div>
          </div>

          {/* Payment form */}
          <StripeForm
            //  uuid={data.booking_uuid}
            booking_status={data.booking_status}
          />
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Skeleton                                                            */
/* ------------------------------------------------------------------ */

function SkeletonBox({ className }: { className?: string }) {
  return (
    <div
      className={`bg-gray-200 rounded-md animate-pulse ${className ?? ""}`}
    />
  );
}

function SummarySkeleton() {
  return (
    <div className="flex gap-4">
      {/* Left column */}
      <div className="flex-2 space-y-4">
        {/* Contact Info skeleton */}
        <div className="px-10 py-6 w-full bg-white rounded-2xl shadow-md space-y-4">
          <SkeletonBox className="h-5 w-48" />
          <div className="space-y-3">
            <div className="flex gap-2 items-center">
              <SkeletonBox className="h-5 w-5 rounded-full" />
              <SkeletonBox className="h-4 w-40" />
            </div>
            <div className="flex gap-4">
              <div className="flex gap-2 items-center">
                <SkeletonBox className="h-5 w-5 rounded-full" />
                <SkeletonBox className="h-4 w-48" />
              </div>
              <div className="flex gap-2 items-center">
                <SkeletonBox className="h-5 w-5 rounded-full" />
                <SkeletonBox className="h-4 w-32" />
              </div>
            </div>
          </div>
        </div>

        {/* Booking Details skeleton */}
        <div className="px-10 py-6 w-full bg-white rounded-2xl shadow-md space-y-4">
          <SkeletonBox className="h-5 w-56" />
          <div className="space-y-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex justify-between">
                <SkeletonBox className="h-4 w-36" />
                <SkeletonBox className="h-4 w-24" />
              </div>
            ))}
          </div>
        </div>

        {/* Luggage skeleton */}
        <div className="px-10 py-6 w-full bg-white rounded-2xl shadow-md flex gap-2 items-center">
          <SkeletonBox className="h-6 w-6 rounded-full" />
          <SkeletonBox className="h-4 w-64" />
        </div>

        {/* File skeleton */}
        <div className="px-10 py-6 w-full bg-white rounded-2xl shadow-md flex gap-2 items-center">
          <SkeletonBox className="h-6 w-6 rounded-full" />
          <SkeletonBox className="h-4 w-52" />
        </div>

        {/* Payment breakdown skeleton */}
        <div className="px-10 py-6 w-full bg-white rounded-2xl shadow-md space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex justify-between">
              <SkeletonBox className="h-4 w-32" />
              <SkeletonBox className="h-4 w-20" />
            </div>
          ))}
          <div className="pt-1">
            <div className="border-t border-gray-200 pt-3 flex justify-between">
              <SkeletonBox className="h-5 w-16" />
              <SkeletonBox className="h-5 w-24" />
            </div>
          </div>
        </div>
      </div>

      {/* Right column */}
      <div className="h-full flex-1 space-y-4 sticky top-26">
        {/* Total pill skeleton */}
        <div className="bg-white rounded-2xl p-5 shadow-md flex items-center justify-between">
          <SkeletonBox className="h-5 w-12" />
          <SkeletonBox className="h-6 w-28" />
        </div>

        {/* Payment form skeleton */}
        <div className="bg-white rounded-2xl p-5 space-y-4 shadow-md">
          {/* Card number */}
          <div className="space-y-2">
            <SkeletonBox className="h-4 w-24" />
            <SkeletonBox className="h-10 w-full rounded-md" />
          </div>
          {/* Expiry + CVC */}
          <div className="flex gap-3">
            <div className="space-y-2 flex-1">
              <SkeletonBox className="h-4 w-20" />
              <SkeletonBox className="h-10 w-full rounded-md" />
            </div>
            <div className="space-y-2 flex-1">
              <SkeletonBox className="h-4 w-24" />
              <SkeletonBox className="h-10 w-full rounded-md" />
            </div>
          </div>
          {/* Name on card */}
          <div className="space-y-2">
            <SkeletonBox className="h-4 w-28" />
            <SkeletonBox className="h-10 w-full rounded-md" />
          </div>
          {/* Checkboxes */}
          <div className="flex items-start gap-3">
            <SkeletonBox className="h-6 w-6 rounded-md shrink-0" />
            <SkeletonBox className="h-4 w-full mt-1" />
          </div>
          <div className="flex items-start gap-3">
            <SkeletonBox className="h-6 w-6 rounded-md shrink-0" />
            <SkeletonBox className="h-4 w-3/4 mt-1" />
          </div>
          {/* Button */}
          <SkeletonBox className="h-11 w-full rounded-lg" />
          {/* Stripe text */}
          <SkeletonBox className="h-4 w-48 mx-auto" />
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  BookButton                                                          */
/* ------------------------------------------------------------------ */
