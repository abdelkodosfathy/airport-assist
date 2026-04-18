"use client";

import { useTripStore } from "@/store/tripStore";
import NumberInput from "./NumberInputs";
import InnerToast from "@/components/ui/InnerToast";
import { Separator } from "@/components/ui/separator";
import FlightInputs from "./FlightInputs";
import DatePickerInput from "@/components/custom inputs/DatePickerInputs";
import TimePickerInput from "@/components/custom inputs/TimePicker";

import MultiDay from "./MultiDay";

export const TripBasedInputs = () => {
  const tripType = useTripStore((state) => state.tripType);

  return <>{tripType === "hourly" ? <Hourly /> : <AirportTransfare />}</>;
};

const AirportTransfare = () => {
  return (
    <div className="my-2">
      <h3 className="mb-2 font-semibold">Flight</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4 w-full">
        <FlightInputs />

        <div className="col-span-2">
          <h3 className="mb-2 font-semibold">Transfer Time</h3>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <DatePickerInput
                className="bg-[#F4F4F4] border border-[#E0E0E0] rounded-lg h-full"
                inputClassName="px-10 h-11.25 bg-[#F4F4F4] border-none w-full rounded-md"
              />
            </div>
            <div className="flex-1">
              <TimePickerInput
                className="bg-[#F4F4F4] border border-[#E0E0E0] rounded-lg h-full"
                inputClassName="px-10 h-11.25 bg-[#F4F4F4] border-none w-full rounded-md"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Hourly = () => {
  return (
    <div className="mb-2 mt-4">
      <HoursInput />
      <Separator />
      <MultiDay />
    </div>
  );
};

const HoursInput = () => {
  const isMultiDay = useTripStore((s) => s.isMultiDay);
  const hoursValue = useTripStore((state) => state.hours);
  const setHoursValue = useTripStore((state) => state.set_hours);
  return (
    <>
      <div className="flex justify-between">
        <NumberInput
          min={4}
          onIncrement={() => setHoursValue(hoursValue + 1)}
          onDecrement={() => setHoursValue(Math.max(4, (hoursValue ?? 0) - 1))}
          onChangeValue={(e) => setHoursValue(Math.max(4, e))}
          value={hoursValue ?? 0}
          title={isMultiDay ? "hours per day" : "hours"}
        />
      </div>
      <div className="my-2">
        <InnerToast text="with 40 miles included in the booking price. Any additional mileage will be charged at £4 per mile after the service." />
      </div>
    </>
  );
};
