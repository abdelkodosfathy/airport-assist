import Adults from "@/components/custom icons/adults";
import Arraival from "@/components/custom icons/arraival";
import Calender from "@/components/custom icons/calender";
import { Baby } from "lucide-react";
// import Steps from "./components/steps";
import { useCurrency } from "@/lib/hooks/useCurrency";

type Props = {
  adults_count: number;
  child_count: number;
  totalPrice: number;
  withoutChauffuer: boolean;
  packageName: string;
  // serviceType: "arrival" | "departure" | "connection";
  serviceType: string;
  // durationCost?: number,
  // currentStep: number,
};

const SideInformationCard = ({
  // withoutChauffuer,
  // durationCost,
  adults_count,
  packageName,
  child_count,
  serviceType,
  // currentStep = 0,
  totalPrice,
}: Props) => {
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

  return (
    <div className="h-full flex-1 space-y-4 sticky top-26">
      <div className="bg-[#7B5A411C] rounded-2xl p-5">
        <h4 className="font-[Manrope]">Quote for Service: {packageName}</h4>
        <span className="block w-full h-0.5 my-2 bg-[#CFCFCF]"></span>
        <ul className="space-y-3">
          <li className="text-[#62697D] my-2">
            Airport: Williams Ag Airport (00CL)
          </li>
          <li className="flex gap-2 items-center text-[#62697D]">
            <Arraival /> {serviceType}
          </li>
          <li className="flex gap-2 items-center text-[#62697D]">
            <Calender />
            2026-02-28 00:00
          </li>
        </ul>
        <span className="block w-full h-0.5 my-2 bg-[#CFCFCF]"></span>
        <ul className="space-y-3">
          <li className="flex gap-2 items-center font-semibold text-[#62697D]">
            <Adults />
            {adults_count} Adults
          </li>
          <li className="flex gap-2 items-center font-semibold text-[#62697D]">
            {/* <PersonStanding/> 1 Child */}
            {child_count > 0 && (
              <>
                <Baby /> {child_count} Child
              </>
            )}
          </li>
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
