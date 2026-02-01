import PackageCards from "../PackageCards";

type Props = {};

export default function ChoosePackages (props: Props) {
  return (
    <section>
      <h1 className="pt-6 pb-6 text-center font-[Manrope] font-normal text-3xl leading-[100%] tracking-[0.625rem] uppercase">
        CHOOSE YOUR PACKAGES
      </h1>
      <p className="font-[Manrope] font-normal text-md leading-[150%] tracking-[0.09em] text-center text-[#6D6D6D]">
        Elevate Your Journey with VIP Concierge, Fast-Track, Meet & Greet
      </p>
      <div className="py-16 m-auto">
        <PackageCards/>
      </div>
    </section>
  );
};
