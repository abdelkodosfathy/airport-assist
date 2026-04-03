"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Arraival from "@/components/custom icons/arraival";
import Calender from "@/components/custom icons/calender";
import Connection from "@/components/custom icons/connection";
import Depature from "@/components/custom icons/depature";
import { CircleAlert, ClockPlus, Info, Mail } from "lucide-react";
import { useCurrencyStore } from "@/store/currencyStore";
import {
  ServiceType,
  useChauffeurDestinationStore,
  useDateStore,
  usePassengersStore,
  useServiceStore,
  useSingleAirportStore,
} from "@/store/vipInputsStore";
import { useAirportPackageStore } from "@/store/packageStore";
import { usePathname } from "next/navigation";
import { usePrimaryPassengerStore } from "@/store/primaryPassengerStore";
import { useFlightFormStore } from "@/store/useFlightFormStore";
import FastTrack from "@/components/custom icons/side-info/fast-track";
import Adults from "@/components/custom icons/side-info/adults";
import Children from "@/components/custom icons/side-info/children";
import Porter from "@/components/custom icons/side-info/porter";
import AdditionalPassengers from "@/components/custom icons/side-info/additional-passengers";
import Chauffeur from "@/components/custom icons/side-info/chauffeur";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatNumber } from "@/lib/formatNumbers";
import { useCarStore } from "@/store/chauffeurStore";
export type SideInformationCardRef = {
  getTotal: () => number | undefined;
  recalculate: () => void;
};

export type FlightData = {
  bagsNumber: number;
  durationCost: number;
  fastTrack: boolean;
  bagsCost: number;
};

const Icon = ({ serviceType }: { serviceType: ServiceType }) => {
  switch (serviceType) {
    case "arrival":
      return <Arraival />;
    case "departure":
      return <Depature />;
    case "connection":
      return <Connection />;
  }
};

