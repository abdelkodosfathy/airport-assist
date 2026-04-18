// fixed body
export const fixedDescription =
  "Airport Assist provides premium airport assistance with Meet & Greet, Fast-Track departures and arrivals, and seamless VIP concierge support from curbside through to the boarding gate";

// image_src + titel + iata
"/popular/name" + "LONDON HEATHROW" + "LHR";
"/popular/name" + "Paris Charles de Gaulle " + "CDG";
"/popular/name" + "Rome Fiumicino" + "FCO";
"/popular/name" + "New York John F.Kennedy" + "JFK";
"/popular/name" + "Los Angeles Airport" + "LAX";
"/popular/name" + "Milano Malpensa" + "MXP";
"/popular/name" + "Nice Côte d'Azur Airport" + "NCE";
"/popular/name" + "Zurich Airport" + "ZRH";
"/popular/name" + "Newark Airport " + "EWR";
"/popular/name" + "Frankfurt Airport" + "FRA";
"/popular/name" + "London Gatwick Airport" + "LGW";
"/popular/name" + "Lisboa Airport " + "LIS";
"/popular/name" + "Incheon South Korea" + "ICN";
"/popular/name" + "Amsterdam Schiphol" + "AMS";
"/popular/name" + "Boston Logan Airport" + "BOS";

// image_src: `/popular/${iata.toLowerCase()}.webp` 

export interface PopularAirport {
  title: string;
  iata: string;
  image_src?: string; // for feature updates probabelty
  description?: string; // for feature updates probabelty
}
export const popularAirports: PopularAirport[] = [

  {
    title: "London Heathrow",
    iata: "LHR",
  },
  {
    title: "Paris Charles de Gaulle",
    iata: "CDG",
  },
  {
    title: "Rome Fiumicino",
    iata: "FCO",
  },
  {
    title: "New York John F. Kennedy",
    iata: "JFK",
  },
  {
    title: "Los Angeles Airport",
    iata: "LAX",
  },
  {
    title: "Milano Malpensa",
    iata: "MXP",
  },
  {
    title: "Nice Côte d'Azur Airport",
    iata: "NCE",
  },
  {
    title: "Zurich Airport",
    iata: "ZRH",
  },
  {
    title: "Newark Airport",
    iata: "EWR",
  },
  {
    title: "Frankfurt Airport",
    iata: "FRA",
  },
  {
    title: "London Gatwick Airport",
    iata: "LGW",
  },
  {
    title: "Lisboa Airport",
    iata: "LIS",
  },
  {
    title: "Incheon South Korea",
    iata: "ICN",
  },
  {
    title: "Amsterdam Schiphol",
    iata: "AMS",
  },
  {
    title: "Boston Logan Airport",
    iata: "BOS",
  },
];
