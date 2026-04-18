import { apiPostFormData } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { useBillingStore } from "@/store/billingDataStore";
import { useAirportPackageStore } from "@/store/packageStore";
import { usePrimaryPassengerStore } from "@/store/primaryPassengerStore";
import { useAdditionalServicesStore } from "@/store/useAdditionalServices";
import { useFlightFormStore } from "@/store/useFlightFormStore";
import { useState } from "react";
import {
  useChauffeurDestinationStore,
  useDateStore,
  usePassengersStore,
  useServiceStore,
  useSingleAirportStore,
} from "@/store/vipInputsStore";
import { useRouter } from "next/navigation";
import CarsSection from "../components/cars-section";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useCarStore } from "@/store/chauffeurStore";
import { toast } from "sonner";

interface SubmitButtonProps {
  isElitePackage?: boolean;
}

const SubmitButton = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showCarsSection, setShowCarsSection] = useState(false);

  const selectedPackage = useAirportPackageStore((s) => s.airportPackage);
  const isElitePackage = selectedPackage?.package.package_slug === "elite" || selectedPackage?.package.package_slug === "signature";

  function formatDateToISO(dateStr?: string): string {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const airport_id = useSingleAirportStore((s) => s.singleAirport?.airport_id);
  const airportLat = useSingleAirportStore(
    (s) => s.singleAirport?.location_lat,
  );
  const airportLng = useSingleAirportStore(
    (s) => s.singleAirport?.location_long,
  );
  const package_slug = useAirportPackageStore(
    (s) => s.airportPackage?.package.package_slug,
  );
  const service_type = useServiceStore((s) => s.serviceType);
  const bookingDate = useDateStore((s) => s.bookingDate);
  const booking_timestamp = `${formatDateToISO(bookingDate?.date ?? "")} ${bookingDate?.time}`;

  const user_notes = useAdditionalServicesStore(
    (s) => s.additionalRequirements,
  );
  const adult_passengers = usePassengersStore((s) => s.adults);
  const child_passengers = usePassengersStore((s) => s.children);
  const infant_passengers = 0;
  const number_of_bags = usePrimaryPassengerStore((s) => s.numberOfBags);
  const fast_track_enabled = useFlightFormStore((s) => s.fastTrack);
  const wheelchair_assistance = useAdditionalServicesStore((s) => s.wheelchair);
  const additional_hours = useFlightFormStore((s) =>
    Math.max(Number(s.serviceDuration?.value) - 2, 0),
  );

  const contact_first_name = useBillingStore((s) => s.firstName);
  const contact_last_name = useBillingStore((s) => s.lastName);
  const contact_phone = useBillingStore((s) => s.phone);
  const contact_email = useBillingStore((s) => s.email);

  const flight_number = useFlightFormStore((s) => s.flightNumber);
  const airline_id = useFlightFormStore((s) => Number(s.airline?.airline_id));
  const passenger_arrival_time = useFlightFormStore(
    (s) => s.arrivalTime?.value,
  );

  // connection-specific
  const arrivalFlightNumber = useFlightFormStore((s) => s.arrivalFlightNumber);
  const arrivalAirlineId = useFlightFormStore((s) =>
    Number(s.arrivalAirline?.airline_id),
  );
  const departureFlightNumber = useFlightFormStore(
    (s) => s.departureFlightNumber,
  );
  const departureAirlineId = useFlightFormStore((s) =>
    Number(s.departureAirline?.airline_id),
  );

  const withTrip = useChauffeurDestinationStore((s) => s.withTrip);
  const passenger_first_name = usePrimaryPassengerStore((s) => s.firstName);
  const passenger_last_name = usePrimaryPassengerStore((s) => s.lastName);
  const passenger_phone = usePrimaryPassengerStore((s) => s.phone);
  const passenger_email = usePrimaryPassengerStore((s) => s.email);
  const passenger_birthdate = usePrimaryPassengerStore((s) => s.dateOfBirth);
  const passenger_class = usePrimaryPassengerStore(
    (s) => s.classOfTravel?.value,
  );
  const other_passengers = usePrimaryPassengerStore(
    (s) => s.otherPassengersInfo,
  );
  const passengers_data_file = useAdditionalServicesStore(
    (s) => s.passengerFile,
  );
  const tickets_file = useAdditionalServicesStore((s) => s.imageFile);

  const from = useChauffeurDestinationStore((s) => s.destination);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const formData = new FormData();

      // Flat fields
      formData.append("airport_id", String(airport_id ?? ""));
      formData.append("package_slug", String(package_slug ?? ""));
      formData.append("service_type", String(service_type ?? ""));
      formData.append("booking_timestamp", booking_timestamp);
      formData.append("user_notes", String(user_notes ?? ""));
      formData.append("adult_passengers", String(adult_passengers ?? 0));
      formData.append("child_passengers", String(child_passengers ?? 0));
      formData.append("infant_passengers", String(infant_passengers));
      formData.append("number_of_bags", String(number_of_bags ?? 0));
      formData.append("fast_track_enabled", String(fast_track_enabled ? 1 : 0));
      formData.append(
        "wheelchair_assistance",
        String(wheelchair_assistance ? 1 : 0),
      );
      // if (additional_hours ?? 0 > 0) {
      //   formData.append("additional_hours", String(additional_hours));
      // } else {
      //   formData.append("additional_hours", String(0));
      // }

      // const hours = Math.max(additional_hours ?? 0, 0);
      
      const parsed = Number(additional_hours);
      const hours = Number.isFinite(parsed) ? Math.max(parsed, 0) : 0;
      console.log(hours);
      
      formData.append("additional_hours", String(hours));

      if (withTrip || package_slug === "elite_plus") {
        formData.append("with_trip", "1");
        formData.append("trip_type", "by_distance");
        formData.append("car_type_id", String(selectedCar?.car_type_id));

        const isArrival = service_type === "arrival";

        // Pickup
        formData.append(
          "pickup_location[lat]",
          String(isArrival ? airportLat : from?.location?.lat),
        );
        formData.append(
          "pickup_location[long]",
          String(isArrival ? airportLng : from?.location?.lng),
        );

        // Dropoff
        formData.append(
          "dropoff_location[lat]",
          String(isArrival ? from?.location?.lat : airportLat),
        );
        formData.append(
          "dropoff_location[long]",
          String(isArrival ? from?.location?.lng : airportLng),
        );

        formData.append("trip_start_time", booking_timestamp);
        formData.append("is_airport_trip", "1");
        formData.append(
          "airport_trip_direction",
          isArrival ? "from_airport" : "to_airport",
        );
      }

      // Contact (nested bracket notation)
      formData.append("contact[first_name]", String(contact_first_name ?? ""));
      formData.append("contact[last_name]", String(contact_last_name ?? ""));
      formData.append("contact[phone]", String(contact_phone ?? ""));
      formData.append("contact[email]", String(contact_email ?? ""));

      // Flight
      if (service_type === "connection") {
        formData.append(
          "flight[flight_number]",
          String(arrivalFlightNumber ?? ""),
        );
        formData.append("flight[airline_id]", String(arrivalAirlineId ?? 0));
        formData.append(
          "flight[passenger_arrival_time]",
          String(passenger_arrival_time ?? ""),
        );

        formData.append(
          "flight_2[flight_number]",
          String(departureFlightNumber ?? ""),
        );
        formData.append(
          "flight_2[airline_id]",
          String(departureAirlineId ?? 0),
        );
      } else {
        formData.append("flight[flight_number]", String(flight_number ?? ""));
        formData.append("flight[airline_id]", String(airline_id ?? 0));
        formData.append(
          "flight[passenger_arrival_time]",
          String(passenger_arrival_time ?? ""),
        );
      }

      // Passenger
      formData.append(
        "passenger[first_name]",
        String(passenger_first_name ?? ""),
      );
      formData.append(
        "passenger[last_name]",
        String(passenger_last_name ?? ""),
      );
      formData.append("passenger[phone]", String(passenger_phone ?? ""));
      formData.append("passenger[email]", String(passenger_email ?? ""));
      formData.append(
        "passenger[birthdate]",
        String(passenger_birthdate ?? ""),
      );
      formData.append("passenger[class]", String(passenger_class ?? "economy"));
      formData.append(
        "passenger[other_passengers]",
        String(other_passengers ?? ""),
      );

      // File uploads
      if (passengers_data_file instanceof File) {
        formData.append(
          "passenger[passengers_data_file]",
          passengers_data_file,
        );
      } else {
        // formData.append("passenger[passengers_data_file]", new Blob([]), "");
      }
      if (tickets_file instanceof File) {
        formData.append("tickets_files[0]", tickets_file);
      } else {
        // formData.append("tickets_files[0]", new Blob([]), "");
      }

      for (const [key, value] of formData.entries()) {
        console.log(key, value);
      }
      const response = await apiPostFormData("/bookings", formData);
      console.log(response);
      
      if (response.status === 200) {
        router.replace(
          `/vip-meet-and-greet/summry?uuid=${response.data.booking_uuid}`,
        );
        console.log("Booking created successfully:", response);
      }
      return response;
    } catch (error) {
      const err = error as { data?: { error?: string } };
      if (err.data?.error) {
        toast.error(err.data.error, { position: "top-center" });
      }

      console.error("Booking submission failedssssss:", error);
      
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const destination = useChauffeurDestinationStore((s) => s.destination);
  const selectedCar = useCarStore((s) => s.car);

  const handleValidateChauffuer = async () => {
    if (destination && selectedCar?.car_type_id) {
      handleSubmit();
    } else {
      toast.error("please add chauffeur first");
    }
  };

  const selectedChauffuerBefore = selectedPackage?.package.package_slug !== "elite_plus" && selectedCar;

  // إذا المستخدم اختار نعم، اعرض CarsSection
  if (showCarsSection || selectedChauffuerBefore ) {
  const disableSubmit = loading || !selectedCar?.car_type_id || !destination
    return (
      <>
        <CarsSection isAdditional onCancel={() => setShowCarsSection(false)} />
        <div className="flex justify-between">
          {/* <Button
            type="button"
            onClick={() => {
              setShowCarsSection(false);
            }}
            disabled={loading}
            variant="outline"
            className="px-6 cursor-pointer border-black text-black hover:border-[#664F31] hover:bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)] hover:text-white duration-0"
          >
            <p className="text-lg font-normal font-[Manrope]">Back</p>
          </Button> */}
          <Button
            type="button"
            onClick={handleValidateChauffuer}
            disabled={disableSubmit}
            variant="outline"
            className="w-max cursor-pointer border-black text-black hover:border-[#664F31] hover:bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)] hover:text-white duration-0"
          >
            <p className="text-lg font-normal font-[Manrope]">
              {loading ? "Submitting..." : "Proceed To Checkout"}
            </p>
          </Button>
        </div>
      </>
    );
  }

  const handleButtonClick = () => {
    if (isElitePackage) {
      setIsModalOpen(true);
    } else {
      handleSubmit();
    }
  };

  const handleYes = () => {
    setShowCarsSection(true);
    setIsModalOpen(false);
  };

  const handleNo = () => {
    setIsModalOpen(false);
    handleSubmit();
  };

  return (
    <>
      <Button
        type="button"
        onClick={handleButtonClick}
        disabled={loading}
        variant="outline"
        className="w-max cursor-pointer border-black text-black hover:border-[#664F31] hover:bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)] hover:text-white duration-0"
      >
        <p className="text-lg font-normal font-[Manrope]">
          {loading ? "Submitting..." : "Proceed To Checkout"}
        </p>
      </Button>

      {/* Modal Dialog - فقط للـ Elite Package */}
      {isElitePackage && (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-xl font-[Manrope] font-semibold">
                Add Chauffeur Service?
              </DialogTitle>
              <DialogDescription className="text-base font-[Manrope]">
                Would you like to add a professional chauffeur service to your
                elite package?
              </DialogDescription>
            </DialogHeader>

            <div className="py-4">
              <p className="text-sm text-gray-600 font-[Manrope]">
                This service includes a dedicated driver for your journey,
                ensuring comfort and convenience.
              </p>
            </div>

            <DialogFooter className="flex gap-3 justify-end">
              <Button
                type="button"
                onClick={handleNo}
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                <p className="font-[Manrope]">No, Thanks</p>
              </Button>
              <Button
                type="button"
                onClick={handleYes}
                className="bg-[#664F31] hover:bg-[#5a4428] text-white"
              >
                <p className="font-[Manrope]">Yes, Please</p>
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default SubmitButton;
