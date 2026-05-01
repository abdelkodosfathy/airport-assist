"use client";

import { Button } from "@/components/ui/button";
import { SingleBooking } from "@/lib/types/booking";
import { Clock4 } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function WaitingListContent({ data }: { data: SingleBooking }) {
  // const searchParams = useSearchParams();
  // const booking_timestamp = searchParams.get("booking_timestamp");
  // const service_type = searchParams.get("service_type");
  const booking_uuid = data.booking_uuid;
  const booking_timestamp = data.booking_timestamp;
  const service_type = data.service_type;

  // فورمات للتاريخ (اختياري)
  const formattedDate = booking_timestamp
    ? new Date(booking_timestamp).toLocaleString()
    : "-";

  return (
    <main className="min-h-screen bg-[#F9F8F6] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-[520px] flex flex-col items-center text-center">
        {/* Icon */}
        <div className="relative mb-8">
          <Clock4 className="w-10 h-10 text-[#7A7A7A]" strokeWidth={2} />
        </div>

        {/* Heading */}
        <h1 className="text-[32px] normal-case font-semibold text-[#111827] mb-3 tracking-tight">
          You're in the waitlist
        </h1>

        <p className="text-[15px] normal-case text-[#6A7282] leading-relaxed max-w-[380px] mb-10">
          Thank you for interest! We&apos;re checking availability and will
          notify you as soon as a space becomes available.
        </p>

        {/* Summary */}
        <div className="w-full bg-white rounded-2xl shadow-sm overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-[#F3F4F6]">
            <p className="text-[11px] font-semibold tracking-widest text-[#9CA3AF] uppercase">
              Waitlist Summary
            </p>
          </div>

          {[
            { label: "Reference", value: booking_uuid || "-" },
            { label: "Date & time", value: formattedDate },
            { label: "Details", value: service_type || "-" },
          ].map((row, i, arr) => (
            <div
              key={i}
              className={`flex items-center justify-between px-6 py-4 ${
                i < arr.length - 1 ? "border-b border-[#F3F4F6]" : ""
              }`}
            >
              <span className="text-[14px] text-[#6A7282]">{row.label}</span>
              <span
                className={`text-[14px] font-semibold text-[#111827] ${row.label.toLowerCase() === "reference" && "normal-case"}`}
              >
                {row.value}
              </span>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex gap-3 w-max mb-8">
          {/* <Link href={`/booking?booking_uuid=${booking_uuid}`}>

            <Button
              variant="outline"
              className="min-w-[140px] py-5 border-black hover:bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)] hover:text-white hover:border-white duration-0"
            >
              <p>View my booking</p>
            </Button>
          </Link> */}

          <Link href={"/"}>
            {/* <Button className="min-w-[140px] py-5">Return to home</Button> */}

            <Button
              variant="outline"
              className=" min-w-[140px] py-5 border-black hover:bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)] hover:text-white hover:border-white duration-0"
            >
              <p>Return to home</p>
            </Button>
          </Link>
        </div>

        {/* Support */}
        <p className="text-[13px] text-[#9CA3AF]">
          Want to be removed from the waitlist?{" "}
          <Link href="/support" className="text-[#3B82F6] hover:underline">
            Cancel your spot
          </Link>
        </p>
      </div>
    </main>
  );
}
