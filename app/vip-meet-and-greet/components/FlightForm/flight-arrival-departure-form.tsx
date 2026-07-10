// // ── Arrival / Departure form ──────────────────────────────────────────────────

// import { useFlightFormStore } from "@/store/useFlightFormStore";
// import { useSingleAirportStore } from "@/store/vipInputsStore";
// import FormWrapper from "./form-wrapper";
// import { Label } from "@/components/ui/label";
// import AirlineSearchInput from "@/components/custom inputs/AirlineSearchInput";
// import { FlightNumberInput } from "./flight-number-input";
// import TimeRow from "./time-row";
// import FastTrackCheckBox from "./fast-track";
// import { BagsInput } from "../bags-input";

// const ArrivalDepartureFlightForm = () => {
//   const selectedAirline = useFlightFormStore((state) => state.airline);
//   const flightNumber = useFlightFormStore((state) => state.flightNumber);
//   const fastTrackActive = useSingleAirportStore(
//     (state) => state.singleAirport?.is_fast_track_active,
//   );
//   const fastTrackCost = useSingleAirportStore(
//     (state) => state.singleAirport?.fast_track_cost,
//   );
//   const setSelectedAirline = useFlightFormStore((state) => state.setAirline);
//   const setFlightNumber = useFlightFormStore((state) => state.setFlightNumber);

//   const validationErrors = useFlightFormStore((s) => s.validationError);

//   const hasError = (key: "airline" | "flightNumber") => {
//     const keys = {
//       airline: selectedAirline,
//       flightNumber: flightNumber,
//     };

//     if (validationErrors && !(keys[key] ?? "" !== "")) {
//       return true;
//     }
//     return false;
//   };

//   const airlineError = hasError("airline");
//   const flightNumberError = hasError("flightNumber");
//   return (
//     <FormWrapper>
//       <div className="space-y-2">
//         <Label className={airlineError ? "text-red-500" : ""}>
//           Airline {airlineError && "*"}
//         </Label>
//         <AirlineSearchInput
//           label="Airline"
//           value={selectedAirline}
//           inputClassName={`h-9 ${airlineError && "border-red-500"}`}
//           placeholder="Search airline…"
//           onSelect={setSelectedAirline}
//         />
//       </div>

//       <FlightNumberInput
//         disabled={selectedAirline === null}
//         airline={selectedAirline?.airline_code ?? ""}
//         value={flightNumber ?? ""}
//         flightNumberError={flightNumberError}
//         className={`h-9 ${flightNumberError && "border-red-500"}`}
//         onChange={setFlightNumber}
//       />

//       <TimeRow />

//       {fastTrackActive && (fastTrackCost ?? 0) > 0 ? (
//         <FastTrackCheckBox />
//       ) : null}
//       <BagsInput />
//     </FormWrapper>
//   );
// };

// export default ArrivalDepartureFlightForm;

// ── ArrivalDepartureFlightForm.tsx ────────────────────────────────────────────

import { useState } from "react";
import { useFlightFormStore } from "@/store/useFlightFormStore";
import { useSingleAirportStore } from "@/store/vipInputsStore";
import FormWrapper from "./form-wrapper";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import AirlineSearchInput from "@/components/custom inputs/AirlineSearchInput";
import { FlightNumberInput } from "./flight-number-input";
import TimeRow from "./time-row";
import FastTrackCheckBox from "./fast-track";
import { BagsInput } from "../bags-input";
import { Loader2, PlaneTakeoff, AlertCircle, Plane } from "lucide-react";
import MainButton from "@/components/MainButton";
import { FlightInfoResponse, mapFlightToUI } from "@/lib/types/flightInfo";
import { apiGet } from "@/lib/api";
import Depature from "@/components/custom icons/depature";
import Arraival from "@/components/custom icons/arraival";
import Connection from "@/components/custom icons/connection";

// ── Types ─────────────────────────────────────────────────────────────────────

interface FlightData {
  airline_name: string;
  airline_code: string;
  flight_number: string;
  departure_airport: string;
  arrival_airport: string;
  scheduled_departure: string;
  scheduled_arrival: string;
  flight_status: string;
}

// ── Automatic Tab Content ─────────────────────────────────────────────────────

