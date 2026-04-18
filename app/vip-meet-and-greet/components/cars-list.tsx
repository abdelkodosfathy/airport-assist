import CarCard from "@/components/CarCard";
import CarCardSkeleton from "@/components/CarCardSkeleton";
import InnerToast from "@/components/ui/InnerToast";
import { useCars } from "@/lib/hooks/useCars";
import { Car } from "@/lib/types/car";
import { useCarStore } from "@/store/chauffeurStore";
import { useAirportPackageStore } from "@/store/packageStore";
import { useChauffeurDestinationStore, useSingleAirportStore } from "@/store/vipInputsStore";
import { useEffect } from "react";

export default function CarsList() {
  const selectedPackage = useAirportPackageStore((s) => s.airportPackage);

  const isElitePlus = selectedPackage?.package.package_slug === "elite_plus";

  const selectedCar = useCarStore((state) => state.car);
  const carTypeId = selectedCar?.car_type_id;
  const setCar = useCarStore((state) => state.setCar);
  // const country = useChauffeurDestinationStore((s) => s.country);
  const country = useSingleAirportStore((s) => s.singleAirport?.city.iso2);

  const { data, isLoading, isError, error } = useCars(country ?? undefined);

  const handleSelect = (car: Car) => {
    setCar(car);
  };

  useEffect(() => {
    if (
      data?.data.car_types?.[0]?.car_type_name.toLowerCase() ===
      "special-request"
    ) {
      setCar(data.data.car_types[0]);
    }
  }, [data, setCar]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-3 gap-3 mt-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <CarCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (isError) {
    console.error("Error fetching cars:", error);
    return (
      <p className="text-sm text-red-500 mt-4">
        Failed to load car types. Please try again.
      </p>
    );
  }

  if (
    data?.data.car_types?.[0]?.car_type_name.toLowerCase() === "special-request"
  ) {
    return (
      <InnerToast
        className="col-span-3"
        text="Thank you for choosing our chauffeur services. Transfer costs will be calculated and invoiced separately by our team."
      />
    );
  }

  return (
    <div className="grid grid-cols-3 gap-3 mt-4">
      {data?.data.car_types.map((car, index) => {
        return (
          <CarCard
            hideSupplementFee={isElitePlus}
            key={car.car_type_id ?? index}
            selected={carTypeId === car.car_type_id}
            car={car}
            onSelect={() => handleSelect(car)}
          />
        );
      })}
    </div>
  );
}
