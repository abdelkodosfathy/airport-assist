import { ArrowUpRight } from "lucide-react";
import { Button } from "../ui/button";

type Props = {};

const Intro = (props: Props) => {
  return (
    <section className="min-h-118.75 gap-4  flex items-center px-26 overflow-hidden">
      <div className="max-w-360 mx-auto flex items-center gap-10">
        {/* Left Text */}
        <div className="flex-2">
          <h2 className="uppercase flex flex-col tracking-[0.3em] leading-[150%] text-3xl whitespace-normal justify-start">
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
            className="my-10 min-w-[140px] mb-6 py-5 border-black hover:bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)] hover:text-white hover:border-white duration-0"
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
