import {
  Hero,
  Intro,
  HoverExpandCards,
  AirportInvitation,
  ChoosePackages,
  PopularDestinations,
  PrivateSuites,
  ExclusiveContent,
} from "@/components/sections";

import Footer from "@/components/Footer";
import Header from "@/components/Header/Header";
import VerticalCausel from "@/components/sections/VerticalCausel";
export default function HomePage() {
  return (
    <main className="font-[Manrope] max-w-screen">
      <Header />
      <Hero/>
      <Intro/>
      <HoverExpandCards />
      <VerticalCausel/>
      <section className="py-20">
        <AirportInvitation
          heading="Airport by Invitation"
          content="It is our most exclusive service, delivering the highest level of luxury airport assistance in over 100 destinations worldwide"
          imgOne="/sections/img1.jpg"
          imgTwo="/sections/img2.jpg"
        />
        <AirportInvitation
          heading="Premium Airport Concierge"
          content="With Airport Assist, travel effortlessly with personalised Meet & Greet, Fast-Track Security & Immigration, and seamless support from curbside to gate"
          imgOne="/sections/img3.jpg"
          imgTwo="/sections/img4.jpg"
          left
        />
      </section>
      <ChoosePackages />
      <PopularDestinations />
      <PrivateSuites />
      <ExclusiveContent/>
      <Footer />
      {/* <Backgroundshadow /> */}
    </main>
  );
}