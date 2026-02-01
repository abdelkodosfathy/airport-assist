import { useState, useCallback } from 'react';

export interface BookingFormData {
  // Booking
  airport_id?: number;
  service_type?: string;
  booking_timestamp?: string;
  adult_passengers?: number;
  child_passengers?: number;
  infant_passengers?: number;
  package_slug?: string;
  user_notes?: string;
  number_of_bags?: number;
  fast_track_enabled?: number;
  wheelchair_assistance?: number;
  additional_hours?: number;
  car_type_id?: number;
  
  // Contact
  contact?: {
    first_name?: string;
    last_name?: string;
    phone?: string;
    email?: string;
  };
  
  // Flight
  flight?: {
    flight_number?: string;
    airline_id?: number;
    passenger_arrival_time?: string;
  };
  
  // Flight 2
  flight_2?: {
    flight_number?: string;
    airline_id?: number;
    passenger_arrival_time?: string;
  };
  
  // Passenger
  passenger?: {
    first_name?: string;
    last_name?: string;
    phone?: string;
    email?: string;
    birthdate?: string;
    class?: string;
    other_passengers?: string;
  };
}

export const useBookingForm = () => {
  const [formData, setFormData] = useState<BookingFormData>({});

  const setValue = useCallback((key: string, value: any) => {
    setFormData((prev) => {
      // Handle nested objects (contact, flight, flight_2, passenger)
      if (key.includes('.')) {
        const [parent, child] = key.split('.');
        return {
          ...prev,
          [parent]: {
            ...(prev[parent as keyof BookingFormData] as object || {}),
            [child]: value,
          },
        };
      }
      
      // Handle top-level properties
      return {
        ...prev,
        [key]: value,
      };
    });
  }, []);

  const getValue = useCallback((key: string) => {
    if (key.includes('.')) {
      const [parent, child] = key.split('.');
      return (formData[parent as keyof BookingFormData] as any)?.[child];
    }
    return formData[key as keyof BookingFormData];
  }, [formData]);

  const resetForm = useCallback(() => {
    setFormData({});
  }, []);

  const getFormattedData = useCallback(() => {
    return formData;
  }, [formData]);

  return {
    formData,
    setValue,
    getValue,
    resetForm,
    getFormattedData,
  };
};