"use client";
import clsx from "clsx";
import DatePickerInput from "../custom inputs/DatePickerInputs";
import AdultsPicker from "../custom inputs/AdultsPicker";
import Adults from "../custom icons/adults";
import { useJsApiLoader } from "@react-google-maps/api";
import { Errors } from "./BookingForm";
import { LocationInput } from "@/app/chauffeur-services/components/LoactionInputs";
import { usePickupPointsStore } from "@/store/pickupPointsStore";
import { useAirportStore } from "@/store/vipInputsStore";
import TimePickerInput from "../custom inputs/TimePicker";

const LIBRARIES: "places"[] = ["places"];

const ChauffeurInputs = ({
  errors,
  onReset,
}: {
  errors: Errors;
  onReset: () => void;
}) => {
  const { pickup, dropoff, setPickup, setDropoff } = usePickupPointsStore();
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: LIBRARIES,
  });
  const storeAirport = useAirportStore((state) => state.setAirport);

  return (
    <>
      {/* From */}
      <div
        className={`col-span-1 sm:col-span-2 lg:col-span-5 rounded-l-xl ${errors.dropOff && "ring-2 ring-red-500"}`}
      >
        <LocationInput
          // countryRestriction="uk" //jsut remove it to unlock the search outside the uk
          countryRestriction={["uk", "fr", "gb"]} // you can use it for many countries or remove it to unlock the search
          className="bg-white rounded-none rounded-l-xl h-full"
          placeholder="From"
          value={pickup}
          onChange={(s) => setPickup(s)}
          onAirportSelect={(e) => {
            storeAirport(e);
          }}
          isLoaded={isLoaded}
        />
        {errors.from && (
          <div id="from-error" role="alert">
            <ErrorMessage message={errors.from} />
          </div>
        )}
      </div>

      {/* To */}
      <div
        className={`col-span-1 sm:col-span-2 lg:col-span-5 ${errors.dropOff && "ring-2 ring-red-500"}`}
      >
        <LocationInput
          className="bg-white rounded-none h-full"
          placeholder="Drop Off"
          value={dropoff}
          onChange={(s) => setDropoff(s)}
          isLoaded={isLoaded}
        />
        {errors.dropOff && (
          <div id="drop-off-error" role="alert">
            <ErrorMessage message={errors.dropOff} />
          </div>
        )}
      </div>

      {/* Date picker */}
      <div className="col-span-1 sm:col-span-1 lg:col-span-3">
        <DatePickerInput
          className="h-full"
          inputClassName={clsx(
            "sm:rounded-bl-lg lg:rounded-none h-10 lg:h-full transition-all duration-200",
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

      {/* Adults picker */}
      <div className="col-span-1 sm:col-span-1 lg:col-span-3">
        <TimePickerInput
        // disabled
          className="h-full"
          inputClassName={clsx(
            "sm:rounded-bl-lg lg:rounded-none h-10 lg:h-full transition-all duration-200",
            errors.date && "ring-2 ring-red-500 placeholder:text-red-500",
          )}
          aria-invalid={!!errors.date}
          aria-describedby={errors.date ? "date-error" : undefined}
        />
        {errors.time && (
          <div id="date-error" role="alert">
            <ErrorMessage message={errors.time} />
          </div>
        )}
      </div>
    </>
  );
};

export default ChauffeurInputs;

const ErrorMessage = ({ message }: { message?: string }) => {
  if (!message) return null;
  return (
    <div className="absolute flex items-center gap-1 bg-white rounded-lg p-4 text-red-500 text-sm mt-4 animate-in fade-in slide-in-from-top-1 duration-200">
      <div className="absolute w-4 h-4 bg-white rotate-45 -top-2 left-5"></div>
      <span>{message}</span>
    </div>
  );
};
