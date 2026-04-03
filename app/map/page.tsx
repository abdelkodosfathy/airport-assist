// /**
//  * DistanceCalculator.tsx
//  *
//  * Prerequisites:
//  *  1. Install types: npm install @types/google.maps
//  *  2. Enable in Google Cloud Console:
//  *       - Maps JavaScript API
//  *       - Places API
//  *       - Distance Matrix API
//  *  3. Load the Maps script in your HTML / _document.tsx:
//  *     <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places"></script>
//  */

// import { useState, useRef, useEffect, useCallback } from "react";

// interface RouteResult {
//   distance: string;
//   duration: string;
//   origin: string;
//   destination: string;
// }

// type TravelMode = "DRIVING" | "WALKING" | "TRANSIT" | "BICYCLING";

// const TRAVEL_MODES: { label: string; value: TravelMode; icon: string }[] = [
//   { label: "Drive", value: "DRIVING", icon: "🚗" },
//   { label: "Walk", value: "WALKING", icon: "🚶" },
//   { label: "Transit", value: "TRANSIT", icon: "🚌" },
//   { label: "Bike", value: "BICYCLING", icon: "🚴" },
// ];

// export default function DistanceCalculator() {
//   const originRef = useRef<HTMLInputElement>(null);
//   const destinationRef = useRef<HTMLInputElement>(null);
//   const originAutocomplete = useRef<google.maps.places.Autocomplete | null>(null);
//   const destinationAutocomplete = useRef<google.maps.places.Autocomplete | null>(null);

//   const [travelMode, setTravelMode] = useState<TravelMode>("DRIVING");
//   const [result, setResult] = useState<RouteResult | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [mapsLoaded, setMapsLoaded] = useState(false);

//   // Poll until google.maps.places is available
//   useEffect(() => {
//     const check = () => {
//       if ((window as any).google?.maps?.places) {
//         setMapsLoaded(true);
//       } else {
//         setTimeout(check, 300);
//       }
//     };
//     check();
//   }, []);

//   // Attach Places Autocomplete once Maps is ready
//   useEffect(() => {
//     if (!mapsLoaded) return;
//     const opts = { types: ["geocode", "establishment"] };
//     if (originRef.current) {
//       originAutocomplete.current = new google.maps.places.Autocomplete(originRef.current, opts);
//     }
//     if (destinationRef.current) {
//       destinationAutocomplete.current = new google.maps.places.Autocomplete(
//         destinationRef.current,
//         opts
//       );
//     }
//   }, [mapsLoaded]);

//   const calculate = useCallback(() => {
//     const origin = originRef.current?.value.trim();
//     const destination = destinationRef.current?.value.trim();

//     if (!origin || !destination) {
//       setError("Please enter both an origin and a destination.");
//       return;
//     }
//     if (!(window as any).google?.maps) {
//       setError("Google Maps is not loaded. Please check your API key.");
//       return;
//     }

//     setLoading(true);
//     setError(null);
//     setResult(null);

//     const service = new google.maps.DistanceMatrixService();
//     service.getDistanceMatrix(
//       {
//         origins: [origin],
//         destinations: [destination],
//         travelMode: google.maps.TravelMode[travelMode],
//         unitSystem: google.maps.UnitSystem.METRIC,
//       },
//       (response, status) => {
//         setLoading(false);
//         if (status !== "OK" || !response) {
//           setError(`Request failed: ${status}`);
//           return;
//         }
//         const element = response.rows[0]?.elements[0];
//         if (!element || element.status !== "OK") {
//           setError(
//             element?.status === "ZERO_RESULTS"
//               ? "No route found between these locations."
//               : `Route error: ${element?.status ?? "UNKNOWN"}`
//           );
//           return;
//         }
//         setResult({
//           distance: element.distance.text,
//           duration: element.duration.text,
//           origin: response.originAddresses[0],
//           destination: response.destinationAddresses[0],
//         });
//       }
//     );
//   }, [travelMode]);

//   const clear = () => {
//     if (originRef.current) originRef.current.value = "";
//     if (destinationRef.current) destinationRef.current.value = "";
//     setResult(null);
//     setError(null);
//   };

//   const handleKeyDown = (e: React.KeyboardEvent) => {
//     if (e.key === "Enter") calculate();
//   };

//   return (
//     <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 font-mono">
//       {/* Subtle grid background */}
//       <div
//         className="fixed inset-0 opacity-[0.04] pointer-events-none"
//         style={{
//           backgroundImage:
//             "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
//           backgroundSize: "40px 40px",
//         }}
//       />

