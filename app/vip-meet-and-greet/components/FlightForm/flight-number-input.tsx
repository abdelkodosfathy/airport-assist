// ── Flight Number Input ───────────────────────────────────────────────────────

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface FlightNumberInputProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  airline: string;
  disabled?: boolean;
  withoutLabel?: boolean;
  label?: string;
  flightNumberError?:boolean,
}

export function FlightNumberInput({
  flightNumberError,
  value,
  onChange,
  airline,
  withoutLabel,
  disabled,
  label = "Flight Number",
  className = "",
}: FlightNumberInputProps) {
  const airlinePrefix = airline?.slice(0, 2).toUpperCase() || "";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/[^0-9]/g, "").slice(0, 4);
    onChange(`${airlinePrefix} ${input}`);
  };

  return (
    <div className="space-y-2">
      {!withoutLabel && (
        // <Label className={validationErrors.flightNumber ? "text-red-500" : ""}>
        //   {label} {validationErrors.flightNumber && "*"}
        <Label className={flightNumberError ? "text-red-500" : ""}>
          {label} {flightNumberError && "*"}
        </Label>
      )}
      <Input
        disabled={disabled}
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={`${airlinePrefix || "EX"} 1234`}
        maxLength={7}
        className={`bg-[#F4F4F4] ${className}`}
      />
    </div>
  );
}
