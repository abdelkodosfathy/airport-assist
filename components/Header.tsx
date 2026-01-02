"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "./ui/button";
import LanguageSelect from "./ui/LanguageSelector";
import { Menu, X } from "lucide-react";
import CurrncySelector from "./ui/CurrncySelector";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute top-0 z-50 w-full border-b border-transparent">
      <div className="mx-auto max-w-360 flex items-center justify-between px-6 lg:px-20 py-4">
        {/* Logo */}
        <Link href="/" className="shrink-0">
          <Image
            src="/logo.png"
            alt="Airport Assist"
            width={168.1}
            height={70.5}
            className="h-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="absolute left-1/2 -translate-x-1/2 hidden  lg:flex items-center gap-10">
          <Link
            href="/services"
            className="text-white text-lg font-normal leading-none hover:text-gray-300 duration-300"
          >
            Services
          </Link>

          <Link
            href="/locations"
            className="text-white text-lg font-normal leading-none hover:text-gray-300 duration-300"
          >
            Locations
          </Link>
        </nav>

        {/* Right Side */}
        <div className="hidden lg:flex items-center gap-4">
          <CurrncySelector />

          <span className="inline-block w-0.5 h-8 rounded-3xl bg-linear-to-b from-white to-white/10"></span>

          <a
            className="
    text-white 
    font-normal
    text-[16px]
    leading-[24px]
    tracking-[0px]
  "
          >
            Login
          </a>

          <Button
            variant="ghost"
            className="
              w-[124.5px]
              h-[48px]
              bg-white/10
              border border-white/20
              rounded-[12px]
              px-[24px]
              py-[12px]
              flex items-center justify-center gap-[8px]
              backdrop-blur-md
              transition
              hover:bg-white/20
            "
          >
            <p
              className="
                text-white 
                font-normal 
                text-[16px] 
                leading-[24px]
                tracking-[0px]
                font-[Manrope]
              "
            >
              Contact Us
            </p>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button className="lg:hidden text-white" onClick={() => setOpen(!open)}>
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden bg-black/70 backdrop-blur-xl px-6 py-6 space-y-6 text-white">
          <Link
            href="/services"
            className="block text-lg font-light"
            onClick={() => setOpen(false)}
          >
            Services
          </Link>

          <Link
            href="/locations"
            className="block text-lg font-light"
            onClick={() => setOpen(false)}
          >
            Locations
          </Link>

          <div className="pt-4 border-t border-white/20 space-y-4">
            <LanguageSelect />

            <a
              // className="block text-lg font-light"
              style={{
                fontFamily: "Manrope",
                fontWeight: "400",
                fontStyle: "Regular",
                fontSize: "16px",
                lineHeight: "24px",
                letterSpacing: "0px",
              }}
            >
              Login
            </a>

            <Button
              variant="ghost"
              className="
                w-full h-[48px] bg-white/10 border border-white/20
                rounded-xl text-white backdrop-blur-md
              "
            >
              Contact Us
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
