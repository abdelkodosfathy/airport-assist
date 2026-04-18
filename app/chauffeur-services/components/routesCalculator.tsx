"use client";

import { useJsApiLoader } from "@react-google-maps/api";
import { useEffect } from "react";
import Distance from "@/components/custom icons/distance";
import { Clock12, Plane, Loader2, AlertCircle } from "lucide-react";
import { useAirportStore } from "@/store/vipInputsStore";
import { useTripErrors } from "@/store/tripErrorsStore";
import { LocationInput } from "./LoactionInputs";
import { usePickupPointsStore } from "@/store/pickupPointsStore";
import { useTripStore } from "@/store/tripStore";
import { useShallow } from "zustand/react/shallow";

const KM_TO_MI = 0.621371;
const LIBRARIES: "places"[] = ["places"];

export default function PickUpPoints() {
  const tripType = useTripStore((state) => state.tripType);

  const storeAirport = useAirportStore((state) => state.setAirport);
  const clearError = useTripErrors((state) => state.clearError);
  const {
    pickup,
    dropoff,
    distanceKm,
    distanceMi,
    duration,
    loadingDist,
    distanceError,

    setPickup,
    setDropoff,
    setDistanceKm,
    setDistanceMi,
    setDuration,
    setLoadingDist,
    setDistanceError,
  } = usePickupPointsStore(
    useShallow((s) => ({
      pickup: s.pickup,
      dropoff: s.dropoff,
      distanceKm: s.distanceKm,
      distanceMi: s.distanceMi,
      duration: s.duration,
      loadingDist: s.loadingDist,
      distanceError: s.distanceError,

      setPickup: s.setPickup,
      setDropoff: s.setDropoff,
      setDistanceKm: s.setDistanceKm,
      setDistanceMi: s.setDistanceMi,
      setDuration: s.setDuration,
      setLoadingDist: s.setLoadingDist,
      setDistanceError: s.setDistanceError,
    })),
  );

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: LIBRARIES,
  });

  const hasAirport = pickup?.kind === "airport" || dropoff?.kind === "airport";
  const showAirportWarning = pickup !== null && dropoff !== null && !hasAirport;

  useEffect(() => {
    if (!isLoaded || !pickup?.location || !dropoff?.location) return;

    setLoadingDist(true);
    setDistanceKm(null);
    setDistanceMi(null);
    setDuration(null);
    setDistanceError(null);

    const service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: [pickup.location],
        destinations: [dropoff.location],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC,
      },
      (response, status) => {
        setLoadingDist(false);

        if (status !== "OK" || !response) {
          setDistanceError("Failed to calculate distance. Please try again.");
          return;
        }

        const el = response.rows[0]?.elements[0];

        if (!el || el.status !== "OK") {
          const errorMessages: Record<string, string> = {
            NOT_FOUND: "One or more locations could not be found.",
            ZERO_RESULTS: "No route found between the selected locations.",
            MAX_WAYPOINTS_EXCEEDED: "Too many waypoints provided.",
            INVALID_REQUEST: "Invalid request. Please check the locations.",
            REQUEST_DENIED: "Distance request was denied.",
            OVER_DAILY_LIMIT: "API limit exceeded. Please try again later.",
            OVER_QUERY_LIMIT: "Too many requests. Please try again later.",
            UNKNOWN_ERROR: "An unknown error occurred. Please try again.",
          };
          setDistanceError(
            errorMessages[el?.status ?? "UNKNOWN_ERROR"] ??
              "Could not calculate distance.",
          );
          return;
        }

        const km = el.distance.value / 1000;
        const mi = km * KM_TO_MI;
        const minutes = Math.round(el.duration.value / 60);

        setDistanceKm(
          km < 1 ? `${el.distance.value} m` : `${km.toFixed(1)} km`,
        );
        setDistanceMi(`${mi.toFixed(1)} mi`);
        setDuration(`${minutes} mins`);
      },
    );
  }, [pickup?.location, dropoff?.location, isLoaded]);

  return (
    <div className="col-span-1 md:col-span-2 space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-[#1A1A1A]">Pickup</h3>

        {loadingDist && (
          <p className="text-xs text-[#ACACAC] flex items-center gap-1.5">
            <Loader2 size={12} className="animate-spin" />
            Calculating…
          </p>
        )}

        {distanceError && !loadingDist && (
          <p className="text-xs text-red-500 flex items-center gap-1.5">
            <AlertCircle size={12} />
            {distanceError}
          </p>
        )}

        {distanceKm && !loadingDist && !distanceError && (
          <div className="flex gap-4 px-3 py-1.5 border border-[#E0E0E0] rounded-lg bg-[#FAFAFA]">
            <p className="flex items-center gap-1.5 text-sm text-[#1A1A1A]">
              <Distance />
              <span>
                {distanceKm} / {distanceMi}
              </span>
            </p>
            <p className="flex items-center gap-1.5 text-sm text-[#1A1A1A]">
              <Clock12 size={14} color="#747474" />
              <span>{duration}</span>
            </p>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-4">
        <LocationInput
          // i used gb for the backend: airport.city.iso2 --- but we use uk for google api
          countryRestriction={["uk", "gb", "fr"]} // you can use it for many countries or remove it to unlock the search
          // countryRestriction="uk" //jsut remove it to unlock the search outside the uk

          onCountrySelect={(country) => console.log(country)}
          label="From"
          disableGoogleSearch={tripType === "hourly"}
          placeholder={
            tripType === "hourly"
              ? "Search for airport…"
              : "Search origin location or airport…"
          }
          value={pickup}
          onChange={(s) => {
            // console.log(s?.country);
            setPickup(s);
            clearError("from");
          }}
          onAirportSelect={(e) => {
            storeAirport(e);
          }}
          isLoaded={isLoaded}
        />
        {tripType === "one-way" ? (
          <div>
            <div className="flex items-center gap-2 px-1">
              <div className="flex-1 border-t border-dashed border-[#E0E0E0]" />
              <div className="w-5 h-5 rounded-full border border-[#E0E0E0] bg-white flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-[#ACACAC]" />
              </div>
              <div className="flex-1 border-t border-dashed border-[#E0E0E0]" />
            </div>
            <LocationInput
              label="To"
              className="pt-0"
              placeholder="Search drop-off location or airport…"
              value={dropoff}
              onChange={(s) => {
                setDropoff(s);
                clearError("dropOff");
              }}
              onAirportSelect={storeAirport}
              isLoaded={isLoaded}
            />
          </div>
        ) : null}
      </div>

      {showAirportWarning && tripType === "one-way" && (
        <div className="flex items-start gap-2 px-3.5 py-3 rounded-lg border border-amber-200 bg-amber-50 text-amber-800">
          <AlertCircle size={15} className="mt-0.5 flex-shrink-0" />
          <p className="text-xs leading-relaxed">
            <strong>At least one location must be an airport.</strong> Please
            select an airport result (
            <Plane size={10} className="inline -mt-0.5" />) for either the
            pickup or drop-off.
          </p>
        </div>
      )}
    </div>
  );
}
