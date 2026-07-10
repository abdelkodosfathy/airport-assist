"use client";
import { Clock4, Info, Mail, Phone, User } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useCurrencyStore } from "@/store/currencyStore";
import { Separator } from "@/components/ui/separator";
import {
  useConfirmBookingMutation,
  useSingleBooking,
} from "@/lib/hooks/useBooking";
import SummarySkeleton from "./summry-skeleton";
import Image from "next/image";
import InnerToast from "@/components/ui/InnerToast";
import {
  // BookingStatusCard,
  ConfirmationActions,
} from "@/components/BookingStatusCard";
import { useConvertCurrency } from "@/lib/hooks/useConvertCurrency";
import { formatNumber } from "@/lib/formatNumbers";
import StripeForm from "./stripe-form";
import { SingleBooking } from "@/lib/types/booking";
import { useState } from "react";
// import ThankYou from "./thank-you/thank-you";
// import WaitingListContent from "./wait-list/WaitingListContent";
import StrokeBag from "@/components/custom icons/strokeBag";
import FigmaMessage from "@/components/custom icons/adults copy";
import {
  useSuccessPopupStore,
  useWaitListPopupStore,
} from "@/store/useSuccessPopupStore";
import { SuccessPopup, WaitListPopup } from "@/components/SuccessPopup";
// import SuccessPopup from "./success";

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

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

type Props = {};