//       <div className="relative w-full max-w-lg">
//         {/* Header */}
//         <div className="mb-8 text-center">
//           <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full px-4 py-1.5 mb-4">
//             <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
//             <span className="text-emerald-400 text-xs tracking-widest uppercase">
//               Route Calculator
//             </span>
//           </div>
//           <h1 className="text-3xl font-bold text-white tracking-tight">
//             Distance &amp; Duration
//           </h1>
//           <p className="text-slate-500 text-sm mt-1">Powered by Google Maps</p>
//         </div>

//         {/* Card */}
//         <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
//           {/* Travel mode tabs */}
//           <div className="flex gap-2 mb-6">
//             {TRAVEL_MODES.map((mode) => (
//               <button
//                 key={mode.value}
//                 onClick={() => setTravelMode(mode.value)}
//                 className={`flex-1 flex flex-col items-center gap-1 py-2.5 rounded-xl border text-xs font-semibold transition-all duration-200 ${
//                   travelMode === mode.value
//                     ? "bg-emerald-500 border-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20 scale-105"
//                     : "bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600 hover:text-slate-300"
//                 }`}
//               >
//                 <span className="text-lg">{mode.icon}</span>
//                 {mode.label}
//               </button>
//             ))}
//           </div>

//           {/* Location inputs */}
//           <div className="space-y-1 mb-5">
//             {/* Origin */}
//             <div className="relative">
//               <span className="absolute left-3.5 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-900 z-10" />
//               <input
//                 ref={originRef}
//                 type="text"
//                 placeholder="Origin — city, address, landmark…"
//                 onKeyDown={handleKeyDown}
//                 className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-9 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 transition-all"
//               />
//             </div>

//             {/* Connector line */}
//             <div className="flex items-center gap-2 pl-[13px]">
//               <div className="w-px h-4 bg-slate-700 border-l border-dashed border-slate-600" />
//               <span className="text-slate-600 text-[10px] tracking-widest uppercase">to</span>
//             </div>

//             {/* Destination */}
//             <div className="relative">
//               <span className="absolute left-3.5 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-rose-400 border-2 border-slate-900 z-10" />
//               <input
//                 ref={destinationRef}
//                 type="text"
//                 placeholder="Destination — city, address, landmark…"
//                 onKeyDown={handleKeyDown}
//                 className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-9 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500/50 transition-all"
//               />
//             </div>
//           </div>

//           {/* Action buttons */}
//           <div className="flex gap-2">
//             <button
//               onClick={calculate}
//               disabled={loading}
//               className="flex-1 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 font-bold py-3 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-emerald-500/25 active:scale-95 text-sm tracking-wide"
//             >
//               {loading ? (
//                 <span className="flex items-center justify-center gap-2">
//                   <svg
//                     className="animate-spin w-4 h-4"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="3"
//                   >
//                     <circle cx="12" cy="12" r="10" strokeDasharray="60" strokeDashoffset="15" />
//                   </svg>
//                   Calculating…
//                 </span>
//               ) : (
//                 "Calculate Route"
//               )}
//             </button>
//             {(result || error) && (
//               <button
//                 onClick={clear}
//                 className="px-4 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-400 hover:text-white rounded-xl transition-all text-sm"
//               >
//                 Clear
//               </button>
//             )}
//           </div>

//           {/* Error state */}
//           {error && (
//             <div className="mt-4 bg-rose-500/10 border border-rose-500/30 rounded-xl px-4 py-3 text-rose-400 text-sm">
//               ⚠️ {error}
//             </div>
//           )}

//           {/* Result */}
//           {result && (
//             <div className="mt-5 bg-slate-800/60 border border-slate-700 rounded-xl p-4 space-y-4">
//               {/* Stat cards */}
//               <div className="grid grid-cols-2 gap-3">
//                 <div className="bg-slate-900 rounded-xl p-4 text-center border border-slate-700/50">
//                   <p className="text-slate-500 text-[10px] uppercase tracking-widest mb-1">
//                     Distance
//                   </p>
//                   <p className="text-2xl font-bold text-emerald-400">{result.distance}</p>
//                 </div>
//                 <div className="bg-slate-900 rounded-xl p-4 text-center border border-slate-700/50">
//                   <p className="text-slate-500 text-[10px] uppercase tracking-widest mb-1">
//                     Duration
//                   </p>
//                   <p className="text-2xl font-bold text-sky-400">{result.duration}</p>
//                 </div>
//               </div>

