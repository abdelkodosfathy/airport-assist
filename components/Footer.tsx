import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-[#1a1a1a] py-12 px-8">
      <div className="relative max-w-7xl mx-auto flex flex-col md:flex-row gap-8 py-6">
        {/* Left Logo */}
        <div className="md:flex-2 flex items-center justify-center md:justify-start">
          <Image
            src="/logo.png"
            alt="Company Logo"
            width={200}
            height={80}
            className="object-contain"
          />
        </div>
        <div className="md:flex-3">
          {/* Right Columns */}
          <div className="relative grid grid-cols-2 md:grid-cols-4 gap-8 pb-4">
            <span
              className="
            absolute left-0 right-0 bottom-0 h-1 rounded-full
            transition-opacity duration-300 opacity-100
            bg-[linear-gradient(90deg,rgba(153,120,95,0)_0%,rgba(171,155,144,0.4)_50%,rgba(153,120,95,0)_100%)]
          "
            />
            {/* Column 1: Our Office */}
            <div>
              <h4 className="font-manrope font-bold text-lg mb-4 text-white">
                Our Office
              </h4>
              <p className="text-sm text-gray-400">contact@company.com</p>
              <p className="text-sm text-gray-400">(414) 687 - 5892</p>
              <p className="text-sm text-gray-400">794 Mcallister</p>
            </div>

            {/* Column 2: Services */}
            <div>
              <h4 className="font-manrope font-bold text-lg mb-4 text-white">
                Services
              </h4>
              <p className="text-sm text-gray-400">VIP Meet Services</p>
              <p className="text-sm text-gray-400">Private Suite</p>
              <p className="text-sm text-gray-400">Private Suite</p>
              <p className="text-sm text-gray-400">Private Suite</p>
              <p className="text-sm text-gray-400">Luxury Chauffeur</p>
            </div>

            {/* Column 3: Information */}
            <div>
              <h4 className="font-manrope font-bold text-lg mb-4 text-white">
                Information
              </h4>
              <p className="text-gray-400 text-sm">About Us</p>
              <p className="text-gray-400 text-sm">Contact Us</p>
              <p className="text-gray-400 text-sm">FAQs</p>
            </div>

            {/* Column 4: Follow Us */}
            <div>
              <h4 className="font-manrope font-bold text-lg mb-4 text-white">
                Follow Us
              </h4>
              <div className="flex gap-4">
                <Facebook className="w-6 h-6 text-gray-700 hover:text-blue-600 transition-colors" />
                <Twitter className="w-6 h-6 text-gray-700 hover:text-blue-400 transition-colors" />
                <Instagram className="w-6 h-6 text-gray-700 hover:text-pink-500 transition-colors" />
                <Linkedin className="w-6 h-6 text-gray-700 hover:text-blue-700 transition-colors" />
              </div>
            </div>
          </div>
          <div>
            <p className="text-gray-300 my-4">
              Airport Assist is a proud BTA, AMAC, BBCA and EBAA member.
            </p>
            <div className="flex gap-2">
              <img className="w-32" src="/BTA.png" alt="" />
              <img className="w-32" src="/EBAA.png" alt="" />
              <img className="w-32" src="/BBGA.png" alt="" />
            </div>
          </div>
        </div>
        <span
          className="
            absolute left-0 right-0 bottom-0 h-1 rounded-full
            transition-opacity duration-300 opacity-100
            bg-[linear-gradient(90deg,rgba(153,120,95,0)_0%,rgba(171,155,144,0.4)_50%,rgba(153,120,95,0)_100%)]
          "
        />
      </div>
      <div className="flex justify-between py-4">
        <p className="text-gray-300">© 2025 Airport Assist All rights reserved.</p>
        <p className="text-gray-300">Terms & Conductions | Private Policy | Cookies Policy </p>
      </div>
    </footer>
  );
};

export default Footer;
