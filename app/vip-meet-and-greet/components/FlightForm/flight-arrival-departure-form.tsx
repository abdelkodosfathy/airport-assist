// ── Arrival / Departure form ──────────────────────────────────────────────────

import { useFlightFormStore } from "@/store/useFlightFormStore";
import { useSingleAirportStore } from "@/store/vipInputsStore";
import { useState } from "react";
import { ValidationErrors } from "./types";
import FormWrapper from "./form-wrapper";
import { Label } from "@/components/ui/label";
import AirlineSearchInput from "@/components/custom inputs/AirlineSearchInput";
import { FlightNumberInput } from "./flight-number-input";
import TimeRow from "./time-row";
import FastTrackCheckBox from "./fast-track";

const ArrivalDepartureFlightForm = () => {
  const selectedAirline = useFlightFormStore((state) => state.airline);
  const flightNumber = useFlightFormStore((state) => state.flightNumber);
  const fastTrackActive = useSingleAirportStore(
    (state) => state.singleAirport?.is_fast_track_active,
  );
  const fastTrackCost = useSingleAirportStore(
    (state) => state.singleAirport?.fast_track_cost,
  );
  const setSelectedAirline = useFlightFormStore((state) => state.setAirline);
  const setFlightNumber = useFlightFormStore((state) => state.setFlightNumber);
  const setServiceDuration = useFlightFormStore(
    (state) => state.setServiceDuration,
  );

  const [validationErrors] = useState<ValidationErrors>({});

  return (
    <FormWrapper>
      <div className="space-y-2">
        <Label className={validationErrors.airline ? "text-red-500" : ""}>
          Airline {validationErrors.airline && "*"}
        </Label>
        <AirlineSearchInput
          label="Airline"
          value={selectedAirline}
          placeholder="Search airline…"
          onSelect={setSelectedAirline}
        />
      </div>

      <FlightNumberInput
        disabled={selectedAirline === null}
        airline={selectedAirline?.airline_code ?? ""}
        validationErrors={validationErrors}
        value={flightNumber ?? ""}
        onChange={setFlightNumber}
      />

      <TimeRow
        onServiceDurationChange={setServiceDuration}
        validationErrors={validationErrors}
      />

      {fastTrackActive && (fastTrackCost ?? 0) > 0 ? (
        <FastTrackCheckBox />
      ) : null}
    </FormWrapper>
  );
};

export default ArrivalDepartureFlightForm;