const SideInformationCard = () => {
  const airport = useSingleAirportStore((state) => state.singleAirport);

  const isFastTrack = airport?.is_fast_track_active ?? false;
  const fastTrackCost = airport?.fast_track_cost ?? 0;
  const airportPackage = useAirportPackageStore(
    (state) => state.airportPackage,
  );
  const fastTrackChecked = useFlightFormStore((state) => state.fastTrack);
  const numberOfBags = usePrimaryPassengerStore((state) => state.numberOfBags);
  const freeBags = airport?.number_of_free_bags; // edit it
  const bagsCost = airport?.paid_bags_block_cost; // edit it
  const bagsBlockSize = airport?.paid_bags_block_size; // edit it

  const car = useCarStore((s) => s.car);

  const miles = useChauffeurDestinationStore((s) => s.miles);
  const additionalMiles = Math.max((miles ?? 0) - 15, 0);
  const additionalMilesCost =
    Math.ceil(additionalMiles) * (car?.price_per_mile ?? 0);

  const supplementFee =
    airportPackage?.package.package_slug !== "elite_plus"
      ? (car?.supplement_fee ?? 0)
      : 0;

  const hours = useFlightFormStore((state) => state.serviceDuration);
  const additionalHours = Math.max((Number(hours?.value) || 0) - 2, 0);

  function calcBagsCost(
    numberOfBags: number,
    bagsCost: number,
    blockSize: number,
    freeBags: number,
  ): number {
    const paidBags = numberOfBags - freeBags;
    if (paidBags <= 0) return 0;
    const blocks = Math.ceil(paidBags / blockSize);
    return blocks * bagsCost;
  }

  const calcBags = calcBagsCost(
    numberOfBags,
    bagsCost ?? 0,
    bagsBlockSize ?? 0,
    freeBags ?? 0,
  );

  const packageName = airportPackage?.package.package_name;
  const currency = useCurrencyStore((s) => s.currency);
  const storedAirport = useSingleAirportStore((state) => state.singleAirport);
  const storedServiceType = useServiceStore((state) => state.serviceType);
  const storedDate = useDateStore((state) => state.bookingDate);
  const storedAdults = usePassengersStore((state) => state.adults);
  const storedChildren = usePassengersStore((state) => state.children);

  const allPassengers = storedAdults + storedChildren;
  const calculatedFastTrack = fastTrackChecked
    ? fastTrackCost * allPassengers
    : 0;

  const additionalAdults =
    storedAdults - (airportPackage?.included_adults_count ?? 0);

  const AdditionalPassengersCost =
    Math.max(additionalAdults, 0) *
    (airportPackage?.additional_adult_cost ?? 0);

  const [totalPrice, setTotalPrice] = useState<number>();

  const isLastMinute = useMemo(() => {
    if (!storedDate || !airport) return false;

    const targetDate = new Date(storedDate.date);
    if (isNaN(targetDate.getTime())) return false;
    const diff = targetDate.getTime() - Date.now();

    return diff <= airport.min_hours_before_booking * 60 * 60 * 1000;
  }, [airport]);
  const lastMinuteCost = useMemo(() => {
    if (airport?.last_minute_strategy === "extra_fees" && isLastMinute) {
      return airport.last_minute_cost ?? 0;
    }
    return 0;
  }, [airport, isLastMinute]);

  const additional_hour_cost =
    storedServiceType === "connection"
      ? (airportPackage?.additional_hour_cost ?? 0)
      : 0;
  const additionalHourCost = additional_hour_cost * additionalHours;

  const connectionCost =
    storedServiceType === "connection"
      ? (airportPackage?.connection_fees ?? 0)
      : 0;

  const calculateTotal = useCallback(() => {
    if (!airportPackage) return;

    const adultCost = airportPackage.adult_cost;
    const childCost = airportPackage.child_cost * storedChildren;
    const hoursCost = additionalHours * (airport?.additional_hour_cost || 0);
    const additionalAdults = Math.max(
      storedAdults - airportPackage.included_adults_count,
      0,
    );

    const additionalCost =
      additionalAdults * airportPackage.additional_adult_cost;

    const total =
      adultCost +
      childCost +
      calcBags +
      additionalCost +
      connectionCost +
      calculatedFastTrack +
      additionalMilesCost +
      supplementFee +
      hoursCost;
    setTotalPrice(total);
  }, [
    airportPackage,
    storedServiceType,
    miles,
    car, // for price per hour, mile, supplement fee
    calcBags,
    lastMinuteCost,
    isFastTrack,
    hours,
    fastTrackChecked,
  ]);

  useEffect(() => {
    calculateTotal();
  }, [
    airportPackage,
    miles,
    car, // for price per hour, mile, supplement fee
    calcBags,
    lastMinuteCost,
    isFastTrack,
    hours,
    fastTrackChecked,
    storedServiceType,
  ]);

  return (
    <div className="h-full flex-1 space-y-4 sticky top-26">
      <div className="bg-[#7B5A411C] rounded-2xl p-5">
        <h4 className="font-[Manrope]">
          {!airportPackage?.package.package_name || packageName?.trim() === ""
            ? "Please select a package"
            : `Quote for Service: ${packageName}`}
        </h4>
        <span className="block w-full h-0.5 my-2 bg-[#CFCFCF]"></span>
        <ul className="space-y-3">
          <li className="text-[#62697D] my-2">
            Airport: {storedAirport?.airport_name}
          </li>
          <li className="flex gap-2 items-center justify-between text-[#62697D] capitalize">
            <div className="flex gap-2 items-center">
              <Icon serviceType={storedServiceType as ServiceType} />{" "}
              {storedServiceType}
            </div>
            {connectionCost > 0 ? (
              <div className="font-semibold">
                <span className="text-xs">+{currency} </span>
                {connectionCost}
              </div>
            ) : null}
          </li>
          <li className="flex gap-2 items-center text-[#62697D]">
            <Calender />
            {storedDate?.date}
          </li>
        </ul>

        <span className="block w-full h-0.5 my-2 bg-[#CFCFCF]"></span>

        <ul className="space-y-3">
          {
            <AdultsRow
              includedAdults={airportPackage?.included_adults_count ?? 0}
              storedAdults={storedAdults}
            />
          }

          {storedChildren > 0 ? (
            <ChildrenRow
              currency={currency}
              storedChildren={storedChildren}
              child_cost={airportPackage?.child_cost ?? 0}
            />
          ) : null}

          {isFastTrack && fastTrackChecked ? (
            <FastTrackRow
              calculatedFastTrack={calculatedFastTrack}
              currency={currency}
              fastTrackCost={fastTrackCost}
              passengersCount={allPassengers}
            />
          ) : null}
          {additionalAdults > 0 && AdditionalPassengersCost > 0 ? (
            <AdditionalPassengersRow
              costPerPAX={airportPackage?.additional_adult_cost ?? 0}
              currency={currency}
              passengersCost={AdditionalPassengersCost}
              numberOfPassengers={additionalAdults}
            />
          ) : null}
          {(numberOfBags ?? 0) > 0 && (calcBags ?? 0 > 0) ? (
            <PorterRow calcBags={calcBags} currency={currency} />
          ) : null}
          {additionalHours > 0 ? (
            <AdditionalHoursRow
              currency={currency}
              hours={additionalHours}
              hoursCost={additionalHourCost}
            />
          ) : null}
          {additionalMilesCost > 0 ? (
            <ChauffeurRow
              supplementFee={supplementFee}
              additionalMilesCost={additionalMilesCost}
              currency={currency}
            />
          ) : null}
          {lastMinuteCost > 0 ? (
            <LastMinuteRow
              currency={currency}
              lastMinuteCost={lastMinuteCost}
            />
          ) : null}
        </ul>

        {airportPackage || lastMinuteCost > 0 ? (
          <Total
            totalPrice={totalPrice ?? 0 + (lastMinuteCost ?? 0)}
            currency={currency}
          />
        ) : null}
      </div>
      <Contacts />
    </div>
  );
};
export default SideInformationCard;

