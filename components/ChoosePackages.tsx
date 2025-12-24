import PackageCards from "./PackageCards";

type Props = {};

export default function ChoosePackages (props: Props) {
  return (
    <section>
      <h1 className="pt-20 pb-6 text-center font-[Manrope] font-normal text-[56px] leading-[100%] tracking-[0.625rem] uppercase">
        CHOOSE YOUR PACKAGES
      </h1>
      <p className="font-[Manrope] font-normal text-[29px] leading-[150%] tracking-[0.09em] text-center text-gray-500">
        Elevate Your Journey with VIP Concierge, Fast-Track, Meet & Greet
      </p>
      <div className="max-w-360 py-16 m-auto">
        <PackageCards/>
      </div>
    </section>
  );
};
