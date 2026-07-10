// "use client";

// import serviceImage from "@/public/arravial package.jpg";
// import { useSingleAirport } from "@/lib/hooks/useAirports";
// import { AirportPackage } from "@/lib/types/airport";
// import PackageCard from "./pkg-card";
// import AirportForm from "./airport-form";
// import { useQueryParam } from "@/lib/hooks/useParams";
// import { useEffect, useState } from "react";
// import { useAirportStore } from "@/store/vipInputsStore";
// import MainButton from "@/components/MainButton";
// import { Mail, Phone } from "lucide-react";

// export default function Locations() {
//   // const airportId = useAirportStore((state) => state.airport?.airport_id);

//   const airportId = useQueryParam("airport");
//   const { data, isLoading, isError } = useSingleAirport(
//     airportId?.toString() || "",
//   );
//   const setAirport = useAirportStore((s) => s.setAirport);
//   useEffect(() => {
//     if (!data?.data.airport) return;
//     setAirport(data.data.airport);
//   }, [data]);

//   if (isLoading) {
//   }

//   if (isError || !data) {
//   }

//   return (
//     <section className="my-11.25 px-8">
//       <div className=" max-w-410 mx-auto px-10">
//         <p className="text-[#8E8E93] font-medium">Choose how to travel</p>
//         <h3 className="text-[22px] tracking-[7px] uppercase mb-7">
//           Services Level Available
//         </h3>
//         {(isLoading || !data) && <PackagesListSkeleton />}

//         {!isLoading && data && (
//           <PackagesList packages={data.data.airport.airport_packages} />
//         )}

//         {!isLoading && isError && (
//           <p className="text-red-500">Something went wrong</p>
//         )}
//         {/* </div> */}
//       </div>
//     </section>
//   );
// }

// const PackagesList = ({ packages }: { packages: AirportPackage[] }) => {
//   console.log(packages);
//   const packagesList = packages.filter((pkg) => {
//     return (
//       pkg.package.package_slug === "elite" ||
//       pkg.package.package_slug === "signature"
//     );
//   });

//   const [activePackage, setActivePackage] = useState<AirportPackage>(
//     packagesList[0],
//   );

//   return (
//     <>
//       <div className="flex gap-2 mb-6">
//         {packagesList.map((pkg) => {
//           return (
//             <MainButton
//               isActive={pkg === activePackage}
//               onClick={() => setActivePackage(pkg)}
//               className="min-w-45"
//               key={pkg.package.package_slug}
//             >
//               {pkg.package.package_name}
//             </MainButton>
//           );
//         })}
//       </div>
//       <div className="flex gap-6">
//         <div className="flex-3 space-y-6">
//           {/* {packages.map((pkg, i) => {
//         const slug = pkg.package.package_slug;
//         if (slug === "elite_plus" || slug === "vip") return;
//         return (
//           <PackageCard
//             key={slug}
//             pkg={pkg}
//             index={i}
//             serviceImage={serviceImage}
//           />
//         );
//       })} */}
//           <PackageCard
//             // key={activePackage.package.package_slug}
//             pkg={activePackage}
//             serviceImage={serviceImage}
//           />
//         </div>
//         <div className="flex-1 h-fit space-y-6">
//           <div className="py-6.5 px-4 h-fit bg-white rounded-xl shadow-sm">
//             <AirportForm />
//           </div>
//           <div className="py-6.5 px-4 h-fit bg-white rounded-xl shadow-sm">
//             <div className="">
//               <h4 className="font-[Manrope] font-semibold">
//                 Need more information?
//               </h4>
//               <p className="normal-case text-sm text-[#7a7a7a] leading-[27px]">
//                 Our dedicated team are available to discuss all aspects of our
//                 service.
//               </p>
//               <ul className="normal-case text-[#7a7a7a] space-y-2 mt-2">
//                 <li className="flex gap-2 items-center">
//                   {/* <CMail /> */}
//                   <div className="w-8 h-8 rounded-full shadow-sm grid place-items-center border border-[#E0E0E0]">
//                     <Mail size={16} color="#a7a7a7" />
//                   </div>
//                   <p>Contact@airport-assist.com</p>
//                 </li>
//                 <li className="flex gap-2 items-center">
//                   <div className="w-8 h-8 rounded-full shadow-sm grid place-items-center border border-[#E0E0E0]">
//                     <Phone size={16} color="#a7a7a7" />
//                   </div>

