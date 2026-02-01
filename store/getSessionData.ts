import { FlightInfo } from "@/app/meet-and-greet/flight-information/components/FlightForm";
import { PrimaryPassenger } from "@/app/meet-and-greet/flight-information/components/PrimaryPassengerForm";
import { VipBookingData } from "@/components/BookingForm";

type SessionData = {
  flightInfo: FlightInfo | null;
  billingAddress: any | null;
  billingInfo: any | null;
  primaryPassenger: PrimaryPassenger | null;
  selected_car_type_id: number | null;
  vipBooking: VipBookingData | null;
  vipSelectedPackage: string | null;
  user_notes?: string;
};

export function getFromSession(): SessionData {
  const safeParse = (key: string) => {
    try {
      const value = sessionStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch {
      return null;
    }
  };

  return {
    flightInfo: safeParse("flightInfo"),
    billingInfo: safeParse("billingInfo"),
    billingAddress: safeParse("billingAddress"),
    primaryPassenger: safeParse("primaryPassenger"),
    selected_car_type_id: (() => {
      const value = sessionStorage.getItem("selected_car_type_id");
      return value ? Number(value) : null;
    })(),
    vipBooking: safeParse("vipBooking"),
    vipSelectedPackage: sessionStorage.getItem("vipSelectedPackage"),
  };
}
