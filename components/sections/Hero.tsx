import Image from 'next/image'
import HeroContent from '../HeroContent'
import hero from "@/public/bg.jpg";

type Props = {}

const Hero = (props: Props) => {
  return (
      <section className="relative min-h-screen w-full text-white flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0 -z-10">
          <Image src={hero} alt="background" fill className="object-cover" />
          {/* Gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(14.45deg, rgba(2, 2, 2, 0.0546) -17.37%, rgba(11, 11, 11, 0.78) 21.48%)",
            }}
          />
        </div>
        {/* Hero section */}
        <HeroContent />
      </section>
  )
}

export default Hero