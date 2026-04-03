import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useTripStore } from "@/store/tripStore";
import { useFlightStore } from "@/store/useFlightStore";
import {
  useAirportStore,
  useDateStore,
  useServiceStore,
} from "@/store/vipInputsStore";
import { useRouter } from "next/navigation";
import { useTripErrors } from "@/store/tripErrorsStore";
import { memo } from "react";
import { usePickupPointsStore } from "@/store/pickupPointsStore";
import { apiPost } from "@/lib/api";
const removeSpaces = (text: string) => {
  return text.replace(/\s+/g, "");
};
const SubmitButton = () => {
  const router = useRouter();
  const setTripErrors = useTripErrors((state) => state.setErrors);

  function formatDateToAPI(dateStr: string) {
    const date = new Date(dateStr);
    const pad = (n: number) => n.toString().padStart(2, "0");
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
  }

  const from = usePickupPointsStore((s) => s.pickup);
  const dropOff = usePickupPointsStore((s) => s.dropoff);

  const handleSubmit = async () => {
    // ✅ getState — قراءة لحظية بدون subscription
    const { car, tripType, hours, firstName, lastName, email, phone } =
      useTripStore.getState();
    const { airline: airlineId, flightNumber } = useFlightStore.getState();
    const { serviceType } = useServiceStore.getState();
    const { bookingDate: date } = useDateStore.getState();
    const { airport } = useAirportStore.getState();

    const tripApiType = tripType === "one-way" ? "by_distance" : "by_hour";
    const tripDate = `${date?.date} ${date?.time}`;

    // ─── Validation ───────────────────────────────────────────────
    // const tripErrors = {
    //   from: !from,
    //   dropOff: !dropOff && tripApiType !== "by_hour",
    //   date: !date?.date || !date?.time,
    //   airline: !airlineId && tripApiType !== "by_hour",
    //   flightNumber: !flightNumber && tripApiType !== "by_hour",
    //   firstName: !firstName.trim(),
    //   lastName: !lastName.trim(),
    //   email: !email.trim(),
    //   phone: !phone.trim(),
    // };
    type ValidationKey =
      | "from"
      | "dropOff"
      | "car"
      | "date"
      | "airline"
      | "flightNumber"
      | "firstName"
      | "lastName"
      | "email"
      | "phone";
    const validations = [
      {
        key: "from",
        condition: !from,
        message: "Please select pickup location",
      },
      {
        key: "dropOff",
        condition: !dropOff && tripApiType !== "by_hour",
        message: "Please select drop-off location",
      },
      {
        key: "car",
        condition: !car,
        message: "Please select a car",
      },
      {
        key: "date",
        condition: !date?.date || !date?.time,
        message: "Please select date and time",
      },
      {
        key: "airline",
        condition: !airlineId && tripApiType !== "by_hour",
        message: "Please select airline",
      },
      {
        key: "flightNumber",
        condition: !flightNumber && tripApiType !== "by_hour",
        message: "Please enter flight number",
      },
      {
        key: "firstName",
        condition: !firstName.trim(),
        message: "Please enter first name",
      },
      {
        key: "lastName",
        condition: !lastName.trim(),
        message: "Please enter last name",
      },
      { key: "email", condition: !email.trim(), message: "Please enter email" },
      {
        key: "phone",
        condition: !phone.trim(),
        message: "Please enter phone number",
      },
    ];
    const tripErrors = Object.fromEntries(
      validations.map((v) => [v.key, v.condition]),
    );
    setTripErrors(tripErrors);
    // const isValid = ![...Object.values(tripErrors)].some(Boolean);
    // console.log(tripErrors);
    const firstError = validations.find((v) => v.condition);

    if (firstError) {
      toast.error(firstError.message, { position: "top-center" });
      setTripErrors(tripErrors);
      return;
    }
    // if (!isValid) return;

    // ─── Build Payload ────────────────────────────────────────────
    const formData = new FormData();

    formData.append("trip_type", tripApiType);
    formData.append("car_type_id", String(car?.car_type_id));
    formData.append("trip_start_time", formatDateToAPI(tripDate));

    formData.append(
      "pickup_location[lat]",
      String(from?.location?.lat),
    );
    formData.append(
      "pickup_location[long]",
      String(from?.location?.lng),
    );

    if (tripApiType === "by_hour") {
      formData.append("hours_count", String(hours));
      formData.append("dropoff_location[lat]", String(from?.location?.lat)); // مؤقتا علي ما الباك يشيل منها الريكوايرد
      formData.append("dropoff_location[long]", String(from?.location?.lng)); // مؤقتا علي ما الباك يشيل منها الريكوايرد
    } else {
      formData.append("dropoff_location[lat]", String(dropOff?.location?.lat));
      formData.append("dropoff_location[long]", String(dropOff?.location?.lng));
      formData.append("flight[airline_id]", String(airlineId?.value));
      formData.append(
        "flight[flight_number]",
        removeSpaces(String(flightNumber)),
      );
    }

    formData.append("contact[first_name]", firstName);
    formData.append("contact[last_name]", lastName);
    formData.append("contact[phone]", phone);
    formData.append("contact[email]", email);

    formData.append("is_airport_trip", "1");
    formData.append(
      "airport_trip_direction",
      serviceType === "departure" ? "to_airport" : "from_airport",
    );
    formData.append("airport_id", String(airport?.airport_id));

    // ─── API Call ─────────────────────────────────────────────────
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    try {
      const res = await apiPost("/trips", {}, { body: formData });
      const data = res.data;

      if (res.status === 200) {
        router.push(`/chauffeur-services/summary?uuid=${data.trip_uuid}`);
        return;
      }

      if (data.error) {
        toast.error("Something went wrong", {
          position: "top-center",
          description: data.error,
        });
      }
    } catch (e) {
      console.log(e);

      toast.error("Something went wrong", {
        position: "top-center",
        description: "Please try again later.",
      });
    }
  };

  return (
    <Button
      variant="outline"
      onClick={handleSubmit}
      className="w-max px-8 cursor-pointer border-[#D1D1D1] text-[#7A7A7A] bg-[#ECECEC] hover:border-[#664F31] hover:bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)] hover:text-white duration-0"
    >
      Continue
    </Button>
  );
};

export default memo(SubmitButton);
