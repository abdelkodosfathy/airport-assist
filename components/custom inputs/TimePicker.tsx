import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { ChevronDown } from "lucide-react";
import { Clock } from "lucide-react";

interface TimePickerInputProps {
  id?: string;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  value?: string;
  onChange?: (value: string) => void;
  onTimeChange?: (value: string) => void;
  onSelect?: (hour: number, minute: number, period?: "AM" | "PM") => void;
  format?: "12" | "24"; // 12-hour or 24-hour format
  minuteStep?: number; // Step for minutes (e.g., 5, 10, 15, 30)
}

const TimePickerInput = ({
  id,
  placeholder = "",
  className,
  inputClassName,
  disabled = false,
  icon = <Clock className="h-4 w-4" />,
  iconPosition = "left",
  value: controlledValue,
  onChange,
  onTimeChange,
  onSelect,
  format = "24",
  minuteStep = 5,
}: TimePickerInputProps) => {
  const [selectedTime, setSelectedTime] = useState(controlledValue || "");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedHour, setSelectedHour] = useState<number | null>(null);
  const [selectedMinute, setSelectedMinute] = useState<number | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<"AM" | "PM">("AM");
  const [manualHourInput, setManualHourInput] = useState("");
  const [manualMinuteInput, setManualMinuteInput] = useState("");
  const wrapperRef = useRef<HTMLDivElement>(null);
  const hourScrollRef = useRef<HTMLDivElement>(null);
  const minuteScrollRef = useRef<HTMLDivElement>(null);
  const periodScrollRef = useRef<HTMLDivElement>(null);

  // Sync with controlled value
  useEffect(() => {
    if (controlledValue !== undefined) {
      setSelectedTime(controlledValue);
      parseTimeValue(controlledValue);
    }
  }, [controlledValue]);

  // Parse time value to set hour, minute, and period
  const parseTimeValue = (timeStr: string) => {
    if (!timeStr) return;

    const timeMatch = timeStr.match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/i);
    if (timeMatch) {
      let hour = parseInt(timeMatch[1]);
      const minute = parseInt(timeMatch[2]);
      const period = timeMatch[3]?.toUpperCase() as "AM" | "PM" | undefined;

      if (format === "12" && period) {
        setSelectedPeriod(period);
      } else if (format === "24" && hour > 12) {
        setSelectedPeriod("PM");
        hour = hour > 12 ? hour : hour;
      }

      setSelectedHour(hour);
      setSelectedMinute(minute);
      setManualHourInput(hour.toString());
      setManualMinuteInput(minute.toString().padStart(2, "0"));
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Scroll to selected values when dropdown opens
  useEffect(() => {
    if (isOpen && selectedHour !== null && selectedMinute !== null) {
      setTimeout(() => {
        scrollToSelected();
      }, 10);
    }
  }, [isOpen]);

  const scrollToSelected = () => {
    if (hourScrollRef.current && selectedHour !== null) {
      const hourElement = hourScrollRef.current.querySelector(
        `[data-hour="${selectedHour}"]`,
      );
      if (hourElement) {
        hourElement.scrollIntoView({ block: "center", behavior: "smooth" });
      }
    }

    if (minuteScrollRef.current && selectedMinute !== null) {
      const minuteElement = minuteScrollRef.current.querySelector(
        `[data-minute="${selectedMinute}"]`,
      );
      if (minuteElement) {
        minuteElement.scrollIntoView({ block: "center", behavior: "smooth" });
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSelectedTime(newValue);
    onChange?.(newValue);
    onTimeChange?.(newValue);
  };

  const formatTime = (hour: number, minute: number, period: "AM" | "PM") => {
    const paddedMinute = minute.toString().padStart(2, "0");

    if (format === "12") {
      return `${hour}:${paddedMinute} ${period}`;
    } else {
      // Convert to 24-hour format
      let hour24 = hour;
      if (period === "PM" && hour !== 12) {
        hour24 = hour + 12;
      } else if (period === "AM" && hour === 12) {
        hour24 = 0;
      }
      return `${hour24.toString().padStart(2, "0")}:${paddedMinute}`;
    }
  };

  const handleTimeSelect = () => {
    if (selectedHour !== null && selectedMinute !== null) {
      const formattedTime = formatTime(
        selectedHour,
        selectedMinute,
        selectedPeriod,
      );
      setSelectedTime(formattedTime);
      setIsOpen(false);

      onChange?.(formattedTime);
      onTimeChange?.(formattedTime);
      onSelect?.(selectedHour, selectedMinute, selectedPeriod);
    }
  };

  const hours =
    format === "12"
      ? Array.from({ length: 12 }, (_, i) => i + 1)
      : Array.from({ length: 24 }, (_, i) => i+1);

  const minutes = Array.from(
    { length: 60 / minuteStep },
    (_, i) => (i+1) * minuteStep,
  );

  const handleHourClick = (hour: number) => {
    setSelectedHour(hour);
    setManualHourInput(hour.toString());
  };

  const handleMinuteClick = (minute: number) => {
    setSelectedMinute(minute);
    setManualMinuteInput(minute.toString().padStart(2, "0"));
  };

  const handlePeriodClick = (period: "AM" | "PM") => {
    setSelectedPeriod(period);
  };

  // Handle manual hour input
  const handleManualHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ""); // Only allow digits
    setManualHourInput(value);

    if (value) {
      const hourNum = parseInt(value);
      const maxHour = format === "12" ? 12 : 23;
      const minHour = format === "12" ? 1 : 0;

      if (hourNum >= minHour && hourNum <= maxHour) {
        setSelectedHour(hourNum);
        // Scroll to the selected hour
        setTimeout(() => {
          if (hourScrollRef.current) {
            const hourElement = hourScrollRef.current.querySelector(
              `[data-hour="${hourNum}"]`,
            );
            if (hourElement) {
              hourElement.scrollIntoView({
                block: "center",
                behavior: "smooth",
              });
            }
          }
        }, 10);
      }
    }
  };

  // Handle manual minute input
  const handleManualMinuteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ""); // Only allow digits
    setManualMinuteInput(value);

    if (value) {
      const minuteNum = parseInt(value);

      if (minuteNum >= 0 && minuteNum <= 59) {
        setSelectedMinute(minuteNum);
        // Scroll to the nearest minute in the list
        const nearestMinute = Math.round(minuteNum / minuteStep) * minuteStep;
        setTimeout(() => {
          if (minuteScrollRef.current) {
            const minuteElement = minuteScrollRef.current.querySelector(
              `[data-minute="${nearestMinute}"]`,
            );
            if (minuteElement) {
              minuteElement.scrollIntoView({
                block: "center",
                behavior: "smooth",
              });
            }
          }
        }, 10);
      }
    }
  };

  // Validate and format manual inputs on blur
  const handleManualHourBlur = () => {
    if (manualHourInput) {
      const hourNum = parseInt(manualHourInput);
      const maxHour = format === "12" ? 12 : 23;
      const minHour = format === "12" ? 1 : 0;

      if (hourNum < minHour || hourNum > maxHour) {
        setManualHourInput("");
        setSelectedHour(null);
      } else {
        if (format === "24") {
          setManualHourInput(hourNum.toString().padStart(2, "0"));
        }
      }
    }
  };

  const handleManualMinuteBlur = () => {
    if (manualMinuteInput) {
      const minuteNum = parseInt(manualMinuteInput);

      if (minuteNum < 0 || minuteNum > 59) {
        setManualMinuteInput("");
        setSelectedMinute(null);
      } else {
        setManualMinuteInput(minuteNum.toString().padStart(2, "0"));
      }
    }
  };

  return (
    <div className={className}>
      <div ref={wrapperRef} className="relative h-full">
        {/* Input Wrapper */}
        <div className="relative h-full flex items-center">
          {icon && iconPosition === "left" && (
            <span className="absolute left-3 text-gray-400 pointer-events-none z-10">
              {icon}
            </span>
          )}

          <Input
            disabled={disabled}
            id={id}
            value={selectedTime}
            placeholder={placeholder || "Select Time"}
            onChange={handleInputChange}
            onFocus={() => !disabled && setIsOpen(true)}
            readOnly
            className={cn(
              "h-full bg-white rounded-none cursor-pointer",
              icon && iconPosition === "left" && "pl-10",
              icon && iconPosition === "right" && "pr-10",
              disabled && "cursor-not-allowed opacity-60",
              inputClassName,
            )}
          />

          {icon && iconPosition === "right" && (
            <span className="absolute right-10 text-gray-400 pointer-events-none z-10">
              {icon}
            </span>
          )}

          {/* Chevron */}
          <ChevronDown
            className={cn(
              "absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5 pointer-events-none transition-transform",
              isOpen && "rotate-180",
            )}
          />
        </div>

        {/* Time Picker Dropdown */}
        {isOpen && !disabled && (
          <div className="absolute w-max mt-2 bg-white border rounded-lg shadow-lg z-50 p-4">
            <style>{`
              /* Hide scrollbar for webkit browsers */
              .time-scroll::-webkit-scrollbar {
                display: none;
              }
              /* Hide scrollbar for Firefox */
              .time-scroll {
                scrollbar-width: none;
              }
              /* Hide scrollbar for IE and Edge */
              .time-scroll {
                -ms-overflow-style: none;
              }
            `}</style>

            {/* Manual Input Section */}
            <div className="flex gap-2 mb-4">
              {/* Hour Input */}
              <div className="flex flex-col flex-1 max-w-17">
                <label className="text-xs font-semibold  text-gray-500 mb-1">
                  Hour
                </label>
                <input
                  type="text"
                  value={manualHourInput}
                  onChange={handleManualHourChange}
                  onBlur={handleManualHourBlur}
                  placeholder={format === "12" ? "1-12" : "00-23"}
                  maxLength={2}
                  className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-[#664F31] focus:border-transparent"
                />
              </div>

              <div className="flex items-end pb-2">
                <span className="text-gray-400 text-lg font-semibold">:</span>
              </div>

              {/* Minute Input */}
              <div className="flex flex-col flex-1 max-w-17">
                <label className="text-xs font-semibold text-gray-500 mb-1">
                  Minute
                </label>
                <input
                  type="text"
                  value={manualMinuteInput}
                  onChange={handleManualMinuteChange}
                  onBlur={handleManualMinuteBlur}
                  placeholder="00-59"
                  maxLength={2}
                  className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-[#664F31] focus:border-transparent"
                />
              </div>

              {/* AM/PM Input (only for 12-hour format) */}
              {/* {format === "12" && (
                <div className="flex flex-col">
                  <label className="text-xs font-semibold text-gray-500 mb-1">
                    Period
                  </label>
                  <div className="flex gap-1">
                    <button
                      onClick={() => handlePeriodClick("AM")}
                      className={cn(
                        "px-3 py-2 text-sm rounded-md transition-colors",
                        selectedPeriod === "AM"
                          ? "bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)] text-white font-semibold"
                          : "bg-gray-100 hover:bg-gray-200",
                      )}
                    >
                      AM
                    </button>
                    <button
                      onClick={() => handlePeriodClick("PM")}
                      className={cn(
                        "px-3 py-2 text-sm rounded-md transition-colors",
                        selectedPeriod === "PM"
                          ? "bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)] text-white font-semibold"
                          : "bg-gray-100 hover:bg-gray-200",
                      )}
                    >
                      PM
                    </button>
                  </div>
                </div>
              )} */}
            </div>

            {/* Divider */}
            <div className="border-t mb-4"></div>

            {/* Scrollable Lists */}
            <div className="flex gap-2">
              {/* Hours Column */}
              <div className="flex flex-col">
                <div className="text-xs font-semibold text-gray-500 text-center mb-2">
                  Hour
                </div>
                <div
                  ref={hourScrollRef}
                  className="time-scroll items-center h-48 overflow-y-scroll overflow-x-hidden flex flex-col"
                >
                  {hours.map((hour) => (
                    <button
                      type="button"
                      key={hour}
                      data-hour={hour}
                      onClick={() => handleHourClick(hour)}
                      className={cn(
                        "w-16 text-sm py-2 rounded hover:bg-gray-100 cursor-pointer transition-colors",
                        selectedHour === hour &&
                          "text-white bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)] font-semibold",
                      )}
                    >
                      {format === "24"
                        ? hour.toString().padStart(2, "0")
                        : hour}
                    </button>
                  ))}
                </div>
              </div>

              {/* Minutes Column */}
              <div className="flex flex-col">
                <div className="text-xs font-semibold text-gray-500 text-center mb-2">
                  Minute
                </div>
                <div
                  ref={minuteScrollRef}
                  className="time-scroll items-center flex flex-col h-48 overflow-y-scroll overflow-x-hidden"
                >
                  {minutes.map((minute) => (
                    <button
                      type="button"
                      key={minute}
                      data-minute={minute}
                      onClick={() => handleMinuteClick(minute)}
                      className={cn(
                        "w-16 text-sm py-2 rounded hover:bg-gray-100 cursor-pointer transition-colors",
                        selectedMinute === minute &&
                          "text-white bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)] font-semibold",
                      )}
                    >
                      {minute.toString().padStart(2, "0")}
                    </button>
                  ))}
                </div>
              </div>

              {/* AM/PM Column (only for 12-hour format) */}
              {format === "12" && (
                <div className="flex flex-col">
                  <div className="text-xs font-semibold text-gray-500 text-center mb-2">
                    Period
                  </div>
                  <div
                    ref={periodScrollRef}
                    className="time-scroll h-48 overflow-y-scroll overflow-x-hidden flex flex-col gap-1"
                  >
                    {["AM", "PM"].map((period) => (
                      <button
                        type="button"
                        key={period}
                        onClick={() => handlePeriodClick(period as "AM" | "PM")}
                        className={cn(
                          "w-16 text-sm py-2 rounded hover:bg-gray-100 cursor-pointer transition-colors",
                          selectedPeriod === period &&
                            "text-white bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)] font-semibold",
                        )}
                      >
                        {period}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Button */}
            <button
              type="button"
              onClick={handleTimeSelect}
              disabled={selectedHour === null || selectedMinute === null}
              className={cn(
                "w-full mt-4 py-2 rounded text-sm font-semibold transition-colors",
                selectedHour !== null && selectedMinute !== null
                  ? "bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)] text-white hover:opacity-90"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed",
              )}
            >
              Confirm
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TimePickerInput;
