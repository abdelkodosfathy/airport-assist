export type FlightInfoResponse = {
  flight_date: string;
  flight_status: string;

  departure: {
    airport: string;
    timezone: string;
    iata: string;
    icao: string;
    terminal: string;
    gate: string;
    delay: number;
    scheduled: string;
    estimated: string;
    actual: string;
    estimated_runway: string;
    actual_runway: string;
    baggage: string;
  };

  arrival: {
    airport: string;
    timezone: string;
    iata: string;
    icao: string;
    terminal: string;
    gate: string;
    delay: number;
    scheduled: string;
    estimated: string;
    actual: string;
    estimated_runway: string;
    actual_runway: string;
    baggage: string;
  };

  airline: {
    id: string;
    fleet_average_age: number;
    airline_id: string;
    callsign: string;
    hub_code: string;
    iata_code: string;
    icao_code: string;
    country_iso2: string;
    date_founded: string;
    iata_prefix_accounting: string;
    airline_name: string;
    country_name: string;
    fleet_size: number;
    status: string;
    type: string;
  };

  flight: {
    number: string;
    iata: string;
    icao: string;
    codeshared: any[];
  };

  aircraft: {
    registration: string;
    iata: string;
    icao: string;
    icao24: string;
  };

  live: {
    updated: string;
    latitude: number;
    longitude: number;
    altitude: number;
    direction: number;
    speed_horizontal: number;
    speed_vertical: number;
    is_ground: boolean;
  };
};

export type FlightData = {
  airline_name: string;
  airline_code: string;
  airline_id: string;

  flight_number: string;

  departure_airport: string;
  arrival_airport: string;

  scheduled_departure: string;
  scheduled_arrival: string;

  flight_status: string;
};

export const mapFlightToUI = (
  flight: FlightInfoResponse,
  inputFlightNumber: string,
): FlightData => {
  return {
    airline_name: flight.airline?.airline_name ?? "",
    airline_code: flight.airline?.iata_code ?? "",
    airline_id: flight.airline?.airline_id ?? "",

    flight_number: flight.flight?.iata ?? inputFlightNumber,

    departure_airport: flight.departure?.airport ?? "",
    arrival_airport: flight.arrival?.airport ?? "",

    scheduled_departure: flight.departure?.scheduled ?? "",
    scheduled_arrival: flight.arrival?.scheduled ?? "",
    flight_status: flight.flight_status ?? "",
  };
};
