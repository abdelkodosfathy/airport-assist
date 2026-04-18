// // hooks/useAuthGuard.ts
// "use client";

// import { apiGet } from "@/lib/api/http";
// import { useAuthStore } from "@/store/authStore";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

// export function useAuthGuard() {
//   const router = useRouter();
//   const login = useAuthStore((s) => s.login);
//   const [checking, setChecking] = useState(true);

//   useEffect(() => {
//     apiGet("/auth/me")
//       .then((res) => {
//         // Rehydrate the store with fresh user data
//         const { user_id, user_type, email_verified_at, phone_verified_at } = res.data;
//         login({ user_id, user_type, email_verified_at, phone_verified_at });
//         setChecking(false);
//       })
//       .catch(() => {
//         // Cookie is missing or expired — kick to login
//         router.replace("/login");
//       });
//   }, []);

//   return { checking };
// }
// hooks/useAuthGuard.ts

"use client";

import { apiGet } from "@/lib/api/http";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function useAuthGuard() {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    apiGet("/bookings")
      .then((res) => {
        login(res.data.user);
        setChecking(false);
      })
      .catch(() => {
        router.replace("/login");
      });
    apiGet("/account/get-user-info")
      .then((res) => {
        login(res.data.user);
        setChecking(false);
      })
      .catch(() => {
        router.replace("/login");
      });
  }, []);

  return { checking };
}

const getUserBookings = () => {
  
}