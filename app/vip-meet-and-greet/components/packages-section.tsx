"use client";

import { AirportPackage } from "@/lib/types/airport";
import ServiceCard from "./ServiceCard";

const PackagesSection = ({
  packagesList,
  AirportCost,
  adults_count,
  child_count,
  selectedPackageSlug,
  onSelectPackage,

  // onUpdate,
}: {
  onSelectPackage: (slug: string, packageCost: number) => void;
  packagesList: AirportPackage[];
  selectedPackageSlug: string;
  adults_count: number;
  AirportCost: number;
  child_count: number;

  // onUpdate: (path: string, value: any) => void;
}) => {
  // const [selectedPackageSlug ,setSelectedPackageSlug] = useState<string>();
  function handleSelectedPackage(slug: string, packageCost: number) {
    onSelectPackage(slug, packageCost);

    // onUpdate("package_slug", "slug");
    // setSelectedPackageSlug(slug)
  }
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
            selectedService={selectedPackageSlug === pkg.package.package_slug}
            adults_count={adults_count}
            child_count={child_count}
            AirportCost={AirportCost}
            key={`package_${pkg.package_id}`}
            service={pkg}
            onSelect={handleSelectedPackage}
          />
        ))}
      </div>
    </div>
  );
};

export default PackagesSection;
