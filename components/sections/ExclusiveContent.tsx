import ServicesList from "../ServicesList";
import { ArrowUpRight } from "lucide-react";
import { Button } from "../ui/button";

const ExclusiveContent = () => {
  return (
    // <section className="min-h-screen px-28 py-16 flex flex-col items-center">
    <section className=" px-28 py-16 flex flex-col items-center">
      <h2 className="font-manrope text-center font-normal text-3xl leading-[100%] tracking-[10px] uppercase">
        Discover exclusive content
      </h2>
      <p className="mx-auto pt-6 text-gray-500 font-normal text-normal leading-[150%] tracking-widest text-center font-[manrope] max-w-xl">
        Receive insider tips on VIP airport services, fast-track travel advice,
        and exclusive updates.
      </p>

      <Button
        variant="outline"
        className=" my-10  w-max mb-6 py-6 px-10 border-black hover:bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)] hover:text-white hover:border-white duration-0"
      >
        <p className="text-xl">Read more</p>
        <ArrowUpRight />
      </Button>

      <div className="gap-8 w-full flex max-w-360">
        {/* Card 1 */}
        <div className="flex-1 flex flex-col">
          <div className="overflow-hidden rounded-lg aspect-square group">
            <img
              src="/sections/river.jpg"
              alt=""
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
          <h3 className="mt-6 font-[manrope] font-semibold text-xl tracking-[4px]">
            VIP Fast Track at Heathrow
          </h3>
          <p className="text-[rgb(100,96,125)] mt-auto  font-[manrope] font-medium text-normal">
            Experience Ultimate Luxury and Convenience with VIP Services at
            London Heathrow Airport
          </p>
        </div>

        {/* Card 2 */}
        <div className="flex-1 flex flex-col">
          <div className="overflow-hidden rounded-lg aspect-square group">
            <img
              src="/sections/river.jpg"
              alt=""
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
          <h3 className="mt-6 font-[manrope] font-semibold text-xl tracking-[4px]">
            VIP Fast Track at Charles de Gaulle Airport
          </h3>
          <p className="text-gray-500 mt-auto  font-[manrope] font-medium text-lg">
            Avoid long waits at security and immigration with Airport Assist’s
            CDG Fast Track
          </p>
        </div>
        <ServicesList />
      </div>
    </section>
  );
};

export default ExclusiveContent;
