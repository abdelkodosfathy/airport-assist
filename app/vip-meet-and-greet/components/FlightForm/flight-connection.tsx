// ── Connection form ───────────────────────────────────────────────────────────

import { useFlightFormStore } from "@/store/useFlightFormStore";
import { useSingleAirportStore } from "@/store/vipInputsStore";
import { ValidationErrors } from "./types";
import FormWrapper from "./form-wrapper";
import { Label } from "@/components/ui/label";
import AirlineSearchInput from "@/components/custom inputs/AirlineSearchInput";
import { FlightNumberInput } from "./flight-number-input";
import TimeRow from "./time-row";
import FastTrackCheckBox from "./fast-track";
import { useState } from "react";

const ConnectionFlightForm = () => {
  const arrivalAirline = useFlightFormStore((state) => state.arrivalAirline);
  const arrivalFlightNumber = useFlightFormStore(
    (state) => state.arrivalFlightNumber,
  );
  const departureAirline = useFlightFormStore(
    (state) => state.departureAirline,
  );
  const departureFlightNumber = useFlightFormStore(
    (state) => state.departureFlightNumber,
  );
  const fastTrackActive = useSingleAirportStore(
    (state) => state.singleAirport?.is_fast_track_active,
  );
  const fastTrackCost = useSingleAirportStore(
    (state) => state.singleAirport?.fast_track_cost,
  );

  const setArrivalAirline = useFlightFormStore(
    (state) => state.setArrivalAirline,
  );
  const setArrivalFlightNumber = useFlightFormStore(
    (state) => state.setArrivalFlightNumber,
  );
  const setDepartureAirline = useFlightFormStore(
    (state) => state.setDepartureAirline,
  );
  const setDepartureFlightNumber = useFlightFormStore(
    (state) => state.setDepartureFlightNumber,
  );
  const setServiceDuration = useFlightFormStore(
    (state) => state.setServiceDuration,
  );

  const [validationErrors] = useState<ValidationErrors>({});

  return (
    <FormWrapper>
      {/* Row 1: Arrival Airline + Arrival Flight Number */}
      <div className="space-y-2">
        <Label>Arrival Airline</Label>
        <AirlineSearchInput
          label="Airline"
          value={arrivalAirline}
          placeholder="Search arrival airline…"
          onSelect={setArrivalAirline}
        />
      </div>

      <FlightNumberInput
        label="Arrival Flight Number"
        disabled={arrivalAirline === null}
        airline={arrivalAirline?.airline_code ?? ""}
        validationErrors={validationErrors}
        value={arrivalFlightNumber ?? ""}
        onChange={setArrivalFlightNumber}
      />

      {/* Row 2: Departure Airline + Departure Flight Number */}
      <div className="space-y-2">
        <Label>Departure Airline</Label>
        <AirlineSearchInput
          label="Airline"
          value={departureAirline}
          placeholder="Search departure airline…"
          onSelect={setDepartureAirline}
        />
      </div>

      <FlightNumberInput
        label="Departure Flight Number"
        disabled={departureAirline === null}
        airline={departureAirline?.airline_code ?? ""}
        validationErrors={validationErrors}
        value={departureFlightNumber ?? ""}
        onChange={setDepartureFlightNumber}
      />

      {/* Row 3: Arrival Time + Service Duration */}
      <TimeRow
        onServiceDurationChange={setServiceDuration}
        validationErrors={validationErrors}
      />
      {/* 
      {fastTrackActive && <FastTrackCheckBox />} */}

      {fastTrackActive && (fastTrackCost ?? 0) > 0 ? (
        <FastTrackCheckBox />
      ) : null}
    </FormWrapper>
  );
};

export default ConnectionFlightForm;
