"use client";
import { useCars } from "@/lib/hooks/useCars";
import { memo, useEffect } from "react";
import { useTripStore } from "@/store/tripStore";
import CarCardSkeleton from "@/components/CarCardSkeleton";
import CarCard from "@/components/CarCard";
import { usePickupPointsStore } from "@/store/pickupPointsStore";

function CardPicker() {
  const selectedCar = useTripStore((state) => state.car);
  const selectCar = useTripStore((state) => state.setCar);
  const country = usePickupPointsStore((s) => s.pickup?.country);
  const state_id = usePickupPointsStore((s) => s.pickup?.state_id);

  console.log(country);
  console.log(state_id);

  // const { data, isLoading, isError, error } = useCars(country ?? undefined);
  const { data, isLoading, isError } = useCars({
    countryCode: country,
    stateId: state_id,
  });

  // Reset selected car if it no longer exists after region/data change
  useEffect(() => {
    if (!data?.data.car_types || !selectedCar) return;

    const isSelectedCarStillAvailable = data.data.car_types.some(
      (car) => car.car_type_id === selectedCar.car_type_id,
    );

    if (!isSelectedCarStillAvailable) {
      selectCar(null);
    }
  }, [data, selectedCar, selectCar]);

  if (isError) {
    console.error("Error fetching cars:", isError);
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
            selectCar(car);
          }}
        />
      ))}
    </div>
  );
}

export default memo(CardPicker);