//                   <p>+44 20 4517 7711</p>
//                 </li>
//                 <li className="flex gap-2 items-center">
//                   <div className="w-8 h-8 rounded-full shadow-sm grid place-items-center border border-[#E0E0E0]">
//                     <svg viewBox="0 0 24 24" fill="none" width={16} height={16}>
//                       <path
//                         d="M12 2a10 10 0 00-8.5 15.3L2 22l4.8-1.5A10 10 0 1012 2z"
//                         stroke="#a7a7a7"
//                         strokeWidth={1.6}
//                       />
//                       <path
//                         d="M8.5 8.5c0 3 3 6 6 6 .8 0 1.3-.4 1.6-1l-1.8-1-1 .8c-1.2-.5-2.3-1.6-2.8-2.8l.8-1-1-1.8c-.6.3-1 .8-.8 1.8z"
//                         fill="currentColor"
//                       />
//                     </svg>
//                   </div>

//                   <p>Contact us via WhatsApp</p>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// const SkeletonBox = ({ className = "" }) => (
//   <div className={`bg-gray-200 animate-pulse rounded ${className}`} />
// );

// const PackageCardSkeleton = ({ dark = false }) => {
//   return (
//     <div
//       className={`px-8 py-5 rounded-xl shadow-sm ${
//         dark ? "bg-[#1A1A1A]" : "bg-white"
//       }`}
//     >
//       {/* Title */}
//       <SkeletonBox className="h-6 w-32 mb-3" />

//       {/* Subtitle */}
//       <SkeletonBox className="h-4 w-40 mb-4" />

//       {/* Description lines */}
//       <div className="space-y-2 mb-6">
//         <SkeletonBox className="h-3 w-full" />
//         <SkeletonBox className="h-3 w-full" />
//         <SkeletonBox className="h-3 w-4/5" />
//       </div>

//       <div className="flex gap-24">
//         {/* Image skeleton */}
//         <SkeletonBox className="h-[373px] w-[166px]" />

//         {/* List skeleton */}
//         <div className="space-y-3 w-full">
//           <SkeletonBox className="h-4 w-24 mb-3" />
//           <SkeletonBox className="h-3 w-3/4" />
//           <SkeletonBox className="h-3 w-2/3" />
//           <SkeletonBox className="h-3 w-4/5" />
//           <SkeletonBox className="h-3 w-1/2" />
//         </div>
//       </div>
//     </div>
//   );
// };
// const PackagesListSkeleton = () => {
//   return (
//     <div className="flex-3 space-y-6">
//       <PackageCardSkeleton />
//       <PackageCardSkeleton dark />
//     </div>
//   );
// };

"use client";

import serviceImage from "@/public/arravial package.jpg";
import { useSingleAirport } from "@/lib/hooks/useAirports";
import { AirportPackage } from "@/lib/types/airport";
import PackageCard from "./pkg-card";
import AirportForm from "./airport-form";
import { useQueryParam } from "@/lib/hooks/useParams";
import { useEffect, useState } from "react";
import { useAirportStore } from "@/store/vipInputsStore";
import MainButton from "@/components/MainButton";
import { Mail, Phone } from "lucide-react";

export default function Locations() {
  // const airportId = useAirportStore((state) => state.airport?.airport_id);

  const airportId = useQueryParam("airport");
  const { data, isLoading, isError } = useSingleAirport(
    airportId?.toString() || "",
  );
  const setAirport = useAirportStore((s) => s.setAirport);
  useEffect(() => {
    if (!data?.data.airport) return;
    setAirport(data.data.airport);
  }, [data]);

  if (isLoading) {
  }

  if (isError || !data) {
  }

  return (
    // <section className="my-11.25 px-8">
    <section className="my-10 lg:my-11 px-4 sm:px-6 lg:px-8">
      {/* <div className=" max-w-410 mx-auto px-10"> */}
      <div className="max-w-410 mx-auto px-0 sm:px-4 lg:px-10">
        <p className="text-[#8E8E93] font-medium">Choose how to travel</p>
        {/* <h3 className="text-[22px] tracking-[7px] uppercase mb-7"> */}
        <h3 className="text-xl sm:text-2xl tracking-[3px] sm:tracking-[7px] uppercase mb-7">
          Services Level Available
        </h3>
        {(isLoading || !data) && <PackagesListSkeleton />}

        {!isLoading && data && (
          <PackagesList packages={data.data.airport.airport_packages} />
        )}

        {!isLoading && isError && (
          <p className="text-red-500">Something went wrong</p>
        )}
        {/* </div> */}
      </div>
    </section>
  );
}

