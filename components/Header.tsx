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
          <ServiceList />

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

          <a className=" text-white  font-normal text-[16px] leading-6 tracking-[0px]">
            Login
          </a>

          <Button
            variant="ghost"
            className="
              w-[124.5px]
              h-12
              bg-white/10
              border border-white/20
              rounded-2xl
              px-6
              py-3
              flex items-center justify-center gap-2
              backdrop-blur-md
              transition
              hover:bg-white/20
            "
          >
            <Link href={"/contact-us"}>
              <p
                className="
                text-white 
                font-normal 
                text-[16px] 
                leading-6
                tracking-[0px]
                font-[Manrope]
              "
              >
                Contact Us
              </p>
            </Link>
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
              asChild
              variant="ghost"
              className="
                w-full h-12 bg-white/10 border border-white/20
                rounded-xl text-white backdrop-blur-md
              "
            >
              <Link href={"/contact-us"}>Contact Us</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

const ServiceList = () => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative pb-2 mt-2"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Button
        variant={"ghost"}
        className="cursor-pointer text-white text-lg font-normal leading-none hover:text-gray-300 hover:bg-white/0 duration-300"
      >
        Services
      </Button>

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
          <Link href="/services/chauffeuring">Chauffeuring</Link>
        </li>
        <li className="px-4 py-2 border-b border-[#D5D5D5]">
          <Link href="/services/hotel">Hotel Service</Link>
        </li>
        <li className="px-4 py-2 border-b border-[#D5D5D5]">
          <Link href="/services/vip-meet-and-greet">VIP Meet & Greet</Link>
        </li>
        <li className="px-4 py-2 border-b border-[#D5D5D5]">
          <Link href="/services/private-suite">Private Suite</Link>
        </li>
        <li className="px-4 py-2">
          <Link href="/services/private-jet">Private Jet</Link>
        </li>
      </ul>
    </div>
  );
};
