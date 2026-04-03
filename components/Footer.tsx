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
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#1a1a1a] pt-12 pb-4 px-8">
      <div className="max-w-360 mx-auto">
        {/* Logo و المحتوى الرئيسي */}
        <div className="flex flex-col lg:flex-row gap-8 py-6">
          {/* اللوجو */}
          <div className="lg:flex-1 flex items-center justify-center lg:justify-start">
            <Image
              src="/logo.png"
              alt="Company Logo"
              width={200}
              height={80}
              className="mx-auto object-contain"
            />
          </div>

          {/* الأعمدة الرئيسية */}
          <div className="lg:flex-[3]">
            {/* الصف الأول: المعلومات الأساسية */}
            {/* <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 pb-8"> */}
            <div className="relative flex flex-col lg:flex-row justify-between pr-24 gap-2 pb-8">
              <span className="absolute left-0 right-0 bottom-0 h-0.5 rounded-full transition-opacity duration-300 opacity-100 bg-[linear-gradient(90deg,rgba(153,120,95,0)_0%,rgba(171,155,144,0.4)_50%,rgba(153,120,95,0)_100%)]" />

              {/* Our Office */}
              <div className="[&>*:not(h4)]:text-[#6D6D6D] [&>*:not(h4)]:text-sm">
                <h4 className="font-[Manrope] tracking-[3px] font-bold text-lg mb-4 text-white">
                  Our Office
                </h4>
                <ul className="space-y-2">
                  <li className="flex gap-2">
                    <Mail color="white" className="flex-shrink-0" />
                    <p className="text-sm lowercase">
                      enquires@airport-assist.com
                    </p>
                  </li>
                  <li className="flex gap-2">
                    <Phone color="white" className="flex-shrink-0" />
                    <p className="text-sm">+44 20 4517 7711</p>
                  </li>
                  <li className="flex gap-2">
                    <MapPin color="white" className="flex-shrink-0" />
                    <p className="text-sm">
                      Eastern Perimeter Rd, Hatton, London,TW6 2SB
                    </p>
                  </li>
                </ul>
              </div>

              {/* Services */}
              <div className="[&>*:not(h4)]:text-[#6D6D6D] [&>*:not(h4)]:text-sm">
                <h4 className="font-[Manrope] tracking-[3px] font-bold text-lg mb-4 text-white">
                  Services
                </h4>
                <ul className="space-y-1">
                  <li>
                    <Link href={"/our-services/vip-meet-and-greet"}>
                      VIP Meet Services
                    </Link>
                  </li>
                  <li>
                    <Link href={"/our-services/private-suite"}>
                      Tarmac Services
                    </Link>
                  </li>
                  <li>
                    <Link href={"/our-services/chauffeuring"}>
                      Chauffeur Services
                    </Link>
                  </li>
                  <li>
                    <Link href={"/private-jet"}>Private Jet Services</Link>
                  </li>
                  <li>
                    <Link href={"/our-services/hotel"}>Grand Hotel</Link>
                  </li>
                </ul>
              </div>

              {/* Information */}
              <div className="[&>*:not(h4)]:text-[#6D6D6D] [&>*:not(h4)]:text-sm">
                <h4 className="font-[Manrope] font-bold text-lg tracking-[3px] mb-4 text-white">
                  Information
                </h4>
                <ul className="space-y-1">
                  {/* <li>
                    <Link href="/why-us">About Us</Link>
                  </li> */}
                  <li>
                    {/* <Link href="/why-us-expand">About Us (expand)</Link> */}
                    <Link href="/why-us-expand">About Us</Link>
                  </li>
                  <li>
                    <Link href="/contact-us">Contact Us</Link>
                  </li>
                  <li>
                    <Link href="/frequently-asked-questions">FAQs</Link>
                  </li>
                </ul>
              </div>

              {/* Follow Us */}
              <div className="[&>*:not(h4)]:text-[#6D6D6D] [&>*:not(h4)]:text-sm">
                <h4 className="font-[Manrope] tracking-[3px] font-bold text-lg mb-4 text-white">
                  Follow Us
                </h4>
                <div className="flex gap-4">
                  <Facebook
                    color="#6D6D6D"
                    className="w-6 h-6  transition-colors cursor-pointer"
                  />
                  <Instagram
                    color="#6D6D6D"
                    className="w-6 h-6 transition-colors cursor-pointer"
                  />
                  <Linkedin
                    color="#6D6D6D"
                    className="w-6 h-6  transition-colors cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* الصف التاني: الشعارات والدفع */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pb-4">
              {/* الشعارات */}
              <div className="lg:col-span-3">
                <p className="text-[#6D6D6D] my-4">
                  Airport Assist is a proud member.
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  <a target="blank" href="https://bbga.aero/">
                    <Image
                      width={108}
                      height={31}
                      className=""
                      src="/footer/bbga.webp"
                      alt="BBGA"
                    />
                  </a>
                  <a target="blank" href="https://www.ebaa.org/">
                    <Image
                      width={115}
                      height={31}
                      className=""
                      src="/footer/ebaa.webp"
                      alt="BTA"
                    />
                  </a>
                  <Image
                    width={69}
                    height={31}
                    className=""
                    src="/footer/amac.webp"
                    alt="EBAA"
                  />
                  <a target="blank" href="https://www.thebta.org.uk/">
                    <Image
                      width={180}
                      height={31}
                      className=""
                      src="/footer/bta.webp"
                      alt="BTA"
                    />
                  </a>
                </div>
              </div>

              {/* طرق الدفع */}
              <div>
                <p className="text-[rgb(138,131,124)] mt-4">We do accept</p>
                <div>
                  <Image
                    width={147}
                    height={38}
                    src={payments}
                    // className="grayscale"
                    alt="Payment methods"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* الفوتر السفلي */}
        <div className="relative pt-4">
          <span className="absolute left-0 right-0 top-0 h-0.5 rounded-full transition-opacity duration-300 opacity-100 bg-[linear-gradient(90deg,rgba(153,120,95,0)_0%,rgba(171,155,144,0.4)_50%,rgba(153,120,95,0)_100%)]" />

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
            <p className="text-[#6D6D6D] text-sm">
              <CurrentYear /> Airport Assist. All rights reserved.
            </p>
            <p className="text-[#6D6D6D] text-sm">
              <Link
                href="/terms-and-conditions"
                className="hover:text-white transition-colors"
              >
                Terms & Conditions |
              </Link>{" "}
              <Link
                className="hover:text-white transition-colors"
                href={"/privacy-policy"}
              >
                Privacy Policy | Cookies Policy
              </Link>
            </p>
            <a
              href="https://smartlines-eg.com/"
              className="text-[#6D6D6D] text-sm hover:text-white transition-colors"
            >
              Powered by Smart Lines
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

const CurrentYear = () => {
  const time = new Date();
  const current_year = time.getFullYear();
  return <span>© {current_year}</span>;
};
