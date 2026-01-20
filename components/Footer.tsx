import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  XIcon,
} from "lucide-react";
import Image from "next/image";
import payments from "@/public/footer_payments.png";

const Footer = () => {
  return (
    <footer className="bg-[#1a1a1a] py-12 px-8">
      {/* <div className="relative max-w-360 mx-auto flex flex-col md:flex-row gap-8 py-6"> */}
      <div className="relative mx-auto flex flex-col md:flex-row gap-8 py-6">
        {/* Left Logo */}
        <div className="md:flex-1 flex items-center justify-center md:justify-start">
          <Image
            src="/logo.png"
            alt="Company Logo"
            width={200}
            height={80}
            className="object-contain mx-auto"
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
            <div className="[&>*:not(h4)]:text-[rgb(138,131,124)] [&>*:not(h4)]:text-sm">
              <h4 className="font-[Manrope] tracking-[3px] font-bold text-lg mb-4 text-white">
                Our Office
              </h4>
              <ul className="space-y-2">
                <li className="flex gap-2">
                  <Mail />
                  <p className="text-sm">contact@company.com</p>
                </li>
                <li className="flex gap-2">
                  <Phone />
                  <p className="text-sm">(414) 687 - 5892</p>
                </li>
                <li className="flex gap-2">
                  <MapPin />
                  <p className="text-sm">794 Mcallister</p>
                </li>
              </ul>
            </div>

            {/* Column 2: Services */}
            <div className="[&>*:not(h4)]:text-[rgb(138,131,124)] [&>*:not(h4)]:text-sm">
              <h4 className="font-[Manrope] tracking-[3px] font-bold text-lg mb-4 text-white">
                Services
              </h4>
              <ul className="space-y-1">
                <li>
                  <p>VIP Meet Services</p>
                </li>

                <li>
                  <p>Private Suite</p>
                </li>

                <li>
                  <p>Private Suite</p>
                </li>

                <li>
                  <p>Private Suite</p>
                </li>

                <li>
                  <p>Luxury Chauffeur</p>
                </li>
              </ul>
            </div>

            {/* Column 3: Information */}
            <div className="[&>*:not(h4)]:text-[rgb(138,131,124)] [&>*:not(h4)]:text-sm">
              <h4 className="font-[Manrope] font-bold text-lg tracking-[3px] mb-4 text-white">
                Information
              </h4>
              <ul className="space-y-1">
                <li>
                  <p>About Us</p>
                </li>
                <li>
                  <p>Contact Us</p>
                </li>
                <li>
                  <p>FAQs</p>
                </li>
              </ul>
            </div>

            {/* Column 4: Follow Us */}
            <div className="[&>*:not(h4)]:text-[rgb(138,131,124)] [&>*:not(h4)]:text-sm">
              <h4 className="font-[manrope] tracking-[3px] font-bold text-lg mb-4 text-white">
                Follow Us
              </h4>
              <div className="flex gap-4">
                <Facebook className="w-6 h-6 hover:text-blue-600 transition-colors" />
                <XIcon className="w-6 h-6 hover:text-blue-400 transition-colors" />
                <Instagram className="w-6 h-6 hover:text-pink-500 transition-colors" />
                <Linkedin className="w-6 h-6 hover:text-blue-700 transition-colors" />
              </div>
            </div>
          </div>
          <div className="relative grid grid-cols-2 md:grid-cols-4 gap-8 pb-4">
            <div className="col-span-3">
              <p className="text-[rgb(138,131,124)] my-4">
                Airport Assist is a proud BTA, AMAC, BBCA and EBAA member.
              </p>
              <div className="flex gap-2">
                <img className="w-32" src="/BTA.png" alt="" />
                <img className="w-32" src="/EBAA.png" alt="" />
                <img className="w-32" src="/BBGA.png" alt="" />
              </div>
            </div>
            <div>
              <p className="text-[rgb(138,131,124)] mt-4">we do accept.</p>
              <div>
                <Image
                  width={147}
                  height={38}
                  src={payments}
                  className="grayscale"
                  alt="we do accept payments"
                />
              </div>
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
      <div className="flex max-w-360 mx-auto justify-between py-4">
        <p className="text-gray-300">
          <CurrentYear /> Airport Assist All rights reserved.
        </p>
        <p className="text-gray-300">
          Terms & Conductions | Private Policy | Cookies Policy{" "}
        </p>
        <a
          href="https://smartlines-eg.com/"
          className="text-gray-300 no-underline hover:no-underline"
        >
          Powered by Smart lines
        </a>
      </div>
    </footer>
  );
};

export default Footer;

const CurrentYear = () => {
  const time = new Date();
  const current_year = time.getFullYear();
  return <span>© {current_year}</span>;
};
