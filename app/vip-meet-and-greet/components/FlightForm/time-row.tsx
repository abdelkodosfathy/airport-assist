// ── Time Row ──────────────────────────────────────────────────────────────────

import { OptionType } from "@/components/custom inputs/search";
import TimePickerInput from "@/components/custom inputs/TimePicker";
import { Label } from "@/components/ui/label";
import { useFlightFormStore } from "@/store/useFlightFormStore";
import { useServiceStore } from "@/store/vipInputsStore";
import ServiceDurationInput from "../ServiceDurationInput";

interface TimeRowProps {
  onServiceDurationChange: (val: OptionType) => void;
  validationErrors?: {
    arrivalTime?: boolean;
    serviceDuration?: boolean;
  };
}

const TimeRow = ({ validationErrors }: TimeRowProps) => {
  const serviceType = useServiceStore((state) => state.serviceType);
  const setArrivalTime = useFlightFormStore((state) => state.setArrivalTime);
  const arrivalTime = useFlightFormStore((state) => state.arrivalTime);

  const handleTimeSelect = (hour: number, minute: number) => {
    setArrivalTime({
      label: `${hour}:${String(minute).padStart(2, "0")}`,
      value: `${hour}:${String(minute).padStart(2, "0")}`,
    });
  };

  return (
    <>
      <div className="space-y-2">
        <Label
          className={`capitalize ${validationErrors?.arrivalTime ? "text-red-500" : ""}`}
        >
          {serviceType === "connection" ? "arrival" : serviceType} Time{" "}
          {validationErrors?.arrivalTime && "*"}
        </Label>
        <TimePickerInput
          value={arrivalTime?.value}
          onSelect={handleTimeSelect}
          className="bg-[#F4F4F4] border-none shadow-none rounded-lg"
          inputClassName={`px-10 h-9 bg-[#F4F4F4] w-full rounded-lg ${
            validationErrors?.arrivalTime ? "border-red-500 border" : ""
          }`}
        />
      </div>
      <ServiceDurationInput />
    </>
  );
};

export default TimeRow;
