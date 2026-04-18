// ── Time Row ──────────────────────────────────────────────────────────────────

import TimePickerInput from "@/components/custom inputs/TimePicker";
import { Label } from "@/components/ui/label";
import { useFlightFormStore } from "@/store/useFlightFormStore";
import { useServiceStore } from "@/store/vipInputsStore";
import ServiceDurationInput from "../ServiceDurationInput";



const TimeRow = () => {
  const serviceType = useServiceStore((state) => state.serviceType);
  const setArrivalTime = useFlightFormStore((state) => state.setArrivalTime);
  const arrivalTime = useFlightFormStore((state) => state.arrivalTime);

  const validationError = useFlightFormStore((s) => s.validationError);

  const hasError = (key: "arrivalTime") => {
    const keys = {
      arrivalTime: arrivalTime?.value,
    };

    if (validationError && (keys[key] ?? "") === "") {
      return true;
    }
    return false;
  };

  const arrivalTimeError = hasError("arrivalTime");

  const handleTimeSelect = (hour: number, minute: number) => {
    setArrivalTime({
      label: `${hour}:${String(minute).padStart(2, "0")}`,
      value: `${hour}:${String(minute).padStart(2, "0")}`,
    });
  };

  return (
    <>
      <div
        className={`space-y-2 ${serviceType === "arrival" ? "col-span-2" : ""}`}
      >
        <Label
          className={`capitalize ${arrivalTimeError ? "text-red-500" : ""}`}
        >
          {serviceType === "connection" ? "arrival" : serviceType} Time{" "}
          {arrivalTimeError && "*"}
        </Label>
        <TimePickerInput
          value={arrivalTime?.value}
          onSelect={handleTimeSelect}
          className="bg-[#F4F4F4] border-none shadow-none rounded-lg"
          inputClassName={`px-10 h-9 bg-[#F4F4F4] w-full rounded-lg ${
            arrivalTimeError ? "border border-red-500" : ""
          }`}
        />
      </div>
      {serviceType !== "arrival" ? <ServiceDurationInput /> : null}
    </>
  );
};

export default TimeRow;
