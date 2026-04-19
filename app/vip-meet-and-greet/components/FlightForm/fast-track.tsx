// ── Fast Track ────────────────────────────────────────────────────────────────

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useConvertCurrency } from "@/lib/hooks/useConvertCurrency";
import { useCurrencyStore } from "@/store/currencyStore";
import { useFlightFormStore } from "@/store/useFlightFormStore";
import { useSingleAirportStore } from "@/store/vipInputsStore";

const FastTrackCheckBox = () => {
  const fastTrackCost = useSingleAirportStore(
    (state) => state.singleAirport?.fast_track_cost,
  );
  const fastTrackChecked = useFlightFormStore((state) => state.fastTrack);
  const checkfastTrack = useFlightFormStore((state) => state.setFastTrack);
  const currencyMark = useCurrencyStore((state) => state.currencyMark);

  const {convert} = useConvertCurrency();
  return (
    <div className="flex items-start col-span-2 gap-3">
      <Checkbox
        id="fastTrack"
        checked={fastTrackChecked}
        onCheckedChange={(v) => checkfastTrack(v === true)}
        className="w-6 h-6 rounded-md shadow-xs bg-[#F4F4F4] data-[state=checked]:bg-[#7B5A41] data-[state=checked]:border-[#7B5A41]"
      />
      <Label
        htmlFor="fastTrack"
        className="font-medium leading-relaxed cursor-pointer"
      >
        Include Fast Track Service{" "}
        <span>
          (+{currencyMark} {convert(fastTrackCost ?? 0)}, Per PAX)
        </span>
      </Label>
    </div>
  );
};

export default FastTrackCheckBox;
