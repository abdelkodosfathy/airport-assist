import { Button } from "@/components/ui/button";
import { useTripStore } from "@/store/tripStore";
import clsx from "clsx";

const TripTypeRow = () => {
  const tripType = useTripStore((state) => state.tripType);
  const setTripType = useTripStore((state) => state.setTripType);
  return (
    <div className="flex gap-3.5 mb-4">
      <Button
        onClick={() => setTripType("one-way")}
        variant="outline"
        className={clsx(
          " mt-6 w-max  cursor-pointer  border-[#D1D1D1]  text-[#7A7A7A]  bg-[#ECECEC] hover:border-[#664F31]   hover:bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)]  hover:text-white  duration-0",
          tripType === "one-way"
            ? "border-[#664F31] bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)] text-white"
            : "",
        )}
      >
        Airport Transfer
      </Button>
      <Button
        onClick={() => setTripType("hourly")}
        variant="outline"
        className={clsx(
          " mt-6 w-max  cursor-pointer  border-[#D1D1D1]  text-[#7A7A7A]  bg-[#ECECEC] hover:border-[#664F31]   hover:bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)]  hover:text-white  duration-0",
          tripType === "hourly"
            ? "border-[#664F31] bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)] text-white"
            : "",
        )}
      >
        Hourly
      </Button>
    </div>
  );
};

export default TripTypeRow;
