import FigmaMessage from "@/components/custom icons/adults copy";
import StrokeBag from "@/components/custom icons/strokeBag";
import IconInput from "@/components/custom inputs/customInput";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Phone, User } from "lucide-react";
import Image from "next/image";

import Separator from "@/components/ui/formSeparator";

import payments from "@/public/payments.png";
import { useEffect, useState } from "react";
import { useCurrency } from "@/lib/hooks/useCurrency";

export default function Summary({
  onBack,
  uuid,
}: {
  onBack: () => void;
  uuid: string;
}) {
  const [summaryData, setSummaryData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { currency } = useCurrency();

  const getCurrencyMark = () => {
    let mark = "$";

    switch (currency) {
      case "USD":
        mark = "$";
        break;
      case "EUR":
        mark = "€";
        break;
      case "GBP":
        mark = "£";
        break;
      default:
        mark = "$";
    }

    return mark;
  };

  const currencyMark = getCurrencyMark();

  useEffect(() => {
    if (uuid.trim() === "") return;

    const fetchSummary = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `https://airportassist-backend.aqaralex.com/api/public/bookings/${uuid}`,
        );
        if (!res.ok) throw new Error(`Failed to fetch summary: ${res.status}`);

        const data = await res.json();
        setSummaryData(data.data.booking);
      } catch (err: unknown) {
        console.error(err);
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, [uuid]);

  if (loading) return <p>Loading booking summary...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!summaryData) return null;

  const {
    contact,
    flight,
    passenger,
    adult_passengers,
    child_passengers,
    number_of_bags,
    fast_track_enabled,
    wheelchair_assistance,
    user_notes,
    subtotal,
    payment_fees,
    total,
  } = summaryData;

  return (
    <div>
      <div className="flex gap-4">
        <div className="flex-2 space-y-4">
          {/* Contact Info */}
          <div className="px-10 py-6 w-full bg-white rounded-2xl shadow-md">
            <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
            <div className="space-y-2">
              <div className="flex gap-2 items-center">
                <User />{" "}
                <p>
                  {contact.first_name} {contact.last_name}
                </p>
              </div>
              <div className="flex gap-4">
                <div className="flex gap-2 items-center">
                  <Mail /> <p>{contact.email}</p>
                </div>
                <div className="flex gap-2 items-center">
                  <Phone /> <p>{contact.phone}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Flight Info */}
          <div className="px-10 py-6 w-full bg-white rounded-2xl shadow-md">
            <h2 className="text-lg font-semibold mb-4">
              {summaryData.package?.package_name || "VIP Booking"}
            </h2>
            <div className="space-y-2">
              <p className="flex justify-between">
                <span>Booking Date:</span>
                <span>
                  {new Date(summaryData.booking_timestamp).toLocaleString()}
                </span>
              </p>
              <p className="flex justify-between">
                <span>Flight Number:</span>
                <span>
                  {flight.flight_number} ({flight.airline_name})
                </span>
              </p>
              <p className="flex justify-between">
                <span>Number of Passengers:</span>
                <span>{adult_passengers} Adults</span>
              </p>
              <p className="flex justify-between">
                <span>Number of Children:</span>
                <span>{child_passengers} Child</span>
              </p>
              <p className="flex justify-between">
                <span>Number of Bags:</span>
                <span>{number_of_bags}</span>
              </p>
              <p className="flex justify-between">
                <span>Fast Track:</span>
                <span>{fast_track_enabled ? "Included" : "Not included"}</span>
              </p>
              <p className="flex justify-between">
                <span>Special Requests:</span>
                <span>
                  {wheelchair_assistance
                    ? "Wheelchair assistance"
                    : user_notes || "None"}
                </span>
              </p>
            </div>
          </div>

          {/* Passenger Documents */}
          <div className="px-10 py-6 w-full bg-white rounded-2xl shadow-md flex gap-2 items-center">
            <StrokeBag />
            <p>Luggage assistance: Yes Porter Services</p>
          </div>

          <div className="px-10 py-6 w-full bg-white rounded-2xl shadow-md flex gap-2 items-center">
            <FigmaMessage />
            <p>
              Passenger file uploaded:{" "}
              {passenger.passengers_data_file?.split("/").pop()}
            </p>
          </div>

          {/* Payment Info */}
          <div className="px-10 py-6 w-full bg-white rounded-2xl shadow-md space-y-2">
            <p className="flex justify-between">
              Base Fare:{" "}
              <span>
                {currencyMark} {subtotal}
              </span>
            </p>
            <p className="flex justify-between">
              Transaction Fee:{" "}
              <span>
                {currencyMark} {payment_fees}
              </span>
            </p>
            <Separator />
            <p className="flex justify-between font-bold">
              Total:{" "}
              <span>
                {currencyMark} {total}
              </span>
            </p>
          </div>
        </div>
        <div className="h-full flex-1 space-y-4 sticky top-26">
          <div className="bg-white rounded-2xl p-5 shadow-md">
            <div className="font-[Manrope] flex items-center justify-between">
              <p className="text-[18.75px]">Total</p>
              <p className="font-bold font-[Arial]">
                {currencyMark} {total}{" "}
                <span className="font-light text-[#6A7282]">{currency}</span>
              </p>
            </div>
          </div>
          <form className="bg-white rounded-2xl p-5 grid gap-2 space-y-2 shadow-md">
            {/* <h4 className="font-[Manrope] font-semibold"></h4> */}
            <div className="space-y-2 col-span-2">
              <Label htmlFor="cardNumber">Card Number</Label>
              <IconInput
                iconPosition="right"
                icon={
                  <Image
                    alt="payment ways"
                    src={payments}
                    width={105}
                    height={40}
                  />
                }
                id="cardNumber"
                className="pl-4 rounded-md pr-16 bg-[#F4F4F4] border border-[#E0E0E0]"
                inputClassName="border-none shadow-none "
                placeholder="4242 4242 4242 4242"
              />
            </div>

            <div className="space-y-2 col-span-1">
              <Label htmlFor="expiry-date">Expiry date</Label>
              <Input
                id="expiry-date"
                className="pl-4 rounded-md pr-10 bg-[#F4F4F4] border border-[#E0E0E0]"
                placeholder="M M  / Y Y "
              />
            </div>
            <div className="space-y-2 col-span-1">
              <Label htmlFor="security-code">Security code</Label>
              <Input
                id="security-code"
                className="pl-4 rounded-md pr-10 bg-[#F4F4F4] border border-[#E0E0E0]"
                placeholder="CVC"
              />
            </div>
            <div className="space-y-2 col-span-2">
              <Label htmlFor="name-on-card">Name on Card</Label>
              <Input
                id="name-on-card"
                className="pl-4 rounded-md pr-10 bg-[#F4F4F4] border border-[#E0E0E0]"
                placeholder="Card Holder Name"
              />
            </div>

            {/* Fast Track Checkbox */}
            <div className="flex items-start gap-3 col-span-2">
              <Checkbox
                id="i-confirm"
                className="cursor-pointer w-6 h-6 rounded-md bg-[#F4F4F4] data-[state=checked]:bg-[#664F31] data-[state=checked]:border-[#664F31]"
              />
              <Label
                htmlFor="i-confirm"
                className="text-sm leading-relaxed cursor-pointer"
              >
                I confirm that I have reviewed and verified the accuracy of this
                reservation.
              </Label>
            </div>
            <div className="flex items-start gap-3 col-span-2">
              <Checkbox
                id="i-agree"
                className="cursor-pointer w-6 h-6 rounded-md bg-[#F4F4F4] data-[state=checked]:bg-[#664F31] data-[state=checked]:border-[#664F31]"
              />
              <Label
                htmlFor="i-agree"
                className="text-sm leading-relaxed cursor-pointer"
              >
                I have read and agree to the website terms and conditions *{" "}
              </Label>
            </div>

            <BookButton
              uuid=""
              display_booking_status={summaryData.display_booking_status}
            />
            <p className="text-[#74747A]  col-span-2 text-center">
              Secure checkout powered by{" "}
              <span className="font-bold">stripe</span>
            </p>
          </form>

          {/* <SideInfo /> */}
        </div>
      </div>
    </div>
  );
}

const BookButton = ({
  uuid,
  display_booking_status,
}: {
  uuid: string;
  display_booking_status: string;
}) => {
  const [summaryData, setSummaryData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlBookNow = () => {
    console.log(uuid);
    if (display_booking_status === "Awaiting Payment") {
    }
  };

  const fetchLink = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(
        `https://airportassist-backend.aqaralex.com/api/public/bookings/${uuid}/checkout/payment-url`,
      );
      if (!res.ok) throw new Error(`Failed to fetch summary: ${res.status}`);

      const data = await res.json();
      setSummaryData(data.data.booking);
    } catch (err: unknown) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
    type="button"
      disabled={display_booking_status !== "Awaiting Payment"}
      onClick={handlBookNow}
      variant="outline"
      className="
								col-span-2
								w-full
								cursor-pointer 
								border-black 
								text-black 
								hover:border-[#664F31]  
								hover:bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)] 
								hover:text-white 
								duration-0
								rounded-lg
								py-5
								px-7
								"
    >
      <p className="text-sm font-normal font-[Manrope]">
        {/* Proceed To Checkout{" "} */}
        Book Now
      </p>
    </Button>
  );
};
