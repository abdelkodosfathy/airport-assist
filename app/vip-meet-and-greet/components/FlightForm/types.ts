// ── Types ─────────────────────────────────────────────────────────────────────

import { OptionType } from "@/components/custom inputs/search";

export interface ValidationErrors {
  airline?: boolean;
  flightNumber?: boolean;
  arrivalTime?: boolean;
  serviceDuration?: boolean;
}

export type FlightFormData = {
  selectedAirline: OptionType | null;
  flightNumber: string;
  arrivalTime: OptionType | null;
  serviceDuration: OptionType | null;
  fastTrackChecked: boolean;
};
