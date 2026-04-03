"use client";

import { useState, useRef, useEffect, ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Calender from "../custom icons/calender";
import { useDateStore } from "@/store/vipInputsStore";

export type BookingDate = {
  date: string;
  time: string;
};

interface DatePickerInputProps {
  id?: string;
  className?: string;
  disabled?: boolean;
  inputClassName?: string;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  value?: string;
  onChange?: (value: string) => void;
  onDateChange?: (date: string) => void;
  minDate?: Date;
  maxDate?: Date;
}

const DatePickerInput = ({
  id,
  className,
  inputClassName,
  disabled = false,
  icon = <Calender className="h-4 w-4" />,
  iconPosition = "left",
  value: controlledValue,
  minDate = new Date(new Date().setHours(0, 0, 0, 0)), // Default to today at midnight
  maxDate,
}: DatePickerInputProps) => {
  const storeDate = useDateStore((state) => state.setBookingDate);
  const storedDate = useDateStore((state) => state.bookingDate);

  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const wrapperRef = useRef<HTMLDivElement>(null);

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

  // Convert a Date object to "YYYY-MM-DD HH:mm"
  function formatDateForAPI(date: Date): BookingDate {
    const pad = (n: number) => n.toString().padStart(2, "0");

    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());

    return {
      date: date.toLocaleDateString("en-US", {
        month: "short", // Feb
        day: "2-digit", // 27
        year: "numeric", // 2026
      }),
      time: `${hours}:${minutes}`,
    };
  }

  const handleDateSelect = (date: Date) => {
    const formattedAPI = formatDateForAPI(date); // ✅ API-ready format
    setIsOpen(false);
    storeDate(formattedAPI);
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  const isDateDisabled = (date: Date) => {
    // Set the date to midnight for comparison
    const dateToCompare = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
    );

    if (minDate) {
      const minDateMidnight = new Date(
        minDate.getFullYear(),
        minDate.getMonth(),
        minDate.getDate(),
      );
      if (dateToCompare < minDateMidnight) return true;
    }

    if (maxDate) {
      const maxDateMidnight = new Date(
        maxDate.getFullYear(),
        maxDate.getMonth(),
        maxDate.getDate(),
      );
      if (dateToCompare > maxDateMidnight) return true;
    }

    return false;
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentMonth);

  const previousMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1),
    );
  };

  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1),
    );
  };

  const monthYear = currentMonth.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });


  
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
            value={storedDate?.date ?? ""}
            placeholder={"Select Date"}
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

        {/* Calendar Dropdown */}
        {isOpen && !disabled && (
          <div className="absolute w-max mt-2 bg-white border rounded-lg shadow-lg z-50 p-4">
            {/* Month Navigation */}
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={previousMonth}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
              >
                <ChevronDown className="h-5 w-5 rotate-90" />
              </button>
              <span className="text-sm font-semibold">{monthYear}</span>
              <button
                onClick={nextMonth}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
              >
                <ChevronDown className="h-5 w-5 -rotate-90" />
              </button>
            </div>

            {/* Days of Week */}
            <div className="grid grid-cols-7 gap-6 mb-2">
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                <div
                  key={day}
                  className="text-center text-xs font-semibold text-gray-500 py-1"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1">
              {/* Empty cells for days before month starts */}
              {Array.from({ length: startingDayOfWeek }).map((_, index) => (
                <div key={`empty-${index}`} />
              ))}

              {/* Days of the month */}
              {Array.from({ length: daysInMonth }).map((_, index) => {
                const day = index + 1;
                const date = new Date(
                  currentMonth.getFullYear(),
                  currentMonth.getMonth(),
                  day,
                );
                const isDisabled = isDateDisabled(date);
                const isToday =
                  new Date().toDateString() === date.toDateString();

                const markerDate = date.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                });

                const title =
                // selectedDate === markerDate
                  storedDate?.date === markerDate
                    ? "selected date"
                    : isToday
                      ? "today"
                      : "";
                return (
                  <button
                    title={title}
                    key={day}
                    onClick={() => !isDisabled && handleDateSelect(date)}
                    disabled={isDisabled}
                    className={cn(
                      "text-sm py-2 rounded duration-0",
                      isToday && "font-bold border border-gray-300",
                      !isDisabled && "hover:bg-gray-100 cursor-pointer",
                      isDisabled && "text-gray-300 cursor-not-allowed",
                      // selectedDate === markerDate &&
                      storedDate?.date === markerDate &&
                        "text-white bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)]",
                    )}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DatePickerInput;
