import { useState, useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { ChevronDown, Clock } from "lucide-react";
import { useDateStore } from "@/store/vipInputsStore";

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
  onSelect?: (hour: number, minute: number) => void;
  minuteStep?: number;
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
  minuteStep = 5,
}: TimePickerInputProps) => {
  const storeTime = useDateStore((state) => state.setBookingDate);
  const storedTime = useDateStore((state) => state.bookingDate);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedHour, setSelectedHour] = useState<number | null>(null);
  const [selectedMinute, setSelectedMinute] = useState<number | null>(null);
  const [manualHourInput, setManualHourInput] = useState("");
  const [manualMinuteInput, setManualMinuteInput] = useState("");
  const wrapperRef = useRef<HTMLDivElement>(null);
  const hourScrollRef = useRef<HTMLDivElement>(null);
  const minuteScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (controlledValue !== undefined) parseTimeValue(controlledValue);
  }, [controlledValue]);

  const parseTimeValue = (timeStr: string) => {
    if (!timeStr) return;
    const match = timeStr.match(/^(\d{1,2}):(\d{2})$/);
    if (match) {
      const hour = parseInt(match[1]);
      const minute = parseInt(match[2]);
      setSelectedHour(hour);
      setSelectedMinute(minute);
      setManualHourInput(hour.toString().padStart(2, "0"));
      setManualMinuteInput(minute.toString().padStart(2, "0"));
    }
  };

  useEffect(() => {
    if (isOpen && selectedHour !== null && selectedMinute !== null) {
      setTimeout(() => scrollToSelected(), 10);
    }
  }, [isOpen]);

  const scrollToSelected = () => {
    hourScrollRef.current
      ?.querySelector(`[data-hour="${selectedHour}"]`)
      ?.scrollIntoView({ block: "center", behavior: "smooth" });
    minuteScrollRef.current
      ?.querySelector(`[data-minute="${selectedMinute}"]`)
      ?.scrollIntoView({ block: "center", behavior: "smooth" });
  };

  const formatTime = (hour: number, minute: number) =>
    `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;

  // const handleTimeSelect = () => {
  //   if (selectedHour !== null && selectedMinute !== null) {
  //     const formattedTime = formatTime(selectedHour, selectedMinute);
  //     if (storedTime?.date)
  //       storeTime({ date: storedTime.date, time: formattedTime });
  //     setIsOpen(false);
  //     onChange?.(formattedTime);
  //     onTimeChange?.(formattedTime);
  //     onSelect?.(selectedHour, selectedMinute);
  //   }
  // };
  const handleTimeSelect = useCallback(() => {
    if (selectedHour !== null && selectedMinute !== null) {
      const formattedTime = formatTime(selectedHour, selectedMinute);
      if (storedTime?.date)
        storeTime({ date: storedTime.date, time: formattedTime });
      setIsOpen(false);
      onChange?.(formattedTime);
      onTimeChange?.(formattedTime);
      onSelect?.(selectedHour, selectedMinute);
    }
  }, [
    selectedHour,
    selectedMinute,
    storedTime,
    onChange,
    onTimeChange,
    onSelect,
  ]);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        handleTimeSelect();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, handleTimeSelect]);

  const hours = Array.from({ length: 24 }, (_, i) => i); // 0 → 23
  const minutes = Array.from(
    { length: Math.ceil(60 / minuteStep) },
    (_, i) => i * minuteStep,
  ); // 0 → 55

  const handleHourClick = (hour: number) => {
    setSelectedHour(hour);
    setManualHourInput(hour.toString().padStart(2, "0"));
  };

  const handleMinuteClick = (minute: number) => {
    setSelectedMinute(minute);
    setManualMinuteInput(minute.toString().padStart(2, "0"));
  };

  const handleManualHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 2);
    setManualHourInput(value);
    if (value !== "") {
      const h = parseInt(value);
      if (h >= 0 && h <= 23) {
        setSelectedHour(h);
        setTimeout(() => {
          hourScrollRef.current
            ?.querySelector(`[data-hour="${h}"]`)
            ?.scrollIntoView({ block: "center", behavior: "smooth" });
        }, 10);
      }
    }
  };

  const handleManualMinuteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 2);
    setManualMinuteInput(value);
    if (value !== "") {
      const m = parseInt(value);
      if (m === 60) {
        // roll over to next hour
        const nextHour = selectedHour !== null ? (selectedHour + 1) % 24 : 0;
        setSelectedMinute(0);
        setSelectedHour(nextHour);
        setManualMinuteInput("00");
        setManualHourInput(nextHour.toString().padStart(2, "0"));
        setTimeout(() => {
          minuteScrollRef.current
            ?.querySelector(`[data-minute="0"]`)
            ?.scrollIntoView({ block: "center", behavior: "smooth" });
          hourScrollRef.current
            ?.querySelector(`[data-hour="${nextHour}"]`)
            ?.scrollIntoView({ block: "center", behavior: "smooth" });
        }, 10);
      } else if (m >= 0 && m <= 59) {
        setSelectedMinute(m);
        const nearest = Math.round(m / minuteStep) * minuteStep;
        setTimeout(() => {
          minuteScrollRef.current
            ?.querySelector(`[data-minute="${nearest}"]`)
            ?.scrollIntoView({ block: "center", behavior: "smooth" });
        }, 10);
      }
    }
  };

  const handleManualHourBlur = () => {
    if (manualHourInput !== "") {
      const h = parseInt(manualHourInput);
      if (h < 0 || h > 23) {
        setManualHourInput("");
        setSelectedHour(null);
      } else setManualHourInput(h.toString().padStart(2, "0"));
    }
  };

  const handleManualMinuteBlur = () => {
    if (manualMinuteInput !== "") {
      const m = parseInt(manualMinuteInput);
      if (m < 0 || m > 60) {
        setManualMinuteInput("");
        setSelectedMinute(null);
      } else if (m < 60) setManualMinuteInput(m.toString().padStart(2, "0"));
    }
  };

  return (
    <div className={className}>
      <div ref={wrapperRef} className="relative h-full">
        <div className="relative h-full flex items-center">
          {icon && iconPosition === "left" && (
            <span className="absolute left-3 text-gray-400 pointer-events-none z-10">
              {icon}
            </span>
          )}
          <Input
            disabled={disabled}
            id={id}
            value={storedTime?.time ?? ""}
            placeholder={placeholder || "Select Time"}
            onChange={(e) => {
              onChange?.(e.target.value);
              onTimeChange?.(e.target.value);
            }}
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
          <ChevronDown
            className={cn(
              "absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5 pointer-events-none transition-transform",
              isOpen && "rotate-180",
            )}
          />
        </div>

        {isOpen && !disabled && (
          <div className="absolute w-max mt-2 bg-white border rounded-lg shadow-lg z-50 p-4">
            <style>{`
              .time-scroll::-webkit-scrollbar { display: none; }
              .time-scroll { scrollbar-width: none; -ms-overflow-style: none; }
            `}</style>

            {/* Manual inputs */}
            <div className="flex gap-2 mb-4">
              <div className="flex flex-col flex-1 max-w-17">
                <label className="text-xs font-semibold text-gray-500 mb-1">
                  Hour
                </label>
                <input
                  type="text"
                  value={manualHourInput}
                  onChange={handleManualHourChange}
                  onBlur={handleManualHourBlur}
                  placeholder="00-23"
                  maxLength={2}
                  className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-[#664F31] focus:border-transparent"
                />
              </div>
              <div className="flex items-end pb-2">
                <span className="text-gray-400 text-lg font-semibold">:</span>
              </div>
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
            </div>

            <div className="border-t mb-4" />

            {/* Scroll lists */}
            <div className="flex gap-2">
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
                      {hour.toString().padStart(2, "0")}
                    </button>
                  ))}
                </div>
              </div>

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
            </div>

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
