import ServicesList from "../ServicesList";
import { ArrowUpRight } from "lucide-react";
import { Button } from "../ui/button";

const ExclusiveContent = () => {
  return (
    // <section className="min-h-screen px-28 py-16 flex flex-col items-center">
    <section className=" px-4 sm:px-8 md:px-10 lg:px-28 py-8 lg:py-16 flex flex-col items-center">
      <h2 className="font-manrope text-center font-normal text-[25px] leading-[100%] tracking-[10px] uppercase">
        Discover exclusive content
      </h2>
      <p className="mx-auto pt-6 text-gray-500 font-normal text-normal leading-[150%] tracking-widest text-center font-[manrope] max-w-xl">
        Receive insider tips on VIP airport services, fast-track travel advice,
        and exclusive updates.
      </p>

      <Button
        variant="outline"
        className="my-10 min-w-[140px] mb-6 py-5 border-black hover:bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)] hover:text-white hover:border-white duration-0"
      >
        <p className="text-sm">Read more</p>
        <ArrowUpRight />
      </Button>

      <div className="lg:gap-8 w-full lg:flex max-w-360">
        <div className="h-max flex-2 lg:flex lg:gap-8">
          {/* Card 1 */}
          <div className="flex-1  flex flex-col">
            <div className="overflow-hidden rounded-lg aspect-square group">
              <img
                src="/sections/exclusive/exclusive_1.webp"
                alt=""
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <h3 className="mt-6 text-[15px] font-[manrope] font-semibold tracking-[3px]">
              VIP AIRPORT MEET & GREET, FAST TRACK at Heathrow
            </h3>
            <p className="text-[#6D6D6D] text-[13px] mt-4  font-[manrope] font-medium text-normal">
              Experience Ultimate Luxury and Convenience with VIP Services at
              London Heathrow Airport
            </p>
          </div>

          {/* Card 2 */}
          <div className="h-max flex-1 flex flex-col">
            <div className="overflow-hidden rounded-lg aspect-square group">
              <img
                src="/sections/exclusive/exclusive_2.webp"
                alt=""
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <h3 className="mt-6 text-[15px] font-[manrope] font-semibold tracking-[3px]">
              VIP Fast Track at Charles de Gaulle Airport
            </h3>
            <p className="text-[#6D6D6D] text-[13px] mt-4 font-[manrope] font-medium">
              Avoid long waits at security and immigration with Airport Assist’s
              CDG Fast Track
            </p>
          </div>
        </div>
        <ServicesList />
      </div>
    </section>
  );
};

export default ExclusiveContent;
