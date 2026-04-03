import PackageCards from "../PackageCards";

type Props = {};

export default function ChoosePackages(props: Props) {
  return (
    <section>
      <h1 className="pt-5 pb-4.5 uppercase text-center font-[Manrope] font-normal text-[25px] leading-[100%] tracking-[0.625rem] uppercase">
        Our Service Packages
      </h1>
      <p className="font-[Manrope] font-normal text-md leading-[150%] tracking-[0.09em] text-center text-[#6D6D6D] max-w-190 mx-auto">
        Airport Assist is a premium airport concierge service offering seamless,
        personalised arrivals, departures, and connections for business and
        leisure travellers.
      </p>
      <div className="py-11 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-26">
        <PackageCards />
      </div>
    </section>
  );
}
