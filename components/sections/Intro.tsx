import { ArrowUpRight } from "lucide-react";
import { Button } from "../ui/button";

type Props = {};

const Intro = (props: Props) => {
  return (
    <section className="min-h-118.75 gap-4  flex items-center px-26 overflow-hidden">
      <div className="max-w-360 mx-auto flex items-center gap-10">
        {/* Left Text */}
        <div className="flex-2">
          <h2 className="uppercase flex flex-col tracking-[0.3em] leading-[150%] text-[2rem] whitespace-normal justify-start">
            <span className="">Airport Concierge</span>
            <span>Luxurious & tailored For you.</span>
          </h2>
        </div>

        {/* Right Text */}
        <div className="flex-1 h-full">
          <p className="font-[Manrope] font-normal max-w-140 text-normal leading-[150%] text-[#959595] mb-8">
            AIRPORT Assists Private Travel Division provides discreet, luxury
            concierge travel for VIP clients worldwide.
          </p>
          <Button
            variant="outline"
            // className="mt-6 w-max mb-6 border-black hover:bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)] hover:text-white hover:border-none duration-0"
            className="
            rounded-md 
            border text-lg font-light border-white/30 text-white 
            px-6 py-4 
            bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)] 
            hover:opacity-90 
            mt-2 sm:mt-0 col-span-2 lg:col-span-1
            hover:text-white
            cursor-pointer
            "
          >
            <p>About Us</p>
            <ArrowUpRight className="size-md" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Intro;
