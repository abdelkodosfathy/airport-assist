// components/SuccessPopup.tsx
"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  useSuccessPopupStore,
  useWaitListPopupStore,
} from "@/store/useSuccessPopupStore";
import { CheckCircle2, Clock1, Clock4 } from "lucide-react";
import Link from "next/link";

export const SuccessPopup = () => {
  const { isOpen, clientSecret, close } = useSuccessPopupStore();

  return (
    <Dialog open={isOpen}>
      <DialogContent
        className="md:max-w-2xl rounded-2xl p-0 overflow-hidden"
        onInteractOutside={close}
        showCloseButton={false}
      >
        <div className="flex flex-col items-center text-center px-8 py-10">
          {/* Check Icon */}
          <div className="mb-8">
            <CheckCircle2
              className="w-10 h-10 text-[#7A7A7A]"
              strokeWidth={2}
            />
          </div>

          {/* Heading */}
          <DialogHeader className="items-center mb-10 space-y-3">
            <DialogTitle className="normal-case text-[32px] font-semibold text-[#111827] tracking-tight leading-tight">
              Booking confirmed!
            </DialogTitle>
            <DialogDescription className="normal-case text-center text-[15px] text-[#6A7282] leading-relaxed max-w-[380px]">
              Thank you for booking with us. We&apos;re looking forward to
              seeing you — a confirmation has been sent to your email.
            </DialogDescription>
          </DialogHeader>

          {/* Summary Card */}
          <div className="w-full bg-[#F9F8F6] rounded-2xl overflow-hidden mb-8">
            <div className="px-6 py-4 border-b border-[#cfcfcf]">
              <p className="text-[14px] font-semibold tracking-widest text-black uppercase">
                Booking Summary
              </p>
            </div>

            {[
              // { label: "Reference", value: clientSecret.split("_secret")[0] },
              { label: "Reference", value: clientSecret },
              { label: "Date & time", value: new Date().toLocaleString() },
            ].map((row, i, arr) => (
              <div
                key={i}
                className={`flex items-center justify-between px-6 py-4 ${
                  i < arr.length - 1 ? "border-b border-[#F3F4F6]" : ""
                }`}
              >
                <span className="text-[14px] font-semibold ">{row.label}</span>
                <span className="text-[14px] font-semibold normal-case">
                  {row.value}
                </span>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex gap-3 w-full mb-8">
            <div className="flex-1">
              <Button
                onClick={close}
                variant="outline"
                className="w-full py-5 cursor-pointer border-black hover:bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)] hover:text-white hover:border-white duration-0"
              >
                View my booking
              </Button>
            </div>
            <div className="flex-1">
              <Button
                variant="outline"
                className="w-full py-5 border-black hover:bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)] hover:text-white hover:border-white duration-0"
                asChild
              >
                <Link href="/" className="w-full">
                  Return to home
                </Link>
              </Button>
            </div>
          </div>

          {/* Support Link */}
          <p className="text-[13px] normal-case">
            Need to make changes?{" "}
            <Link
              href="/contact-us"
              className="text-[#3B82F6] hover:underline inline-flex items-center gap-1"
            >
              Contact our support team
            </Link>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export const WaitListPopup = () => {
  const { isOpen, clientSecret, close } = useWaitListPopupStore();

  return (
    <Dialog open={isOpen}>
      <DialogContent
        className="md:max-w-2xl rounded-2xl p-0 overflow-hidden"
        onInteractOutside={close}
        showCloseButton={false}
      >
        <div className="flex flex-col items-center text-center px-8 py-10">
          {/* Check Icon */}
          <div className="mb-8">
            <Clock4
              className="w-10 h-10 text-[#7A7A7A]"
              strokeWidth={2}
            />
          </div>

          {/* Heading */}
          <DialogHeader className="items-center mb-10 space-y-3">
            <DialogTitle className="normal-case text-[32px] font-semibold text-[#111827] tracking-tight leading-tight">
              You're in the waitlist
            </DialogTitle>
            <DialogDescription className="normal-case text-center text-[15px] text-[#6A7282] leading-relaxed max-w-[380px]">
              Thank you for interest! We&apos;re checking availability and will
              notify you as soon as a space becomes available.
            </DialogDescription>
          </DialogHeader>

          {/* Summary Card */}
          <div className="w-full bg-[#F9F8F6] rounded-2xl overflow-hidden mb-8">
            <div className="px-6 py-4 border-b border-[#cfcfcf]">
              <p className="text-[14px] font-semibold tracking-widest text-black uppercase">
                Waitlist Summary
              </p>
            </div>

            {[
              { label: "Reference", value: clientSecret },
              { label: "Date & time", value: new Date().toLocaleString() },
            ].map((row, i, arr) => (
              <div
                key={i}
                className={`flex items-center justify-between px-6 py-4 ${
                  i < arr.length - 1 ? "border-b border-[#F3F4F6]" : ""
                }`}
              >
                <span className="text-[14px] font-semibold ">{row.label}</span>
                <span className="text-[14px] font-semibold normal-case">
                  {row.value}
                </span>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex gap-3 w-full max-w-sm mb-8">
            <div className="flex-1">
              <Button
                onClick={close}
                variant="outline"
                className="w-full py-5 cursor-pointer border-black hover:bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)] hover:text-white hover:border-white duration-0"
              >
                View my booking
              </Button>
            </div>
            <div className="flex-1">
              <Button
                variant="outline"
                className="w-full py-5 border-black hover:bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)] hover:text-white hover:border-white duration-0"
                asChild
              >
                <Link href="/" className="w-full">
                  Return to home
                </Link>
              </Button>
            </div>
          </div>

          {/* Support Link */}
          <p className="text-[13px] normal-case">
            Want to be removed from the waitlist?{" "}
            <Link
              href="/contact-us"
              className="text-[#3B82F6] hover:underline inline-flex items-center gap-1"
            >
              Cancel your spot
            </Link>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