const PackagesList = ({ packages }: { packages: AirportPackage[] }) => {
  console.log(packages);
  const packagesList = packages.filter((pkg) => {
    return (
      pkg.package.package_slug === "elite" ||
      pkg.package.package_slug === "signature"
    );
  });

  const [activePackage, setActivePackage] = useState<AirportPackage>(
    packagesList[0],
  );

  return (
    <>
      <div className="flex flex-wrap gap-3 mb-6">
        {packagesList.map((pkg) => {
          return (
            <MainButton
              isActive={pkg === activePackage}
              onClick={() => setActivePackage(pkg)}
              // className="min-w-45"
              className="flex-1 sm:flex-none sm:min-w-45"
              key={pkg.package.package_slug}
            >
              {pkg.package.package_name}
            </MainButton>
          );
        })}
      </div>
      <div className="flex flex-col xl:flex-row gap-6 relative">
        <div className="xl:flex-[3] space-y-6">
         
          <PackageCard
            pkg={activePackage}
            serviceImage={serviceImage}
          />
        </div>
        <div className="xl:flex-1 h-fit space-y-6 sticky bottom-0">
          <div className="py-6.5 px-4 h-fit bg-white rounded-xl shadow-sm">
            <AirportForm />
          </div>
          <div className="py-6.5 px-4 h-fit bg-white rounded-xl shadow-sm">
            <div className="">
              <h4 className="font-[Manrope] font-semibold">
                Need more information?
              </h4>
              <p className="normal-case text-sm text-[#7a7a7a] leading-[27px]">
                Our dedicated team are available to discuss all aspects of our
                service.
              </p>
              <ul className="normal-case text-[#7a7a7a] space-y-2 mt-2">
                <li className="flex gap-2 items-center">
                  {/* <CMail /> */}
                  <div className="w-8 h-8 rounded-full shadow-sm grid place-items-center border border-[#E0E0E0]">
                    <Mail size={16} color="#a7a7a7" />
                  </div>
                  {/* <p>Contact@airport-assist.com</p> */}
                  <p className="break-all sm:break-normal">
                    Contact@airport-assist.com
                  </p>
                </li>
                <li className="flex gap-2 items-center">
                  <div className="w-8 h-8 rounded-full shadow-sm grid place-items-center border border-[#E0E0E0]">
                    <Phone size={16} color="#a7a7a7" />
                  </div>

                  <p>+44 20 4517 7711</p>
                </li>
                <li className="flex gap-2 items-center">
                  <div className="w-8 h-8 rounded-full shadow-sm grid place-items-center border border-[#E0E0E0]">
                    <svg viewBox="0 0 24 24" fill="none" width={16} height={16}>
                      <path
                        d="M12 2a10 10 0 00-8.5 15.3L2 22l4.8-1.5A10 10 0 1012 2z"
                        stroke="#a7a7a7"
                        strokeWidth={1.6}
                      />
                      <path
                        d="M8.5 8.5c0 3 3 6 6 6 .8 0 1.3-.4 1.6-1l-1.8-1-1 .8c-1.2-.5-2.3-1.6-2.8-2.8l.8-1-1-1.8c-.6.3-1 .8-.8 1.8z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>

                  {/* <p>Contact us via WhatsApp</p> */}
                  <p className="break-words">Contact us via WhatsApp</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const SkeletonBox = ({ className = "" }) => (
  <div className={`bg-gray-200 animate-pulse rounded ${className}`} />
);

const PackageCardSkeleton = ({ dark = false }) => {
  return (
    <div
      className={`px-8 py-5 rounded-xl shadow-sm ${
        dark ? "bg-[#1A1A1A]" : "bg-white"
      }`}
    >
      {/* Title */}
      <SkeletonBox className="h-6 w-32 mb-3" />

      {/* Subtitle */}
      <SkeletonBox className="h-4 w-40 mb-4" />

      {/* Description lines */}
      <div className="space-y-2 mb-6">
        <SkeletonBox className="h-3 w-full" />
        <SkeletonBox className="h-3 w-full" />
        <SkeletonBox className="h-3 w-4/5" />
      </div>

      {/* <div className="flex gap-24"> */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-24">
        {/* Image skeleton */}
        {/* <SkeletonBox className="h-[373px] w-[166px]" /> */}
        <SkeletonBox
          className="
        h-60
        w-full
        sm:w-56
        lg:w-[166px]
        lg:h-[373px]
        mx-auto
    "
        />

        {/* List skeleton */}
        {/* <div className="space-y-3 w-full"> */}
        <div className="space-y-3 flex-1">
          <SkeletonBox className="h-4 w-24 mb-3" />
          <SkeletonBox className="h-3 w-3/4" />
          <SkeletonBox className="h-3 w-2/3" />
          <SkeletonBox className="h-3 w-4/5" />
          <SkeletonBox className="h-3 w-1/2" />
        </div>
      </div>
    </div>
  );
};
const PackagesListSkeleton = () => {
  return (
    <div className="flex-3 space-y-6">
      <PackageCardSkeleton />
      <PackageCardSkeleton dark />
    </div>
  );
};
