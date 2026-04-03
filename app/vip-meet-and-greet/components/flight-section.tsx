import PrimaryPassengerForm from "./primary-passenger-form";
import UploadFilesSeciton from "./upload-files-section";
import CarsSection from "./cars-section";
import { useAirportPackageStore } from "@/store/packageStore";
import FlightForm from "./FlightForm/flight-form";
import {
  useChauffeurDestinationStore,
  useServiceStore,
  useSingleAirportStore,
} from "@/store/vipInputsStore";
import { useCars } from "@/lib/hooks/useCars";
import { useSingleAirport } from "@/lib/hooks/useAirports";
import InnerToast from "@/components/ui/InnerToast";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const FlightSection = () => {
  const currentPackage = useAirportPackageStore(
    (state) => state.airportPackage,
  );

  const country = useSingleAirportStore((state) => state.singleAirport)?.city
    .iso2;
  const setCountry = useChauffeurDestinationStore((s) => s.setCountry);
  setCountry(country ?? "");
  console.log(country);

  const { data, isLoading, isError, error } = useCars(country ?? undefined);

  const includingCars: boolean = (data?.data.total_result ?? 0) > 0;
  const serviceType = useServiceStore((s) => s.serviceType);
  const withChauffuer =
    // includingCars &&
    currentPackage?.package.package_slug === "elite_plus" &&
    serviceType !== "connection";

  return (
    <div className="flex-2 space-y-4 h-auto capitalize">
      <FlightForm />
      <PrimaryPassengerForm />

      {withChauffuer && includingCars && <CarsSection />}
      {withChauffuer && !includingCars && (
        <InnerToast text="We regret that chauffeur-driven cars are not available in this region at the moment. Kindly contact us and we will be happy to assist you.">
          <Button
            asChild
            variant={"outline"}
            className="mt-2 bg-transparent shadow-none cursor-pointer border border-[#7B5A41] text-[#7B5A41] hover:bg-transparent hover:text-[#7B5A41]"
          >
            <Link href="/contact-us">Contact Us</Link>
          </Button>
        </InnerToast>
      )}

      <UploadFilesSeciton />
    </div>
  );
};

export default FlightSection;
