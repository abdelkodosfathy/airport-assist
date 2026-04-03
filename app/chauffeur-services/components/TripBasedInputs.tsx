"use client";

import { useState } from "react";
import { useTripStore } from "@/store/tripStore";
import NumberInput from "./NumberInputs";
import InnerToast from "@/components/ui/InnerToast";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import FlightInputs from "./FlightInputs";
import DatePickerInput, {
  BookingDate,
} from "@/components/custom inputs/DatePickerInputs";
import TimePickerInput from "@/components/custom inputs/TimePicker";
import Calender from "@/components/custom icons/calender";
import { Edit, Pin, Plus, Trash, Trash2 } from "lucide-react";
import TimeIcon from "@/components/custom icons/TimeIcon";
import { Button } from "@/components/ui/button";
import { useDateStore } from "@/store/vipInputsStore";
import { BookingData } from "@/contexts/BookingContext";
import { toast } from "sonner";

export const TripBasedInputs = () => {
  const tripType = useTripStore((state) => state.tripType);

  return <>{tripType === "hourly" ? <Hourly /> : <AirportTransfare />}</>;
};

const AirportTransfare = () => {
  return (
    <div className="my-2">
      <h3 className="mb-2 font-semibold">Flight</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6 w-full">
        <FlightInputs />
      </div>
    </div>
  );
};

const Hourly = () => {
  const hoursValue = useTripStore((state) => state.hours);
  const setHoursValue = useTripStore((state) => state.set_hours);
  return (
    <div className="mb-2 mt-4">
      <div className="flex justify-between">
        <NumberInput
          min={4}
          onIncrement={() => setHoursValue(hoursValue + 1)}
          onDecrement={() => setHoursValue(Math.max(4, (hoursValue ?? 0) - 1))}
          onChangeValue={(e) => setHoursValue(Math.max(4, e))}
          value={hoursValue ?? 0}
          title="hours"
        />
      </div>
      <div className="my-2">
        <InnerToast text="with 40 miles included in the booking price. Any additional mileage will be charged at £4 per mile after the service." />
      </div>

      <Separator />

      <MultiDay />
    </div>
  );
};
type BookingDateEntry = BookingDate & { id: string };

