import car1 from "@/public/car1.png";
import { Button } from "@/components/ui/button";
import InnerToast from "@/components/ui/InnerToast";
import { Clock4 } from "lucide-react";
import Image from "next/image";

type Props = {};
interface StepsProps {
  onFocus?: () => void;
}

const ChauffeurServices = ({ onFocus }: StepsProps) => {
  return (
    <div
      onClick={() => {
        onFocus?.();
      }}
      style={{
        boxShadow: "0px 11.48px 114.76px 0px #A7A7A73D",
      }}
      className="px-10 py-6 bg-white rounded-2xl"
    >
      <h4 className="font-manrope font-medium text-[18.75px] leading-[1.3] tracking-normal">
        Chauffeur Services
      </h4>
      <span className="inline-block w-full h-0.5 bg-[#CFCFCF]" />
      <div className="flex gap-4 items-center py-8">
        <Image alt="car image" src={car1} width={216} height={108.75} />
        <div>
          <p className="font-semibold">S -Class Mercedes</p>
          <p>
            <span className="font-semibold">Drop Off Address:</span> 1256
            Maidenhead Road SL6 1RN
          </p>
          <p>
            <span className="font-semibold">Destination:</span> 25.5 km / 19.3
            mi - 1hrs 20min{" "}
          </p>
        </div>
      </div>
      <InnerToast
        icon={
          <div className="min-w-6 min-h-6 w-6 h-6 bg-[#7B5A41] rounded-full grid place-content-center">
            <Clock4 className="w-5 h-5 text-white" />
          </div>
        }
        text="Chauffeur will wait 15 minutes free of charge"
      />

      <Button
        style={{
          background:
            "linear-gradient(179.26deg, #7B5A41 0.64%, #DFB08D 223.79%)",
          border: "1.26px solid #966B4B",
        }}
        className={
          "cursor-pointer h-7 font-[Manrope] font-normal py-0 px-8 rounded-full mt-2 border-[#966B4B] text-white"
        }
      >
        Remove
      </Button>
    </div>
  );
};
export default ChauffeurServices;
