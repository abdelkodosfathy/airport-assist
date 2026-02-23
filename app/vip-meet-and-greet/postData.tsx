import { apiPostFormData } from "@/lib/api";
import { toast } from "sonner";
import { BillingSectionRef } from "./components/billing-section";
import { FlightSectionData } from "./components/flight-section";

export const postBillingData = async (
  billingRef: React.RefObject<BillingSectionRef>,
  slug: string,
  getFlightData: () => FlightSectionData | null,
  onSuccess: (uuid: string) => void, // callback تستقبل البيانات
  onEnd: () => void, // callback تستقبل البيانات
) => {
  if (!billingRef.current) return;

  // 1️⃣ Validate billing info
  const isValid = billingRef.current.isValid();
  if (!isValid) {
    toast.error("Please fill required billing data", {
      position: "top-center",
    });
    return;
  }

  // 2️⃣ Get flight data
  const flightData = getFlightData();
  if (!flightData) {
    toast.error("Flight data is missing", { position: "top-center" });
    return;
  }

  const billingData = billingRef.current.getData();
  const { info, address } = billingData;
  const {
    flightFormData,
    primaryPassengerData,
    carsSectionData,
    uploadFilesData,
  } = flightData;

  const stored = sessionStorage.getItem("vipBooking");
  const sessionData = stored ? JSON.parse(stored) : null;

  if (!sessionData) {
    toast.error("Booking session data is missing");
    return;
  }

  try {
    const formData = new FormData();

    // Basic booking info
    formData.append("package_slug", slug);
    formData.append("service_type", sessionData.serviceType || "arrival");
    formData.append(
      "booking_timestamp",
      sessionData.date || new Date().toISOString(),
    );
    formData.append("airport_id", sessionData.airport_id || "0");
    formData.append("adult_passengers", sessionData.adults?.toString() || "0");
    formData.append(
      "child_passengers",
      sessionData.children?.toString() || "0",
    );
    formData.append(
      "infant_passengers",
      sessionData.infants?.toString() || "0",
    );

    // 4️⃣ Contact info (billing)
    formData.append("contact[first_name]", info.firstName);
    formData.append("contact[last_name]", info.lastName);
    formData.append("contact[email]", info.email);
    formData.append("contact[phone]", info.phone);

    // 5️⃣ Billing address
    formData.append("billing[address]", address.address);
    formData.append("billing[city]", address.city);
    formData.append("billing[country]", address.country);
    formData.append("billing[postcode]", address.postcode);

    // 6️⃣ Flight info
    formData.append("flight[flight_number]", flightFormData.flightNumber);
    formData.append(
      "flight[airline_id]",
      flightFormData.selectedAirline?.value?.toString() ?? "0",
    );

    formData.append(
      "flight[passenger_arrival_time]",
      flightFormData.arrivalTime?.value ?? "",
    );

    formData.append(
      "fast_track_enabled",
      flightFormData.fastTrackChecked ? "1" : "0",
    );

    // 7️⃣ Passenger info
    formData.append("passenger[first_name]", primaryPassengerData.firstName);
    formData.append("passenger[last_name]", primaryPassengerData.lastName);
    formData.append("passenger[email]", primaryPassengerData.email);
    formData.append("passenger[phone]", primaryPassengerData.phone);
    formData.append(
      "passenger[birthdate]",
      String(primaryPassengerData.dateOfBirth),
    );
    formData.append(
      "passenger[class]",
      String(primaryPassengerData.travelClass),
    );
    formData.append(
      "passenger[other_passengers]",
      primaryPassengerData.otherPassengersInfo || "",
    );
    formData.append(
      "number_of_bags",
      primaryPassengerData.numberOfBags.toString(),
    );

    // 8️⃣ Extras
    formData.append(
      "wheelchair_assistance",
      uploadFilesData.wheelchair ? "1" : "0",
    );
    formData.append("additional_hours", "0"); // عدد ساعات منيمام ساعتين وساعتها تبقي بزيرو
    // 9️⃣ Files
    if (uploadFilesData.passengerFile) {
      formData.append(
        "passenger[passengers_data_file]",
        uploadFilesData.passengerFile,
      );
    }
    if (uploadFilesData.imageFile) {
      formData.append("tickets_files[0]", uploadFilesData.imageFile);
    }

    // 10️⃣ Cars section
    formData.append("carsSectionData", carsSectionData.toString());

    // 11️⃣ Submit
    const response = await apiPostFormData("/bookings", formData);

    if (response.status === 200) {
      // ✅ تحقق من وجود onSuccess قبل استدعائها
      onSuccess(response.data.booking_uuid);
    }

    // console.log("Booking created successfully:", response);

    toast.success("Booking submitted successfully", { position: "top-center" });
    return response;
  } catch (error: unknown) {
    console.error("Booking submission failed:", error);

    let errMsg = "Booking submission failed";

    if (error && typeof error === "object") {
      // Narrowing to any so we can access data safely
      const errObj = error as any;

      if (errObj.data && typeof errObj.data === "object") {
        if ("error" in errObj.data && errObj.data.error) {
          errMsg = String(errObj.data.error);
        }
      } else if ("message" in errObj && errObj.message) {
        errMsg = String(errObj.message);
      }
    }

    toast.error(errMsg, { position: "top-center" });

    throw error;
  } finally {
    onEnd();
  }
};

