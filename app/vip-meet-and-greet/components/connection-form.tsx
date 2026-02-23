import { forwardRef, useImperativeHandle, useState } from "react";
import SearchWithDropdown, {
  OptionType,
} from "@/components/custom inputs/search";
import SelectDropdown from "@/components/custom inputs/SelectList";
import TimePickerInput from "@/components/custom inputs/TimePicker";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAirlines } from "@/lib/hooks/useAirlines";

interface StepsProps {
  onFocus?: () => void;
  fastTrackCost: number | "not_active";
  hourCost: number;
  onEnableFastTrack: (status: boolean) => void;
  setDuration: (val: OptionType) => void;
}

interface validationErrors {
  airline?: boolean;
  flightNumber?: boolean;
  arrivalTime?: boolean;
  serviceDuration?: boolean;
}

export type FlightFormData = {
  selectedAirline: OptionType | null;
  flightNumber: string;
  arrivalTime: OptionType | null;
  serviceDuration: OptionType | null;
  fastTrackChecked: boolean;
};

export type FlightFormHandle = {
  isValid: () => boolean;
  getData: () => FlightFormData;
};

const ConnectionForm = forwardRef<FlightFormHandle, StepsProps>(
  (
    { onFocus, fastTrackCost, hourCost, setDuration, onEnableFastTrack },
    ref,
  ) => {
    const { data, isLoading } = useAirlines();

    const airlineOptions: OptionType[] =
      data?.data.airlines.map((airline) => ({
        label: `${airline.airline_name} (${airline.airline_code})`,
        value: airline.airline_id?.toString(),
      })) || [];

    const [selectedAirline, setSelectedAirline] = useState<OptionType | null>(
      null,
    );
    const [flightNumber, setFlightNumber] = useState("");
    const [arrivalTime, setArrivalTime] = useState<OptionType | null>(null);
    const [serviceDuration, setServiceDuration] = useState<OptionType | null>(
      null,
    );
    const [fastTrackChecked, setFastTrackChecked] = useState(false);

    // useEffect(() => {
    //   onEnableFastTrack(fastTrackChecked);
    // }, [fastTrackChecked]);
    // Track validation errors
    const [validationErrors, setValidationErrors] = useState<validationErrors>(
      {},
    );

    const validateInputs = () => {
      const errors: typeof validationErrors = {};

      if (!selectedAirline) errors.airline = true;
      if (!flightNumber.trim()) errors.flightNumber = true;
      if (!arrivalTime) errors.arrivalTime = true;
      if (!serviceDuration) errors.serviceDuration = true;

      setValidationErrors(errors);

      return Object.keys(errors).length === 0;
    };

    useImperativeHandle(ref, () => ({
      isValid: () => {
        // If any error exists, form is invalid
        return validateInputs();
      },

      getData: (): FlightFormData => {
        return {
          selectedAirline,
          flightNumber,
          arrivalTime,
          serviceDuration,
          fastTrackChecked,
        };
      },
    }));

    // const buildServiceDuration = (
    //   hour: number,
    //   minute: number,
    //   // period?: "AM" | "PM",
    // ) => {
    //   const options: OptionType[] = [];
    //   const baseDate = new Date();
    //   let adjustedHour = hour;

    //   if (period === "PM" && hour !== 12) adjustedHour += 12;
    //   if (period === "AM" && hour === 12) adjustedHour = 0;

    //   baseDate.setHours(adjustedHour, minute, 0, 0);

    //   for (let i = 2; i <= 6; i++) {
    //     const newDate = new Date(baseDate);
    //     newDate.setMinutes(newDate.getMinutes() + i * 60);

    //     const formattedTime = newDate.toLocaleTimeString("en-US", {
    //       hour: "2-digit",
    //       minute: "2-digit",
    //       hour12: true,
    //     });

    //     const extraHours = i - 2;
    //     const calculatedCost = hourCost ? hourCost * extraHours : 0;

    //     const label =
    //       extraHours === 0
    //         ? `${formattedTime} (${i * 60} mins)`
    //         : `${formattedTime} (${i * 60} mins) +${calculatedCost} USD`;

    //     options.push({
    //       label,
    //       value: i.toString(),
    //       cost: calculatedCost, // 👈 رجعنا الكوست هنا
    //     });
    //   }

    //   return options;
    // };
    const buildServiceDuration = (
      hour: number,
      minute: number,
      is24Hour: boolean = true, // 👈 تحدد النظام
      // period?: "AM" | "PM",
    ) => {
      const options: OptionType[] = [];
      const baseDate = new Date();
      let adjustedHour = hour;

      // ✅ لو 12 ساعة نحولها لـ 24 داخليًا
      // if (!is24Hour && period) {
      //   if (period === "PM" && hour !== 12) adjustedHour += 12;
      //   if (period === "AM" && hour === 12) adjustedHour = 0;
      // }

      baseDate.setHours(adjustedHour, minute, 0, 0);

      for (let i = 2; i <= 6; i++) {
        const newDate = new Date(baseDate);
        newDate.setMinutes(newDate.getMinutes() + i * 60);

        const formattedTime = newDate.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: !is24Hour, // 👈 هنا الفرق
        });

        const extraHours = i - 2;
        const calculatedCost = hourCost ? hourCost * extraHours : 0;

        const label =
          extraHours === 0
            ? `${formattedTime} (${i * 60} mins)`
            : `${formattedTime} (${i * 60} mins) +${calculatedCost} USD`;

        options.push({
          label,
          value: i.toString(),
          cost: calculatedCost,
        });
      }

      return options;
    };

    const handleChange = (val: boolean | "indeterminate") => {
      const checked = val === true;

      // 1️⃣ ده يحصل فورًا عشان الـ UI يتحدث
      setFastTrackChecked(checked);

      // 2️⃣ ده يتنفذ في الخلفية
      setTimeout(() => {
        onEnableFastTrack(checked);
      }, 0);
    };

    return (
      <div
        onClick={() => onFocus?.()}
        className="px-10 py-6 bg-white rounded-2xl"
        style={{ boxShadow: "0px 11.48px 114.76px 0px #A7A7A73D" }}
      >
        <h4 className="font-manrope font-medium text-[18.75px]">
          Flight Information
        </h4>
        <span className="inline-block w-full h-0.5 bg-[#CFCFCF]" />

        <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-6">
          {/* Airline */}
          <div className="space-y-2">
            <Label className={validationErrors.airline ? "text-red-500" : ""}>
              Airline {validationErrors?.airline && "*"}
            </Label>
            <SearchWithDropdown
              disabled={isLoading}
              options={airlineOptions}
              onSelect={setSelectedAirline}
              showRecentSearches={false}
              placeholder={isLoading ? "Loading airlines..." : "Choose Airline"}
              className="h-9 rounded-md"
              inputClassName={`rounded-md pl-4 pr-10 bg-[#F4F4F4] border ${
                validationErrors.airline ? "border-red-500" : "border-[#E0E0E0]"
              }`}
            />
          </div>

          <FlightNumberInput
            validationErrors={validationErrors}
            className={`bg-[#F4F4F4] ${
              validationErrors.flightNumber ? "border-red-500 border" : ""
            }`}
            value={flightNumber}
            onChange={setFlightNumber}
          />

          <TimeRow
            title="Arrival"
            onArrivalChange={setArrivalTime}
            onServiceDurationChange={(d) => {
              setServiceDuration(d);
              setDuration(d);
            }}
            buildServiceDuration={buildServiceDuration}
            validationErrors={validationErrors}
          />

          {/* Fast Track */}
          {fastTrackCost !== "not_active" && (
            <div className="flex items-start col-span-2 gap-3">
              <Checkbox
                id="fastTrack"
                checked={fastTrackChecked}
                onCheckedChange={handleChange}
                className="w-6 h-6 rounded-md shadow-xs bg-[#F4F4F4] data-[state=checked]:bg-[#7B5A41] data-[state=checked]:border-[#7B5A41]"
              />

              <Label
                htmlFor="fastTrack"
                className="font-medium leading-relaxed cursor-pointer"
              >
                Include Fast Track Service{" "}
                <span>(+£{fastTrackCost}, Per PAX)</span>
              </Label>
            </div>
          )}
        </div>
        <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-6">
          {/* Airline */}
          <div className="space-y-2">
            <Label className={validationErrors.airline ? "text-red-500" : ""}>
              Airline {validationErrors?.airline && "*"}
            </Label>
            <SearchWithDropdown
              disabled={isLoading}
              options={airlineOptions}
              onSelect={setSelectedAirline}
              showRecentSearches={false}
              placeholder={isLoading ? "Loading airlines..." : "Choose Airline"}
              className="h-9 rounded-md"
              inputClassName={`rounded-md pl-4 pr-10 bg-[#F4F4F4] border ${
                validationErrors.airline ? "border-red-500" : "border-[#E0E0E0]"
              }`}
            />
          </div>

          <FlightNumberInput
            validationErrors={validationErrors}
            className={`bg-[#F4F4F4] ${
              validationErrors.flightNumber ? "border-red-500 border" : ""
            }`}
            value={flightNumber}
            onChange={setFlightNumber}
          />

          <TimeRow
            title="Depature"
            onArrivalChange={setArrivalTime}
            onServiceDurationChange={(d) => {
              setServiceDuration(d);
              setDuration(d);
            }}
            buildServiceDuration={buildServiceDuration}
            validationErrors={validationErrors}
          />

          {/* Fast Track */}
          {fastTrackCost !== "not_active" && (
            <div className="flex items-start col-span-2 gap-3">
              <Checkbox
                id="fastTrack"
                checked={fastTrackChecked}
                onCheckedChange={handleChange}
                className="w-6 h-6 rounded-md shadow-xs bg-[#F4F4F4] data-[state=checked]:bg-[#7B5A41] data-[state=checked]:border-[#7B5A41]"
              />

              <Label
                htmlFor="fastTrack"
                className="font-medium leading-relaxed cursor-pointer"
              >
                Include Fast Track Service{" "}
                <span>(+£{fastTrackCost}, Per PAX)</span>
              </Label>
            </div>
          )}
        </div>
      </div>
    );
  },
);

