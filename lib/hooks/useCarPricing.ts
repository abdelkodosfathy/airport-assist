import { usePickupPointsStore } from "@/store/pickupPointsStore";
import { useTripStore } from "@/store/tripStore";
import { useSingleAirportStore } from "@/store/vipInputsStore";
import { useMemo } from "react";
import { Car } from "../types/car";
import { extractNumber } from "@/components/CarCard";

type UseCarPricingProps = {
  car: Car;
  includedMiles?: number;
};

export const useCarPricing = ({
  car,
  includedMiles = 18,
}: UseCarPricingProps) => {
  const meetAndGreet = useTripStore((s) => s.meetAndGreet);
  const bags = useTripStore((s) => s.luggage);
  const passengers = useTripStore((s) => s.passengers);

  const singleAirport = useSingleAirportStore((s) => s.singleAirport);
  const distanceMi = usePickupPointsStore((s) => s.distanceMi);

  // ── Distance ─────────────────────────────────────────────
  const miles = useMemo(() => {
    return extractNumber(distanceMi ?? "0 mi");
  }, [distanceMi]);

  const milesCost = useMemo(() => {
    const paidMiles = Math.max(miles - includedMiles, 0);
    return paidMiles * 4;
  }, [miles, includedMiles]);

  // ── Airport Source ───────────────────────────────────────
  const activeAirport = meetAndGreet ? singleAirport : null;


  // ── Passengers Cost ──────────────────────────────────────
  const passengersCost = useMemo(() => {
    if (!activeAirport) return 0;

    const airportPackage = activeAirport.airport_packages.find((p) =>
      ["elite", "elite_plus", "signature", "vip"].includes(
        p.package.package_slug
      )
    );
		

    if (!airportPackage) return 0;
    
		
    const freePassengers = airportPackage.included_adults_count ?? 0;
    const blockCost = airportPackage.additional_adult_cost ?? 0;
		
    const paidPassengers = Math.max(passengers - freePassengers, 0);
		
    const meetAndGreetCost = airportPackage.adult_cost ?? 0; // from elite by defautl

    return (paidPassengers * blockCost) + meetAndGreetCost;
  }, [activeAirport, passengers]);

  // ── Luggage Cost ─────────────────────────────────────────
  const luggageCost = useMemo(() => {
    if (!activeAirport) return 0;

    const freeBags = activeAirport.number_of_free_bags ?? 0;
    const blockSize = activeAirport.paid_bags_block_size ?? 1;
    const blockCost = activeAirport.paid_bags_block_cost ?? 0;

    const paidBags = Math.max(bags - freeBags, 0);
    const blocks = Math.ceil(paidBags / blockSize);

    return blocks * blockCost;
  }, [activeAirport, bags]);

  // ── Total ────────────────────────────────────────────────
  const totalCost = useMemo(() => {
    return car.supplement_fee + milesCost + passengersCost + luggageCost;
  }, [car.supplement_fee, milesCost, passengersCost, luggageCost]);

  return {
    milesCost,
    passengersCost,
    luggageCost,
    totalCost,
    isUsingMeetAndGreet: !!activeAirport,
  };
};