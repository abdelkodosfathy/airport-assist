import Header from "@/components/Header/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import heroImage from "@/public/why-us-hero.jpg";
import InfoContainer from "./InfoContainer";
export default function ServicesLayout() {
  return (
    <main className="bg-[#F7F7F6] font-[Manrope]">
      <Header />

      <section className="bg-[#1A1A1A] relative w-full h-140 text-white flex items-center overflow-hidden">
        {/* Hero content */}
        <div className="relative z-10 mx-auto max-w-340 px-12 flex gap-4 w-full">
          <div className="flex-1 flex flex-col justify-center text-center">
            {/* <p className="text-[#959595] text-[15.53px] font-medium">why</p> */}
            <h1 className=" font-[Manrope] mb-6 text-[25.31px] tracking-[5.63px]">
              AIRPORT ASSIST
            </h1>
            <p className=" font-[Manrope] font-normal mb-8 text-sm leading-[150%] tracking-[1.5px] text-[#959595]">
              Privacy Policy
            </p>
          </div>
        </div>
      </section>
      <section
        className="my-8"
        style={{
          textTransform: "none",
        }}
      >
        <InfoContainer />
      </section>
      <Footer />
    </main>
  );
}