ConnectionForm.displayName = "ConnectionForm";
export default ConnectionForm;

interface TimeRowProps {
  onArrivalChange: (val: OptionType) => void;
  onServiceDurationChange: (val: OptionType) => void;
  title: string;
  buildServiceDuration: (
    hour: number,
    minute: number,
    // period?: "AM" | "PM",
    is24Hour: boolean,
  ) => OptionType[];
  validationErrors?: {
    arrivalTime?: boolean;
    serviceDuration?: boolean;
  };
}

const TimeRow = ({
  onArrivalChange,
  onServiceDurationChange,
  buildServiceDuration,
  validationErrors,
  title,
}: TimeRowProps) => {
  // const [arrival, setArrival] = useState<OptionType | null>(null);
  const [serviceOptions, setServiceOptions] = useState<OptionType[]>([
    { label: "06:20 PM (120 mins)", value: "2" },
  ]);
  const [serviceDuration, setServiceDuration] = useState<OptionType | null>(
    null,
  );

  const handleTimeSelect = (
    hour: number,
    minute: number,
    period?: "AM" | "PM",
  ) => {
    const options = buildServiceDuration(hour, minute, true);
    setServiceOptions(options);
    setServiceDuration(options[0]);
    onArrivalChange({
      // label: `${hour}:${minute} ${period}`,
      label: `${hour}:${minute}`,
      value: `${hour}:${minute}`,
    });
    onServiceDurationChange(options[0]);
  };

  return (
    <>
      {/* Arrival Time */}
      <div className="space-y-2">
        <Label className={validationErrors?.arrivalTime ? "text-red-500" : ""}>
          {title} Time {validationErrors?.arrivalTime && "*"}
        </Label>
        <TimePickerInput
          onSelect={handleTimeSelect}
          className="bg-[#F4F4F4] border-none shadow-none rounded-lg"
          inputClassName={`px-10 h-9 bg-[#F4F4F4] w-full rounded-lg ${
            validationErrors?.arrivalTime ? "border-red-500 border" : ""
          }`}
        />
      </div>

      {/* Service Duration */}
      <div className="space-y-2">
        <Label
          className={validationErrors?.serviceDuration ? "text-red-500" : ""}
        >
          Service Duration {validationErrors?.serviceDuration && "*"}
        </Label>
        <SelectDropdown
          disabled={serviceOptions.length === 1}
          inputClassName={`bg-[#F4F4F4] focus-visible:border focus-visible:outline ${
            validationErrors?.serviceDuration ? "border-red-500" : ""
          }`}
          placeholder="e.g. 2 hours"
          options={serviceOptions}
          value={serviceDuration}
          onSelect={(val) => {
            setServiceDuration(val);
            onServiceDurationChange(val);
          }}
        />
      </div>
    </>
  );
};

interface Props {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  validationErrors: validationErrors;
}

function FlightNumberInput({
  validationErrors,
  value,
  onChange,
  className = "",
}: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value.toUpperCase();

    // إزالة أي حاجة غير حروف وأرقام
    input = input.replace(/[^A-Z0-9]/g, "");

    // أول حرفين فقط
    const letters = input.slice(0, 2).replace(/[^A-Z]/g, "");

    // الأرقام بعدهم بحد أقصى 4
    const numbers = input
      .slice(2)
      .replace(/[^0-9]/g, "")
      .slice(0, 4);

    let formatted = letters;

    if (letters.length === 2) {
      formatted += " ";
    }

    formatted += numbers;

    onChange(formatted);
  };

  return (
    <div className="space-y-2">
      <Label className={validationErrors.flightNumber ? "text-red-500" : ""}>
        Flight Number {validationErrors?.flightNumber && "*"}
      </Label>
      <Input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="BA 1234"
        maxLength={7} // 2 letters + space + 4 numbers
        className={`bg-[#F4F4F4] ${className}`}
      />
    </div>
  );
}
