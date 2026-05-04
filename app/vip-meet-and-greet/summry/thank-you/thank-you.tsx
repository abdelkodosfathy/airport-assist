// "use client";

// import { Button } from "@/components/ui/button";
// import { SingleBooking } from "@/lib/types/booking";
// import { CheckCircle2, ArrowRight, Home, HeadphonesIcon } from "lucide-react";
// import Link from "next/link";

// export default function ThankYou({ data }: { data: SingleBooking }) {
//   const booking_uuid = data.booking_uuid;
//   const booking_timestamp = data.booking_timestamp;
//   const service_type = data.service_type;

//   const formattedDate = booking_timestamp
//     ? new Date(booking_timestamp).toLocaleString()
//     : "-";

//   return (
//     <main className="min-h-screen bg-[#F9F8F6] flex items-center justify-center px-4 py-16">
//       <div className="w-full max-w-[520px] flex flex-col items-center text-center">
//         {/* ── Animated check icon ── */}
//         <div className="relative mb-8">
//           <CheckCircle2 className="w-10 h-10 text-[#7A7A7A]" strokeWidth={2} />
//         </div>

//         {/* ── Heading ── */}
//         <h1 className="normal-case text-[32px] font-semibold text-[#111827] mb-3 tracking-tight">
//           Booking confirmed!
//         </h1>
//         <p className="normal-case text-[15px] text-[#6A7282] leading-relaxed max-w-[380px] mb-10">
//           Thank you for booking with us. We&apos;re looking forward to seeing
//           you — a confirmation has been sent to your email.
//         </p>

//         {/* ── Summary card ── */}
//         <div className="w-full bg-white rounded-2xl shadow-sm overflow-hidden mb-8">
//           <div className="px-6 py-4 border-b border-[#F3F4F6]">
//             <p className="text-[11px] font-semibold tracking-widest text-[#9CA3AF] uppercase">
//               Waitlist Summary
//             </p>
//           </div>

//           {[
//             { label: "Reference", value: booking_uuid || "-" },
//             { label: "Date & time", value: formattedDate },
//             { label: "Details", value: service_type || "-" },
//           ].map((row, i, arr) => (
//             <div
//               key={i}
//               className={`flex items-center justify-between px-6 py-4 ${
//                 i < arr.length - 1 ? "border-b border-[#F3F4F6]" : ""
//               }`}
//             >
//               <span className="text-[14px] text-[#6A7282]">{row.label}</span>
//               <span
//                 className={`text-[14px] font-semibold text-[#111827] ${row.label.toLowerCase() === "reference" && "normal-case"}`}
//               >
//                 {row.value}
//               </span>
//             </div>
//           ))}
//         </div>

//         {/* ── Buttons ── */}
//         <div className="flex gap-3 w-max mb-8">
//           {/* <Link href={`/booking?booking_uuid=${booking_uuid}`}>
//             <Button
//               variant="outline"
//               className=" min-w-[140px] py-5 border-black hover:bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)] hover:text-white hover:border-white duration-0"
//             >
//               <p>View my booking</p>
//             </Button>
//           </Link> */}

//           <Link href={"/"}>

//             <Button
//               variant="outline"
//               className=" min-w-[140px] py-5 border-black hover:bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)] hover:text-white hover:border-white duration-0"
//             >
//               <p>Return to home</p>
//             </Button>
//           </Link>
//         </div>

//         {/* ── Support link ── */}
//         <p className="text-[13px] text-[#9CA3AF]">
//           Need to make changes?{" "}
//           <Link
//             href="/contact-us"
//             className="text-[#3B82F6] hover:underline inline-flex items-center gap-1"
//           >
//             {/* <HeadphonesIcon className="w-3.5 h-3.5" /> */}
//             Contact our support team
//           </Link>
//         </p>
//       </div>
//     </main>
//   );
// }
