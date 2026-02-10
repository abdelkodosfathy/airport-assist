import { ArrowUpRight } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

type Props = {};

const Intro = (props: Props) => {
  return (
    <section className="min-h-118.75  h-max gap-4  flex items-center px-4 sm:px-8 md:px-12 lg:px-20 xl:px-26 py-10 lg:py-0 overflow-hidden">
      <div className="w-full max-w-360 lg:mx-auto flex flex-col lg:flex-row lg:items-center gap-10">
        {/* Left Text */}
        <div className="flex-2">
          <h2 className="uppercase flex flex-col tracking-[0.3em] leading-[150%] text-2xl lg:text-3xl whitespace-normal justify-start">
            <span className="">Airport Concierge</span>
            <span>Luxurious & tailored For you.</span>
          </h2>
        </div>

        {/* Right Text */}
        <div className="flex-1 h-full">
          <p className="font-[Manrope] font-normal max-w-90 text-sm lg:text-[15px] leading-[150%] text-[#959595] mb-8">
            AIRPORT Assists Private Travel Division provides discreet, luxury
            concierge travel for VIP clients worldwide.
          </p>
          <Link href={"/why-us"}>
            <Button
              variant="outline"
              className="my-6 min-w-[140px] py-5 border-black hover:bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)] hover:text-white hover:border-white duration-0"
            >
              <p>About Us</p>
              <ArrowUpRight className="size-md" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Intro;
