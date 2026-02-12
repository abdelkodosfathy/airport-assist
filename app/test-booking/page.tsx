"use client";

import { Activity, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { VipBookingData } from "@/components/BookingForm";
import SideInformationCard from "./side-informatio-card";
import { useSingleAirport } from "@/lib/hooks/useAirports";
import { SingleAirport } from "@/lib/types/airport";
import { Button } from "@/components/ui/button";
import FlightSection, {
  FlightSectionHandle,
} from "./components/flight-section";
import PackagesSection from "./components/packages-section";

import BillingAddress from "./components/billing-address";
import BillingInformation from "./components/billing-information";
import Summry from "./components/summry";
import BillingSection from "./components/billing-section";
import { ArrowLeft } from "lucide-react";
import BookingForm from "./components/booking-form";
import { toast } from "sonner";

type currentPage = "packages" | "flight" | "billing" | "summry";

const Page = () => {
  const router = useRouter();
  const [storedData, setStoredData] = useState<VipBookingData>();
  const [airportResponse, setAirportResponse] = useState<SingleAirport>();

  const [currentPackagePrice, setCurrentPackagePrice] = useState<number>(0);
  const [currentPackageSlug, setCurrentPackageSlug] = useState<string>("");

  const [currentPage, setCurrentPage] = useState<currentPage>("packages");

  const flightSectionRef = useRef<FlightSectionHandle>(null);

  // 1️⃣ Read sessionStorage safely
  useEffect(() => {
    const stored = sessionStorage.getItem("vipBooking");

    if (!stored) {
      router.replace("/"); // or router.back()
      return;
    }

    try {
      setStoredData(JSON.parse(stored));
    } catch {
      router.replace("/");
    }
  }, [router]);

  // 2️⃣ Call hook ONLY when data exists
  const airportData = useSingleAirport(storedData?.airport_id as string);
  useEffect(() => {
    if (!airportData || airportData.status === "pending") return;
    console.log("Airport Data:", airportData);

    const res = airportData.data?.data.airport;
    // console.log(res?.data.airport);
    if (res) {
      setAirportResponse(res);
    }
  }, [airportData]);

  if (!storedData) return null; // or loader
  console.log(airportResponse);

  const packagesList = airportResponse?.airport_packages;

  const isWithinHours = (dateString: string, hours: number): boolean => {
    if (!dateString) return false;

    // نحول التاريخ لصيغة مفهومة للـ JS
    const targetDate = new Date(dateString.replace(" ", "T"));

    if (isNaN(targetDate.getTime())) return false;

    const now = new Date();

    const diffInMs = targetDate.getTime() - now.getTime();

    const limitInMs = hours * 60 * 60 * 1000;

    return diffInMs <= limitInMs;
  };

  const isLastMinute =
    airportResponse &&
    isWithinHours(storedData.date, airportResponse.min_hours_before_booking);
  const airportCost = isLastMinute ? airportResponse.last_minute_cost : 0;
  const totalPrice = currentPackagePrice + 0; // i will replace the zero with other vars later

  // const checkValidity = () => {
  //   const valid = flightSectionRef.current?.isValid();
  //   console.log("Forms valid?", valid);
  // };
  const handleNextPage = () => {
    let nextPage: currentPage = "billing";

    switch (currentPage) {
      case "packages":
        if (currentPackageSlug.trim() === "") {
          toast.error("please select one package", {
            position: "top-center",
          });
          return;
        }

        nextPage = "flight";
        break;
      case "flight":
        const valid = flightSectionRef.current?.isValid();
        if(!valid) {
          toast.error("please fill required inputs", {
            position:"top-center"
          })
          return
        };
        
        nextPage = "billing";
        break;
      case "billing":
        nextPage = "summry";
        break;
      case "summry":
        break;
    }

    setCurrentPage(nextPage);
  };

  const handlePrevPage = () => {
    let nextPage: currentPage = "billing";

    switch (currentPage) {
      case "packages":
        break;
      case "flight":
        nextPage = "packages";
        break;
      case "billing":
        nextPage = "flight";
        break;
      case "summry":
        break;
    }

    setCurrentPage(nextPage);
  };
  const getPrevPage = () => {
    let prevPage = "";
    switch (currentPage) {
      case "flight":
        prevPage = "Choose Service";
        break;
      case "billing":
        prevPage = "Flight Information";
        break;
      case "summry":
        prevPage = "Billing Information";
        break;
    }
    return prevPage;
  };

  return (
    <>
      <p className="font-[Manrope] font-medium text-[15.53px] leading-[130%] text-[#8E8E93] mb-3">
        Choose how to travel
      </p>
      <h2 className="font-[Manrope] font-normal text-[22.6px] leading-[100%] tracking-[7.06px] uppercase mb-6">
        Services Level Available
      </h2>
      {/* back button */}
      {currentPage !== "packages" && (
        <Button
          onClick={handlePrevPage}
          variant={"ghost"}
          className="flex gap-2 mb-2 text-[#8E8E93] w-fit"
        >
          <ArrowLeft />
          <p> back to {getPrevPage()}</p>
        </Button>
      )}
      <div className="flex gap-4">
        {/* <BookingForm storedData={storedData} /> */}

        {/* packages */}
        <Activity mode={currentPage === "packages" ? "visible" : "hidden"}>
          {packagesList && (
            <PackagesSection
              selectedPackageSlug={currentPackageSlug}
              onSelectPackage={(slug, cost) => {
                setCurrentPackagePrice(cost);
                setCurrentPackageSlug(slug);
              }}
              AirportCost={airportCost}
              adults_count={storedData.adults}
              child_count={storedData.children}
              packagesList={packagesList}
            />
          )}
        </Activity>

        {airportResponse && (
          <>
            {/* flight */}
            <Activity mode={currentPage === "flight" ? "visible" : "hidden"}>
              <FlightSection ref={flightSectionRef} airportData={airportResponse} />
            </Activity>

            {/* billing */}
            <Activity mode={currentPage === "billing" ? "visible" : "hidden"}>
              <BillingSection />
            </Activity>
          </>
        )}
        {/* summry */}
        <Activity mode={currentPage === "summry" ? "visible" : "hidden"}>
          <Summry onBack={handlePrevPage} />
        </Activity>
        {currentPage !== "summry" && (
          <SideInformationCard
            totalPrice={totalPrice}
            adults_count={storedData.adults}
            child_count={storedData.children}
          />
        )}
      </div>
      <div className="flex gap-4">
        {currentPage !== "summry" && (
          <Button
            onClick={handleNextPage}
            type="button"
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
            {/* <Link href={"/meet-and-greet/flight-information"}> */}
            <p className="text-lg font-normal font-[Manrope]">
              {currentPage === "billing" ? "Proceed To Checkout" : "Continue"}
            </p>
            {/* </Link> */}
          </Button>
        )}
      </div>
    </>
  );
};

export default Page;
