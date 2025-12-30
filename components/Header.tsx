// 'use client'

// // import { useState } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { Button } from './ui/button';
// import LanguageSelect from './ui/LanguageSelector';

// export default function Header() {
//   // const [isLanguageOpen, setIsLanguageOpen] = useState(false);

//   return (
//     <header
//       className="
//         pointer-events-none absolute top-0 z-50 hidden w-full justify-center
//         border-b border-b-transparent lg:flex
//       "
//     >
//       <div className="pointer-events-auto mx-auto flex w-full px-20 py-4 items-center justify-between">

//         {/* Logo */}
//         <a className="shrink-0">
//           <Image
//             src="/logo.png"
//             alt="Airport Assist"
//             width={165}
//             height={82.5}
//             className="h-auto"
//           />
//         </a>

//         {/* Navigation */}
//         <nav className="hidden h-full min-w-min lg:flex">
//           <ul className="flex h-full items-center gap-8">
//             <li>
//               <Link
//                 className="
//                   flex items-center text-white text-md
//                   font-light duration-300
//                   hover:text-gray-300
//                 "
//                 href="/services"
//               >
//                 Services
//               </Link>
//             </li>

//             <li>
//               <Link
//                 className="
//                   flex items-center text-white text-md
//                   font-light no-underline transition-colors duration-300
//                   hover:text-gray-300
//                 "
//                 href="/locations"
//               >
//                 Locations
//               </Link>
//             </li>
//           </ul>
//         </nav>

//         {/* Right Side */}
//         <div className="flex items-center justify-end gap-4">

//           {/* Language */}
//             <LanguageSelect />

//           {/* Divider */}
//           {/* <span className="inline-block w-[2px] h-8 rounded bg-white/20"></span> */}
//             <span className="inline-block w-0.5 h-8 rounded-3xl  bg-linear-to-b from-white to-white/10"></span>

//           {/* Login */}
//           <a
//             className="
//               text-white text-base font-light cursor-pointer
//               hover:text-gray-300 transition-colors
//             "
//             href="https://booking.terminal.btgpactual.com/en/login/"
//             rel="noopener noreferrer"
//           >
//             Login
//           </a>

//           {/* Contact */}
//                       {/* <Button
//               variant="ghost"
//               className="text-2xl font-light hover:bg-transparent hover:text-white cursor-pointer"
//             >
//               Login
//             </Button> */}

//           <Button
//           variant="ghost"
//             className="
//               h-10 backdrop-blur-md hover:backdrop-blur-xl
//                bg-white/10 border border-white/20
//               px-5 py-2 rounded-xl text-sm text-white
//               transition
//               font-light hover:bg-transparent hover:text-white cursor-pointer
//             "
//           >
//             Contact Us
//           </Button>

//         </div>
//       </div>
//     </header>
//   );
// }
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
            className="text-white text-[18px] font-normal leading-none hover:text-gray-300 duration-300"
          >
            Services
          </Link>

          <Link
            href="/locations"
            className="text-white text-[18px] font-normal leading-none hover:text-gray-300 duration-300"
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
