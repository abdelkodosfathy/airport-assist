// ByHourSummary.tsx
import { TripSummary } from "@/types/trip";
import { Calendar, Clock10, MapPin } from "lucide-react";

interface Props {
  data: TripSummary;
}

export default function ByHourSummary({ data }: Props) {
  return (
    <div
      className="px-10 py-6 w-full bg-white rounded-2xl"
      style={{ boxShadow: "0px 11.48px 114.76px 0px #A7A7A73D" }}
    >
      <h2 className="text-[18.75px] mb-4 font-semibold">Hourly Trip</h2>

      <div className="space-y-6">
        {/* Main Trip */}
        <div className="space-y-3">
          <p className="text-sm font-semibold text-[#7B5A41]">Main Trip</p>

          <p className="flex justify-between hover:bg-gray-100">
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
              {" - "}
              {new Date(data.trip_end_time).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </p>

          <p className="flex hover:bg-gray-100">
            <span className="flex-1 flex gap-2">
              <MapPin color="#7B5A41" />
              {data.pickup_location_title}
            </span>
          </p>

          <p className="flex hover:bg-gray-100">
            <span className="flex-1 flex gap-2">
              <Clock10 color="#7B5A41" />
              {data.hours_count} {data.hours_count === 1 ? "Hour" : "Hours"}
            </span>
            <span className="flex-1 flex gap-2">
              {data.number_of_passengers}{" "}
              {data.number_of_passengers === 1 ? "Passenger" : "Passengers"}
            </span>
          </p>
        </div>

        {/* Other Trips */}
        {data.other_trips?.length > 0 && (
          <>
            <hr className="border-gray-100" />
            <p className="text-sm font-semibold text-[#7B5A41]">
              Additional Trips ({data.other_trips.length})
            </p>

            <div className="space-y-3">
              {data.other_trips.map((t) => (
                <p
                  key={t.id}
                  className="flex justify-between hover:bg-gray-100 py-1"
                >
                  <span className="flex gap-2 text-sm text-[#4A5565]">
                    <Calendar color="#7B5A41" size={16} />
                    {new Date(t.trip_timestamp).toLocaleDateString()}
                  </span>
                  <span className="flex gap-2 text-sm text-[#4A5565]">
                    <Clock10 color="#7B5A41" size={16} />
                    {new Date(t.trip_timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                  <span className="flex gap-2 text-sm text-[#4A5565]">
                    {t.hours_count} {t.hours_count === 1 ? "hr" : "hrs"}
                  </span>
                </p>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
