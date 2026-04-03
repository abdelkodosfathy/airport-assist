import AirportSearchInput from "@/components/AirportSearchInput";
import Arraival from "@/components/custom icons/arraival";
import Connection from "@/components/custom icons/connection";
import Depature from "@/components/custom icons/depature";
import AdultsPicker from "@/components/custom inputs/AdultsPicker";
import DatePickerInput from "@/components/custom inputs/DatePickerInputs";
import { OptionType } from "@/components/custom inputs/search";
import SelectDropdown from "@/components/custom inputs/SelectList";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  ServiceType,
  useAirportStore,
  useDateStore,
  useServiceStore,
} from "@/store/vipInputsStore";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

type Props = {};
const servicesOptions = [
  { label: "Arrival", value: "arrival", icon: <Arraival /> },
  { label: "Departure", value: "departure", icon: <Depature /> },
  { label: "Connection", value: "connection", icon: <Connection /> },
] satisfies OptionType[];

const AirportForm = (props: Props) => {
  const storeServiceType = useServiceStore((state) => state.setServiceType);
  const storedServiceType = useServiceStore((state) => state.serviceType);

  const handleServiceTypeSelect = (e: OptionType) => {
    storeServiceType(e.value as ServiceType);
  };

  return (
    <form action="" className="space-y-3">
      <h4
        className=""
        style={{
          fontFamily: "Manrope",
          fontWeight: 600,
          color: "#878989",
          fontStyle: "SemiBold",
          fontSize: "20.3px",
          lineHeight: "100%",
          letterSpacing: "0px",
          textAlign: "center",
        }}
      >
        Quote for VIP Package
      </h4>
      <div>
        <Label htmlFor="airport" className="mb-2">
          airport
        </Label>
        {/* <Input /> */}
        <AirportSearchInput
          // hideIcon
          // inputClassName={"h-9 rounded-md bg-[#F4F4F4] border-[#E0E0E0]"}
          className={"h-9 rounded-md bg-[#F4F4F4] border-[#E0E0E0]"}
        />
      </div>
      <div>
        <Label htmlFor="service_type" className="mb-2">
          Service Type
        </Label>
        {/* <Input /> */}
        <SelectDropdown
          id="serviceType"
          placeholder="Service Type"
          inputClassName={"h-9 rounded-md bg-[#F4F4F4] border-[#E0E0E0]"}
          onSelect={handleServiceTypeSelect}
          storedServiceLabel={storedServiceType as ServiceType}
          options={servicesOptions}
        />
      </div>
      <div>
        <Label htmlFor="passengers" className="mb-2">
          Passengers
        </Label>
        {/* <Input className="bg-[#F4F4F4] border-[#E0E0E0]"/> */}
        <AdultsPicker
          //   icon={<Adults />}
          placeholder="1 Adult - 0 Children"
          className="h-full"
          inputClassName="h-9 rounded-md bg-[#F4F4F4] border-[#E0E0E0]"
        />
      </div>
      <div>
        <Label htmlFor="date" className="mb-2">
          Date
        </Label>
        {/* <Input className="bg-[#F4F4F4] border-[#E0E0E0]"/> */}
        <DatePickerInput
          className="h-full"
          inputClassName="h-9 rounded-md bg-[#F4F4F4] border-[#E0E0E0]"
        />
      </div>
      <BookNow service={storedServiceType} />
    </form>
  );
};

export default AirportForm;
const BookNow = ({ service }: { service: ServiceType | null }) => {
  const storedAirport = useAirportStore((state) => state.airport);
  const storedDate = useDateStore((state) => state.bookingDate);

  const handleClick = (e: React.MouseEvent) => {
    const missing: string[] = [];

    if (!storedAirport) missing.push("Airport");
    if (!storedDate?.date || !storedDate?.time) missing.push("Date & time");
    if (!service) missing.push("Service type");

    if (missing.length > 0) {
      e.preventDefault();
      toast.error("Please complete the following:", {
        description: missing.join(" • "),
        position: "top-center",
      });
    }
  };

  return (
    <Button
      asChild
      variant="outline"
      className="w-full mb-3 border-black hover:bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)] hover:text-white hover:border-none duration-0"
    >
      <Link href="/vip-meet-and-greet" onClick={handleClick}>
        Book now <ArrowUpRight />
      </Link>
    </Button>
  );
};
