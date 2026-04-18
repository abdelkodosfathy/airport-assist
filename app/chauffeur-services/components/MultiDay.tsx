export default function MultiDay() {
  return (
    <>
      {/* Multi-day checkbox */}
      {/* <label className="flex items-center mb-2 mt-4 gap-4 cursor-pointer p-3 bg-[#FFFBEF] px-4 py-3 rounded-lg border border-[#7B5A414D] text-[#7B5A41] transition-colors">
        <Checkbox
          id="multiDay"
          checked={isMultiDay}
          onCheckedChange={(v) => setIsMultiDay(v === true)}
          className="w-6 h-6 rounded-md shadow-none border-[#7B5A414D] bg-[#FFFBEF] data-[state=checked]:bg-[#7B5A41] data-[state=checked]:border-[#7B5A41]"
        />
        <span className="text-sm font-medium">
          Will you use this service for multiple days?
        </span>
      </label> */}
      <MultiDaysToggle />
      <DaysList />
    </>
  );
}

const MultiDaysToggle = () => {
  const isMultiDay = useTripStore((s) => s.isMultiDay);

  const setIsMultiDay = useTripStore((s) => s.setIsMultiDay);

  return (
    <div className="flex justify-between px-4 py-3 items-center bg-[#F2F3F5] rounded-md my-4">
      <p className="flex gap-2 text-lg items-center">Book for multiple days</p>
      <Switch
        checked={isMultiDay}
        onCheckedChange={setIsMultiDay}
        className="scale-100 data-[state=checked]:bg-[#7B5A41]"
      />
    </div>
  );
};

// const DaysList = () => {
//   const isMultiDay = useTripStore((s) => s.isMultiDay);
//   const wrapperRef = useRef<HTMLDivElement>(null);
//   const isFirstRender = useRef(true);

//   useEffect(() => {
//     if (!wrapperRef.current) return;

//     if (isFirstRender.current) {
//       isFirstRender.current = false;
//       if (!isMultiDay) {
//         gsap.set(wrapperRef.current, { height: 0, opacity: 0 });
//       }
//       return;
//     }

//     if (isMultiDay) {
//       gsap.to(wrapperRef.current, {
//         height: "auto",
//         opacity: 1,
//         duration: 0.4,
//         ease: "power2.out",
//       });
//     } else {
//       gsap.to(wrapperRef.current, {
//         height: 0,
//         opacity: 0,
//         duration: 0.35,
//         ease: "power2.inOut",
//       });
//     }
//   }, [isMultiDay]);

//   return (
//     <div ref={wrapperRef} className="">
//       <DaysListContent />
//     </div>
//   );
// };

// const DaysListContent = memo(() => {
//   const dateTime = useDateStore((s) => s.bookingDate);
//   const dateTimeList = useTripStore((s) => s.dateTimeList);
//   const setDateTimeList = useTripStore((s) => s.setDateTimeList);

//   const handleAddRow = useCallback(() => {
//     if (!dateTime) return;
//     const exists = dateTimeList.some((d) => d.date === dateTime.date);
//     if (exists) {
//       toast.error("this date is already added", { position: "top-center" });
//       return;
//     }
//     setDateTimeList((prev) => [
//       ...prev,
//       { ...dateTime, id: crypto.randomUUID() },
//     ]);
//   }, [dateTime, dateTimeList, setDateTimeList]);

//   const handleDeleteRow = useCallback(
//     (id: string) => {
//       setDateTimeList((prev) => prev.filter((d) => d.id !== id));
//     },
//     [setDateTimeList],
//   );

//   return (
//     <div>
//       <div className="space-y-2">
//         {dateTimeList.map((d) => (
//           <DateTimeRow
//             key={d.id}
//             bookingDate={d}
//             onDelete={() => handleDeleteRow(d.id)}
//           />
//         ))}
//       </div>
//       <div className="grid grid-cols-2 gap-2">
//         <div className="relative space-y-2 col-span-1">
//           <DatePickerInput
//             className="bg-[#F4F4F4] border border-[#E0E0E0] rounded-lg h-full"
//             inputClassName="px-10 h-11.25 bg-[#F4F4F4] border-none w-full rounded-lg"
//           />
//         </div>
//         <div className="flex gap-2 col-span-1">
//           <TimePickerInput
//             className="w-full bg-[#F4F4F4] border border-[#E0E0E0] rounded-lg h-full"
//             inputClassName="px-10 h-11.25 bg-[#F4F4F4] border-none w-full rounded-lg"
//           />
//           <Button
//             onClick={handleAddRow}
//             className="flex h-full bg-[#F4F4F4] border border-[#E0E0E0] rounded-lg items-center justify-center aspect-square cursor-pointer text-[#7A7A7A] hover:border-[#664F31] hover:bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)] hover:text-white duration-0"
//           >
//             <Plus />
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// });
const DaysList = () => {
  const isMultiDay = useTripStore((s) => s.isMultiDay);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (!wrapperRef.current) return;

    if (isFirstRender.current) {
      isFirstRender.current = false;
      if (!isMultiDay) {
        gsap.set(wrapperRef.current, { height: 0, opacity: 0 });
      }
      return;
    }

    if (isMultiDay) {
      gsap.to(wrapperRef.current, {
        height: "auto",
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
      });
    } else {
      gsap.to(wrapperRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.35,
        ease: "power2.inOut",
      });
    }
  }, [isMultiDay]);

  return (
    <>
      {/* الـ inputs دايمًا موجودين بره الـ wrapper */}

      {/* الـ rows بس اللي بتتخفى */}
      <div ref={wrapperRef} className="overflow-hidden">
        <DaysListRows />
      </div>
      <DaysListInputs />
    </>
  );
};