//               {/* Resolved addresses */}
//               <div className="space-y-2 border-t border-slate-700/50 pt-3">
//                 <div className="flex items-start gap-2 text-xs">
//                   <span className="w-2 h-2 rounded-full bg-emerald-400 mt-0.5 shrink-0" />
//                   <span className="text-slate-300">{result.origin}</span>
//                 </div>
//                 <div className="flex items-start gap-2 text-xs">
//                   <span className="w-2 h-2 rounded-full bg-rose-400 mt-0.5 shrink-0" />
//                   <span className="text-slate-300">{result.destination}</span>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         <p className="text-center text-slate-600 text-xs mt-4">
//           Requires Maps JS API · Places API · Distance Matrix API
//         </p>
//       </div>
//     </div>
//   );
// }
"use client";

/**
 * RouteMap.tsx — Next.js component
 *
 * Install:
 *   npm install @react-google-maps/api
 *
 * .env.local:
 *   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_key_here
 *
 * Enable in Google Cloud Console:
 *   - Maps JavaScript API
 *   - Places API
 *   - Directions API
 *   - Distance Matrix API
 */

import {
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
  InfoWindow,
  useJsApiLoader,
} from "@react-google-maps/api";
import { useEffect, useRef, useState, useCallback } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface RouteResult {
  distance: string;
  duration: string;
  originAddress: string;
  destinationAddress: string;
}

type TravelMode = "DRIVING" | "WALKING" | "TRANSIT" | "BICYCLING";

// ─── Constants ────────────────────────────────────────────────────────────────

const DEFAULT_CENTER = { lat: 51.4682501605486, lng: -0.4191509550266713 };
const LIBRARIES: "places"[] = ["places"];

const TRAVEL_MODES: { label: string; value: TravelMode; icon: string }[] = [
  { label: "Drive", value: "DRIVING", icon: "🚗" },
  { label: "Walk", value: "WALKING", icon: "🚶" },
  { label: "Transit", value: "TRANSIT", icon: "🚌" },
  { label: "Bike", value: "BICYCLING", icon: "🚴" },
];

