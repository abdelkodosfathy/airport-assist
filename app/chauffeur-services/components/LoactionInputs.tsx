import { useAirportSearch } from "@/lib/hooks/useAirports";
import { Airport } from "@/lib/types/airport";
import { AlertCircle, Loader2, MapPin, Plane } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

export type LatLng = { lat: number; lng: number };
export type SuggestionKind = "airport" | "place";

export interface Suggestion {
  id: string;
  kind: SuggestionKind;
  label: string; // Primary display text  (e.g. "JFK – John F. Kennedy")
  sublabel: string; // Secondary display text (e.g. "New York, USA")
  location?: LatLng; // Resolved coordinates
  placeId?: string; // Google placeId – needed for geocoding place results
  iataCode?: string; // For airports
  rawAirport?: Airport; // Original Airport object from the backend
  googleTypes?: string[]; // Google Places types array (e.g. ["airport", "establishment"])
}
// ── Utility: map backend Airport → Suggestion ─────────────────────────────────

function airportToSuggestion(a: Airport): Suggestion {
  return {
    id: `airport-${a.airport_code ?? a.airport_id}`,
    kind: "airport",
    label: `${a.airport_code ? `${a.airport_code} – ` : ""}${a.airport_name}`,
    sublabel: [a.city.city_name, a.city.country_name]
      .filter(Boolean)
      .join(", "),
    location:
      a.location_lat && a.location_long
        ? { lat: Number(a.location_lat), lng: Number(a.location_long) }
        : undefined,
    iataCode: a.airport_code,
    rawAirport: a,
  };
}

// ── Sub-component: Search Input with dropdown ─────────────────────────────────

interface LocationInputProps {
  label?: string;
  placeholder: string;
  value: Suggestion | null;
  onChange: (s: Suggestion | null) => void;
  onAirportSelect?: (airport: Airport) => void;
  error?: string | null;
  isLoaded: boolean;
  disabled?: boolean;
  onCountrySelect?: (country: string) => void;
  className?: string;
  isPickup?: boolean;
  countryRestriction?: string | string[]; // e.g. "uk" or ["uk", "ie"]
  disableAirportsSearch?: boolean;
  disableGoogleSearch?: boolean;
}

