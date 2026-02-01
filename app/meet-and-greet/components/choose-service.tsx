// "use client";

// import ServiceCard from "./ServiceCard";
// import { usePackages } from "@/lib/hooks/usePackages";
// import { Package } from "@/lib/types/package";
// import { useState } from "react";

// const ChooseService = () => {
//   const [selectedPackage, setSelectedPackage] = useState<Package>();
//   const { data, isLoading, isError, error } = usePackages();
//   const packagesList: Package[] | undefined = data?.data.packages;

//   const handleSelectPackage = (selectedPackage:Package) => {
//     setSelectedPackage(selectedPackage);
//     console.log(selectedPackage);
//   }

//   return (
//     <div className="flex-2 h-full">
//       <div
//         style={{
//           boxShadow: "0px 11.48px 114.76px 0px #A7A7A73D",
//         }}
//         className="px-10 py-6 bg-white rounded-2xl h-full"
//       >
//         <h4 className="text-normal">
//           Kindly review the service descriptions below and confirm your
//           selection.
//         </h4>

//         {packagesList?.map((s) => (
//           <ServiceCard
//             key={`package_${s.package_id}`}
//             service={s}
//             selectedService={
//               selectedPackage?.package_slug || packagesList[0]?.package_slug
//             }
//             onSelect={handleSelectPackage}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ChooseService;

"use client";

import ServiceCard from "./ServiceCard";
import { usePackages } from "@/lib/hooks/usePackages";
import { Package } from "@/lib/types/package";
import { useEffect, useState } from "react";

const SESSION_KEY = "vipSelectedPackage";

const ChooseService = () => {
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const { data, isLoading, isError } = usePackages();
  const packagesList: Package[] | undefined = data?.data.packages;

  // Load selected package from session storage on mount
  useEffect(() => {
    const storedSlug = sessionStorage.getItem(SESSION_KEY);
    if (storedSlug && packagesList) {
      const found = packagesList.find((p) => p.package_slug === storedSlug);
      if (found) {
        setSelectedPackage(found);
      }
    }
  }, [packagesList]);

  const handleSelectPackage = (pkg: Package) => {
    setSelectedPackage(pkg);

    // Store only the slug
    sessionStorage.setItem(SESSION_KEY, pkg.package_slug);

    console.log("Selected package slug:", pkg.package_slug);
  };

  if (isLoading) return null;

  return (
    <div className="flex-2 h-full">
      <div
        style={{
          boxShadow: "0px 11.48px 114.76px 0px #A7A7A73D",
        }}
        className="px-10 py-6 bg-white rounded-2xl h-full"
      >
        <h4 className="text-normal">
          Kindly review the service descriptions below and confirm your
          selection.
        </h4>

        {packagesList?.map((pkg) => (
          <ServiceCard
            key={`package_${pkg.package_id}`}
            service={pkg}
            selectedService={
              selectedPackage?.package_slug ||
              sessionStorage.getItem(SESSION_KEY) || null
            }
            onSelect={handleSelectPackage}
          />
        ))}
      </div>
    </div>
  );
};

export default ChooseService;
