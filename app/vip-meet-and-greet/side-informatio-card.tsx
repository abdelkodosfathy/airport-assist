import { VipBookingData } from "@/components/BookingForm";
import Adults from "@/components/custom icons/adults";
import Arraival from "@/components/custom icons/arraival";
import Calender from "@/components/custom icons/calender";
import Connection from "@/components/custom icons/connection";
import Depature from "@/components/custom icons/depature";
import { useCurrency } from "@/lib/hooks/useCurrency";
import { Briefcase } from "lucide-react";

type Props = {
  totalPrice: number;
  packageName: string;
  numberOfBags: number;
  bagsCost?: number;
  storedData: VipBookingData;
  isFastTrack: boolean;
  fastTrackCost?: number;
  lastMinuteCost: number;
};

const SideInformationCard = ({
  packageName,
  numberOfBags,
  lastMinuteCost,
  bagsCost,
  storedData,
  isFastTrack,
  fastTrackCost,
  totalPrice,
}: Props) => {
  const { currencyMark } = useCurrency();
  function extractDate(dateTimeString: string) {
    return dateTimeString.split(" ")[0];
  }

  const Icon = () => {
    switch (storedData.serviceType) {
      case "arrival":
        return <Arraival />;
      case "departure":
        return <Depature />;
      case "connection":
        return <Connection />;
    }
  };
  // console.log(packageName);

  return (
    <div className="h-full flex-1 space-y-4 sticky top-26">
      <div className="bg-[#7B5A411C] rounded-2xl p-5">
        <h4 className="font-[Manrope]">
          {packageName.trim() === ""
            ? "Please select a package"
            : `Quote for Service: ${packageName}`}
        </h4>
        <span className="block w-full h-0.5 my-2 bg-[#CFCFCF]"></span>
        <ul className="space-y-3">
          <li className="text-[#62697D] my-2">
            Airport: {storedData.airport_name}
          </li>
          <li className="flex gap-2 items-center text-[#62697D] capitalize">
            <Icon /> {storedData.serviceType}
          </li>
          <li className="flex gap-2 items-center text-[#62697D]">
            <Calender />
            {/* 2026-02-28 00:00 */}
            {extractDate(storedData.date)}
          </li>
        </ul>
        <span className="block w-full h-0.5 my-2 bg-[#CFCFCF]"></span>
        <ul className="space-y-3">
          <li className="flex gap-2 items-center font-semibold text-[#62697D]">
            <Adults />
            {storedData.adults} Adults
          </li>
          <li className="flex gap-2 items-center font-semibold text-[#62697D]">
            {/* <PersonStanding/> 1 Child */}
            {storedData.children > 0 && (
              <>
                <Adults /> {storedData.children} Child
              </>
            )}
          </li>
          {numberOfBags > 0 && (
            <li className="flex gap-2 items-center font-semibold text-[#62697D] justify-between">
              <div className="flex gap-2 items-center">
                <Briefcase size={19} color="#6D6D6D" /> {numberOfBags}{" "}
                {numberOfBags === 1 ? "Bag" : "Bags"}
              </div>
              <div>
                {(bagsCost ?? 0 > 0) ?
                  `
                +${bagsCost} ${currencyMark}
                ` : null}
              </div>
            </li>
          )}
          {lastMinuteCost > 0 && (
            <li className="flex justify-between gap-2 items-center font-semibold text-[#62697D]">
              <p>Last-Minute Booking Fee</p>
              <p>
                +{lastMinuteCost} {currencyMark}
              </p>
            </li>
          )}
          {isFastTrack && (
            <li className="flex justify-between gap-2 items-center font-semibold text-[#62697D]">
              <p>Fast Track </p>
              <p>
                +{fastTrackCost?.toFixed(2)} {currencyMark}
              </p>
            </li>
          )}
        </ul>
        <span className="block w-full h-0.5 my-2 bg-[#CFCFCF]"></span>
        <p className="flex justify-between font-semibold">
          Total:{" "}
          <span>
            {totalPrice.toFixed(2)} {currencyMark}
          </span>
        </p>
      </div>
      {/* <Steps withoutChauffuer={withoutChauffuer} currentStep={currentStep} /> */}
    </div>
  );
};

export default SideInformationCard;
