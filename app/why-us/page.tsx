import Header from "@/components/Header/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import heroImage from "@/public/why-us-hero.jpg";
import InfoContainer from "./InfoContainer";
export default function ServicesLayout() {
  return (
    <main className="bg-[#F7F7F6] font-[Manrope]">
      <Header />

      {/* <section className="bg-[#1A1A1A] relative w-full h-114 text-white flex items-center overflow-hidden"> */}
      {/* <section className="bg-[#1A1A1A] relative w-full min-h-75 lg:min-h-114 text-white flex items-center overflow-hidden pb-4 sm:pb-10 xl:py-10 pt-24 xl:pt-10"> */}
      <section
        className="
    relative
    overflow-hidden

    bg-[#1A1A1A]
    text-white

    min-h-[520px]
    lg:min-h-[620px]

    flex
    items-center

    pt-28
    pb-12

    lg:pt-24
    lg:pb-16
  "
      >
        {/* Hero content */}
        {/* <div className="relative z-10 mx-auto max-w-340 px-4 sm:px-8 xl:px-12 flex flex-col xl:flex-row gap-8 xl:gap-6 w-full justify-between items-center mt-12 xl:mt-20 xl:my-20"> */}
        <div
          className="
relative
z-10

mx-auto

w-full
max-w-[1440px]

px-5
sm:px-8
xl:px-12

flex
flex-col-reverse
lg:flex-row

items-center
justify-between

gap-10
xl:gap-16
"
        >
          <div
            className="
flex-1

w-full

text-center
lg:text-left
"
          >
            <p
              className="text-[#959595] text-xs
sm:text-sm
tracking-[0.3em]
uppercase xl:text-[15.53px] font-medium"
            >
              why
            </p>
            <h1
              className="font-[Manrope] mb-4 xl:mb-6 text-3xl
sm:text-4xl
xl:text-5xl

tracking-tight

font-light xl:tracking-[5.63px]"
            >
              Airport Assist
            </h1>
            <p
              className="normal-case font-[Manrope] font-normal mb-6 xl:mb-8 text-sm leading-[150%] tracking-[1px] xl:tracking-[1.5px] text-[#959595] max-w-xl
lg:mx-0
leading-8
text-[15px] mx-auto xl:mx-0"
            >
              {/* {currentLayout.bodyContent} */}
              Luxury Airport Concierge & Bespoke Travel Solutions Worldwide
              AIRPORT ASSIST is a leading provider of luxury airport concierge
              services and bespoke travel solutions for individuals, VIPs,
              celebrities, and corporate travellers. With decades of experience
              in premium travel management, we deliver discreet, seamless, and
              fully personalised journeys—from airport arrival to final
              destination.
            </p>
          </div>

          {/* Image */}
          {/* <div className="flex-1  max-w-125 sm:w-125  max-h-68.25 sm:h-68.25 relative"> */}
          <div
            className="
                w-full

                max-w-[520px]

                aspect-[4/3]

                relative

                mx-auto
                "
          >
            {/* <Image
              alt="room image"
              src={heroImage}
              className="w-full h-full object-cover"
            /> */}
            <Image
              fill
              src={heroImage}
              alt="Airport"
              className="
                  object-cover
                  rounded-2xl
                "
            />
          </div>
        </div>
      </section>
      {/* <section className="my-8"> */}
      <section className="my-12 lg:my-20">
        {/* <div className="flex items-center justify-between gap-16 mb-8 px-16 max-w-440 mx-auto"> */}
        <div
          className="
        grid

        grid-cols-1
        md:grid-cols-3

        gap-8

        px-5
        sm:px-8
        lg:px-12

        max-w-[1440px]

        mx-auto

        mb-12
    "
        >
          <TopCard
            title="Stress-Free Airport Travel"
            content="Avoid long queues and delays with personalised VIP airport services at departure and arrival."
          />
          <TopCard
            title="Prompt, End-to-End Assistance"
            content="From curbside arrival and check-in to VIP lounges and aircraft boarding, we support you every step of the way."
          />
          <TopCard
            title="Luxury, Discretion & Reliability"
            content="Our experienced VIP agents are professional, discreet, and committed to delivering a premium airport concierge experience."
          />
        </div>

        <InfoContainer />
      </section>
      <Footer />
    </main>
  );
}

const TopCard = ({ title, content }: { title: string; content: string }) => {
  return (
    // <div>
    <div
      className="
        text-center

        md:text-left

        md:border-r md:border-r-2

        md:last:border-r-0

        border-[#E5E5E5]

        md:pr-8
    "
    >
      <h3
      className="
font-semibold

tracking-[1px]

text-lg

mb-3
"
      >{title}</h3>
      <p className="
text-[15px]

leading-7

text-[#6D6D6D]
">{content}</p>
    </div>
  );
};
