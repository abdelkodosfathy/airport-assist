"use client";
import { OptionType } from "@/components/custom inputs/search";
import { createContext, useState, ReactNode } from "react";

// Define types for the booking data structure
export interface FlightInfo {
  airline_id?: string | null;
  flight_number?: string | null;
  passenger_arrival_time?: string | null;
  additional_hours?: string | null;
  // fast_track_enabled?: boolean;
  
  // for UI
  airline_name?: string | null;
}

export interface PassengerInfo {
  first_name?: string | null;
  last_name?: string | null;
  phone?: string | null;
  email?: string | null;
  birthdate?: string | null;
  class?: string | null;
  other_passengers?: string | null;
  passengers_data_file?: File | null;
  tickets_files?: File[] | null;
}

export interface BookingData {
  // URL params
  airport_id?: string | null;
  service_type?: string | null;
  booking_timestamp?: string | null;
  adult_passengers?: string | null;
  child_passengers?: string | null;
  inflant_passengers?: number;
  package_slug?: string | null;
  fast_track_enabled?: boolean;

  // Additional info
  user_notes?: string | null;
  number_of_bags?: string | null;
  wheelchair_assistance?: boolean;

  // Nested objects
  flight?: FlightInfo;
  passenger?: PassengerInfo;

  // Car type
  car_type_id?: string | null;
}

interface BookingContextType {
  bookingData: BookingData;
  updateBookingData: (data: Partial<BookingData>) => void;
  updateFlightInfo: (flight: Partial<FlightInfo>) => void;
  updatePassengerInfo: (passenger: Partial<PassengerInfo>) => void;
  resetBookingData: () => void;
  getBookingPayload: () => BookingData;
}

// Create the context
export const BookingContext = createContext<BookingContextType | undefined>(
  undefined,
);

// Initial state
const initialBookingData: BookingData = {
  inflant_passengers: 0,
  fast_track_enabled: false,
  wheelchair_assistance: false,
  flight: {},
  passenger: {},
};

// Provider component
export function BookingProvider({ children }: { children: ReactNode }) {
  const [bookingData, setBookingData] =
    useState<BookingData>(initialBookingData);

  // Update top-level booking data
  const updateBookingData = (data: Partial<BookingData>) => {
    setBookingData((prev) => ({
      ...prev,
      ...data,
    }));
  };

  // Update flight information
  const updateFlightInfo = (flight: Partial<FlightInfo>) => {
    setBookingData((prev) => ({
      ...prev,
      flight: {
        ...prev.flight,
        ...flight,
      },
    }));
  };

  // Update passenger information
  const updatePassengerInfo = (passenger: Partial<PassengerInfo>) => {
    setBookingData((prev) => ({
      ...prev,
      passenger: {
        ...prev.passenger,
        ...passenger,
      },
    }));
  };

  // Reset all booking data
  const resetBookingData = () => {
    setBookingData(initialBookingData);
  };

  // Get the complete booking payload
  const getBookingPayload = () => {
    return bookingData;
  };

  const value: BookingContextType = {
    bookingData,
    updateBookingData,
    updateFlightInfo,
    updatePassengerInfo,
    resetBookingData,
    getBookingPayload,
  };

  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  );
}
