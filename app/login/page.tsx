// import { Button } from "@/components/ui/button";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { ArrowRight } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";

// type Props = {};

// const LoginPage = (props: Props) => {
//   return (
//     <main className="bg-[#1A1A1A] h-screen">
//       <header className="w-full px-4">
//         <div className="mx-auto max-w-360 flex items-center justify-between py-1">
//           {/* Logo */}
//           <Link href="/" className="shrink-0">
//             <Image
//               src="/logo.png"
//               alt="Airport Assist"
//               width={168.1}
//               height={70.5}
//               className="h-auto"
//             />
//           </Link>
//         </div>
//       </header>
//       <form className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2  max-w-95 text-white flex flex-col gap-4">
//         <h1 className="text-center text-2xl">Login</h1>
//         <div>
//           <Label className="mb-1 font-normal">Email address</Label>
//           <Input
//             type="email"
//             className="h-11.25 rounded-xl bg-white"
//             placeholder="Email address"
//           />
//         </div>
//         <div>
//           <div>
//             <Label className="mb-1 font-normal">Password</Label>
//             <Input
//               type="password"
//               className="h-11.25 rounded-xl bg-white"
//               placeholder="Password"
//             />
//           </div>

//           <div className="flex w-full justify-between">
//             <div className="flex items-center gap-2">
//               <Checkbox
//                 id="show password"
//                 className="cursor-pointer rounded-full bg-white data-[state=checked]:bg-white data-[state=checked]:text-black data-[state=checked]:border-white"
//               />
//               <Label htmlFor="show password" className="font-normal">
//                 Show Password
//               </Label>
//             </div>
//             <Link href={"/"}>Forget Password?</Link>
//           </div>
//         </div>
//         <div>
//           <Button asChild variant={"outline"} className="text-black w-full">
//             <Link href={"/profile"}>LOG IN</Link>
//           </Button>
//         </div>
//         <div className="mt-6">
//           <p className="text-center">
//             if you don't have an account yet <Link className="font-semibold underline" href={'/register'}>create one</Link>
//           </p>
//         </div>
//         <div className="mt-6">
//           <Link href={"/"} className="flex gap-2 items-center justify-center">
//             Back to website <ArrowRight />
//           </Link>
//         </div>
//       </form>
//     </main>
//   );
// };

// export default LoginPage;

// app/login/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { apiGet, apiPost } from "@/lib/api/http";
import { useAuthStore } from "@/store/authStore";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginPage = () => {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setError(null);
  //   setLoading(true);

  //   try {
  //     const res = await apiPost("/auth/login", { email, password });
  //     // Server already set httpOnly cookies (token + guest_id) automatically.
  //     // We just store the user info in Zustand for UI use.
  //     const { user_id, user_type, email_verified_at, phone_verified_at } = res.data;
  //     login({ user_id, user_type, email_verified_at, phone_verified_at });
  //     router.push("/profile");
  //   } catch (err: any) {
  //     setError(err?.message || "Login failed. Please check your credentials.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await apiPost("/auth/login", { email, password });
      // fetch full user info after login (cookies are now set by server)
      const userRes = await apiGet("/account/get-user-info");
      console.log(res);
      login(userRes.data.user);
      router.push("/profile");
    } catch (err: any) {
      setError(err?.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-[#1A1A1A] h-screen">
      <header className="w-full px-4">
        <div className="mx-auto max-w-360 flex items-center justify-between py-1">
          <Link href="/" className="shrink-0">
            <Image
              src="/logo.png"
              alt="Airport Assist"
              width={168.1}
              height={70.5}
              className="h-auto"
            />
          </Link>
        </div>
      </header>

      <form
        onSubmit={handleSubmit}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-95 w-full text-white flex flex-col gap-4"
      >
        <h1 className="text-center text-2xl">Login</h1>

        {error && (
          <p className="text-red-400 text-sm text-center bg-red-400/10 rounded-lg px-3 py-2">
            {error}
          </p>
        )}

        <div>
          <Label className="mb-1 font-normal">Email address</Label>
          <Input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-11.25 rounded-xl bg-white text-black"
            placeholder="Email address"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label className="mb-1 font-normal">Password</Label>
          <Input
            type={showPassword ? "text" : "password"}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-11.25 rounded-xl bg-white text-black"
            placeholder="Password"
          />
          <div className="flex w-full justify-between">
            <div className="flex items-center gap-2">
              <Checkbox
                id="show-password"
                checked={showPassword}
                onCheckedChange={(val) => setShowPassword(!!val)}
                className="cursor-pointer rounded-full bg-white data-[state=checked]:bg-white data-[state=checked]:text-black data-[state=checked]:border-white"
              />
              <Label htmlFor="show-password" className="font-normal">
                Show Password
              </Label>
            </div>
            <Link href="/">Forget Password?</Link>
          </div>
        </div>

        <Button
          type="submit"
          variant="outline"
          className="text-black w-full"
          disabled={loading}
        >
          {loading ? "Logging in..." : "LOG IN"}
        </Button>

        <p className="text-center mt-2">
          If you don&apos;t have an account yet{" "}
          <Link className="font-semibold underline" href="/register">
            create one
          </Link>
        </p>

        <Link href="/" className="flex gap-2 items-center justify-center mt-2">
          Back to website <ArrowRight />
        </Link>
      </form>
    </main>
  );
};

export default LoginPage;
