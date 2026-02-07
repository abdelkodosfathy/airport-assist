"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import SideInfo from "../../components/side-info";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import BillingInformation from "../components/BillingInformation";
import { useAdditionalServicesStore } from "@/store/useAdditionalServices";
import { getFromSession } from "@/store/getSessionData";
import { useEffect, useState } from "react";
import { VipBookingData } from "@/components/BookingForm";

export default function FlightInformation() {
  const { imageFile, passengerFile, wheelchair, additionalRequirements } =
    useAdditionalServicesStore();

  console.log({
    imageFile: imageFile,
    passengerFile: passengerFile,
    wheelchair,
    additionalRequirements,
  });

  const sessionStoredData = async () => {
    const sessionData = getFromSession();

    console.log("Session Data:", sessionData);
    console.log({
      imageFile,
      passengerFile,
      wheelchair,
      additionalRequirements,
    });

    // Build FormData for the API
    const bookingData = new FormData();

    // Simple fields
    bookingData.append("airport_id", "2");
    bookingData.append("package_slug", sessionData.vipSelectedPackage || "");
    bookingData.append(
      "service_type",
      sessionData.vipBooking?.serviceType?.toLowerCase() || "",
    );
    bookingData.append("booking_timestamp", sessionData.vipBooking?.date || "");
    bookingData.append("user_notes", sessionData.user_notes || "");
    bookingData.append(
      "adult_passengers",
      String(sessionData.vipBooking?.adults || 0),
    );
    bookingData.append(
      "child_passengers",
      String(sessionData.vipBooking?.children || 0),
    );
    bookingData.append("infant_passengers", "0");
    bookingData.append(
      "number_of_bags",
      String(sessionData.primaryPassenger?.number_of_pages || 0),
    );
    bookingData.append(
      "fast_track_enabled",
      sessionData.flightInfo?.fast_track_enabled ? "1" : "0",
    );
    bookingData.append("wheelchair_assistance", "false");
    bookingData.append(
      "additional_hours",
      String(sessionData.flightInfo?.service_duration || 0),
    );
    bookingData.append("car_type_id", "2");

    // Contact info
    bookingData.append(
      "contact[first_name]",
      sessionData.billingInfo?.firstName || "",
    );
    bookingData.append(
      "contact[last_name]",
      sessionData.billingInfo?.lastName || "",
    );
    bookingData.append("contact[phone]", sessionData.billingInfo?.phone || "");
    bookingData.append("contact[email]", sessionData.billingInfo?.email || "");

    // Flight info
    bookingData.append("wheelchair_assistance", wheelchair ? "1" : "0");
    bookingData.append(
      "flight[flight_number]",
      sessionData.flightInfo?.flight_number || "",
    );
    bookingData.append(
      "flight[airline_id]",
      String(sessionData.flightInfo?.airline_id || ""),
    );
    bookingData.append(
      "flight[passenger_arrival_time]",
      sessionData.flightInfo?.arrival_time || "",
    );

    // Passenger info
    bookingData.append(
      "passenger[first_name]",
      sessionData.primaryPassenger?.first_name || "",
    );
    bookingData.append(
      "passenger[last_name]",
      sessionData.primaryPassenger?.last_name || "",
    );
    bookingData.append(
      "passenger[phone]",
      sessionData.primaryPassenger?.phone || "",
    );
    bookingData.append(
      "passenger[email]",
      sessionData.primaryPassenger?.email || "",
    );
    bookingData.append(
      "passenger[birthdate]",
      sessionData.primaryPassenger?.date_of_birth || "",
    );
    bookingData.append(
      "passenger[class]",
      sessionData.primaryPassenger?.travel_class?.value || "",
    );
    if (imageFile) {
      bookingData.append("tickets_files[0]", imageFile);
    }
    console.log(passengerFile);
    if (passengerFile) {
      bookingData.append("passenger[passengers_data_file]", passengerFile);
    }
    bookingData.append(
      "passenger[other_passengers]",
      sessionData.primaryPassenger?.other_passengers_info || "",
    );

    try {
      const res = await fetch(
        "https://airportassist-backend.aqaralex.com/api/public/bookings",
        {
          method: "POST",
          body: bookingData, // ✅ FormData automatically sets multipart/form-data
        },
      );

      const data = await res.json();
      console.log("Booking successful:", data);
      return data;
    } catch (error) {
      console.error("Error booking:", error);
    }
  };

  const [bookingData, setBookingData] = useState<VipBookingData | null>(null);

  useEffect(() => {
    const vipBookingData = sessionStorage.getItem("vipBooking");
    if (vipBookingData) {
      setBookingData(JSON.parse(vipBookingData));
    }
  }, []);

  if (!bookingData) return null;
  return (
    <div>
      <Link
        href={"/meet-and-greet/flight-information"}
        className="flex gap-2 mb-2 text-[#8E8E93]"
      >
        <ArrowLeft />
        <p> back to Flight Information</p>
      </Link>
      <div className="flex gap-4">
        <form className="space-y-4 h-auto flex-2">
          <BillingInformation />
          <BillingAddress />
        </form>

        <SideInfo />
      </div>
      {/* <Button onClick={sessionStoredData}>get data</Button> */}
      <Button
        type="button"
        onClick={sessionStoredData}
        // asChild
        variant="outline"
        className="
            mt-6
            w-max 
            cursor-pointer 
            border-black 
            text-black 
            hover:border-[#664F31]  
            hover:bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)] 
            hover:text-white 
            duration-0
          "
      >
        Proceed To Checkout
        {/* <Link href="/meet-and-greet/flight-information/billing-information/checkout">
          <p className="text-lg font-normal font-[Manrope]">
            Proceed To Checkout{" "}
          </p>
        </Link> */}
      </Button>
    </div>
  );
}