export default function Summary(props: Props) {
  const { convert } = useConvertCurrency();
  const currency = useCurrencyStore((state) => state.currency);
  // const [confirmed, setConfirmed] = useState<boolean>(false);
  // const router = useRouter();
  const confirmMutation = useConfirmBookingMutation();

  const searchParams = useSearchParams();
  const uuid = searchParams.get("uuid");
  const openSuccessPopup = useSuccessPopupStore((s) => s.open);
  const openWaitListPopup = useWaitListPopupStore((s) => s.open);

  const { data, isLoading, error } = useSingleBooking(uuid);

  if (isLoading) return <SummarySkeleton />;
  if (error) return <div>Error loading booking</div>;
  if (!data) return null;

  if (
    data.booking_status === "scheduled" ||
    confirmMutation.data?.booking_status === "scheduled"
  ) {
    // setConfirmed(true);
    // return <ThankYou data={data} />;
    console.log(data.booking_uuid);
    openSuccessPopup(data.booking_uuid);
    console.log("opeeennnsss");
  } else if (
    data.booking_status === "checking_availability" ||
    confirmMutation.data?.booking_status === "checking_availability"
  ) {
    openWaitListPopup(data.booking_uuid);
    console.log("opeeennn");

    // return <WaitingListContent data={data} />;
  }
  const user = data.user;
  const contacts = data.contact;
  const bookingDate = formatDateTime(data.booking_timestamp);

  console.log(data);
  const serviceType = data.service_type;

  const rows = [
    {
      label: "Booking Date:",
      value: `${bookingDate.date} ${bookingDate.time}`,
    },

    // ✈️ Flights
    ...(serviceType === "connection"
      ? [
          {
            label: "Arrival Flight Number:",
            value: data.flight?.flight_number,
          },
          {
            label: "Departure Flight Number:",
            value: data.flight_2?.flight_number,
          },
        ]
      : [
          {
            label: "Flight Number:",
            value: data.flight?.flight_number,
          },
        ]),

    {
      label: "Number of Passengers:",
      value: `${data.adult_passengers} Adults`,
    },

    // 👶 Children
    ...(data.child_passengers > 0
      ? [
          {
            label: "Number of Children:",
            value: `${data.child_passengers} ${
              data.child_passengers !== 1 ? "Children" : "Child"
            }`,
          },
        ]
      : []),

    // 🧳 Bags
    ...(data.number_of_bags > 0
      ? [
          {
            label: "Number of Bags:",
            value: data.number_of_bags,
          },
        ]
      : []),

    {
      label: "Fast Track:",
      value: data.fast_track_enabled ? "Included" : "Not included",
    },

    // ♿ Wheelchair
    ...(data.wheelchair_assistance
      ? [
          {
            label: "Special Request:",
            value: "Wheelchair assistance",
          },
        ]
      : []),

    // 📝 Notes
    ...(data.user_notes?.trim()
      ? [
          {
            label: "User Notes:",
            value: data.user_notes,
          },
        ]
      : []),
  ];

  const totalPlusProccessingFee = data.total + data.payment_fees;

  const subtotalPlusVAT = data.subtotal + data.tax_value;

  console.log(data.package.package_slug);
  console.log(data.airport.last_minute_strategy);
  console.log(data.airport.min_hours_before_booking);

  return (
    <>
      <SuccessPopup /> {/* ← مش محتاج props خالص */}
      <WaitListPopup /> {/* ← مش محتاج props خالص */}
      <div>
        <div className="flex flex-col lg:flex-row gap-4">
          {/* ── Left column ─────────────────────────────────────────── */}
          <div className="flex-2 space-y-4">
            {/* Contact Info */}
            <div className=" p-5 md:px-10 md:py-6 w-full bg-white rounded-2xl shadow-md">
              <h2 className="text-lg font-semibold mb-4">
                Contact Information
              </h2>
              <div className="text-[#4A5565] space-y-2">
                <div className="flex gap-2 items-center">
                  <User />
                  <p>{contacts.first_name} {contacts.last_name}</p>
                </div>
                <div className="flex flex-col gap-2 md:flex-row md:gap-4">
                  <div className="flex gap-2 items-center">
                    <Mail />
                    <p className="lowercase">{contacts.email}</p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <Phone />
                    <p>{contacts.phone}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* trip details */}
            <div className="p-5 md:px-10 md:py-6 w-full bg-white rounded-2xl shadow-md">
              <h2 className="text-lg font-semibold mb-4">
                {data.airport.airport_name} - {data.service_type} -{" "}
                {data.package.package_name}
              </h2>

              <div className="text-[#4A5565]">
                {rows.map((row, i) => {
                  if (!row) return;
                  return (
                    <div
                      key={i}
                      className="flex items-start gap-4 px-2 py-0.5 rounded-md hover:bg-gray-100 transition-colors"
                    >
                      <span className="md:w-[220px] flex-shrink-0">
                        {row.label}
                      </span>
                      <span className="flex-1">{row.value}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {data.trip && (
              <Carpreef
                car_name={data.trip.car_type.car_type_name}
                car_image_src={data.trip.car_type.car_type_img}
                pickupFrom={data.trip.pickup_location_title}
                destination={data.trip.dropoff_location_title}
                distanceMi={data.trip.distance_mile}
                duration={`${data.trip.duration_minutes}`}
              />
            )}

            {/* Luggage assistance */}
            <div className="p-5 md:px-10 md:py-6 w-full bg-white rounded-2xl shadow-md flex gap-2 items-center">
              <StrokeBag />
              <p>Luggage assistance: Porter Services</p>
            </div>

            {/* Passenger file */}
            <div className="p-5 md:px-10 md:py-6 w-full bg-white rounded-2xl shadow-md flex gap-2 items-center">
              <FigmaMessage />

              <p>
                Booking status:{" "}
                {/* {data.booking_status ? capitalise(data.booking_status) : ""} */}
                {data.booking_status}
              </p>
            </div>

            {/* Payment breakdown */}
            <div className="p-5 md:px-10 md:py-6 w-full bg-white rounded-2xl shadow-md space-y-2">
              <div className="flex justify-between font-semibold gap-4 md:gap-2">
                <p>
                  {data.airport.airport_name} - {data.service_type} -{" "}
                  <span className="whitespace-nowrap">{data.package.package_name}</span>
                </p>
                <p>{formatNumber(convert(data.subtotal).toFixed(2))}</p>
              </div>

              <div className="flex justify-between">
                <p>VAT</p>
                <p>{formatNumber(convert(data.tax_value).toFixed(2))}</p>
              </div>
              <div className="flex justify-between">
                <p className="font-semibold">Subtotal: </p>
                <p className="font-semibold">
                  {formatNumber(convert(subtotalPlusVAT).toFixed(2))}
                </p>
              </div>
              {data.payment_fees > 0 && (
                <div className="flex justify-between">
                  <p>Processing fee</p>
                  <p>{formatNumber(convert(data.payment_fees).toFixed(2))} </p>
                </div>
              )}
              <Separator />

              <div className="flex justify-between font-bold">
                <p>Total:</p>
                <p>
                  <span className="text-xs text-[#6A7282]">{currency} </span>
                  {formatNumber(convert(totalPlusProccessingFee).toFixed(2))}
                </p>
              </div>
            </div>
          </div>

          {/* ── Right column (sticky) ────────────────────────────────── */}
          {data.booking_status !== "scheduled" &&
          data.booking_status !== "checking_availability" ? (
            <div className="h-full flex-1 space-y-4 sticky top-26">
              {/* <div className="fixed h-max lg:h-full bottom-0 left-0 flex-1 space-y-4 lg:sticky lg:top-26"> */}

              <div className="hidden lg:block bg-white rounded-2xl p-5 shadow-md">
                <div className="font-[Manrope] flex items-center justify-between">
                  <p className="text-[18.75px]">Total</p>
                  <p className="font-bold font-[Arial]">
                    <span className="font-light text-[#6A7282]">
                      {currency}{" "}
                    </span>
                    {/* {data.total.toFixed(2)}{" "} */}
                    {formatNumber(
                      convert(totalPlusProccessingFee).toFixed(2),
                    )}{" "}
                  </p>
                </div>
              </div>

              <PayOrConfirm
                onConfirm={() => {
                  if (data.booking_uuid)
                    confirmMutation.mutate(data.booking_uuid);
                }}
                data={data}
              />
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}

const Carpreef = ({
  car_name,
  car_image_src,
  distanceMi,
  pickupFrom,
  destination,
  duration,
}: {
  car_name: string;
  car_image_src: string;
  distanceMi: number;
  pickupFrom: string;
  destination: string;
  duration: string;
}) => {
  return (
    <div className="p-5 md:px-10 md:py-6 w-full bg-white rounded-2xl shadow-md">
      {/* <div
      className="px-10 py-6 w-full bg-white rounded-2xl"
      style={{ boxShadow: "0px 11.48px 114.76px 0px #A7A7A73D" }}
    > */}
      <div className="md:flex gap-12 mb-2">
        <Image
          width={216}
          height={108.75}
          src={`https://airportassist-backend.aqaralex.com/storage/images/car-types-images/${car_image_src}`}
          alt="car image"
        />
        <div className="flex-1">
          <div className="flex justify-between items-center mb-2">
            <p className="flex gap-8 font-semibold items-center">
              {car_name} <Info className="w-5 h-5 text-[#99A1AF]" />
            </p>
          </div>
          <p className="text-sm text-[#4A5565]">
            <span className="font-bold">Pickup location: </span>
            {pickupFrom}
          </p>
          <p className="text-sm text-[#4A5565]">
            <span className="font-bold">Drop Off Address: </span>
            {destination}
          </p>
          <p className="text-sm text-[#4A5565]">
            <span className="font-bold">Destination: </span>
            {distanceMi} mi - {duration} mins
          </p>
        </div>
      </div>

      <InnerToast
        className="mb-0"
        icon={
          <div className="min-w-6 min-h-6 w-6 h-6 bg-[#7B5A41] rounded-full grid place-content-center">
            <Clock4 className="w-5 h-5 text-white" />
          </div>
        }
        text="Chauffeur will wait 15 minutes free of charge"
      />
    </div>
  );
};

const PayOrConfirm = ({
  data,
  onConfirm,
}: {
  onConfirm: () => void;
  data: SingleBooking;
}) => {
  const confirmMutation = useConfirmBookingMutation();

  const slug = data.package.package_slug;
  const strategy = data.airport.last_minute_strategy;
  const minHours = data.airport.min_hours_before_booking;

  const raw = data.booking_timestamp;
  const bookingTime = new Date(raw.replace(" ", "T")).getTime();
  const now = Date.now();
  const diffInHours = (bookingTime - now) / (1000 * 60 * 60);

  const isCloseToBooking = diffInHours <= minHours;
  const mustConfirm = strategy === "check" && isCloseToBooking;

  if (slug === "signature" || slug === "vip" || mustConfirm) {
    return (
      <ConfirmationActions
        onConfirm={onConfirm}
        isLoading={confirmMutation.isPending}
      />
    );
  }

  return <StripeForm />;
};
