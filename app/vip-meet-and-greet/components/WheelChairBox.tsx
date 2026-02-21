"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function WheelchairCheckbox() {
  const [checked, setChecked] = useState(false);

  return (
    <div>
      {/* Checkbox Row */}
      <div className="flex items-start gap-3 mb-3">
        <Checkbox
          id="wheelchair"
          checked={checked}
          onCheckedChange={(value) => setChecked(Boolean(value))}
          className="w-6 h-6 rounded-md bg-[#F4F4F4] 
          data-[state=checked]:bg-[#7B5A41] 
          data-[state=checked]:border-[#7B5A41]"
        />

        <Label
          htmlFor="wheelchair"
          className="text-sm leading-relaxed cursor-pointer"
        >
          Wheelchair requested from the airline
        </Label>
      </div>

      {/* Animated Warning Box */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          checked
            ? "max-h-40 opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex items-center gap-4 rounded-lg bg-[#FFFBEF] px-4 py-3 border border-[#7B5A414D] text-[#7B5A41]">
          <div className="min-w-6 w-6 min-h-6 h-6 text-lg bg-[#7B5A41] rounded-full grid place-content-center">
            <p className="text-white">!</p>
          </div>
          <p className="text-sm leading-relaxed">
            Wheelchair assistance must be arranged directly with your
            airline. By ticking this box, you confirm that you have
            selected wheelchair assistance on your flight booking.
          </p>
        </div>
      </div>
    </div>
  );
}
