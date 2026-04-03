"use client";

/**
 * RouteCalculator.tsx — Next.js component
 *
 * Install:  npm install @react-google-maps/api
 *
 * .env.local:
 *   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_key_here
 *
 * Enable in Google Cloud Console:
 *   - Maps JavaScript API
 *   - Places API
 *   - Distance Matrix API
 */

import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import { useRef, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface RouteResult {
  distanceKm: string;
  distanceMi: string;
  duration: string;
  originAddress: string;
  destinationAddress: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const LIBRARIES: "places"[] = ["places"];
const KM_TO_MI = 0.621371;

// ─── Component ────────────────────────────────────────────────────────────────

export default function RouteCalculator({ className }: { className?: string }) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: LIBRARIES,
  });

  const originAutoRef = useRef<google.maps.places.Autocomplete | null>(null);
  const destAutoRef = useRef<google.maps.places.Autocomplete | null>(null);
  const originInputRef = useRef<HTMLInputElement | null>(null);
  const destInputRef = useRef<HTMLInputElement | null>(null);

  const [originPlace, setOriginPlace] =
    useState<google.maps.LatLngLiteral | null>(null);
  const [destinationPlace, setDestPlace] =
    useState<google.maps.LatLngLiteral | null>(null);
  const [result, setResult] = useState<RouteResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // ── Autocomplete handlers ──────────────────────────────────────────────────

  const onOriginChanged = () => {
    const place = originAutoRef.current?.getPlace();
    if (place?.geometry?.location) {
      setOriginPlace(place.geometry.location.toJSON());
      setResult(null);
      setError(null);
    }
  };

  const onDestChanged = () => {
    const place = destAutoRef.current?.getPlace();
    if (place?.geometry?.location) {
      setDestPlace(place.geometry.location.toJSON());
      setResult(null);
      setError(null);
    }
  };

  // ── Calculate ──────────────────────────────────────────────────────────────

  const calculate = () => {
    if (!originPlace || !destinationPlace) {
      setError("Please select both a pickup and a drop-off location.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    const service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: [originPlace],
        destinations: [destinationPlace],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC,
      },
      (response, status) => {
        setLoading(false);

        if (status !== "OK" || !response) {
          setError(`Request failed: ${status}`);
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

        const rawKm = el.distance.value / 1000; // metres → km
        const rawMi = rawKm * KM_TO_MI;

        setResult({
          distanceKm:
            rawKm < 1 ? `${el.distance.value} m` : `${rawKm.toFixed(1)} km`,
          distanceMi: `${rawMi.toFixed(1)} mi`,
          duration: el.duration.text,
          originAddress: response.originAddresses[0],
          destinationAddress: response.destinationAddresses[0],
        });
      },
    );
  };

  // ── Reset ──────────────────────────────────────────────────────────────────

  const reset = () => {
    if (originInputRef.current) originInputRef.current.value = "";
    if (destInputRef.current) destInputRef.current.value = "";
    setOriginPlace(null);
    setDestPlace(null);
    setResult(null);
    setError(null);
  };

  // ── Loading state ──────────────────────────────────────────────────────────

  if (!isLoaded) {
    return (
      <div
        className={`flex items-center justify-center p-10 ${className ?? ""}`}
      >
        <div className="flex items-center gap-3 text-slate-500">
          <svg
            className="animate-spin w-5 h-5"
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
          <span className="text-sm font-mono">Loading…</span>
        </div>
      </div>
    );
  }

  // ── Render ─────────────────────────────────────────────────────────────────

  const canCalculate = !!originPlace && !!destinationPlace;

  return (
    <div className={`w-full max-w-md mx-auto ${className ?? ""}`}>
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-5 font-mono">
        {/* Header */}
        <div>
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full px-3 py-1 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-400 text-[10px] tracking-widest uppercase">
              Route Estimator
            </span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Distance &amp; Time
          </h2>
          <p className="text-slate-500 text-xs mt-0.5">
            Select pickup and drop-off to get an estimate
          </p>
        </div>

        {/* Inputs */}
        <div className="space-y-1">
          {/* From */}
          <Autocomplete
            onLoad={(a) => (originAutoRef.current = a)}
            onPlaceChanged={onOriginChanged}
          >
            <div className="relative group">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 flex flex-col items-center z-10">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-900" />
              </div>
              <input
                ref={originInputRef}
                type="text"
                placeholder="Pickup location"
                className="w-full bg-slate-800 border border-slate-700 group-focus-within:border-emerald-500 rounded-xl pl-9 pr-10 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/40 transition-all"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 text-[10px] uppercase tracking-widest font-bold">
                From
              </span>
            </div>
          </Autocomplete>

          {/* Dashed connector */}
          <div className="flex items-center gap-2 pl-[13px] py-0.5">
            <div className="flex flex-col gap-[3px]">
              <span className="w-px h-1 bg-slate-700 self-center" />
              <span className="w-px h-1 bg-slate-600 self-center" />
              <span className="w-px h-1 bg-slate-700 self-center" />
            </div>
            <span className="text-slate-700 text-[9px] uppercase tracking-widest">
              route
            </span>
          </div>

          {/* To */}
          <Autocomplete
            onLoad={(a) => (destAutoRef.current = a)}
            onPlaceChanged={onDestChanged}
          >
            <div className="relative group">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 z-10">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-400 border-2 border-slate-900 block" />
              </div>
              <input
                ref={destInputRef}
                type="text"
                placeholder="Drop-off location"
                className="w-full bg-slate-800 border border-slate-700 group-focus-within:border-rose-500 rounded-xl pl-9 pr-14 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-rose-500/40 transition-all"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 text-[10px] uppercase tracking-widest font-bold">
                Drop off
              </span>
            </div>
          </Autocomplete>
        </div>

        {/* Action */}
        <div className="flex gap-2">
          <button
            onClick={calculate}
            disabled={loading || !canCalculate}
            className="flex-1 bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed text-slate-950 font-bold py-3 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-emerald-500/20 active:scale-95 text-sm tracking-wide"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin w-4 h-4"
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
                Calculating…
              </span>
            ) : (
              "Get Estimate"
            )}
          </button>

          {(result || error || originPlace || destinationPlace) && (
            <button
              onClick={reset}
              className="px-4 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-400 hover:text-white rounded-xl transition-all text-sm"
              title="Clear"
            >
              ↺
            </button>
          )}
        </div>

        {/* Error */}
        {error && (
          <div className="bg-rose-500/10 border border-rose-500/30 rounded-xl px-4 py-3 text-rose-400 text-xs">
            ⚠️ {error}
          </div>
        )}

        {/* Result */}
        {result && (
          <div className="space-y-3 pt-1">
            {/* Stats */}
            <div className="grid grid-cols-3 gap-2">
              {/* km */}
              <div className="bg-slate-800 border border-slate-700/60 rounded-xl p-3 text-center">
                <p className="text-slate-500 text-[9px] uppercase tracking-widest mb-1">
                  Distance
                </p>
                <p className="text-lg font-bold text-emerald-400 leading-tight">
                  {result.distanceKm}
                </p>
              </div>
              {/* miles */}
              <div className="bg-slate-800 border border-slate-700/60 rounded-xl p-3 text-center">
                <p className="text-slate-500 text-[9px] uppercase tracking-widest mb-1">
                  Distance
                </p>
                <p className="text-lg font-bold text-amber-400 leading-tight">
                  {result.distanceMi}
                </p>
              </div>
              {/* time */}
              <div className="bg-slate-800 border border-slate-700/60 rounded-xl p-3 text-center">
                <p className="text-slate-500 text-[9px] uppercase tracking-widest mb-1">
                  Duration
                </p>
                <p className="text-lg font-bold text-sky-400 leading-tight">
                  {result.duration}
                </p>
              </div>
            </div>

            {/* Resolved addresses */}
            <div className="bg-slate-800/40 border border-slate-700/40 rounded-xl p-3 space-y-2">
              <div className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 mt-1 shrink-0" />
                <div>
                  <p className="text-[9px] text-slate-500 uppercase tracking-widest">
                    Pickup
                  </p>
                  <p className="text-xs text-slate-300 leading-snug">
                    {result.originAddress}
                  </p>
                </div>
              </div>
              <div className="border-t border-slate-700/40" />
              <div className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-rose-400 mt-1 shrink-0" />
                <div>
                  <p className="text-[9px] text-slate-500 uppercase tracking-widest">
                    Drop-off
                  </p>
                  <p className="text-xs text-slate-300 leading-snug">
                    {result.destinationAddress}
                  </p>
                </div>
              </div>
            </div>

            <p className="text-slate-700 text-[10px] text-center">
              Driving estimate via Google Maps Distance Matrix
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
