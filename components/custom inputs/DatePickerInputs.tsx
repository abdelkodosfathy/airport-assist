"use client";

import { useState, useRef, useEffect, ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Calender from "../custom icons/calender";
import { useAirportStore, useDateStore } from "@/store/vipInputsStore";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { ErrorMessage } from "../BookingForm/vip-inputs";

// const closed_dates = [
//   {
//     closed_date_id: 8,
//     airport_id: 16139,
//     closed_date: "2026-06-5",
//     created_at: "2026-05-29T03:35:22.000000Z",
//     updated_at: "2026-05-29T03:35:22.000000Z",
//   },
//   {
//     closed_date_id: 9,
//     airport_id: 16139,
//     closed_date: "2026-06-21",
//     created_at: "2026-05-29T03:35:26.000000Z",
//     updated_at: "2026-05-29T03:35:26.000000Z",
//   },
//   {
//     closed_date_id: 12,
//     airport_id: 16139,
//     closed_date: "2026-06-16",
//     created_at: "2026-05-29T03:36:01.000000Z",
//     updated_at: "2026-05-29T03:36:01.000000Z",
//   },
//   {
//     closed_date_id: 11,
//     airport_id: 16139,
//     closed_date: "2026-06-29",
//     created_at: "2026-05-29T03:35:38.000000Z",
//     updated_at: "2026-05-29T03:35:38.000000Z",
//   },
// ];

export type BookingDate = {
  date: string | null;
  time: string | null;
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
  // minDate?: Date;
  maxDate?: Date;
  errorMsg?: string;
}

const DatePickerInput = ({
  id,
  className,
  inputClassName,
  disabled = false,
  icon = <Calender className="h-4 w-4" />,
  iconPosition = "left",
  value: controlledValue,
  errorMsg,
  // minDate = new Date(new Date().setHours(0, 0, 0, 0)), // Default to today at midnight
  maxDate,
}: DatePickerInputProps) => {
  const storedDate = useDateStore((state) => state.bookingDate);
  const storeDate = useDateStore((state) => state.setBookingDate);

  const airport = useAirportStore((s) => s.airport);

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
    return {
      date: date.toLocaleDateString("en-US", {
        month: "short", // Feb
        day: "2-digit", // 27
        year: "numeric", // 2026
      }),
      time: null,
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
    const dateToCompare = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
    );

    const now = new Date();
    const todayMidnight = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
    );

    // لو الساعة >= 23، قفل النهاردة وخلي بكره أول يوم متاح
    const effectiveMinDate =
      now.getHours() >= 23
        ? new Date(todayMidnight.getTime() + 3600000) // بكره
        : todayMidnight;

    if (dateToCompare < effectiveMinDate) return true;

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

  const IsFullyBookedDate = (date: Date) => {
    const formattedDate = [
      date.getFullYear(),
      String(date.getMonth() + 1).padStart(2, "0"),
      String(date.getDate()).padStart(2, "0"),
    ].join("-");

    const disabledDates = airport?.closed_dates || [];
    // const disabledDates = airport?.closed_dates || closed_dates;

    if (disabledDates.some((e) => e.closed_date === formattedDate)) {
      return true;
    }
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

  console.log(storedDate);
  const validationError = errorMsg && !storedDate?.date;
  
  return (
    <div className="col-span-1 sm:col-span-1 lg:col-span-3">
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
                validationError
                  ? "ring-2 ring-red-500 placeholder:text-red-500"
                  : "",
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
                  const IsFullyBooked = IsFullyBookedDate(date);
                  const isToday =
                    new Date().toDateString() === date.toDateString();

                  const markerDate = date.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                  });

                  // 1. تحديد الحالات الأساسية
                  const isSelected = storedDate?.date === markerDate;
                  // 2. بناء نص التولتيب بناءً على الأولويات والشروط المطلوبة
                  let tooltipText = "";

                  if (IsFullyBooked) {
                    tooltipText = "Fully booked for the selected airport";
                  } else if (isSelected) {
                    tooltipText = "Selected date";
                  } else if (isToday) {
                    tooltipText = isDisabled
                      ? "Sorry, less than one hour remains before the end of the day."
                      : "Today (available for booking)";
                  }

                  // 3. تحديد هل نقوم بإظهار التولتيب أم لا
                  // if (isSelected) {
                  //   console.log(day);
                  // }

                  const showTooltip = tooltipText !== "";
                  return (
                    <TooltipProvider key={day}>
                      <Tooltip delayDuration={200}>
                        <TooltipTrigger asChild>
                          <button
                            key={day}
                            onClick={() => {
                              // نمنع الضغط لو اليوم فائت أو ممتلئ
                              if (isDisabled || IsFullyBooked) return;
                              handleDateSelect(date);
                            }}
                            className={cn(
                              "text-sm py-2 rounded duration-0 transition-all select-none w-full outline-none",

                              // اليوم الحالي (بوردر رمادي)
                              isToday && "font-bold border border-gray-400",

                              // اليوم المتاح عادي ومستقبلي
                              !isDisabled &&
                                !IsFullyBooked &&
                                "hover:bg-gray-100 cursor-pointer",

                              // اليوم الممتلئ (مستقبلي ومغلق بسبب المطار)
                              IsFullyBooked &&
                                "text-red-500 border border-red-500 bg-red-50/30 cursor-not-allowed evaluation-disabled",

                              // اليوم الفائت (مغلق تماماً)
                              isDisabled &&
                                !isToday &&
                                "text-gray-300 cursor-not-allowed balance-disabled",

                              // اليوم الحالي المغلق (بسبب الوقت مثلاً)
                              isToday &&
                                isDisabled &&
                                "text-gray-400 cursor-not-allowed bg-gray-50",

                              // اليوم المختار (له الأولوية في الألوان)
                              isSelected &&
                                "text-white bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)] hover:bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)]",
                            )}
                          >
                            {day}
                          </button>
                        </TooltipTrigger>

                        {/* الـ Content يظهر فقط لو شريط الشروط تحقق (showTooltip === true) */}
                        {showTooltip && (
                          <TooltipContent
                            className="bg-white text-black shadow-sm  px-3 py-1.5 text-xs rounded"
                            arrowClassName="shadow-sm"
                          >
                            <p className="normal-case">{tooltipText}</p>
                          </TooltipContent>
                        )}
                      </Tooltip>
                    </TooltipProvider>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>{" "}
      {validationError && (
        <div id="date-error" role="alert">
          <ErrorMessage message={errorMsg} />
        </div>
      )}
    </div>
  );
};

export default DatePickerInput;
