// app/chauffeur-services/page.tsx
import Pickup from "./components/Pickup";

export default function ChauffeurPage() {
  return (
    <>
      <p className="font-[Manrope] font-medium text-[15.53px] leading-[130%] text-[#8E8E93] mb-3">
        Choose how to travel
      </p>
      <h2 className="font-[Manrope] font-normal text-[22.6px] leading-[100%] tracking-[7.06px] uppercase mb-6">
        Services Level Available
      </h2>
      <div>
        <Pickup/>
      </div>

    </>
  );
}