// الـ inputs — دايمًا ظاهرين
const DaysListInputs = memo(() => {
  const dateTime = useDateStore((s) => s.bookingDate);
  const dateTimeList = useTripStore((s) => s.dateTimeList);
  const setDateTimeList = useTripStore((s) => s.setDateTimeList);
  const isMultiDay = useTripStore((s) => s.isMultiDay);

  const resetBookingDate = useDateStore((s) => s.resetBookingDate);

  const addRow = useCallback(() => {
    if (!dateTime) return;
    const exists = dateTimeList.some((d) => d.date === dateTime.date);
    if (exists) {
      toast.error("this date is already added", { position: "top-center" });
      return;
    }
    setDateTimeList((prev) =>
      [...prev, { ...dateTime, id: crypto.randomUUID() }].sort(
        (a, b) =>
          new Date(a.date ?? "").getTime() - new Date(b.date ?? "").getTime(),
      ),
    );
    resetBookingDate();
  }, [dateTime, dateTimeList, setDateTimeList, resetBookingDate]);

  // لما isMultiDay يتفعل → أضف صف تلقائياً
  const prevIsMultiDay = useRef(isMultiDay);

  useEffect(() => {
    if (!prevIsMultiDay.current && isMultiDay && dateTimeList.length === 0) {
      addRow();
      resetBookingDate();
    }
    prevIsMultiDay.current = isMultiDay;
  }, [isMultiDay, addRow]);

  console.log(dateTime?.date);

  useEffect(() => {
    if(!isMultiDay) return;
    if ((dateTime?.date ?? "" !== "") && (dateTime?.time ?? "" !== "")) {
      addRow();
    }
  }, [dateTime]);

  return (
    <div className="grid grid-cols-2 gap-2 my-2">
      <div className="relative space-y-2 col-span-1">
        <DatePickerInput
          className="bg-[#F4F4F4] border border-[#E0E0E0] rounded-lg h-full"
          inputClassName="px-10 h-11.25 bg-[#F4F4F4] border-none w-full rounded-lg"
        />
      </div>
      <div className="flex gap-2 col-span-1">
        <TimePickerInput
          disabled={!dateTime?.date}
          className="w-full bg-[#F4F4F4] border border-[#E0E0E0] rounded-lg h-full"
          inputClassName="px-10 h-11.25 bg-[#F4F4F4] border-none w-full rounded-lg"
        />
        {/* <Button
          disabled={!dateTime?.date || !dateTime?.time}
          onClick={addRow}
          className="flex h-full bg-[#F4F4F4] border border-[#E0E0E0] rounded-lg items-center justify-center aspect-square cursor-pointer text-[#7A7A7A] hover:border-[#664F31] hover:bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)] hover:text-white duration-0"
        >
          <Plus />
        </Button> */}
      </div>

      {/* <Button
        variant={"outline"}
        className="w-full col-span-2 h-11.25 cursor-pointer flex items-center justify-center gap-2 py-2.5 rounded-lg border border-dashed border-[#E0E0E0] text-[#ACACAC] text-sm hover:border-[#7B5A41] hover:text-[#7B5A41] transition-colors"
      >
        <Plus size={14} />
        Add another day
      </Button> */}
    </div>
  );
});

// الـ rows فقط — دي اللي بتتخفى
const DaysListRows = memo(() => {
  const dateTimeList = useTripStore((s) => s.dateTimeList);
  const setDateTimeList = useTripStore((s) => s.setDateTimeList);

  const handleDeleteRow = useCallback(
    (id: string) => {
      setDateTimeList((prev) => prev.filter((d) => d.id !== id));
    },
    [setDateTimeList],
  );

  return (
    <div className="space-y-2 pb-2">
      {dateTimeList.map((d) => (
        <DateTimeRow
          key={d.id}
          bookingDate={d}
          onDelete={() => handleDeleteRow(d.id)}
        />
      ))}
    </div>
  );
});

import { memo, useCallback, useEffect, useRef } from "react";
import gsap from "gsap";
import { Switch } from "@/components/ui/switch";
import { useTripStore } from "@/store/tripStore";
import { useDateStore } from "@/store/vipInputsStore";
import { toast } from "sonner";
import DatePickerInput, {
  BookingDate,
} from "@/components/custom inputs/DatePickerInputs";
import TimePickerInput from "@/components/custom inputs/TimePicker";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import Calender from "@/components/custom icons/calender";
import TimeIcon from "@/components/custom icons/TimeIcon";
import { is } from "date-fns/locale";

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
        <TimeIcon time={bookingDate.time ?? ""} className="h-4 w-4" />
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