const AutomaticFlightLookup = ({
  onFetchFailed,
}: {
  onFetchFailed: () => void;
}) => {
  const [flightInput, setFlightInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [flightData, setFlightData] = useState<FlightData | null>(null);

  const setAirline = useFlightFormStore((s) => s.setAirline);
  const setFlightNumber = useFlightFormStore((s) => s.setFlightNumber);

  // const handleFetch = async () => {
  //   if (!flightInput.trim()) return;

  //   setLoading(true);
  //   setError(null);
  //   setFlightData(null);

  //   try {
  //     const apiKey = process.env.NEXT_PUBLIC_AVIATIONSTACK_API_KEY;
  //     const res = await fetch(
  //       `https://api.aviationstack.com/v1/flights?access_key=${apiKey}&flight_iata=${flightInput.trim().toUpperCase()}`,
  //     );

  //     if (!res.ok) throw new Error("Network error");

  //     const json = await res.json();
  //     const flight = json?.data?.[0];
  //     console.log(json);

  //     if (!flight) {
  //       setError("sorry we couldn't finde the trip automatically.");
  //       return;
  //     }

  //     const data: FlightData = {
  //       airline_name: flight.airline?.name ?? "",
  //       airline_code: flight.airline?.iata ?? "",
  //       flight_number: flight.flight?.iata ?? flightInput,
  //       departure_airport: flight.departure?.airport ?? "",
  //       arrival_airport: flight.arrival?.airport ?? "",
  //       scheduled_departure: flight.departure?.scheduled ?? "",
  //       scheduled_arrival: flight.arrival?.scheduled ?? "",
  //       flight_status: flight.flight_status ?? "",
  //     };

  //     setFlightData(data);

  //     // Sync to global store
  //     setAirline({
  //       airline_code: data.airline_code,
  //       airline_name: data.airline_name,
  //       // spread any other fields your Airline type needs
  //     } as any);
  //     setFlightNumber(data.flight_number);
  //   } catch {
  //     setError("sorry we couldn't finde the trip automatically.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleFetch = async () => {
    if (!flightInput.trim()) return;

    setLoading(true);
    setError(null);
    setFlightData(null);

    try {
      const res = await apiGet("/utilities/flight-info", {
        flight_number: flightInput.trim().toUpperCase(),
      });

      const flight = res?.data ?? res;

      if (!flight) return;

      const data = mapFlightToUI(flight, flightInput.trim().toUpperCase());
      console.log(data);

      setFlightData(data);

      setAirline({
        airline_id: Number.isFinite(Number(data.airline_id))
          ? Number(data.airline_id)
          : 0,
        airline_code: data.airline_code,
        airline_name: data.airline_name,
      });

      setFlightNumber(flightInput.trim().toUpperCase());
    } catch (err) {
      setError("sorry we couldn't find the trip automatically.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="space-y-4">
      {/* Search input */}
      <div className="space-y-2">
        <Label>flight number</Label>
        <div className="flex gap-2">
          <Input
            placeholder="EX1234"
            value={flightInput}
            onChange={(e) => setFlightInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleFetch()}
            className="h-9 uppercase"
          />
          <MainButton
            type="button"
            onClick={handleFetch}
            onDisabledClick={() => {
              console.log("fill data first");
            }}
            disabled={loading || !flightInput.trim()}
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <PlaneTakeoff className="h-4 w-4" />
            )}
            <span className="mr-1">{loading ? " searching..." : "search"}</span>
          </MainButton>
        </div>
      </div>

      {/* Error state */}
      {error && (
        <div className="rounded-md border border-red-200 bg-red-50 p-3">
          <div className="flex items-start gap-2 text-red-700">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <p className="text-sm">{error}</p>
          </div>
          <Button
            type="button"
            variant="link"
            className="mt-1 h-auto p-0 text-sm text-red-600 underline"
            onClick={onFetchFailed}
          >
            manual input
          </Button>
        </div>
      )}

      {/* Flight data — read-only */}
      {flightData && (
        // <div className="rounded-lg bg-[#FFFBEF] px-4 py-3 border border-[#7B5A414D] text-[#7B5A41] p-4 space-y-3">
        //   <div className="grid grid-cols-2 gap-3">
        //     <ReadOnlyField label="airline" value={flightData.airline_name} />

        //     <ReadOnlyField
        //       label="flight number"
        //       value={flightData.flight_number}
        //     />

        //     <ReadOnlyField
        //       label="origin airport"
        //       value={flightData.departure_airport}
        //     />

        //     <ReadOnlyField
        //       label="destination airport"
        //       value={flightData.arrival_airport}
        //     />

        //     {/* Departure full datetime */}
        //     <ReadOnlyField
        //       label="departure"
        //       value={
        //         flightData.scheduled_departure
        //           ? new Intl.DateTimeFormat("en-GB", {
        //               day: "2-digit",
        //               month: "short",
        //               year: "numeric",
        //               hour: "2-digit",
        //               minute: "2-digit",
        //               hour12: false,
        //             }).format(new Date(flightData.scheduled_departure))
        //           : "—"
        //       }
        //     />

        //     {/* Arrival full datetime */}
        //     <ReadOnlyField
        //       label="arrival"
        //       value={
        //         flightData.scheduled_arrival
        //           ? new Intl.DateTimeFormat("en-GB", {
        //               day: "2-digit",
        //               month: "short",
        //               year: "numeric",
        //               hour: "2-digit",
        //               minute: "2-digit",
        //               hour12: false,
        //             }).format(new Date(flightData.scheduled_arrival))
        //           : "—"
        //       }
        //     />
        //   </div>
        // </div>

        <div className="rounded-xl border border-[#7B5A414D] bg-[#FFFBEF] p-5 space-y-5">
          {/* HEADER */}
          <div className="flex items-center justify-between border-b pb-3">
            <div>
              <p className="text-xs text-gray-500">Airline</p>
              <p className="font-semibold text-[#7B5A41]">
                {flightData.airline_name}
              </p>
            </div>

            <div className="text-right">
              <p className="text-xs text-gray-500">Flight Number</p>
              <p className="font-semibold text-[#7B5A41]">
                {flightData.flight_number}
              </p>
            </div>
          </div>

          {/* ROUTE */}
          <div className="flex items-center justify-between">
            <div className="text-left">
              <p className="text-xs text-gray-500">From</p>
              <p className="font-medium text-[#7B5A41]">
                {flightData.departure_airport}
              </p>
            </div>

            <div className="flex-1 mx-4 border-t border-dashed border-[#7B5A41]/40 relative">
              <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-[#7B5A41]">
                <Connection width={16}/>
                {/* <Plane className="rotate-45"/> */}
              </div>
            </div>

            <div className="text-right">
              <p className="text-xs text-gray-500">To</p>
              <p className="font-medium text-[#7B5A41]">
                {flightData.arrival_airport}
              </p>
            </div>
          </div>

          {/* TIMELINE */}
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="rounded-lg bg-white/60 p-3 border border-[#7B5A41]/20">
              <div className="flex gap-2">
                <p className="text-sm text-gray-500">Departure</p>
                <Depature width={16} />
              </div>
              <p className="font-medium text-[#7B5A41]">
                {flightData.scheduled_departure
                  ? new Intl.DateTimeFormat("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    }).format(new Date(flightData.scheduled_departure))
                  : "—"}
              </p>
            </div>

            <div className="rounded-lg bg-white/60 p-3 border border-[#7B5A41]/20">
              <div className="flex gap-2">
                <p className="text-sm text-gray-500">Arrival</p>
                <Arraival width={16} />
              </div>
              <p className="font-medium text-[#7B5A41]">
                {flightData.scheduled_arrival
                  ? new Intl.DateTimeFormat("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    }).format(new Date(flightData.scheduled_arrival))
                  : "—"}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Shared fields still needed */}
      {flightData && (
        <>
          <FastTrackAndBags />
        </>
      )}
    </div>
  );
};

// ── Small helper ──────────────────────────────────────────────────────────────

const ReadOnlyField = ({
  label,
  value,
  className,
}: {
  label: string;
  value: string;
  className?: string;
}) => (
  <div className="space-y-1">
    <p className="text-xs text-muted-foreground">{label}</p>
    <p className={`text-sm font-medium ${className ?? ""}`}>{value || "—"}</p>
  </div>
);

// FastTrack + Bags مشتركين بين الـ tabs
const FastTrackAndBags = () => {
  const fastTrackActive = useSingleAirportStore(
    (s) => s.singleAirport?.is_fast_track_active,
  );
  const fastTrackCost = useSingleAirportStore(
    (s) => s.singleAirport?.fast_track_cost,
  );

  return (
    <>
      {fastTrackActive && (fastTrackCost ?? 0) > 0 && <FastTrackCheckBox />}
      <BagsInput />
    </>
  );
};

// ── Manual Tab Content (الكود القديم بدون تغيير) ──────────────────────────────

const ManualFlightForm = () => {
  const selectedAirline = useFlightFormStore((s) => s.airline);
  const flightNumber = useFlightFormStore((s) => s.flightNumber);
  const setSelectedAirline = useFlightFormStore((s) => s.setAirline);
  const setFlightNumber = useFlightFormStore((s) => s.setFlightNumber);
  const validationErrors = useFlightFormStore((s) => s.validationError);

  const hasError = (key: "airline" | "flightNumber") => {
    const keys = { airline: selectedAirline, flightNumber };
    return validationErrors && !(keys[key] ?? "" !== "");
  };

  const airlineError = hasError("airline");
  const flightNumberError = hasError("flightNumber");

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className={airlineError ? "text-red-500" : ""}>
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
          className={`h-9 ${flightNumberError && "border-red-500 "}`}
          onChange={setFlightNumber}
        />
      </div>
      <TimeRow />
      <FastTrackAndBags />
    </div>
  );
};

// ── Main Component ────────────────────────────────────────────────────────────

const ArrivalDepartureFlightForm = () => {
  const [activeTab, setActiveTab] = useState<"manual" | "automatic">(
    "automatic",
  );

  return (
    <FormWrapper>
      <Tabs
        value={activeTab}
        className="col-span-2 space-y-2"
        onValueChange={(v) => setActiveTab(v as "manual" | "automatic")}
      >
        <TabsList className="w-full mb-4 gap-4">
          <TabsTrigger
            value="automatic"
            className={`flex-1 ${activeTab !== "automatic" ? "cursor-pointer" : ""}`}
          >
            automatic
          </TabsTrigger>
          <TabsTrigger
            value="manual"
            className={`flex-1 ${activeTab !== "manual" ? "cursor-pointer" : ""}`}
          >
            manual
          </TabsTrigger>
        </TabsList>

        <TabsContent value="manual">
          <ManualFlightForm />
        </TabsContent>

        <TabsContent value="automatic">
          <AutomaticFlightLookup onFetchFailed={() => setActiveTab("manual")} />
        </TabsContent>
      </Tabs>
    </FormWrapper>
  );
};

export default ArrivalDepartureFlightForm;