export function LocationInput({
  label,
  placeholder,
  value,
  onChange,
  onAirportSelect,
  onCountrySelect,
  error,
  isLoaded,
  disabled,
  className,
  isPickup,
  countryRestriction,
  disableAirportsSearch,
  disableGoogleSearch,
}: LocationInputProps) {
  const [query, setQuery] = useState("");
  // debouncedQuery drives useAirportSearch — kept as state so the hook re-runs reactively
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [placeSuggestions, setPlaceSuggestions] = useState<Suggestion[]>([]);
  const [open, setOpen] = useState(false);
  const [searchingPlaces, setSearchingPlaces] = useState(false);
  const autocompleteService =
    useRef<google.maps.places.AutocompleteService | null>(null);
  const geocoder = useRef<google.maps.Geocoder | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // ── Backend airport search via hook ────────────────────────────────────────
  // `isFetching` (not `isLoading`) stays true during background refetches,
  // so the spinner shows on every keystroke. `data` is kept from the previous
  // query via `placeholderData: keepPreviousData` in the hook, so the list
  // never empties while a new fetch is in-flight.
  // const { data: airportData, isFetching: isLoadingAirports } = useAirportSearch(
  //   debouncedQuery,
  //   debouncedQuery.trim().length > 0,
  // );
  const shouldSearchAirports =
    debouncedQuery.trim().length > 0 && !disableAirportsSearch; // if there is query and fetching airports from backend are enabled

  const { data: airportData, isFetching: isLoadingAirports } = useAirportSearch(
    debouncedQuery,
    shouldSearchAirports,
  );

  const backendAirports: Airport[] = airportData?.data?.airports ?? [];

    
  // const airportSuggestions = backendAirports
  //   .slice(0, 5)
  //   .map(airportToSuggestion);

  const allowedCountries = countryRestriction
    ? (Array.isArray(countryRestriction)
        ? countryRestriction
        : [countryRestriction]
      ).map((c) => c.toLowerCase())
    : null;

  const airportSuggestions = backendAirports
    .filter((a) =>
      allowedCountries
        ? allowedCountries.includes(a.city.iso2.toLowerCase())
        : true,
    )
    .slice(0, 5)
    .map(airportToSuggestion);

  // ── Deduplicate: strip Google Places results that represent airports ─────────
  // Strategy A – Google marks the place type as "airport"
  // Strategy B – display text contains an airport-specific keyword
  // Strategy C – high bigram (Sørensen–Dice) similarity to a backend airport name.
  //              Uses character bigrams so short city names like "Cairo" are never
  //              confused with airport names — a score >= 0.75 is required, meaning
  //              at least 75% of bigrams must overlap before we treat it as the same place.
  const bigrams = (s: string): Set<string> => {
    const out = new Set<string>();
    const n = s.toLowerCase().replace(/[^a-z0-9]/g, "");
    for (let i = 0; i < n.length - 1; i++) out.add(n[i] + n[i + 1]);
    return out;
  };
  const diceSimilarity = (a: string, b: string): number => {
    const ba = bigrams(a);
    const bb = bigrams(b);
    if (ba.size === 0 && bb.size === 0) return 1;
    if (ba.size === 0 || bb.size === 0) return 0;
    let intersection = 0;
    ba.forEach((bg) => {
      if (bb.has(bg)) intersection++;
    });
    return (2 * intersection) / (ba.size + bb.size);
  };

  const backendAirportNames = backendAirports.map((a) => a.airport_name);
  const AIRPORT_KEYWORDS =
    /\b(airport|airfield|terminal|aeroporto|aéroport|flughafen|aeropuerto)\b/i;
  const DICE_THRESHOLD = 0.75;

  const filteredPlaceSuggestions = placeSuggestions.filter((p) => {
    const combined = `${p.label} ${p.sublabel}`.toLowerCase();

    // A – explicit airport type flag set by Google
    if (p.googleTypes?.includes("airport")) return false;

    // B – keyword match in display text
    if (AIRPORT_KEYWORDS.test(combined)) return false;

    // C – fuzzy name match against a backend airport (high-confidence only)
    if (
      backendAirportNames.some(
        (name) => diceSimilarity(p.label, name) >= DICE_THRESHOLD,
      )
    )
      return false;

    return true;
  });

  // Merged: backend airports first, then deduplicated places
  const suggestions: Suggestion[] = [
    ...airportSuggestions,
    ...filteredPlaceSuggestions,
  ];

  const isSearching = isLoadingAirports || searchingPlaces;

  // ── Initialise Google services ─────────────────────────────────────────────
  useEffect(() => {
    if (!isLoaded) return;
    autocompleteService.current = new google.maps.places.AutocompleteService();
    geocoder.current = new google.maps.Geocoder();
  }, [isLoaded]);

  // ── Close dropdown on outside click ───────────────────────────────────────
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // ── Sync display when external value is cleared ────────────────────────────
  useEffect(() => {
    if (!value) setQuery("");
  }, [value]);

  // ── Open dropdown whenever new suggestions arrive ──────────────────────────
  useEffect(() => {
    if (suggestions.length > 0 && debouncedQuery.trim()) setOpen(true);
  }, [airportSuggestions.length, placeSuggestions.length]);

  // ── Input change: debounce both airport hook query & Places API call ───────
  const handleQueryChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const q = e.target.value;
      setQuery(q);
      onChange(null); // clear selection on typing

      if (!q.trim()) {
        setDebouncedQuery("");
        setPlaceSuggestions([]);
        setOpen(false);
        return;
      }

      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(async () => {
        // Drive the airport hook
        setDebouncedQuery(q);

        // Google Places in parallel
        if (!disableGoogleSearch && isLoaded && autocompleteService.current) {
          setSearchingPlaces(true);
          autocompleteService.current.getPlacePredictions(
            {
              input: q,
              componentRestrictions: countryRestriction // that makes the input locked on the country like "uk"
                ? { country: countryRestriction }
                : undefined,
            },
            (predictions, status) => {
              setSearchingPlaces(false);
              if (
                status !== google.maps.places.PlacesServiceStatus.OK ||
                !predictions
              ) {
                setPlaceSuggestions([]);
                return;
              }
              setPlaceSuggestions(
                predictions.slice(0, 5).map((p) => ({
                  id: `place-${p.place_id}`,
                  kind: "place" as SuggestionKind,
                  // label: p.structured_formatting.main_text, // for formated simple address
                  label: p.description, // for the full address without any formatting
                  sublabel: p.structured_formatting.secondary_text ?? "",
                  placeId: p.place_id,
                  googleTypes: p.types,
                })),
              );
            },
          );
        }
      }, 300);
    },
    [isLoaded, onChange, disableGoogleSearch],
  );

  // ── Select a suggestion ────────────────────────────────────────────────────
  const handleSelect = useCallback(
    (s: Suggestion) => {
      setQuery(s.label);
      setOpen(false);

      // Notify parent of selected airport object for store compatibility
      if (s.kind === "airport" && s.rawAirport) {
        onAirportSelect?.(s.rawAirport);
        onChange(s);
        const country = s.rawAirport.city.iso2 ?? "";
        onCountrySelect?.(country);
        return;
      }

      // Resolve place coordinates via Geocoder
      if (s.placeId && geocoder.current) {
        geocoder.current.geocode({ placeId: s.placeId }, (results, status) => {
          if (status === "OK" && results?.[0]) {
            const loc = results[0].geometry.location;

            const countryComponent = results[0].address_components.find((c) =>
              c.types.includes("country"),
            );

            // const country = countryComponent?.long_name ?? "";

            const country = countryComponent?.short_name ?? ""; // "US" | "EG" | "GB"

            onCountrySelect?.(country);

            onChange({ ...s, location: { lat: loc.lat(), lng: loc.lng() } });
          } else {
            onChange(s);
          }
        });
      } else {
        onChange(s);
      }
    },
    [onChange, onAirportSelect, onCountrySelect],
  );

  const displayValue = value ? value.label : query;

  return (
    <div
      className={`flex flex-col gap-1.5 ${isPickup ? "" : "h-full"}`}
      ref={containerRef}
    >
      {label && (
        <label className="text-xs font-medium text-[#747474] uppercase tracking-widest">
          {label}
        </label>
      )}

      <div className={`relative ${isPickup ? "" : "h-full"}`}>
        {/* Input */}
        <div
          className={`relative flex items-center h-11 rounded-lg border bg-[#F4F4F4] transition-colors ${
            error
              ? "border-red-400"
              : open
                ? "border-[#1A1A1A]"
                : "border-[#E0E0E0]"
          } ${className}`}
        >
          {/* Kind icon */}
          <span className="pl-3 pr-2 text-[#ACACAC]">
            {value?.kind === "airport" ? (
              <Plane size={15} className="text-[#1A1A1A]" />
            ) : (
              <MapPin size={15} />
            )}
          </span>

          <input
            disabled={disabled}
            value={displayValue}
            onChange={handleQueryChange}
            onFocus={() => suggestions.length > 0 && setOpen(true)}
            placeholder={placeholder}
            className="flex-1 h-full bg-transparent text-sm text-[#1A1A1A] placeholder:text-[#ACACAC] outline-none pr-9 truncate"
          />

          {isSearching && (
            <Loader2
              size={14}
              className="absolute right-3 text-[#ACACAC] animate-spin"
            />
          )}
        </div>

        {/* Dropdown */}
        {open && suggestions.length > 0 && (
          <ul
            className="absolute z-50 mt-1.5 w-full rounded-xl border border-[#E8E8E8] bg-white shadow-xl overflow-hidden"
            style={{ maxHeight: 280, overflowY: "auto" }}
          >
            {suggestions.map((s, i) => (
              <li key={s.id}>
                {/* Divider between airports and places */}
                {i > 0 && suggestions[i - 1].kind !== s.kind && (
                  <div className="mx-3 my-1 border-t border-dashed border-[#E8E8E8]" />
                )}
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()} // prevent blur before click
                  onClick={() => handleSelect(s)}
                  className="w-full flex items-start gap-3 px-3.5 py-2.5 text-left hover:bg-[#F7F7F7] transition-colors group"
                >
                  <span
                    className={`mt-0.5 flex-shrink-0 w-6 h-6 rounded-md flex items-center justify-center ${
                      s.kind === "airport"
                        ? "bg-[#1A1A1A] text-white"
                        : "bg-[#F0F0F0] text-[#747474]"
                    }`}
                  >
                    {s.kind === "airport" ? (
                      <Plane size={12} />
                    ) : (
                      <MapPin size={12} />
                    )}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-[#1A1A1A] truncate leading-tight">
                      {s.label}
                    </p>
                    {s.sublabel && (
                      <p className="text-xs text-[#ACACAC] truncate mt-0.5">
                        {s.sublabel}
                      </p>
                    )}
                  </div>
                  {s.kind === "airport" && s.iataCode && (
                    <span className="ml-auto flex-shrink-0 text-[10px] font-bold tracking-widest text-[#747474] bg-[#F0F0F0] px-1.5 py-0.5 rounded mt-0.5">
                      {s.iataCode}
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Error */}
      {error && (
        <p className="flex items-center gap-1 text-xs text-red-500 mt-0.5">
          <AlertCircle size={11} />
          {error}
        </p>
      )}
    </div>
  );
}
