"use client";
import AirportSearchInput from "../AirportSearchInput";
import SelectDropdown from "../custom inputs/SelectList";
import clsx from "clsx";
import DatePickerInput from "../custom inputs/DatePickerInputs";
import AdultsPicker from "../custom inputs/AdultsPicker";
import Adults from "../custom icons/adults";
import { AlertCircle } from "lucide-react";
import { OptionType } from "../custom inputs/search";
import Arraival from "../custom icons/arraival";
import Depature from "../custom icons/depature";
import Connection from "../custom icons/connection";
import { ServiceType, useServiceStore } from "@/store/vipInputsStore";
import { Errors, TabType } from "./BookingForm";

const VipInputs = ({
  activeTab,
  onReset,
  errors,
}: {
  onReset: () => void;
  activeTab: TabType;
  errors: Errors;
}) => {
  const servicesOptions = [
    { label: "Arrival", value: "arrival", icon: <Arraival /> },
    { label: "Departure", value: "departure", icon: <Depature /> },
    ...(activeTab === "vip"
      ? [{ label: "Connection", value: "connection", icon: <Connection /> }]
      : []),
  ] satisfies OptionType[];
  // const storedAirport = useAirportStore((state) => state.airport);
  // const storedDate = useDateStore(state => state.bookingDate);

  const storeServiceType = useServiceStore((state) => state.setServiceType);
  const storedServiceType = useServiceStore((state) => state.serviceType);

  // const [errors, setErrors] = useState<Record<string, string>>({});

  const handleServiceTypeSelect = (e: OptionType) => {
    onReset();
    storeServiceType(e.value as ServiceType);
  };

  return (
    <>
      <div
        className={`col-span-1 sm:col-span-2 lg:col-span-6 rounded-l-xl  ${errors.airport && "ring-2 ring-red-500  "}`}
      >
        <AirportSearchInput
          onReset={onReset}
          className="bg-white h-10 lg:h-full rounded-t-lg lg:rounded-none lg:rounded-l-xl"
        />
        {errors.airport && (
          <div id="airport-error" role="alert">
            <ErrorMessage message={errors.airport} />
          </div>
        )}
      </div>

      <div className="col-span-1 sm:col-span-2 lg:col-span-4">
        <SelectDropdown
          id="serviceType"
          placeholder="Service Type"
          inputClassName={clsx(
            "rounded-none h-full capitalize",
            errors.serviceType &&
              "ring-2 ring-red-500 placeholder:text-red-500",
          )}
          className=" bg-white  h-10 lg:h-full rounded-lg lg:rounded-none"
          onSelect={handleServiceTypeSelect}
          storedServiceLabel={storedServiceType as ServiceType}
          options={servicesOptions}
          aria-invalid={!!errors.serviceType}
          aria-describedby={
            errors.serviceType ? "serviceType-error" : undefined
          }
        />
        {errors.serviceType && (
          <div id="serviceType-error" role="alert">
            <ErrorMessage message={errors.serviceType} />
          </div>
        )}
      </div>

      <div className="col-span-1 sm:col-span-1 lg:col-span-3">
        <DatePickerInput
          className="h-full"
          inputClassName={clsx(
            "sm:rounded-bl-lg lg:rounded-none  h-10 lg:h-full transition-all duration-200",
            errors.date && "ring-2 ring-red-500 placeholder:text-red-500",
          )}
          aria-invalid={!!errors.date}
          aria-describedby={errors.date ? "date-error" : undefined}
        />
        {errors.date && (
          <div id="date-error" role="alert">
            <ErrorMessage message={errors.date} />
          </div>
        )}
      </div>

      <div className="col-span-1 sm:col-span-1 lg:col-span-3">
        <AdultsPicker
          icon={<Adults />}
          placeholder="1 Adult - 0 Children"
          className="h-full"
          inputClassName="bg-white rounded-b-lg sm:rounded-b-none sm:rounded-br-lg lg:rounded-none h-10 lg:h-full"
        />
      </div>
    </>
  );
};

export default VipInputs;

// Error display helper
const ErrorMessage = ({ message }: { message?: string }) => {
  if (!message) return null;
  return (
    <div className="absolute flex items-center gap-1 bg-white rounded-lg p-4 text-red-500 text-sm mt-4 animate-in fade-in slide-in-from-top-1 duration-200">
      <div className="absolute w-4 h-4 bg-white rotate-45 -top-2 left-5"></div>
      <AlertCircle className="w-3 h-3" />
      <span>{message}</span>
    </div>
  );
};
