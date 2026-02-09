"use client";

import { useSingleAirport } from "@/lib/hooks/useAirports";
import ServiceCard from "./ServiceCard";
import { useEffect, useState } from "react";
import { VipBookingData } from "../page";
import { AirportPackage } from "@/lib/types/airport";

const SESSION_KEY = "vipSelectedPackage";

const ChooseService = ({onSelectElitePackage, bookingData}:{onSelectElitePackage: (value: boolean) => void, bookingData:VipBookingData}) => {
  // console.log(bookingData);
  
  const [airportId, setAirportId] = useState<number>();

  useEffect(() => {
    const vipBookingData = sessionStorage.getItem("vipBooking");
    if (vipBookingData) {
      const parsedData = JSON.parse(vipBookingData);
      setAirportId(parsedData.airport_id);
    }
  }, []);

  const [selectedPackage, setSelectedPackage] = useState<AirportPackage | null>(null);
  // const { data, isLoading, isError } = usePackages();
  const { data, isLoading, isError } = useSingleAirport(
    airportId?.toString() || "",
  );
  console.log(data);

  const packagesList: AirportPackage[] | undefined =
    data?.data.airport.airport_packages;

  // Load selected package from session storage on mount
  useEffect(() => {
    const storedSlug = sessionStorage.getItem(SESSION_KEY);
    if (storedSlug && packagesList) {
      const found = packagesList.find((p) => p.package.package_slug === storedSlug);
      if (found) {
        setSelectedPackage(found);
      }
    }
  }, [packagesList]);
  console.log(packagesList);

  const handleSelectPackage = (pkg: AirportPackage) => {
    setSelectedPackage(pkg);

    // Store only the slug
    sessionStorage.setItem(SESSION_KEY, pkg.package.package_slug);
    const selectedPackageSlug =  pkg.package.package_slug;
    if(selectedPackageSlug === "elite"){ 
      onSelectElitePackage(true);
    } else {
      onSelectElitePackage(false);
    }
    console.log("Selected package slug:",selectedPackageSlug);
  };

  if (isLoading) return null;


  console.log(bookingData);
  
  return (
    <div className="flex-2 h-full">
      <div
        style={{
          boxShadow: "0px 11.48px 114.76px 0px #A7A7A73D",
        }}
        className="px-10 py-6 bg-white rounded-2xl h-full"
      >
        <h4 className="text-normal">
          Kindly review the service descriptions below and confirm your
          selection.
        </h4>

        {packagesList?.map((pkg) => (
          <ServiceCard
          bookingData={bookingData}
            key={`package_${pkg.package_id}`}
            service={pkg}
            selectedService={
              selectedPackage?.package.package_slug ||
              sessionStorage.getItem(SESSION_KEY) ||
              null
            }
            onSelect={handleSelectPackage}
          />
        ))}
      </div>
    </div>
  );
};

export default ChooseService;
