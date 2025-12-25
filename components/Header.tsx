'use client'

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';
import LanguageSelect from './ui/LanguageSelector';

export default function Header() {
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);

  return (
    <header
      className="flex
        pointer-events-none fixed top-0 z-50 w-full justify-center 
        border-b border-b-transparent
      "
    >
      <div className="pointer-events-auto mx-auto flex w-full px-20 py-4 items-center justify-between">

        {/* Logo */}
        <a className="shrink-0">
          <Image
            src="/logo.png"
            alt="Airport Assist"
            width={165}
            height={82.5}
            className="h-auto"
          />
        </a>

        {/* Navigation */}
        <nav className="hidden h-full min-w-min lg:flex">
          <ul className="flex h-full items-center gap-8">
            <li>
              <Link
                className="
                  flex items-center text-white text-md
                  font-light duration-300
                  hover:text-gray-300
                "
                href="/services"
              >
                Services
              </Link>
            </li>

            <li>
              <Link
                className="
                  flex items-center text-white text-md
                  font-light no-underline transition-colors duration-300
                  hover:text-gray-300
                "
                href="/locations"
              >
                Locations
              </Link>
            </li>
          </ul>
        </nav>

        {/* Right Side */}
        <div className="flex items-center justify-end gap-4">

          {/* Language */}
            <LanguageSelect />


          {/* Divider */}
          {/* <span className="inline-block w-[2px] h-8 rounded bg-white/20"></span> */}
            <span className="inline-block w-0.5 h-8 rounded-3xl  bg-linear-to-b from-white to-white/10"></span>


          {/* Login */}
          <a
            className="
              text-white text-base font-light cursor-pointer
              hover:text-gray-300 transition-colors
            "
            href="https://booking.terminal.btgpactual.com/en/login/"
            rel="noopener noreferrer"
          >
            Login
          </a>

          {/* Contact */}
                      {/* <Button
              variant="ghost"
              className="text-2xl font-light hover:bg-transparent hover:text-white cursor-pointer"
            >
              Login
            </Button> */}
          
          <Button
          variant="ghost"
            className="
              h-10 backdrop-blur-md hover:backdrop-blur-xl
               bg-white/10 border border-white/20
              px-5 py-2 rounded-xl text-sm text-white
              transition
              font-light hover:bg-transparent hover:text-white cursor-pointer
            "
          >
            Contact Us
          </Button>

        </div>
      </div>
    </header>
  );
}