const MultiDay = () => {
  const [isMultiDay, setIsMultiDay] = useState(false);
  const dateTime = useDateStore((s) => s.bookingDate);

  const [dateTimeList, setDateTimeList] = useState<BookingDateEntry[]>([]);

  const handleAddRow = () => {
    if (!dateTime) return;
    const exists = dateTimeList.some((d) => d.date === dateTime.date);
    if (exists) {
      toast.error("this date is already added", { position: "top-center" });
      return;
    }
    setDateTimeList((prev) => [
      ...prev,
      { ...dateTime, id: crypto.randomUUID() },
    ]);
  };

  const handleDeleteRow = (id: string) => {
    setDateTimeList((prev) => prev.filter((d) => d.id !== id));
  };
  return (
    <>
      {/* Multi-day checkbox */}
      <label className="flex items-center my-2 gap-4 cursor-pointer p-3 bg-[#FFFBEF] px-4 py-3 rounded-lg border border-[#7B5A414D] text-[#7B5A41] transition-colors">
        <Checkbox
          id="multiDay"
          checked={isMultiDay}
          onCheckedChange={(v) => setIsMultiDay(v === true)}
          className="w-6 h-6 rounded-md shadow-none border-[#7B5A414D] bg-[#FFFBEF] data-[state=checked]:bg-[#7B5A41] data-[state=checked]:border-[#7B5A41]"
        />
        <span className="text-sm font-medium">
          Will you use this service for multiple days?
        </span>
      </label>
      <div
        className={[
          " transition-all duration-350 ease-[cubic-bezier(0.4,0,0.2,1)]",
          isMultiDay ? "opacity-100" : "max-h-0 opacity-0",
        ].join(" ")}
      >
        {/* <Separator /> */}
        <div className="space-y-2">
          {dateTimeList.map((d) => (
            <DateTimeRow
              key={d.id} // ← key ثابت مش بيتغير عند الحذف
              bookingDate={d}
              onDelete={() => handleDeleteRow(d.id)}
            />
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2 my-2">
          <div className="relative space-y-2 col-span-1">
            <DatePickerInput
              className="bg-[#F4F4F4] border border-[#E0E0E0] rounded-lg h-full"
              inputClassName="px-10 h-11.25 bg-[#F4F4F4] border-none w-full rounded-lg"
            />
          </div>
          <div className="flex gap-2 col-span-1">
            <TimePickerInput
              // onChange={(e) => console.log(e)}
              className="w-full bg-[#F4F4F4] border border-[#E0E0E0] rounded-lg h-full"
              inputClassName="px-10 h-11.25 bg-[#F4F4F4] border-none w-full rounded-lg"
            />
            <Button
              onClick={handleAddRow}
              className="flex h-full bg-[#F4F4F4] border border-[#E0E0E0] rounded-lg items-center justify-center aspect-square cursor-pointer text-[#7A7A7A] hover:border-[#664F31]   hover:bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)]  hover:text-white  duration-0"
            >
              <Plus />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

import { useEffect, useRef } from "react";
import gsap from "gsap";

type DateTimeRowProps = {
  bookingDate: BookingDate;
  onDelete: () => void;
};

const DateTimeRow: React.FC<DateTimeRowProps> = ({ bookingDate, onDelete }) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  // Animate IN on mount
  useEffect(() => {
    if (!rowRef.current) return;

    gsap.fromTo(
      rowRef.current,
      { opacity: 0, y: 14, height: 0, marginBottom: 0 },
      {
        opacity: 1,
        y: 0,
        height: "auto",
        marginBottom: 8,
        duration: 0.35,
        ease: "power3.out",
      },
    );
  }, []);

  const handleDelete = (): void => {
    if (!rowRef.current) return;

    // Animate OUT — يطلع لفوق بدون تصغير
    tl.current = gsap.timeline({
      onComplete: onDelete,
    });

    tl.current
      .to(rowRef.current, {
        opacity: 0,
        y: -18,
        duration: 0.22,
        ease: "power2.in",
      })
      .to(
        rowRef.current,
        {
          height: 0,
          marginBottom: 0,
          paddingTop: 0,
          paddingBottom: 0,
          duration: 0.2,
          ease: "power2.inOut",
        },
        "-=0.05", // يبدأ قبل ما الـ fade ينتهي بشوية
      );
  };

  return (
    <div
      ref={rowRef}
      style={{ overflow: "hidden" }} // مهم عشان height animation تشتغل صح
      className="p-2 flex items-center gap-4 bg-[#F4F4F4] border border-[#E0E0E0] rounded-lg"
    >
      <div className="flex items-center gap-2">
        <Calender className="h-4 w-4" />
        <p>{bookingDate.date}</p>
      </div>

      <div className="flex items-center gap-2">
        <TimeIcon time={bookingDate.time} className="h-4 w-4" />
        <p>{bookingDate.time}</p>
      </div>

      <Button
        onClick={handleDelete}
        variant="ghost"
        className="ml-auto aspect-square p-0 h-7.25 hover:bg-black/10 cursor-pointer"
      >
        <Trash2 color="#6D6D6D" size={18} />
      </Button>
    </div>
  );
};

// const DateTimeRow = ({
//   onDelete,
//   bookingDate,
// }: {
//   onDelete: () => void;
//   bookingDate: BookingDate;
// }) => {
//   return (
//     <div className="py-2 px-3 flex items-center gap-4 bg-[#F4F4F4] border border-[#E0E0E0] rounded-lg h-full">
//       <div className="flex items-center gap-2">
//         <Calender className="h-4 w-4" />
//         <p>{bookingDate.date}</p>
//       </div>

//       <div className="flex items-center gap-2">
//         <TimeIcon color="#6D6D6D" time={bookingDate.time} className="h-4 w-4" />
//         <p>{bookingDate.time}</p>
//       </div>

//       <Button
//         onClick={onDelete}
//         variant={"ghost"}
//         className="ml-auto aspect-square p-0 h-7.25 hover:bg-black/10 cursor-pointer"
//       >
//         <Trash2 color="#6D6D6D" size={18} />
//       </Button>
//     </div>
//   );
// };
