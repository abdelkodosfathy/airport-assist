import Header from "@/components/Header";
import hero from "@/public/our-sercives-hero.jpg";
import Image from "next/image";
import ServiceSection from "./components/services-section";

const page = () => {
  return (
    <main>
      <Header />

      <section className="relative w-full h-[456px] text-white flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 -z-10">
          <Image
            src={hero}
            alt="background"
            fill
            className="object-cover w-full h-full"
            priority
          />

          {/* Gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(14.45deg, rgba(2, 2, 2, 0.0546) -17.37%, rgba(11, 11, 11, 0.78) 21.48%)",
            }}
          />
        </div>

        {/* Hero content */}
        <div className="relative z-10">
          <h1
            className="
    font-[Manrope]
    font-bold
    text-[42px]
    leading-[130%]
    tracking-[8.25px]
    text-center
    mb-4.25
  "
          >
            VIP Meet & Greet Services
          </h1>

          <p
            className="
    font-[Manrope]
    font-normal
    text-[18px]
    leading-[100%]
    tracking-[0px]
    text-center
    text-[rgb(200,200,200)]
  "
          >
            Home / Our Services
          </p>
        </div>
      </section>
      <section>
        <div className="max-w-[1130px] flex items-center gap-2 pt-10 mx-auto">
          {/* Item 1 */}
          <p className="font-[Manrope] font-normal text-[20px] leading-[160%] tracking-[0.01em] text-right">
            VIP Meet & Greet Services
          </p>

          {/* Gradient Line */}
          <span
            className="
      block
      w-23.25
      h-[4.5px]
      rounded-[106.29px]
      opacity-100
    "
            style={{
              background:
                "linear-gradient(269.95deg, rgba(255,255,255,0.3) 11.88%, rgba(162,127,95,0.5) 51.11%, rgba(255,255,255,0.3) 90.35%)",
            }}
          ></span>

          {/* Item 2 */}
          <p className="font-[Manrope] font-normal text-[20px] leading-[160%] tracking-[0.01em] text-right">
            VIP Private Suite Service
          </p>
          <span
            className="
      block
      w-23.25
      h-[4.5px]
      rounded-[106.29px]
      opacity-100
    "
            style={{
              background:
                "linear-gradient(269.95deg, rgba(255,255,255,0.3) 11.88%, rgba(162,127,95,0.5) 51.11%, rgba(255,255,255,0.3) 90.35%)",
            }}
          ></span>
          {/* Item 3 */}
          <p className="font-[Manrope] font-normal text-[20px] leading-[160%] tracking-[0.01em] text-right">
            Professional Chauffeurs
          </p>
          <span
            className="
      block
      w-23.25
      h-[4.5px]
      rounded-[106.29px]
      opacity-100
    "
            style={{
              background:
                "linear-gradient(269.95deg, rgba(255,255,255,0.3) 11.88%, rgba(162,127,95,0.5) 51.11%, rgba(255,255,255,0.3) 90.35%)",
            }}
          ></span>
          {/* Item 4 */}
          <p className="font-[Manrope] font-normal text-[20px] leading-[160%] tracking-[0.01em] text-right">
            Private Jet
          </p>
        </div>
      </section>
      <ServiceSection />
      <ServiceSection left />
      <ServiceSection />
    </main>
  );
};

export default page;

          {/* 
            <button className=" border-1 border-[rgb(150,107,75)] rounded-[16px] text-white font-normal text-base"
            style={{
              background:"linear-gradient(0deg, #7B5A41 0.64%, #DFB08D 223.79%)",
            }}>
              <div
              className="w-full mt-[6px] px-[40px] py-0.75 rounded-[16px]"
                style={{
                  background:
                    "linear-gradient(179.26deg, #7B5A41 0.64%, #DFB08D 223.79%)",
                }}
              >
                <p
                  style={{
                    fontFamily: "Manrope",
                    fontWeight: "400",
                    fontStyle: "Regular",
                    fontSize: "16px",
                    lineHeight: "40.34px",
                    letterSpacing: "0px",
                  }}
                >
                  Book Now
                </p>
              </div>
            </button> */}