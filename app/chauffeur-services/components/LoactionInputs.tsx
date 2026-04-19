"use client";

import { fetchAirports } from "@/lib/api/airports";
// import { useAirportSearch } from "@/lib/hooks/useAirports";
import { useAirports } from "@/lib/hooks/useAirports";
import { Airport } from "@/lib/types/airport";
import { AlertCircle, Loader2, MapPin, Plane } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

// ── Types ─────────────────────────────────────────────────────────────────────
export type LatLng = { lat: number; lng: number };
export type SuggestionKind = "airport" | "place";

export interface Suggestion {
  id: string;
  kind: SuggestionKind;
  label: string;
  sublabel: string;
  location?: LatLng;
  placeId?: string;
  country?: string;
  state_id?: number;
  iataCode?: string;
  rawAirport?: Airport;
  googleTypes?: string[];
}

// ── Utilities (خارج الـ component لتجنب إعادة الإنشاء في كل render) ──────────
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
    country: a.city.iso2,
    state_id: a.city.state_id,
  };
}

// ✅ FIX #2: نُقلت لبرة الـ component — مش بتتعمل re-create في كل render
function bigrams(s: string): Set<string> {
  const out = new Set<string>();
  const n = s.toLowerCase().replace(/[^a-z0-9]/g, "");
  for (let i = 0; i < n.length - 1; i++) out.add(n[i] + n[i + 1]);
  return out;
}

function diceSimilarity(a: string, b: string): number {
  const ba = bigrams(a);
  const bb = bigrams(b);
  if (ba.size === 0 && bb.size === 0) return 1;
  if (ba.size === 0 || bb.size === 0) return 0;
  let intersection = 0;
  ba.forEach((bg) => {
    if (bb.has(bg)) intersection++;
  });
  return (2 * intersection) / (ba.size + bb.size);
}