const Total = ({
  totalPrice,
  currency,
}: {
  totalPrice?: number;
  currency: string;
}) => {
  const formatedTotal = formatNumber(Math.ceil(totalPrice ?? 0));

  return (
    <>
      <span className="block w-full h-0.5 my-2 bg-[#CFCFCF]"></span>
      <p className="flex justify-between font-semibold">
        Total:{" "}
        <span>
          {currency} {formatedTotal}
        </span>
      </p>
    </>
  );
};

const Contacts = () => {
  const pathname = usePathname();
  const isPackagesPage = pathname.startsWith("/locations/airport");

  if (!isPackagesPage) return;

  return (
    <div className="bg-white rounded-2xl p-5">
      <h4 className="font-[Manrope] font-semibold">Need more information?</h4>
      <p className="text-sm text-[#7a7a7a] leading-[27px]">
        Our dedicated team are available to discuss all aspects of our service.
      </p>
      <ul className="text-[#7a7a7a] space-y-2 mt-2">
        <li className="flex gap-2">
          <Mail />
          <p>Contact@airport-assist.com</p>
        </li>
        <li className="flex gap-2">
          <Mail />
          <p>+44 20 4517 7711</p>
        </li>
        <li className="flex gap-2">
          <Mail />
          <p>Contact us via WhatsApp</p>
        </li>
      </ul>
    </div>
  );
};

const AdultsRow = ({
  includedAdults,
  storedAdults,
}: {
  includedAdults: number;
  storedAdults: number;
}) => {
  return (
    <li className="flex gap-2 items-center font-semibold text-[#62697D]">
      <Adults />
      {storedAdults} Adults{" "}
      {includedAdults ? (
        <span className="text-[0.7rem]">
          ({includedAdults} PAX - Package includes)
        </span>
      ) : null}
    </li>
  );
};

const ChildrenRow = ({
  storedChildren,
  child_cost,
  currency,
}: {
  child_cost: number;
  storedChildren: number;
  currency: string;
}) => {
  return (
    <li className="flex justify-between items-center font-semibold text-[#62697D]">
      <p className="flex gap-2">
        <Children /> {storedChildren}{" "}
        {storedChildren > 1 ? "Children" : "Child"}
      </p>
      {(child_cost ?? 0 > 0) ? (
        <p>
          <span className="text-xs">+{currency} </span>
          {(child_cost * storedChildren).toFixed(0)}
        </p>
      ) : null}
    </li>
  );
};

