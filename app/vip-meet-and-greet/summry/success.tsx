// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { CheckCircle, CheckCircle2 } from "lucide-react";
// import Link from "next/link";

// const SuccessPopup = ({
//   success,
//   clientSecret,
// }: {
//   success?: boolean;
//   clientSecret?: string;
// }) => (
//   <Dialog open={success}>
//     <DialogContent
//       className="sm:max-w-[520px] rounded-2xl p-0 overflow-hidden"
//       onInteractOutside={(e) => e.preventDefault()}
//     >
//       <div className="flex flex-col items-center text-center px-8 py-10">
//         {/* Check Icon */}
//         <div className="mb-8">
//           <CheckCircle2 className="w-10 h-10 text-[#7A7A7A]" strokeWidth={2} />
//         </div>

//         {/* Heading */}
//         <DialogHeader className="items-center mb-10 space-y-3">
//           <DialogTitle className="normal-case text-[32px] font-semibold text-[#111827] tracking-tight leading-tight">
//             Booking confirmed!
//           </DialogTitle>
//           <DialogDescription className="normal-case text-[15px] text-[#6A7282] leading-relaxed max-w-[380px]">
//             Thank you for booking with us. We&apos;re looking forward to seeing
//             you — a confirmation has been sent to your email.
//           </DialogDescription>
//         </DialogHeader>

//         {/* Summary Card */}
//         <div className="w-full bg-[#F9F8F6] rounded-2xl overflow-hidden mb-8">
//           <div className="px-6 py-4 border-b border-[#F3F4F6]">
//             <p className="text-[11px] font-semibold tracking-widest text-[#9CA3AF] uppercase">
//               Booking Summary
//             </p>
//           </div>

//           {[
//             // { label: "Reference", value: clientSecret.split("_secret")[0] },
//             { label: "Reference", value: clientSecret },
//             { label: "Date & time", value: new Date().toLocaleString() },
//           ].map((row, i, arr) => (
//             <div
//               key={i}
//               className={`flex items-center justify-between px-6 py-4 ${
//                 i < arr.length - 1 ? "border-b border-[#F3F4F6]" : ""
//               }`}
//             >
//               <span className="text-[14px] text-[#6A7282]">{row.label}</span>
//               <span className="text-[14px] font-semibold text-[#111827] normal-case">
//                 {row.value}
//               </span>
//             </div>
//           ))}
//         </div>

//         {/* Buttons */}
//         <div className="flex gap-3 w-full mb-8">
//           <Button
//             onClick={() => window.location.reload()}
//             variant="outline"
//             className="flex-1 py-5 border-black hover:bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)] hover:text-white hover:border-white duration-0"
//           >
//             View my booking
//           </Button>

//           <Link href="/" className="flex-1">
//             <Button
//               variant="outline"
//               className="w-full py-5 border-black hover:bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)] hover:text-white hover:border-white duration-0"
//             >
//               Return to home
//             </Button>
//           </Link>
//         </div>

//         {/* Support Link */}
//         <p className="text-[13px] text-[#9CA3AF]">
//           Need to make changes?{" "}
//           <Link
//             href="/contact-us"
//             className="text-[#3B82F6] hover:underline inline-flex items-center gap-1"
//           >
//             Contact our support team
//           </Link>
//         </p>
//       </div>
//     </DialogContent>
//   </Dialog>
// );

// export default SuccessPopup;