// const BillingAddress = () => {
//   return (
//     <div
//       style={{
//         boxShadow: "0px 11.48px 114.76px 0px #A7A7A73D",
//       }}
//       className="px-10 py-6 bg-white rounded-2xl"
//     >
//       <h4 className="font-manrope font-medium text-[18.75px] leading-[1.3] tracking-normal">
//         Billing Address
//       </h4>
//       <span className="inline-block w-full h-0.5 bg-[#CFCFCF]" />

//       <div className="mt-4 w-full grid grid-cols-2 gap-4">
//         <div className="space-y-2 md:col-span-2">
//           <Label htmlFor="Address">Address</Label>
//           <Input
//             id="Address"
//             placeholder="Last Name"
//             className="pl-4 pr-10 bg-[#F4F4F4] border border-[#E0E0E0]"
//           />
//         </div>

//         <div className="space-y-2 col-span-1">
//           <Label htmlFor="city">Town / City</Label>
//           <Input
//             id="city"
//             placeholder="city"
//             className="pl-4 pr-10 bg-[#F4F4F4] border border-[#E0E0E0]"
//           />
//         </div>
//         <div className="space-y-2 col-span-1">
//           <Label htmlFor="country">Country</Label>
//           <Input
//             id="country"
//             placeholder="country"
//             className="pl-4 pr-10 bg-[#F4F4F4] border border-[#E0E0E0]"
//           />
//         </div>

//         <div className="space-y-2 md:col-span-2">
//           <Label htmlFor="postcode">Post Code</Label>
//           <Input
//             id="postcode"
//             placeholder="Post Code"
//             className="pl-4 pr-10 bg-[#F4F4F4] border border-[#E0E0E0]"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

const STORAGE_KEY = "billingAddress";

const BillingAddress = () => {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [postcode, setPostcode] = useState("");

  // Load saved data from sessionStorage on mount
  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) {
      const data = JSON.parse(saved);
      setAddress(data.address || "");
      setCity(data.city || "");
      setCountry(data.country || "");
      setPostcode(data.postcode || "");
    }
  }, []);

  // Save data to sessionStorage whenever it changes
  useEffect(() => {
    const data = { address, city, country, postcode };
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [address, city, country, postcode]);

  return (
    <div
      style={{
        boxShadow: "0px 11.48px 114.76px 0px #A7A7A73D",
      }}
      className="px-10 py-6 bg-white rounded-2xl"
    >
      <h4 className="font-manrope font-medium text-[18.75px] leading-[1.3] tracking-normal">
        Billing Address
      </h4>
      <span className="inline-block w-full h-0.5 bg-[#CFCFCF]" />

      <div className="mt-4 w-full grid grid-cols-2 gap-4">
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="Address">Address</Label>
          <Input
            id="Address"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="pl-4 pr-10 bg-[#F4F4F4] border border-[#E0E0E0]"
          />
        </div>

        <div className="space-y-2 col-span-1">
          <Label htmlFor="city">Town / City</Label>
          <Input
            id="city"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="pl-4 pr-10 bg-[#F4F4F4] border border-[#E0E0E0]"
          />
        </div>

        <div className="space-y-2 col-span-1">
          <Label htmlFor="country">Country</Label>
          <Input
            id="country"
            placeholder="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="pl-4 pr-10 bg-[#F4F4F4] border border-[#E0E0E0]"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="postcode">Post Code</Label>
          <Input
            id="postcode"
            placeholder="Post Code"
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
            className="pl-4 pr-10 bg-[#F4F4F4] border border-[#E0E0E0]"
          />
        </div>
      </div>
    </div>
  );
};
