import { Input } from "@/components/ui/input";
import { Minus, Plus } from "lucide-react";
const NumberInput = ({
  title,
  onIncrement,
  onDecrement,
  onChangeValue,
  value,
  min = 0,
}: {
  title: string;
  value: number;
  min?: number;
  onIncrement?: () => void;
  onDecrement?: () => void;
  onChangeValue?: (num: number) => void;
}) => {
  return (
    <div className="flex flex-1 justify-between items-center col-span-1">
      <p className="font-semibold capitalize">{title}</p>

      <div className="flex gap-2 items-center">
        {/* Minus */}
        <button
          type="button"
          onClick={onDecrement}
          disabled={value <= min}
          className="grid place-content-center rounded-full w-8 h-8
          text-white bg-[#7B5A41]
          disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Minus size={14} />
        </button>

        {/* Input */}
        <Input
          type="number"
          min={min}
          value={value}
          onBlur={() => {
            if (value < min) {
              onChangeValue?.(min);
            }
          }}
          onChange={(e) => onChangeValue?.(Math.max(0, Number(e.target.value)))}
          className="rounded-lg text-center w-16 bg-[#F2F3F5]
          appearance-none
          [&::-webkit-outer-spin-button]:appearance-none
          [&::-webkit-inner-spin-button]:appearance-none
          [&::-moz-appearance]:textfield"
        />

        {/* Plus */}
        <button
          type="button"
          onClick={onIncrement}
          className="grid place-content-center rounded-full w-8 h-8
          text-white bg-[#7B5A41]"
        >
          <Plus size={14} />
        </button>
      </div>
    </div>
  );
};

export default NumberInput;
