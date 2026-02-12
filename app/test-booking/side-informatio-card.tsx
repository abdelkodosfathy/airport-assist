import Adults from "@/components/custom icons/adults";
import Arraival from "@/components/custom icons/arraival";
import Calender from "@/components/custom icons/calender";
import { Baby } from "lucide-react";
import Steps from "./components/steps";

type Props = {
  adults_count: number;
  child_count: number;
  totalPrice: number;
};

const SideInformationCard = ({ adults_count, child_count,totalPrice }: Props) => {
  return (
    <div className="h-full flex-1 space-y-4 sticky top-26">
      <div className="bg-[#7B5A411C] rounded-2xl p-5">
        <h4 className="font-[Manrope]">Quote for Service: arrival</h4>
        <span className="block w-full h-0.5 my-2 bg-[#CFCFCF]"></span>
        <ul className="space-y-3">
          <li className="text-[#62697D] my-2">
            Airport: Williams Ag Airport (00CL)
          </li>
          <li className="flex gap-2 items-center text-[#62697D]">
            <Arraival /> Arrival
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
          Total: <span>{totalPrice.toFixed(2)}$</span>
        </p>
      </div>
      <Steps currentStep={1} />
    </div>
  );
};

export default SideInformationCard;
