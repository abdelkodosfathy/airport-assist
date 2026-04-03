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
import BackToTop from "@/components/BackToTop";
import { cards } from "@/components/sections/HoverExpandCards";
export default function HomePage() {
  return (
    <main className="font-[Manrope] max-w-screen capitalize">
      <Header />
      <Hero />
      <Intro />
      <HoverExpandCards />
      <section className="py-20 flex flex-col gap-12.5">
      {/* <VerticalCausel cards={cards}/> */}
      <VerticalCausel/>
        <AirportInvitation
          heading="Airport by Invitation"
          content="It is our most exclusive service, delivering the highest level of luxury airport assistance in over 100 destinations worldwide"
          imgOne="/sections/Airport by Invitation/Airport by Invitation_1.png"
          imgTwo="/sections/Airport by Invitation/Airport by Invitation_2.png"
        />
        <AirportInvitation
          heading={`Airport \nConcierge`}
          content="With Airport Assist, travel effortlessly with personalised Meet & Greet, Fast-Track Security & Immigration, and seamless support from curbside to gate"
          imgOne="/sections/Airport  Concierge/airport_concierge_1.png"
          imgTwo="/sections/Airport  Concierge/airport_concierge_2.png"
          left
        />
      </section>
      <ChoosePackages />
      <PopularDestinations />
      <PrivateSuites />
      <ExclusiveContent />
      <Footer />
      <BackToTop />
    </main>
  );
}
