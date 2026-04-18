import { useEffect, useState } from "react";
import { Airport } from "@/lib/types/airport";

type Result = {
  airport: Airport | null;
  loading: boolean;
  error: string | null;
};

export function useResolveAirport(
  placeId: string | null,
  backendAirports: Airport[]
): Result {
  const [airport, setAirport] = useState<Airport | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!placeId || !backendAirports.length) return;

    let cancelled = false;

    const run = async () => {
      try {
        setLoading(true);
        setError(null);

        const service = new google.maps.places.PlacesService(
          document.createElement("div")
        );

        // 1️⃣ Get place details (to get location)
        const place = await new Promise<google.maps.places.PlaceResult | null>(
          (resolve) => {
            service.getDetails(
              {
                placeId,
                fields: ["geometry", "name"],
              },
              (res, status) => {
                if (
                  status === google.maps.places.PlacesServiceStatus.OK &&
                  res
                ) {
                  resolve(res);
                } else {
                  resolve(null);
                }
              }
            );
          }
        );

        if (!place?.geometry?.location) {
          throw new Error("No location found");
        }

        const location = place.geometry.location;

        // 2️⃣ Find nearest airport
        const airportPlace =
          await new Promise<google.maps.places.PlaceResult | null>(
            (resolve) => {
              service.nearbySearch(
                {
                  location,
                  radius: 3000,
                  type: "airport",
                },
                (results, status) => {
                  if (
                    status === google.maps.places.PlacesServiceStatus.OK &&
                    results &&
                    results.length > 0
                  ) {
                    resolve(results[0]); // closest airport
                  } else {
                    resolve(null);
                  }
                }
              );
            }
          );

        if (!airportPlace?.name) {
          throw new Error("No airport found nearby");
        }

        const normalize = (str: string) =>
          str.toLowerCase().replace(/[^a-z0-9]/g, "");

        const matched = backendAirports.find((a) =>
          normalize(airportPlace.name!).includes(
            normalize(a.airport_name)
          )
        );

        if (!cancelled) {
          setAirport(matched ?? null);
        }
      } catch (err: any) {
        if (!cancelled) {
          setError(err.message || "Failed to resolve airport");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    run();

    return () => {
      cancelled = true;
    };
  }, [placeId, backendAirports]);

  return { airport, loading, error };
}