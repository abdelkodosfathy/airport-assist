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
//     // apiGet("/bookings")
//     //   .then((res) => {
//     //     login(res.data.user);
//     //     setChecking(false);
//     //   })
//     //   .catch(() => {
//     //     router.replace("/login");
//     //   });
//     apiGet("/account/get-user-info")
//       .then((res) => {
//         login(res.data.user);
//         setChecking(false);
//       })
//       .catch(() => {
//         router.replace("/login");
//       });
//   }, []);

//   return { checking };
// }

// const getUserBookings = () => {

// }
"use client";

import { apiGet } from "@/lib/api/http";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function useAuthGuard() {
  const router = useRouter();

  const user = useAuthStore((s) => s.user);
  const login = useAuthStore((s) => s.login);
  const logout = useAuthStore((s) => s.logout);

  // لو فيه user مخزن، متعرضش Loading
  const [checking, setChecking] = useState(!user);

  useEffect(() => {
    apiGet("/account/get-user-info")
      .then((res) => {
        login(res.data.user);
      })
      .catch(() => {
        logout();
        router.replace("/login");
      })
      .finally(() => {
        setChecking(false);
      });
  }, [login, logout, router]);

  return { checking };
}