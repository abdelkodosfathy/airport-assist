// ── Arrival / Departure form ──────────────────────────────────────────────────

import { useFlightFormStore } from "@/store/useFlightFormStore";
import { useSingleAirportStore } from "@/store/vipInputsStore";
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
  // const setServiceDuration = useFlightFormStore(
  //   (state) => state.setServiceDuration,
  // );

  const validationErrors = useFlightFormStore(s => s.validationError);

  const hasError = (key: "airline" | "flightNumber") =>{
    const keys = {
      airline: selectedAirline,
      flightNumber: flightNumber,
    }
    
    if(validationErrors && !(keys[key] ?? "" !== "")) {
      return true;
    }
    return false;
  }

  const airlineError = hasError("airline");
  const flightNumberError = hasError("flightNumber");
  return (
    <FormWrapper>
      <div className="space-y-2">
        <Label className={ airlineError ? "text-red-500" : ""}>
          Airline {airlineError && "*"}
        </Label>
        <AirlineSearchInput
          label="Airline"
          value={selectedAirline}
          inputClassName={`h-9 ${airlineError && "border-red-500"}`}
          placeholder="Search airline…"
          onSelect={setSelectedAirline}
        />
      </div>

      <FlightNumberInput
        disabled={selectedAirline === null}
        airline={selectedAirline?.airline_code ?? ""}
        value={flightNumber ?? ""}
        flightNumberError={flightNumberError}
        className={`h-9 ${flightNumberError && "border-red-500"}`}
        onChange={setFlightNumber}
      />

      <TimeRow
        // onServiceDurationChange={setServiceDuration}
        // validationErrors={validationErrors}
      />

      {fastTrackActive && (fastTrackCost ?? 0) > 0 ? (
        <FastTrackCheckBox />
      ) : null}
    </FormWrapper>
  );
};

export default ArrivalDepartureFlightForm;
