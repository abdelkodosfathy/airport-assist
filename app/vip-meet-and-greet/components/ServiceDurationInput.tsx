"use client";
import { OptionType } from "@/components/custom inputs/search";
import SelectDropdown from "@/components/custom inputs/SelectList";
import { Label } from "@/components/ui/label";
import { useFlightFormStore } from "@/store/useFlightFormStore";
import { ServiceType, useServiceStore } from "@/store/vipInputsStore";
import { useEffect, useState } from "react";

const ServiceDurationInput = () => {
  const serviceType = useServiceStore((state) => state.serviceType);
  const arrivalTime = useFlightFormStore((state) => state.arrivalTime);
  const serviceDuration = useFlightFormStore((state) => state.serviceDuration);
  const setServiceDuration = useFlightFormStore(
    (state) => state.setServiceDuration,
  );

  const [serviceOptions, setServiceOptions] = useState<OptionType[]>([]);

  useEffect(() => {
    if (!arrivalTime) return;

    const parsedTime = parseTime(arrivalTime.value);

    const options = buildServiceDuration(
      parsedTime.hours,
      parsedTime.minutes,
      serviceType,
    );
    setServiceOptions(options);
  }, [arrivalTime, serviceType]);

  return (
    <div className="space-y-2">
      <Label // className={validationErrors?.serviceDuration ? "text-red-500" : ""}
      >
        <p>
          Service Duration
          <span className="text-xs"> (Duration: 2 hours per services)</span>
        </p>
      </Label>
      <SelectDropdown
        disabled={serviceOptions.length === 0}
        inputClassName={`bg-[#F4F4F4] focus-visible:border focus-visible:outline 
          `}
        // ${validationErrors?.serviceDuration ? "border-red-500" : ""}
        placeholder="e.g. 2 hours"
        options={serviceOptions}
        value={serviceDuration}
        onSelect={(val) => {
          setServiceDuration(val);
        }}
      />
    </div>
  );
};

export default ServiceDurationInput;

const buildServiceDuration = (
  hour: number,
  minute: number,
  serviceType: ServiceType | null,
) => {
  const options: OptionType[] = [];
  const baseDate = new Date();
  let adjustedHour = hour;
  baseDate.setHours(adjustedHour, minute, 0, 0);

  const limit = serviceType === "departure" ? 6 : 7;

  for (let i = 2; i < limit; i++) {
    const newDate = new Date(baseDate);
    serviceType === "departure"
      ? newDate.setHours(newDate.getHours() - i)
      : newDate.setHours(newDate.getHours() + i);

    const formattedTime = newDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    const label = `${formattedTime} (${i} hours)`;

    options.push({
      label,
      value: i.toString(),
    });
  }

  return options;
};
function parseTime(time: string): { hours: number; minutes: number } {
  const [hours, minutes] = time.split(":").map(Number);

  return {
    hours,
    minutes,
  };
}