const MAP_STYLES: google.maps.MapTypeStyle[] = [
  {
    featureType: "administrative",
    elementType: "all",
    stylers: [{ hue: "#000000" }, { lightness: -100 }, { visibility: "off" }],
  },
  {
    featureType: "landscape",
    elementType: "geometry",
    stylers: [
      { hue: "#dddddd" },
      { saturation: -100 },
      { lightness: -3 },
      { visibility: "on" },
    ],
  },
  {
    featureType: "landscape",
    elementType: "labels",
    stylers: [
      { hue: "#000000" },
      { saturation: -100 },
      { lightness: -100 },
      { visibility: "off" },
    ],
  },
  {
    featureType: "poi",
    elementType: "all",
    stylers: [
      { hue: "#000000" },
      { saturation: -100 },
      { lightness: -100 },
      { visibility: "off" },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [
      { hue: "#7B5A41" },
      { saturation: -100 },
      { lightness: 26 },
      { visibility: "on" },
    ],
  },
  {
    featureType: "road",
    elementType: "labels",
    stylers: [{ hue: "#7B5A41" }, { saturation: 100 }, { visibility: "on" }],
  },
  {
    featureType: "road.local",
    elementType: "all",
    stylers: [
      { hue: "#ffffff" },
      { saturation: -100 },
      { lightness: 100 },
      { visibility: "on" },
    ],
  },
  {
    featureType: "transit",
    elementType: "labels",
    stylers: [{ hue: "#000000" }, { lightness: -100 }, { visibility: "off" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      { hue: "#ffffff" },
      { saturation: -100 },
      { lightness: 100 },
      { visibility: "on" },
    ],
  },
  {
    featureType: "water",
    elementType: "labels",
    stylers: [
      { hue: "#000000" },
      { saturation: -100 },
      { lightness: -100 },
      { visibility: "off" },
    ],
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function haversineDistance(
  a: google.maps.LatLngLiteral,
  b: google.maps.LatLngLiteral,
): string {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((a.lat * Math.PI) / 180) *
      Math.cos((b.lat * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return (R * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h))).toFixed(2);
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function RouteMap({ className }: { className?: string }) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: LIBRARIES,
  });

  // Map instance
  const [map, setMap] = useState<google.maps.Map | null>(null);

  // Pin coordinates
  const [origin, setOrigin] = useState<google.maps.LatLngLiteral | null>(null);
  const [destination, setDestination] =
    useState<google.maps.LatLngLiteral | null>(null);

  // Autocomplete refs
  const originAutoRef = useRef<google.maps.places.Autocomplete | null>(null);
  const destAutoRef = useRef<google.maps.places.Autocomplete | null>(null);

  // Input refs (to read typed values)
  const originInputRef = useRef<HTMLInputElement | null>(null);
  const destInputRef = useRef<HTMLInputElement | null>(null);

  // Route state
  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);
  const [result, setResult] = useState<RouteResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Travel mode
  const [travelMode, setTravelMode] = useState<TravelMode>("DRIVING");

  // Info window
  const [selectedMarker, setSelectedMarker] = useState<
    "origin" | "destination" | null
  >(null);

  // ── Fly-to helper ─────────────────────────────────────────────────────────
  const flyTo = (point: google.maps.LatLngLiteral | null, zoom = 15) => {
    if (!map || !point) return;
    map.panTo(point);
    setTimeout(() => map.setZoom(zoom), 300);
  };

  // ── Calculate directions + distance matrix ────────────────────────────────
  const calculateRoute = useCallback(
    async (org: google.maps.LatLngLiteral, dst: google.maps.LatLngLiteral) => {
      setLoading(true);
      setError(null);

      try {
        // Directions (for the polyline on the map)
        const dirService = new google.maps.DirectionsService();
        const dirResult = await dirService.route({
          origin: org,
          destination: dst,
          travelMode: google.maps.TravelMode[travelMode],
        });
        setDirections(dirResult);

        // Distance Matrix (for distance + duration text)
        const matrixService = new google.maps.DistanceMatrixService();
        matrixService.getDistanceMatrix(
          {
            origins: [org],
            destinations: [dst],
            travelMode: google.maps.TravelMode[travelMode],
            unitSystem: google.maps.UnitSystem.METRIC,
          },
          (response, status) => {
            setLoading(false);
            if (status !== "OK" || !response) {
              setError(`Distance Matrix failed: ${status}`);
              return;
            }
            const el = response.rows[0]?.elements[0];
            if (!el || el.status !== "OK") {
              setError(
                el?.status === "ZERO_RESULTS"
                  ? "No route found between these locations."
                  : `Route error: ${el?.status ?? "UNKNOWN"}`,
              );
              return;
            }
            setResult({
              distance: el.distance.text,
              duration: el.duration.text,
              originAddress: response.originAddresses[0],
              destinationAddress: response.destinationAddresses[0],
            });
          },
        );
      } catch (err: any) {
        setLoading(false);
        setError(err?.message ?? "Failed to calculate route.");
      }
    },
    [travelMode],
  );

  // Re-run whenever either pin or travel mode changes
  useEffect(() => {
    if (origin && destination) {
      calculateRoute(origin, destination);
    }
  }, [origin, destination, travelMode]);

  // ── Map click: place A then B ──────────────────────────────────────────────
  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    if (!e.latLng) return;
    const point = e.latLng.toJSON();
    if (!origin) setOrigin(point);
    else if (!destination) setDestination(point);
  };

  // ── Origin autocomplete selected ──────────────────────────────────────────
  const onOriginPlaceChanged = () => {
    const place = originAutoRef.current?.getPlace();
    if (!place?.geometry?.location) return;
    const loc = place.geometry.location.toJSON();
    setOrigin(loc);
    flyTo(loc);
  };

  // ── Destination autocomplete selected ─────────────────────────────────────
  const onDestPlaceChanged = () => {
    const place = destAutoRef.current?.getPlace();
    if (!place?.geometry?.location) return;
    const loc = place.geometry.location.toJSON();
    setDestination(loc);
    flyTo(loc);
  };

  // ── Reset ─────────────────────────────────────────────────────────────────
  const handleReset = () => {
    setOrigin(null);
    setDestination(null);
    setDirections(null);
    setResult(null);
    setError(null);
    setSelectedMarker(null);
    if (originInputRef.current) originInputRef.current.value = "";
    if (destInputRef.current) destInputRef.current.value = "";
  };

  // ── Loading skeleton ───────────────────────────────────────────────────────
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <svg
            className="animate-spin w-8 h-8 text-emerald-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              strokeDasharray="60"
              strokeDashoffset="15"
            />
          </svg>
          <p className="text-slate-500 text-sm font-mono">
            Loading Google Maps…
          </p>
        </div>
      </div>
    );
  }

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div
      className={`min-h-screen bg-slate-950 p-4 md:p-6 font-mono ${className ?? ""}`}
    >
      {/* Background grid */}
      <div
        className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative max-w-5xl mx-auto space-y-4">
        {/* ── Header ── */}
        <div className="flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full px-3 py-1 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-400 text-[10px] tracking-widest uppercase">
                Route Calculator
              </span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Distance &amp; Duration
            </h1>
          </div>
          <p className="text-slate-600 text-xs hidden md:block">
            Powered by Google Maps
          </p>
        </div>

        <div className="grid md:grid-cols-[380px_1fr] gap-4 items-start">
          {/* ── Left panel ── */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-2xl space-y-5">
            {/* Travel mode */}
            <div className="grid grid-cols-4 gap-1.5">
              {TRAVEL_MODES.map((mode) => (
                <button
                  key={mode.value}
                  onClick={() => setTravelMode(mode.value)}
                  className={`flex flex-col items-center gap-1 py-2 rounded-xl border text-[11px] font-semibold transition-all duration-200 ${
                    travelMode === mode.value
                      ? "bg-emerald-500 border-emerald-400 text-slate-950 shadow-md shadow-emerald-500/20 scale-105"
                      : "bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600 hover:text-slate-300"
                  }`}
                >
                  <span className="text-base">{mode.icon}</span>
                  {mode.label}
                </button>
              ))}
            </div>

            {/* Inputs */}
            <div className="space-y-1">
              {/* Origin */}
              <Autocomplete
                onLoad={(a) => (originAutoRef.current = a)}
                onPlaceChanged={onOriginPlaceChanged}
              >
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-900 z-10" />
                  <input
                    ref={originInputRef}
                    type="text"
                    placeholder="Origin — city, address…"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-8 pr-3 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/40 transition-all"
                  />
                </div>
              </Autocomplete>

              {/* Connector */}
              <div className="flex items-center gap-1.5 pl-[9px]">
                <div className="w-px h-3 border-l border-dashed border-slate-600" />
                <span className="text-slate-600 text-[9px] tracking-widest uppercase">
                  to
                </span>
              </div>

              {/* Destination */}
              <Autocomplete
                onLoad={(a) => (destAutoRef.current = a)}
                onPlaceChanged={onDestPlaceChanged}
              >
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-rose-400 border-2 border-slate-900 z-10" />
                  <input
                    ref={destInputRef}
                    type="text"
                    placeholder="Destination — city, address…"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-8 pr-3 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500/40 transition-all"
                  />
                </div>
              </Autocomplete>
            </div>

            {/* Pin navigation + reset */}
            <div className="grid grid-cols-5 gap-2">
              <button
                onClick={() => flyTo(origin)}
                disabled={!origin}
                className="col-span-2 py-2 rounded-xl border border-slate-700 bg-slate-800 text-slate-300 text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:border-emerald-500/60 hover:text-emerald-400 transition-all"
              >
                📍 Point A
              </button>
              <button
                onClick={() => flyTo(destination)}
                disabled={!destination}
                className="col-span-2 py-2 rounded-xl border border-slate-700 bg-slate-800 text-slate-300 text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:border-rose-500/60 hover:text-rose-400 transition-all"
              >
                📍 Point B
              </button>
              <button
                onClick={handleReset}
                disabled={!origin && !destination}
                className="col-span-1 py-2 rounded-xl border border-slate-700 bg-slate-800 text-slate-500 text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:border-slate-500 hover:text-slate-300 transition-all"
              >
                ↺
              </button>
            </div>

            {/* Hint */}
            {!origin && !destination && (
              <p className="text-slate-600 text-xs text-center leading-relaxed">
                Search using the inputs above, or
                <br />
                click directly on the map to place pins.
              </p>
            )}

            {/* Error */}
            {error && (
              <div className="bg-rose-500/10 border border-rose-500/30 rounded-xl px-3 py-2.5 text-rose-400 text-xs">
                ⚠️ {error}
              </div>
            )}

            {/* Loading */}
            {loading && (
              <div className="flex items-center gap-2 text-slate-500 text-xs justify-center py-1">
                <svg
                  className="animate-spin w-3.5 h-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    strokeDasharray="60"
                    strokeDashoffset="15"
                  />
                </svg>
                Calculating route…
              </div>
            )}

            {/* Result */}
            {result && !loading && (
              <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-4 space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-slate-900 rounded-xl p-3 text-center border border-slate-700/50">
                    <p className="text-slate-500 text-[9px] uppercase tracking-widest mb-1">
                      Distance
                    </p>
                    <p className="text-xl font-bold text-emerald-400">
                      {result.distance}
                    </p>
                  </div>
                  <div className="bg-slate-900 rounded-xl p-3 text-center border border-slate-700/50">
                    <p className="text-slate-500 text-[9px] uppercase tracking-widest mb-1">
                      Duration
                    </p>
                    <p className="text-xl font-bold text-sky-400">
                      {result.duration}
                    </p>
                  </div>
                </div>

                <div className="space-y-1.5 border-t border-slate-700/50 pt-3">
                  <div className="flex items-start gap-2 text-[11px]">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 mt-0.5 shrink-0" />
                    <span className="text-slate-400">
                      {result.originAddress}
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-[11px]">
                    <span className="w-2 h-2 rounded-full bg-rose-400 mt-0.5 shrink-0" />
                    <span className="text-slate-400">
                      {result.destinationAddress}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ── Map ── */}
          <div className="h-[520px] md:h-[620px] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
            <GoogleMap
              center={DEFAULT_CENTER}
              zoom={13}
              mapContainerStyle={{ width: "100%", height: "100%" }}
              onLoad={(m) => setMap(m)}
              onClick={handleMapClick}
              options={{
                styles: MAP_STYLES,
                fullscreenControl: false,
                disableDefaultUI: true,
                scrollwheel: true,
                zoomControl: true,
                clickableIcons: false,
              }}
            >
              {/* Origin marker */}
              {origin && (
                <>
                  <Marker
                    position={origin}
                    label={{
                      text: "A",
                      color: "#fff",
                      fontWeight: "bold",
                      fontSize: "11px",
                    }}
                    draggable
                    onDragEnd={(e) => e.latLng && setOrigin(e.latLng.toJSON())}
                    onClick={() => setSelectedMarker("origin")}
                  />
                  {selectedMarker === "origin" && (
                    <InfoWindow
                      position={origin}
                      onCloseClick={() => setSelectedMarker(null)}
                    >
                      <div className="p-1.5 text-xs space-y-1 min-w-[140px]">
                        <p className="font-bold text-sm">Point A</p>
                        <p>
                          <strong>Lat:</strong> {origin.lat.toFixed(6)}
                        </p>
                        <p>
                          <strong>Lng:</strong> {origin.lng.toFixed(6)}
                        </p>
                        {destination && (
                          <p>
                            <strong>Straight-line:</strong>{" "}
                            {haversineDistance(origin, destination)} km
                          </p>
                        )}
                      </div>
                    </InfoWindow>
                  )}
                </>
              )}

              {/* Destination marker */}
              {destination && (
                <>
                  <Marker
                    position={destination}
                    label={{
                      text: "B",
                      color: "#fff",
                      fontWeight: "bold",
                      fontSize: "11px",
                    }}
                    draggable
                    onDragEnd={(e) =>
                      e.latLng && setDestination(e.latLng.toJSON())
                    }
                    onClick={() => setSelectedMarker("destination")}
                  />
                  {selectedMarker === "destination" && (
                    <InfoWindow
                      position={destination}
                      onCloseClick={() => setSelectedMarker(null)}
                    >
                      <div className="p-1.5 text-xs space-y-1 min-w-[140px]">
                        <p className="font-bold text-sm">Point B</p>
                        <p>
                          <strong>Lat:</strong> {destination.lat.toFixed(6)}
                        </p>
                        <p>
                          <strong>Lng:</strong> {destination.lng.toFixed(6)}
                        </p>
                        {origin && (
                          <p>
                            <strong>Straight-line:</strong>{" "}
                            {haversineDistance(origin, destination)} km
                          </p>
                        )}
                      </div>
                    </InfoWindow>
                  )}
                </>
              )}

              {/* Route polyline */}
              {directions && (
                <DirectionsRenderer
                  directions={directions}
                  options={{
                    suppressMarkers: true,
                    polylineOptions: {
                      strokeColor: "#10b981",
                      strokeWeight: 5,
                      strokeOpacity: 0.85,
                    },
                  }}
                />
              )}
            </GoogleMap>
          </div>
        </div>

        <p className="text-center text-slate-700 text-[10px] pb-2">
          Maps JS API · Places API · Directions API · Distance Matrix API
        </p>
      </div>
    </div>
  );
}