const AdditionalPassengersRow = ({
  currency,
  passengersCost,
  costPerPAX,
}: {
  currency: string;
  passengersCost: number;
  costPerPAX: number;
  numberOfPassengers: number;
}) => {
  return (
    <li className="flex justify-between gap-2 font-semibold text-[#62697D]">
      <div className="flex gap-2 items-center">
        <AdditionalPassengers />
        <div className="flex items-center gap-2">
          <p className="">
            Additional Passengers{" "}
            <span className="text-xs hidden 2xl:inline">
              (+{currency} {costPerPAX} per PAX)
            </span>
          </p>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info size={16} className="2xl:hidden cursor-pointer" />
              </TooltipTrigger>
              <TooltipContent className="bg-white text-[#7B5A41] shadow-lg">
                <p>
                  +{currency} {costPerPAX} per PAX
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      <p>
        <span className="text-xs">+{currency} </span>
        {passengersCost?.toFixed(0)}
      </p>
    </li>
  );
};

const AdditionalHoursRow = ({
  hours,
  currency,
  hoursCost,
}: {
  hours: number;
  currency: string;
  hoursCost: number;
}) => {
  return (
    <li className="flex gap-2 items-center font-semibold text-[#62697D] justify-between">
      <div className="flex gap-2 items-center">
        <ClockPlus size={24} color="#6D6D6D" />
        {hours} Additional {hours > 1 ? "Hours" : "Hour"}
      </div>
      {(hoursCost ?? 0 > 0) ? (
        <div>
          <p>
            <span className="text-xs">+{currency} </span>
            {hoursCost}
          </p>
        </div>
      ) : null}
    </li>
  );
};

const FastTrackRow = ({
  currency,
  calculatedFastTrack,
}: {
  calculatedFastTrack: number;
  passengersCount: number;
  fastTrackCost: number;
  currency: string;
}) => {
  return (
    <li className="flex justify-between gap-2 items-center font-semibold text-[#62697D]">
      <div className="flex gap-2 items-center">
        <FastTrack color="#6D6D6D" />
        <p className="flex items-center gap-2">
          <span>Fast Track</span>
        </p>
      </div>
      <p>
        <span className="text-xs">+{currency} </span>
        {calculatedFastTrack?.toFixed(0)}
      </p>
    </li>
  );
};

const PorterRow = ({
  calcBags,
  currency,
}: {
  calcBags: number;
  currency: string;
}) => {
  return (
    <li className="flex gap-2 items-center font-semibold text-[#62697D] justify-between">
      <div className="flex gap-2 items-center">
        <Porter color="#6D6D6D" /> Additional Porter{" "}
      </div>
      <div>
        <span className="text-xs">+{currency} </span>
        {(calcBags ?? 0 > 0) ? ` ${calcBags.toFixed(0)}` : null}
      </div>
    </li>
  );
};

const ChauffeurRow = ({
  currency,
  additionalMilesCost,
  supplementFee,
}: {
  currency: string;
  additionalMilesCost: number;
  supplementFee: number;
}) => {
  return (
    // <li className="flex justify-between gap-2 items-center font-semibold text-[#62697D]">
    <li className="flex justify-between gap-2 font-semibold text-[#62697D]">
      <div className="flex gap-2 items-center">
        <Chauffeur />
        <div className="flex items-center gap-2">
          <p>
            Chauffeur
            <span className="text-[0.7rem] hidden xl:inline">
              (included free for 15 miles)
            </span>
          </p>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info size={16} className="xl:hidden cursor-pointer" />
              </TooltipTrigger>
              <TooltipContent className="bg-white text-[#7B5A41] shadow-lg">
                <p>(included free for 15 miles)</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      <p>
        <span className="text-xs">+{currency} </span>
        {Math.ceil(additionalMilesCost + supplementFee)}
      </p>
    </li>
  );
};

const LastMinuteRow = ({
  currency,
  lastMinuteCost,
}: {
  currency: string;
  lastMinuteCost: number;
}) => {
  return (
    <li className="flex justify-between gap-2 items-center font-semibold text-[#62697D]">
      <p className="flex items-center gap-2">
        <CircleAlert size={24} color="#6D6D6D" /> Last-Minute Booking Fee
      </p>
      <p>
        <span className="text-xs">+{currency} </span>
        {lastMinuteCost.toFixed(0)}
      </p>
    </li>
  );
};
