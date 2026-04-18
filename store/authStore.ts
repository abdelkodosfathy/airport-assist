// // store/authStore.ts
// import { create } from "zustand";

// interface AuthUser {
//   user_id: number;
//   user_type: string;
//   email_verified_at: string | null;
//   phone_verified_at: string | null;
// }

// interface AuthState {
//   user: AuthUser | null;
//   isAuthenticated: boolean;
//   login: (user: AuthUser) => void;
//   logout: () => void;
// }

// export const useAuthStore = create<AuthState>((set) => ({
//   user: null,
//   isAuthenticated: false,

//   // Call after a successful login API response
//   // No need to manually set cookies — server already did via Set-Cookie header
//   login: (user) => {
//     set({ user, isAuthenticated: true });
//   },

//   // Call after a successful logout API response
//   // No need to manually clear cookies — server will expire them on logout endpoint
//   logout: () => {
//     set({ user: null, isAuthenticated: false });
//   },
// }));
// store/authStore.ts

import { create } from "zustand";

export interface AuthUser {
  user_id: number;
  first_name: string;
  last_name: string;
  user_name: string;
  email: string;
  email_verified_at: string | null;
  phone: string | null;
  phone_verified_at: string | null;
  user_img: string | null;
  locale: string;
  user_type: string;
  oauth_type: string | null;
  activated_at: string | null;
  timezone_id: string | null;
  can_update_email: boolean;
  loyalty_points: string;
}

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (user: AuthUser) => void;
  setUser: (user: AuthUser) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  login: (user) => {
    set({ user, isAuthenticated: true });
  },

  setUser: (user) => {
    set({ user });
  },

  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
}));