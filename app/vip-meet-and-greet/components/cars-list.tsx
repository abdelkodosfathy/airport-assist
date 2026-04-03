import CarCard from "@/components/CarCard";
import CarCardSkeleton from "@/components/CarCardSkeleton";
import { useCars } from "@/lib/hooks/useCars";
import { Car } from "@/lib/types/car";
import { useCarStore } from "@/store/chauffeurStore";
import { useAirportPackageStore } from "@/store/packageStore";
import { useChauffeurDestinationStore } from "@/store/vipInputsStore";

export default function CarsList() {
  const selectedPackage = useAirportPackageStore((s) => s.airportPackage);

  const isElitePlus = selectedPackage?.package.package_slug === "elite_plus";

  const selectedCar = useCarStore((state) => state.car);
  const carTypeId = selectedCar?.car_type_id;
  const setCar = useCarStore((state) => state.setCar);
  const country = useChauffeurDestinationStore((s) => s.country);

  const { data, isLoading, isError, error } = useCars(country ?? undefined);

  const handleSelect = (car: Car) => {
    setCar(car);
  };

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

  return (
    <div className="grid grid-cols-3 gap-3 mt-4">
      {data?.data.car_types.map((car, index) => (
        <CarCard
          hideSupplementFee={isElitePlus}
          key={car.car_type_id ?? index}
          selected={carTypeId === car.car_type_id}
          car={car}
          onSelect={() => handleSelect(car)}
        />
      ))}
    </div>
  );
}
