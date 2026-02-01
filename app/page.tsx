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
export default function HomePage() {
  return (
    <main className="font-[Manrope] max-w-screen overflow-hidden">
      <Header />
      <Hero/>
      <Intro/>
      <HoverExpandCards />
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

// function Backgroundshadow() {
//   return (
//     <div className="bg-[#1A1A1A] min-w-screen min-h-screen absolute left-0 top-0 overflow-hidden">
//       <div className="w-full h-[119px] absolute -left-[5px] -top-0">
//         <div className="inline-flex items-center gap-[178px] absolute left-[619px] top-9">
//           <div className="flex items-center gap-6 absolute left-0 top-[9px]">
//             <button className="cursor-pointer text-nowrap flex p-1.5 justify-center items-center gap-1.5 w-fit">
//               <p className="text-[#FFF] font-manrope text-lg leading-none w-fit">
//                 Services
//               </p>
//             </button>
//             <button className="cursor-pointer text-nowrap flex p-1.5 justify-center items-center gap-1.5 w-fit">
//               <p className="text-[#FFF] font-manrope text-lg leading-none w-fit">
//                 Locations
//               </p>
//             </button>
//           </div>
//           <div className="flex items-end gap-[31px] absolute left-[380px] top-0">
//             <div className="flex items-center gap-6 w-fit">
//               <div className="flex pt-3.5 pr-[9px] pb-3.5 pl-[9px] justify-center items-center rounded-[18px] border-[1.5px] border-[rgba(255,255,255,0.30)] bg-[rgba(255,255,255,0.04)] w-[106px] h-[49px] overflow-hidden">
//                 <div className="flex items-center gap-[9px] w-fit">
//                   <img
//                     src="/Image15.png"
//                     className="rounded-[45.8px] w-[22px] h-[22px] max-w-none"
//                     alt="image 15"
//                   />
//                   <p className="text-[#FFF] font-nunito text-[15px] font-medium leading-[1.4em] w-fit tracking-[0.05em]">
//                     USD
//                   </p>
//                   <svg
//                     width="15"
//                     height="15"
//                     viewBox="0 0 15 15"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="w-3.5 h-3.5 overflow-hidden relative "
//                   >
//                     <path
//                       d="M12.8436 5.37148C12.8843 5.32943 12.9329 5.2958 12.9866 5.27252C13.0402 5.24923 13.098 5.23675 13.1565 5.23578C13.215 5.23481 13.2731 5.24537 13.3275 5.26687C13.382 5.28836 13.4316 5.32036 13.4737 5.36104C13.5157 5.40172 13.5494 5.45029 13.5726 5.50397C13.5959 5.55765 13.6084 5.61539 13.6094 5.67389C13.6103 5.7324 13.5998 5.79052 13.5783 5.84494C13.5568 5.89936 13.5248 5.94902 13.4841 5.99107L9.10539 10.5174C9.06473 10.5595 9.01617 10.5931 8.96249 10.6164C8.9088 10.6397 8.85106 10.6522 8.79254 10.6532C8.73403 10.6542 8.6759 10.6436 8.62148 10.6221C8.56705 10.6006 8.5174 10.5685 8.47536 10.5278L3.94905 6.14911C3.86412 6.06695 3.81531 5.95441 3.81335 5.83626C3.81139 5.71811 3.85645 5.60401 3.93861 5.51908C4.02077 5.43415 4.13331 5.38533 4.25146 5.38338C4.36962 5.38142 4.48371 5.42648 4.56864 5.50864L8.77472 9.57812L12.8436 5.37148Z"
//                       fill="#CECECE"
//                     />
//                   </svg>
//                 </div>
//               </div>
//               <div className="rounded-[18px] bg-linear-[180deg,rgba(255,255,255,0.78)0%,rgba(255,255,255,0.08)100%] w-0.5 h-[41px] overflow-hidden"></div>
//             </div>
//             <div className="flex items-center gap-[29px] w-fit">
//               <p className="text-[#FFF] font-manrope text-base leading-6 w-fit">
//                 Login
//               </p>
//               <button className="cursor-pointer text-nowrap flex py-3 px-6 justify-center items-center gap-2 rounded-xl border border-[#7B5A41] bg-[rgba(255,225,203,0.14)] w-[125px] overflow-hidden">
//                 <p className="text-[#FFF] font-manrope text-base leading-6 w-fit">
//                   Contact Us
//                 </p>
//               </button>
//             </div>
//           </div>
//         </div>
//         <img
//           src="/Aa_logo_web_white1.png"
//           className="w-[167px] h-[71px] absolute left-[78px] top-[33px] max-w-none"
//           alt="AA_logo_web_white 1"
//         />
//       </div>
//       <div className="flex flex-col items-start gap-[15px] w-[605px] h-[237px] absolute left-[50px] top-[238px]">
//         <p className="text-[#FFF] font-manrope text-[25px] leading-none w-full tracking-[0.2222em]">
//           Airport Assist{" "}
//         </p>
//         <p className="shrink-0 text-[#959595] font-manrope text-sm w-full h-[84px] tracking-[0.09em]">
//           Luxury Airport Concierge &amp; Bespoke Travel Solutions Worldwide
//           AIRPORT ASSIST is a leading provider of luxury airport concierge
//           services and bespoke travel solutions for individuals, VIPs,
//           celebrities, and corporate travellers. With decades of experience in
//           premium travel management, we deliver discreet, seamless, and fully
//           personalised journeys—from airport arrival to final destination.
//         </p>
//       </div>
//       <p className="text-[#959595] font-manrope text-base font-medium leading-[1.3em] w-[42px] h-[18px] absolute left-[50px] top-[206px]">
//         Why
//       </p>
//       <img
//         src="/Frame2147207801.png"
//         className="rounded-[8px] border-[0.75px] border-[#E0E0E0] w-[563px] h-[327px] absolute left-[752px] top-40 max-w-none"
//         alt="Frame 2147207801"
//       />
//     </div>
//   );
// }