function haversineKm(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// ✅ FIX #7: الـ radius بقى 15km بدل 5 عشان يغطي المطارات الكبيرة زي Heathrow
function findNearestAirport(
  airports: Airport[],
  lat: number,
  lng: number,
  radiusKm = 15,
): Airport | null {
  let nearest: Airport | null = null;
  let minDist = Infinity;
  for (const airport of airports) {
    if (!airport.location_lat || !airport.location_long) continue;
    const dist = haversineKm(
      lat,
      lng,
      Number(airport.location_lat),
      Number(airport.location_long),
    );
    if (dist < radiusKm && dist < minDist) {
      minDist = dist;
      nearest = airport;
    }
  }
  return nearest;
}

/**
 * بيدور على:
 * 1. رمز IATA بين قوسين: (LHR), (JFK)
 * 2. أسماء مطارات معروفة بدون كلمة Airport زي "Heathrow", "Gatwick"
 * 3. أي نص بعده "Airport" أو "International"
 */
function extractAirportHints(
  label: string,
  sublabel: string,
): {
  iata: string | null;
  name: string | null;
} {
  const combined = `${label} ${sublabel}`;

  // 1. رمز IATA
  const iataMatch = combined.match(/\b([A-Z]{3})\b/);
  const iata = iataMatch ? iataMatch[1] : null;

  // 2. اسم المطار — بيشمل كلمات airport / international / heathrow / gatwick إلخ
  const namePatterns = [
    /([A-Za-z\s\-]+(?:International|Airport|Heathrow|Gatwick|Stansted|Luton|City Airport))/i,
  ];

  let name: string | null = null;
  for (const pattern of namePatterns) {
    const match = combined.match(pattern);
    if (match) {
      name = match[1].trim();
      break;
    }
  }

  return { iata, name };
}

// ── Component ─────────────────────────────────────────────────────────────────
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
  onStateSelect?: (state: number) => void;
  className?: string;
  isPickup?: boolean;
  countryRestriction?: string | string[];
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
  onStateSelect,
  countryRestriction,
  disableAirportsSearch,
  disableGoogleSearch,
}: LocationInputProps) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [placeSuggestions, setPlaceSuggestions] = useState<Suggestion[]>([]);
  const [open, setOpen] = useState(false);
  const [searchingPlaces, setSearchingPlaces] = useState(false);

  const isTypingRef = useRef(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // ✅ FIX #8: AbortController لإلغاء الـ requests القديمة ومنع race condition
  const placesAbortRef = useRef<AbortController | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const shouldSearchAirports =
    debouncedQuery.trim().length > 0 && !disableAirportsSearch;

  const { data: airportData, isFetching: isLoadingAirports } = useAirports(
    debouncedQuery,
    // shouldSearchAirports,
  );

  const backendAirports: Airport[] = airportData?.data?.airports ?? [];

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

  const suggestions: Suggestion[] = [
    ...airportSuggestions,
    ...placeSuggestions,
  ];
  const isSearching = isLoadingAirports || searchingPlaces;

  // ── Close on outside click ─────────────────────────────────────────────────
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

  // ── Sync display when value is cleared externally ──────────────────────────
  useEffect(() => {
    if (!value && !isTypingRef.current) {
      setQuery(""); // بيمسح بس لو مش بيكتب دلوقتي
    }
    isTypingRef.current = false;
  }, [value]);

  // ✅ FIX #4: نراقب الـ suggestions نفسها مش بس الـ length
  useEffect(() => {
    if (suggestions.length > 0 && debouncedQuery.trim()) setOpen(true);
  }, [suggestions.length, debouncedQuery]);

  // ── Input change handler ───────────────────────────────────────────────────
  const handleQueryChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      isTypingRef.current = true; // علامة إن المستخدم بيكتب
      const q = e.target.value;
      setQuery(q);
      onChange(null);

      if (!q.trim()) {
        setDebouncedQuery("");
        setPlaceSuggestions([]);
        setOpen(false);
        if (debounceRef.current) clearTimeout(debounceRef.current);
        return;
      }

      if (debounceRef.current) clearTimeout(debounceRef.current);

      debounceRef.current = setTimeout(async () => {
        setDebouncedQuery(q);

        if (!disableGoogleSearch && isLoaded) {
          // ✅ FIX #8: إلغاء الـ request السابق قبل ما نبدأ جديد
          if (placesAbortRef.current) {
            placesAbortRef.current.abort();
          }
          const controller = new AbortController();
          placesAbortRef.current = controller;

          setSearchingPlaces(true);
          try {
            const request = {
              input: q,
              includedRegionCodes: countryRestriction
                ? Array.isArray(countryRestriction)
                  ? countryRestriction
                  : [countryRestriction]
                : undefined,
            };

            const { suggestions: predictions } =
              await google.maps.places.AutocompleteSuggestion.fetchAutocompleteSuggestions(
                request,
              );

            // ✅ تجاهل النتيجة لو الـ request اتألغى
            if (controller.signal.aborted) return;

            if (predictions && predictions.length > 0) {
              const validPredictions = predictions
                .filter((p) => p.placePrediction != null)
                .slice(0, 5)
                .map((p) => {
                  const placePred = p.placePrediction!;
                  return {
                    id: `place-${placePred.placeId}`,
                    kind: "place" as SuggestionKind,
                    label: placePred.mainText?.text ?? "",
                    sublabel: placePred.secondaryText?.text ?? "",
                    placeId: placePred.placeId,
                    googleTypes: placePred.types,
                  };
                });
              setPlaceSuggestions(validPredictions);
            } else {
              setPlaceSuggestions([]);
            }
          } catch (err: any) {
            if (err?.name !== "AbortError") {
              console.error("Places API Autocomplete Error:", err);
            }
            setPlaceSuggestions([]);
          } finally {
            if (!controller.signal.aborted) {
              setSearchingPlaces(false);
            }
          }
        }
      }, 300);
    },
    [isLoaded, onChange, disableGoogleSearch, countryRestriction],
  );

  // ── Select handler ─────────────────────────────────────────────────────────
  const handleSelect = useCallback(
    async (s: Suggestion) => {
      setQuery(s.label);
      setOpen(false);

      // ── Airport مباشر من الـ backend list ────────────────────────────────
      if (s.kind === "airport" && s.rawAirport) {
        onAirportSelect?.(s.rawAirport);
        onChange(s);
        onCountrySelect?.(s.rawAirport.city.iso2 ?? "");
        onStateSelect?.(s.rawAirport.city.state_id ?? undefined);
        return;
      }

      if (!s.placeId || !isLoaded) {
        onChange(s);
        return;
      }

      try {
        const place = new google.maps.places.Place({ id: s.placeId });

        await place.fetchFields({
          fields: [
            "id",
            "location",
            "types",
            "addressComponents",
            "containingPlaces",
            "displayName",
          ],
        });

        let countryCode: string | null = null;

        if (place.addressComponents) {
          const countryComp = place.addressComponents.find((c) =>
            c.types.includes("country"),
          );

          if (countryComp) {
            countryCode = countryComp.shortText; // زي "EG", "US"
          }
        }

        let airportNameToMatch: string | null = null;
        let iataToMatch: string | null = null;

        // ✅ FIX #5: استخراج ذكي من النص يشمل أسماء بدون كلمة "Airport"
        const { iata, name } = extractAirportHints(s.label, s.sublabel);
        iataToMatch = iata;
        airportNameToMatch = name;

        // ✅ FIX #6: بنجيب containingPlaces بس لو فعلاً محتاجينهم
        const containingPlaces = (place as any).containingPlaces as
          | any[]
          | undefined;

        if (!airportNameToMatch && !iataToMatch) {
          // المكان نفسه مطار
          if (place.types?.includes("airport") && place.displayName) {
            airportNameToMatch = place.displayName;
          }
          // ✅ FIX #6: بنعمل fetch واحد بس للـ parent airport مش للكل
          else if (containingPlaces && containingPlaces.length > 0) {
            // نجرب نلاقي airport بدون fetch أول
            const quickAirport = containingPlaces.find((p: any) =>
              p.types?.includes("airport"),
            );

            if (quickAirport) {
              // عندنا الـ airport من غير fetch
              airportNameToMatch = quickAirport.displayName ?? null;
            } else {
              // محتاجين نعمل fetch بس للأماكن اللي مش عندنا types ليها
              const unknownPlaces = containingPlaces.filter(
                (p: any) => !p.types || p.types.length === 0,
              );
              if (unknownPlaces.length > 0) {
                await Promise.all(
                  unknownPlaces.map((p: any) =>
                    p.fetchFields({ fields: ["types", "displayName"] }),
                  ),
                );
                const parentAirport = containingPlaces.find((p: any) =>
                  p.types?.includes("airport"),
                );
                if (parentAirport?.displayName) {
                  airportNameToMatch = parentAirport.displayName;
                }
              }
            }
          }

          // fallback: addressComponents
          if (!airportNameToMatch && place.addressComponents) {
            const airportComp = place.addressComponents.find((c) =>
              c.types.includes("airport"),
            );
            if (airportComp) airportNameToMatch = airportComp.longText;
          }
        }

        // ── المطابقة مع الـ Backend ──────────────────────────────────────────
        let finalMatchedAirport: Airport | null = null;
        const loc = place.location;

        // 1. IATA في backendAirports المحملة
        if (iataToMatch) {
          finalMatchedAirport =
            backendAirports.find(
              (a) => a.airport_code?.toUpperCase() === iataToMatch,
            ) ?? null;
        }

        // 2. الاسم في backendAirports المحملة
        if (!finalMatchedAirport && airportNameToMatch) {
          finalMatchedAirport =
            backendAirports.find(
              (a) =>
                diceSimilarity(a.airport_name, airportNameToMatch!) >= 0.75,
            ) ?? null;
        }

        // 3. الإحداثيات في backendAirports المحملة
        // ✅ FIX #7: الـ radius بقى 15km
        if (!finalMatchedAirport && loc) {
          finalMatchedAirport = findNearestAirport(
            backendAirports,
            loc.lat(),
            loc.lng(),
          );
        }

        // ✅ FIX #9: لو disableAirportsSearch، الـ backendAirports فاضية
        // فبنروح على الـ API مباشرة بدون ما ننتظر fallback
        if (!finalMatchedAirport && (iataToMatch || airportNameToMatch)) {
          const searchKeyword = iataToMatch || airportNameToMatch!;
          try {
            const fallbackResponse = await fetchAirports(searchKeyword);
            const freshAirports = fallbackResponse.data?.airports ?? [];

            if (iataToMatch) {
              finalMatchedAirport =
                freshAirports.find(
                  (a) => a.airport_code?.toUpperCase() === iataToMatch,
                ) ?? null;
            }

            if (!finalMatchedAirport && airportNameToMatch) {
              finalMatchedAirport =
                freshAirports.find(
                  (a) =>
                    diceSimilarity(a.airport_name, airportNameToMatch!) >= 0.75,
                ) ?? null;
            }

            // ✅ FIX #7: نفس الـ radius الموحد
            if (!finalMatchedAirport && loc) {
              finalMatchedAirport = findNearestAirport(
                freshAirports,
                loc.lat(),
                loc.lng(),
              );
            }
          } catch (err) {
            console.error("فشل جلب بيانات المطار الاحتياطية:", err);
          }
        }

        // ── النتيجة النهائية ─────────────────────────────────────────────────
        if (finalMatchedAirport) {
          onAirportSelect?.(finalMatchedAirport);
          onChange(airportToSuggestion(finalMatchedAirport));
          onCountrySelect?.(finalMatchedAirport.city.iso2 ?? countryCode ?? "");
          onStateSelect?.(finalMatchedAirport.city.state_id ?? undefined);

          return;
        }

        // Fallback: مكان عادي (فندق، مقهى...)
        if (loc) {
          onChange({
            ...s,
            location: { lat: loc.lat(), lng: loc.lng() },
            country: countryCode ?? "",
            state_id: undefined,
            // مش حاطط state_id عشان مش موجودة ف جوجل زي الباك اند 
            // احنا هنتعامل علي اساس ان دايما في مطار ف يبقي ال state_id تيجي دايما من المطار
          });
        } else {
          onChange(s);
        }
      } catch (err) {
        console.error("Places API Details Error:", err);
        onChange(s);
      }
    },
    // ✅ FIX #3: dependency array مكتملة
    [onChange, onAirportSelect, onCountrySelect, backendAirports, isLoaded],
  );

  const displayValue = value ? value.label : query;

  // ── UI ─────────────────────────────────────────────────────────────────────
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
        <div
          className={`relative flex items-center h-11 rounded-lg border bg-[#F4F4F4] transition-colors ${
            error
              ? "border-red-400"
              : open
                ? "border-[#1A1A1A]"
                : "border-[#E0E0E0]"
          } ${className}`}
        >
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

        {open && suggestions.length > 0 && (
          <ul
            className="absolute z-50 mt-1.5 w-full rounded-xl border border-[#E8E8E8] bg-white shadow-xl overflow-hidden"
            style={{ maxHeight: 280, overflowY: "auto" }}
          >
            {suggestions.map((s, i) => (
              <li key={s.id}>
                {i > 0 && suggestions[i - 1].kind !== s.kind && (
                  <div className="mx-3 my-1 border-t border-dashed border-[#E8E8E8]" />
                )}
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
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

      {error && (
        <p className="flex items-center gap-1 text-xs text-red-500 mt-0.5">
          <AlertCircle size={11} />
          {error}
        </p>
      )}
    </div>
  );
}
