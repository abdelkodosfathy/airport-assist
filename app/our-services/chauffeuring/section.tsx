// import serviceImage from "@/public/services-image.jpg";
import { Button } from "@/components/ui/button";
import {
  Briefcase,
  Clock4,
  Crown,
  Droplet,
  HandHelping,
  Phone,
  Sparkles,
  UserCheck,
  Users,
  Wifi,
} from "lucide-react";
import Image, { StaticImageData } from "next/image";
import vclass from "@/public/v_class.jpg";

type Props = {
  name: string;
  sectionHeader: string;
  className?: string;
  services: {
    serviceName: string;
    content: string;
    image: StaticImageData;
  }[];
};

const Section = ({ name, sectionHeader, services, className }: Props) => {
  return (
    <section className={`font-[Manrope] bg-[#f7f7f6] py-20 ${className}`}>
      <div className="overflow-visible max-w-310 mx-auto mt-20 mb-26 relative">
        <p className="text-[#8E8E93] font-medium text-[22px] mb-3.5 leading-[130%] tracking-[0px]">
          {name}
        </p>
        <h2 className="font-normal text-[22.6px] mb-5 tracking-[7.06px] uppercase">
          {sectionHeader}
        </h2>
        <div className="space-y-16">
          <CarPreview />
          <CarPreview left />
          <CarPreview />
          <CarPreview left />
        </div>
      </div>
    </section>
  );
};

export default Section;
interface CarPreviewProps {
  left?: boolean;
}

const CarPreview = ({ left = false }: CarPreviewProps) => {
  return (
    <div className="relative">
      {/* Text Content */}
      <div
        className={`${left ? "mr-auto" : "ml-auto"} w-[867px] p-[2px] bg-[linear-gradient(125deg,#A16538a8_0%,#f4f4f2_10%,#f4f4f2_90%,#A16538a8_100%)]`}
      >
        <div className="bg-[#f4f4f2] py-8 flex justify-end">
          <div
            className={`w-[470px] ${left ? "mr-auto ml-37.5" : "ml-auto mr-37.5"}`}
          >
            <h3 className="mb-6 font-bold text-[25px] text-black">
              {/* {serviceName} */}
              Mercedes V-Class
            </h3>

            <p className="font-manrope mb-8 leading-[25px] text-[16px]">
              {/* {content} */}
              Perfect for up to 2 passengers. Includes Mercedes E-Class, Lexus
              ES, Cadillac CT6, or similar.
            </p>

            <div className="flex justify-between">
              <div className="space-y-3 mb-4">
                <div className="flex gap-2">
                  <Users className="text-[#7B5A41]" />
                  <p className="">2 passengers</p>
                </div>
                <div className="flex gap-2">
                  <Briefcase className="text-[#7B5A41]" />
                  <p className="">2 luggage pieces</p>
                </div>
                <div className="flex gap-2">
                  <HandHelping className="text-[#7B5A41]" />
                  <p className="">Luggage assist</p>
                </div>
                <div className="flex gap-2">
                  <UserCheck className="text-[#7B5A41]" />
                  <p className="">Licensed chauffeurs</p>
                </div>
                <div className="flex gap-2">
                  <Droplet className="text-[#7B5A41]" />
                  <p className="">Complimentary water</p>
                </div>
              </div>
              <div className="space-y-3 mb-4">
                <div className="flex gap-2">
                  <Sparkles className="text-[#7B5A41]" />
                  <p className="">Interior sanitizing</p>
                </div>
                <div className="flex gap-2">
                  <Phone className="text-[#7B5A41]" />
                  <p className="">Cell phone chargers</p>
                </div>
                <div className="flex gap-2">
                  <Clock4 className="text-[#7B5A41]" />
                  <p className="">Punctual service</p>
                </div>
                <div className="flex gap-2">
                  <Crown className="text-[#7B5A41]" />
                  <p className="">Luxury & Comfort</p>
                </div>
                <div className="flex gap-2">
                  <Wifi className="text-[#7B5A41]" />
                  <p className="">Complimentary Wi-Fi</p>
                </div>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-max py-4 px-10 rounded-3xl border-black hover:bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)] hover:text-white hover:border-[#664F31] duration-0"
            >
              <p className="font-[Manrope] leading-10 text-normal">
                Select Now
              </p>
            </Button>
          </div>
        </div>
        {/* Image */}
        <div></div>
        <Image
          src={vclass}
          alt={"v class car"}
          className={`h-[376px] w-[542px] absolute z-10 border border-[#E0E0E0] object-cover ${left ? "right-0" : "left-0"} top-1/2 -translate-y-1/2`}
          priority
        />
      </div>
    </div>
  );
};
