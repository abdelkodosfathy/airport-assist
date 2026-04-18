import Image from "next/image";
import HeroContent from "../HeroContent";
import hero from "@/public/hero.webp";

const Hero = () => {
  return (
    <section className="relative min-h-screen w-full text-white flex items-center">
      {/* Background Image */}
      <div className="hero-image-wrapper absolute inset-0 -z-10">
        <Image
          rel="preload"
          src={hero}
          alt="background"
          fill
          className="object-cover"
          priority
        />
      </div>
      {/* Hero section */}
      <HeroContent />
    </section>
  );
};

export default Hero;
