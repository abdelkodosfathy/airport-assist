import { VipBookingData } from "@/components/BookingForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { apiPostFormData } from "@/lib/api";
import { useState } from "react";

type BookingFormData = {
  airport_id: string;
  package_slug: string;
  service_type: string;
  booking_timestamp: string;
  user_notes: string;
  adult_passengers: number;
  child_passengers: number;
  infant_passengers: number;
  number_of_bags: number;
  fast_track_enabled: boolean;
  wheelchair_assistance: boolean;
  additional_hours: number;
  "contact[first_name]": string;
  "contact[last_name]": string;
  "contact[phone]": string;
  "contact[email]": string;

  "flight[flight_number]": string;
  "flight[airline_id]": number;
  "flight[passenger_arrival_time]": string;

  "passenger[first_name]": string;
  "passenger[last_name]": string;
  "passenger[phone]": string;
  "passenger[email]": string;
  "passenger[birthdate]": string;
  "passenger[class]": "economy" | "business" | "first";
  "passenger[other_passengers]": string;

  "passenger[passengers_data_file]": File | null;
  "tickets_files[0]": File | null;
};

const BookingForm = ({ storedData }: { storedData: VipBookingData}) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<BookingFormData>({
    airport_id: storedData.airport_id,
    booking_timestamp: storedData.date,
    adult_passengers: storedData.adults,
    child_passengers: storedData.children,
    service_type: storedData.serviceType,

    package_slug: "elite",
    infant_passengers: 0,

    user_notes: "",
    number_of_bags: 0,
    fast_track_enabled: false,
    wheelchair_assistance: false,
    additional_hours: 0,

    "contact[first_name]": "",
    "contact[last_name]": "",
    "contact[phone]": "",
    "contact[email]": "",

    "flight[flight_number]": "",
    "flight[airline_id]": 0,
    "flight[passenger_arrival_time]": "",

    "passenger[first_name]": "",
    "passenger[last_name]": "",
    "passenger[phone]": "",
    "passenger[email]": "",
    "passenger[birthdate]": "",
    "passenger[class]": "economy",
    "passenger[other_passengers]": "",
    "passenger[passengers_data_file]": null,

    "tickets_files[0]": null,
  });

  const update = (path: string, value: any) => {
    setForm((prev) => ({
      ...prev,
      [path]: value,
    }));
  };

  const submit = async () => {
    try {
      setLoading(true);
      const formData = new FormData();

      // Append all form fields
      Object.entries(form).forEach(([key, value]) => {
        if (value !== null && value !== undefined && !(value instanceof File)) {
          formData.append(key, String(value));
        }
      });

      // Append file uploads
      if (pdfFile) {
        formData.append("passenger[passengers_data_file]", pdfFile);
      }

      if (imageFile) {
        formData.append("tickets_files[0]", imageFile);
      }

    // Debug: Log what's being sent
    //   console.log("FormData contents:");
    //   for (let pair of formData.entries()) {
    //     console.log(pair[0] + ": " + pair[1]);
    //   }

      // Submit to API - make sure NOT to set Content-Type header
      // (browser will set it automatically with boundary for multipart/form-data)
      const response = await apiPostFormData("/bookings", formData);

      console.log("Booking created successfully:", response);

      return response;
    } catch (error) {
      console.error("Booking submission failed:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  return (
        <form
          className="space-y-8 max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md"
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
        >
          {/* Booking */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold border-b pb-2">Booking</h2>

            <Textarea
              placeholder="Notes"
              className="w-full"
              onChange={(e) => update("user_notes", e.target.value)}
            />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Input
                type="number"
                placeholder="Bags"
                onChange={(e) => update("number_of_bags", +e.target.value)}
              />

              <div className="flex items-center space-x-2">
                <Input
                  type="checkbox"
                  className="w-4 h-4"
                  onChange={(e) =>
                    update("fast_track_enabled", e.target.checked ? 1 : 0)
                  }
                />
                <span>Fast Track</span>
              </div>

              <div className="flex items-center space-x-2">
                <Input
                  type="checkbox"
                  className="w-4 h-4"
                  onChange={(e) =>
                    update("wheelchair_assistance", e.target.checked ? 1 : 0)
                  }
                />
                <span>Wheelchair</span>
              </div>

              <Input
                type="number"
                placeholder="Additional hours"
                onChange={(e) => update("additional_hours", +e.target.value)}
              />
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold border-b pb-2">Contact</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                placeholder="First name"
                onChange={(e) => update("contact[first_name]", e.target.value)}
              />
              <Input
                placeholder="Last name"
                onChange={(e) => update("contact[last_name]", e.target.value)}
              />
              <Input
                placeholder="Phone"
                onChange={(e) => update("contact[phone]", e.target.value)}
              />
              <Input
                placeholder="Email"
                onChange={(e) => update("contact[email]", e.target.value)}
              />
            </div>
          </section>

          {/* Flight */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold border-b pb-2">Flight</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                placeholder="Flight number"
                onChange={(e) =>
                  update("flight[flight_number]", e.target.value)
                }
              />
              <Input
                type="number"
                placeholder="Airline ID"
                onChange={(e) => update("flight[airline_id]", +e.target.value)}
              />
              <Input
                type="datetime-local"
                onChange={(e) =>
                  update("flight[passenger_arrival_time]", e.target.value)
                }
              />
            </div>
          </section>

          {/* Passenger */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold border-b pb-2">Passenger</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                placeholder="First name"
                onChange={(e) =>
                  update("passenger[first_name]", e.target.value)
                }
              />
              <Input
                placeholder="Last name"
                onChange={(e) => update("passenger[last_name]", e.target.value)}
              />
              <Input
                placeholder="Phone"
                onChange={(e) => update("passenger[phone]", e.target.value)}
              />
              <Input
                placeholder="Email"
                onChange={(e) => update("passenger[email]", e.target.value)}
              />
              <Input
                type="date"
                onChange={(e) => update("passenger[birthdate]", e.target.value)}
              />
              <select
                className="border rounded-md p-2"
                onChange={(e) => update("passenger[class]", e.target.value)}
              >
                <option value="economy">Economy</option>
                <option value="business">Business</option>
                <option value="first">First</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 font-medium">Upload Image</label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Upload PDF</label>
              <Input
                type="file"
                accept="application/pdf"
                onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
              />
            </div>

            <Textarea
              placeholder="Other passengers (each on new line)"
              className="w-full"
              onChange={(e) =>
                update("passenger.other_passengers", e.target.value)
              }
            />
          </section>

          <Button type="submit" className="w-full md:w-auto">
            {loading ? "loading..." :"Submit"}
          </Button>
        </form>


  );
};

export default BookingForm;