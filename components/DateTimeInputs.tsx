// import { useState } from "react";
// import { Input } from "@/components/ui/input";
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
// import { Calendar } from "@/components/ui/calendar";
// import { format } from "date-fns";

// export default function DateTimeInputs() {
//   const [date, setDate] = useState<Date | undefined>(undefined);
//   const [time, setTime] = useState("");

//   return (
//     <>
//       {/* Date Input */}
//       <Popover>
//         <PopoverTrigger asChild>
//           <Input
//             placeholder="Pickup Date"
//             value={date ? format(date, "yyyy-MM-dd") : ""}
//             className="max-w-[225px] bg-white rounded-none px-4 py-3"
//           />
//         </PopoverTrigger>
//         <PopoverContent className="w-auto p-0">
//           <Calendar
//             mode="single"
//             selected={date}
//             onSelect={setDate}
//             className="rounded-lg border"
//           />
//         </PopoverContent>
//       </Popover>

//       {/* Time Input */}
//       <Popover>
//         <PopoverTrigger asChild>
//           <Input
//             placeholder="Pickup Time"
//             value={time}
//             onChange={(e) => setTime(e.target.value)}
//             type="time"
//             className="max-w-[225px] bg-white rounded-none px-4 py-3"
//           />
//         </PopoverTrigger>
//         <PopoverContent className="w-auto p-2">
//           {/* لو حابب تعمل time picker custom هنا */}
//         </PopoverContent>
//       </Popover>
//     </>
//   );
// }

"use client";
import { useState } from "react";
import { CalendarIcon, ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export const DatePickerWithIconDemo = () => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);

  return (
    <div className="w-full h-full max-w-56.25 space-y-2">
        
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="w-full h-full rounded-none justify-between font-normal"
          >
            <span className="flex items-center">
              <CalendarIcon className="mr-2" />
              {date ? date.toLocaleDateString() : "Select Date"}
            </span>
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(date) => {
              setDate(date);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
