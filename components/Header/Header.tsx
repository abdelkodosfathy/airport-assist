"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import CurrencySelector from "../ui/CurrencySelector";
import { ChevronDown, Menu, X } from "lucide-react";
import { useAuthStore } from "@/store/authStore";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const isAuthenticated = useAuthStore(s => s.isAuthenticated);
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [open]);

  useEffect(() => {
    if (!open) {
      setMobileServicesOpen(false);
    }
  }, [open]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (!target.closest("header")) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <header className="animated-header fixed z-90 w-full border-b border-transparent px-4">
      {/* <div className="mx-auto max-w-360 flex items-center justify-between py-1"> */}
      <div className="mx-auto max-w-360 flex items-center justify-between py-3 lg:py-1">
        {/* Logo */}
        <Link
          href="/"
          aria-label="Go to homepage"
          className="shrink-0 focus:outline-none focus:ring-2 focus:ring-primary rounded"
        >
          <Image
            src="/logo.png"
            alt="Airport Assist homepage"
            width={168}
            height={71}
            className="h-auto"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="absolute left-1/2 -translate-x-1/2 hidden lg:flex items-center gap-10">
          <ServiceList />
          <Link
            href="/locations"
            className="
            focus:outline-none focus:ring-2 focus:ring-white/50 rounded
            text-white text-lg font-normal leading-none hover:text-gray-300 duration-300"
          >
            Locations
          </Link>
        </nav>

        {/* Right Side */}
        <div className="hidden lg:flex items-center gap-4">
          <CurrencySelector />
          <span
            aria-hidden="true"
            className="inline-block w-0.5 h-8 rounded-3xl bg-linear-to-b from-white to-white/10"
          />

          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <Link
                href="/profile"
                className="text-white font-normal text-[16px] leading-6"
              >
                {/* {user?.user_type === "organisation"
                  ? "My Organisation"
                  : "My Profile"} */}
                Profile
              </Link>
            </div>
          ) : (
            <Link
              href="/login"
              className="text-white font-normal text-[16px] leading-6 tracking-[0px]"
            >
              Login
            </Link>
          )}
          {/* 
          <Button
            asChild
            variant="ghost"
            className="w-31 h-12 bg-white/10 border border-white/20 rounded-xl px-6 py-3 flex items-center justify-center gap-2 backdrop-blur-md transition hover:bg-white/20"
          >
            <Link href="/contact-us">
              <span className="text-white font-normal text-[16px] leading-6 tracking-[0px] font-[Manrope]">
                Contact Us
              </span>
            </Link>
          </Button> */}
          <Link
            href="/contact-us"
            className="w-31 h-12 min-h-[44px]
              bg-white/10 border border-white/20
              rounded-xl px-2 flex items-center justify-center gap-2
              backdrop-blur-md transition hover:bg-white/20
              text-white font-normal text-[16px]"
          >
            Contact Us
          </Link>
        </div>

        {/* Mobile Menu Button */}
        {/* <button className="lg:hidden text-white" onClick={() => setOpen(!open)}> */}
        <button
          className="lg:hidden text-white p-2 rounded-md hover:bg-white/10 transition"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {/* {open && ( */}
      {/* <div className="lg:hidden bg-black/70 backdrop-blur-xl px-6 py-6 space-y-6 text-white"> */}
      <div
        className={`fixed left-0 right-0 top-0 lg:hidden bg-black/90 backdrop-blur-lg px-6 py-6 space-y-6 text-white
          transition-all duration-300 origin-top
          ${
            open
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
          }`}
              >
        <div className="space-y-2">
          <button
            onClick={() => setMobileServicesOpen((prev) => !prev)}
            className="flex items-center justify-between w-full text-lg font-light"
          >
            Services
            <ChevronDown
              className={`transition-transform duration-300 ${
                mobileServicesOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          <ul
            className={`ml-2 space-y-3 overflow-hidden transition-all duration-300
      ${mobileServicesOpen ? "max-h-60 opacity-100 mt-3" : "max-h-0 opacity-0"}
    `}
          >
            <li>
              <Link
                href="/our-services/chauffeuring"
                onClick={() => setMobileServicesOpen(false)}
              >
                Chauffeur Services
              </Link>
            </li>

            <li>
              <Link href="/our-services/hotel" onClick={() => setMobileServicesOpen(false)}>
                Hotel Service
              </Link>
            </li>

            <li>
              <Link
                href="/our-services/vip-meet-and-greet"
                onClick={() => setMobileServicesOpen(false)}
              >
                VIP Meet & Greet
              </Link>
            </li>

            <li>
              <Link
                href="/our-services/private-suite"
                onClick={() => setMobileServicesOpen(false)}
              >
                Private Suite
              </Link>
            </li>

            <li>
              <Link
                href="/our-services/private-jet"
                onClick={() => setMobileServicesOpen(false)}
              >
                Private Jet
              </Link>
            </li>
          </ul>
        </div>

        <Link
          href="/locations"
          className="block text-lg font-light"
          onClick={() => setMobileServicesOpen(false)}
        >
          Locations
        </Link>

        <div className="pt-4 border-t border-white/20 space-y-4">
          <CurrencySelector />

          {isAuthenticated ? (
            <div className="flex flex-col gap-3">
              <Link
                href="/profile"
                aria-label="Go to your profile"
                className="text-white font-normal text-[16px] leading-6"
                onClick={() => setMobileServicesOpen(false)}
              >
                {/* {user?.user_type === "organisation"
                    ? "My Organisation"
                    : "My Profile"} */}
                Profile
              </Link>
            </div>
          ) : (
            <Link
              href="/login"
              aria-label="Go to login page"
              className="block text-white font-normal text-[16px] leading-6"
              onClick={() => setMobileServicesOpen(false)}
            >
              Login
            </Link>
          )}

          <Button
            asChild
            variant="ghost"
            className="w-full h-12 bg-white/10 border border-white/20 rounded-xl text-white backdrop-blur-md"
          >
            <Link href="/contact-us">Contact Us</Link>
          </Button>
        </div>
      </div>
      {/* )} */}
    </header>
  );
}

const ServiceList = () => {
  const [open, setOpen] = useState(false);
  const isTouch = typeof window !== "undefined" && "ontouchstart" in window;
  return (
    <div
      className="pb-2 mt-2 relative"
      onMouseEnter={!isTouch ? () => setOpen(true) : undefined}
      onMouseLeave={!isTouch ? () => setOpen(false) : undefined}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      <div className="flex text-white items-center">
        <Button
          variant="ghost"
          className="cursor-pointer px-0 text-white text-lg font-normal leading-none hover:text-gray-300 hover:bg-white/0 duration-300"
        >
          Services
        </Button>
        <ChevronDown
          className={`${open ? "rotate-180 text-gray-300" : ""} duration-300`}
        />
      </div>

      <ul
        className={`
          absolute left-0 w-max mt-2 bg-white rounded-2xl shadow-lg
          transition-all duration-300 ease-out
          ${
            open
              ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
              : "opacity-0 -translate-y-2 scale-95 pointer-events-none"
          }
        `}
      >
        <li className="px-4 py-2 border-b border-[#D5D5D5]">
          <Link href="/our-services/chauffeuring">Chauffeur Services</Link>
        </li>
        <li className="px-4 py-2 border-b border-[#D5D5D5]">
          <Link href="/our-services/hotel">Hotel Service</Link>
        </li>
        <li className="px-4 py-2 border-b border-[#D5D5D5]">
          <Link href="/our-services/vip-meet-and-greet">VIP Meet & Greet</Link>
        </li>
        <li className="px-4 py-2 border-b border-[#D5D5D5]">
          <Link href="/our-services/private-suite">Private Suite</Link>
        </li>
        <li className="px-4 py-2">
          <Link href="/our-services/private-jet">Private Jet</Link>
        </li>
      </ul>
    </div>
  );
};
