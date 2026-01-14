// app/choose-services/layout.tsx
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import hero from "@/public/our-sercives-hero.jpg";
import HeroTitle from "./HeroTitle";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="bg-[#F7F7F6] font-[Manrope]">
      <Header />

      <section className="relative w-full h-114 text-white flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={hero}
            alt="background"
            fill
            className="object-cover"
            priority
          />

          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(14.45deg, rgba(2, 2, 2, 0.0546) -17.37%, rgba(11, 11, 11, 0.78) 21.48%)",
            }}
          />
        </div>

        <div className="relative z-10 h-full flex flex-col justify-center mx-auto">
          <HeroTitle />
        </div>
      </section>

      <section className="w-full max-w-340 mx-auto mt-20 mb-26 px-4 relative">
        {children}
      </section>

      <Footer />
    </main>
  );
}
