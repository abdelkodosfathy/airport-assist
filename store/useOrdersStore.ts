import { BookingStatus } from "@/lib/types/booking";
import { create } from "zustand";

export interface BookingOrder {
  booking_id: number;
  booking_uuid: string;
  package_id: number;
  total: number;
  booking_status: BookingStatus;
  display_booking_status: string;
  created_at: string;
  updated_at: string;

  package: {
    package_id: number;
    service_type: string;
    package_name: string;
    package_description: string;
    package_slug: string;
    status: boolean;
    display_service_type: string;
  };

  airport: any | null;
  payment_method: any | null;
}



interface OrdersState {
  bookings: BookingOrder[];

  // actions
  storeOrders: (data: { bookings: BookingOrder[] }) => void;
  addOrder: (order: BookingOrder) => void;
  clearOrders: () => void;
}

export const useOrdersStore = create<OrdersState>((set) => ({
  bookings: [],

  storeOrders: (data) => {
    set({ bookings: data.bookings });
  },

  addOrder: (order) => {
    set((state) => ({
      bookings: [order, ...state.bookings],
    }));
  },

  clearOrders: () => {
    set({ bookings: [] });
  },
}));