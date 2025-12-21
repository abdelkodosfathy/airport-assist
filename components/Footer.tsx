import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-[#1a1a1a] py-12 px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
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

        {/* Right Columns */}
        <div className="relative md:flex-3 grid grid-cols-2 md:grid-cols-4 gap-8 ">
          <span
            className="
            absolute left-0 right-0 -bottom-6 h-1 rounded-full
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
        
      </div>
    </footer>
  );
};

export default Footer;
