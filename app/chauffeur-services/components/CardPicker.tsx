"use client";
import { useCars } from "@/lib/hooks/useCars";
import { memo } from "react";
import { useTripStore } from "@/store/tripStore";
import CarCardSkeleton from "@/components/CarCardSkeleton";
import CarCard from "@/components/CarCard";

function CardPicker() {
  const selectedCar = useTripStore((state) => state.car);
  const onSelectCar = useTripStore((state) => state.setCar);
  const { data, isLoading, isError, error } = useCars();

  if (isError) {
    console.error("Error fetching airports:", error);
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-3 w-5/11 h-fit">
        <CarCardSkeleton />
        <CarCardSkeleton />
        <CarCardSkeleton />
        <CarCardSkeleton />
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 gap-3 w-5/11 h-fit">
      {data?.data.car_types.map((car, index) => (
        <CarCard
          includedMiles={18}
          key={index}
          car={car}
          selected={selectedCar?.car_type_id === car.car_type_id}
          onSelect={() => {
            onSelectCar(car);
          }}
        />
      ))}
    </div>
  );
}

export default memo(CardPicker);
