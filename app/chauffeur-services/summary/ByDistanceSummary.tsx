// ByDistanceSummary.tsx
import { TripSummary } from "@/types/trip";
import { Calendar, Clock10, MapPin, Flag, Gauge } from "lucide-react";

interface Props {
  data: TripSummary;
}

export default function ByDistanceSummary({ data }: Props) {
  return (
    <div
      className="px-10 py-6 w-full bg-white rounded-2xl"
      style={{ boxShadow: "0px 11.48px 114.76px 0px #A7A7A73D" }}
    >
      <h2 className="text-[18.75px] mb-4 font-semibold">One Way Transfer</h2>

      <div className="space-y-6 *:hover:bg-gray-100">
        <p className="flex justify-between">
          <span className="flex-1 flex gap-2">
            <Calendar color="#7B5A41" />
            {new Date(data.trip_start_time).toLocaleDateString()}
          </span>
          <span className="flex-1 flex gap-2">
            <Clock10 color="#7B5A41" />
            {new Date(data.trip_start_time).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </p>

        <p className="flex justify-between">
          <span className="flex-1 flex gap-2">
            <MapPin color="#7B5A41" />
            {data.pickup_location_title}
          </span>
        </p>

        <p className="flex justify-between">
          <span className="flex-1 flex gap-2">
            <Flag color="#7B5A41" />
            {data.dropoff_location_title}
          </span>
        </p>

        <p className="flex justify-between">
          <span className="flex-1 flex gap-2">
            <Gauge color="#7B5A41" />
            {(data.distance_mile * 1.60934).toFixed(2)} km /{" "}
            {data.distance_mile.toFixed(2)} mi
          </span>
          <span className="flex-1 flex gap-2">
            <Clock10 color="#7B5A41" />
            {data.duration_minutes} min
          </span>
        </p>
      </div>
    </div>
  );
}