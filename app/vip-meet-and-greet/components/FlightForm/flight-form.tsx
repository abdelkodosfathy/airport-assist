import { useServiceStore } from "@/store/vipInputsStore";
import ArrivalDepartureFlightForm from "./flight-arrival-departure-form";
import ConnectionFlightForm from "./flight-connection";

// ── Root: switches between service types ──────────────────────────────────────

const FlightForm = () => {
  const serviceType = useServiceStore((state) => state.serviceType);

  if (serviceType === "connection") return <ConnectionFlightForm />;

  return <ArrivalDepartureFlightForm />;
};

export default FlightForm;
