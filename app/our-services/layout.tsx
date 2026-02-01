// import React from "react";
// import Header from "@/components/Header/Header";
// import Footer from "@/components/Footer";
// import Image from "next/image";
// import hero from "@/public/chauffeuring.jpg";
// export default function ServicesLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <main className="bg-[#F7F7F6] font-[Manrope]">
//       <Header />

//       <section className="relative w-full h-114 text-white flex items-center justify-center overflow-hidden">
//         {/* Background Image */}
//         <div className="absolute inset-0">
//           <Image
//             src={hero}
//             alt="background"
//             fill
//             className="object-cover object-[50%_20%] w-full h-full"
//             priority
//           />

//           {/* Gradient overlay */}
//           <div
//             className="absolute inset-0"
//             style={{
//               background:
//                 "linear-gradient(14.45deg, rgba(2, 2, 2, 0.0546) -17.37%, rgba(11, 11, 11, 0.78) 21.48%)",
//             }}
//           />
//         </div>

//         {/* Hero content */}
//         <div className="relative z-10">
//           <h1 className=" font-[Manrope] text-[40px] leading-[130%] tracking-[11px] text-center mb-4.25">
//             Our Services
//           </h1>

//           <p className=" font-[Manrope] font-normal text-[24px] text-center text-[rgb(200,200,200)]">
//             Chauffeur Services
//           </p>
//         </div>
//       </section>

//       <>{children}</>
//       <Footer />
//     </main>
//   );
// }

// app/meet-and-greet/layout.tsx
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import hero from "@/public/our-sercives-hero.jpg";
import HeroTitle from "../(statics)/HeroTitle";
// import HeroTitle from "./HeroTitle";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="bg-[#F7F7F6] font-[Manrope]">
      <Header />

      <section className="relative w-full h-114 text-white flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={hero}
            alt="background"
            fill
            className="object-cover"
            priority
          />

          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(14.45deg, rgba(2, 2, 2, 0.0546) -17.37%, rgba(11, 11, 11, 0.78) 21.48%)",
            }}
          />
        </div>

        <div className="relative z-10 h-full flex flex-col justify-center mx-auto">
          <HeroTitle />
        </div>
      </section>

        {children}

      <Footer />
    </main>
  );
}
