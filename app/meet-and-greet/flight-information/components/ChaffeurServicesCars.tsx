"use client";
import CarriedBag from "@/components/custom icons/carriedBag";
import Passengers from "@/components/custom icons/passengers";
import IconInput from "@/components/custom inputs/customInput";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Menu } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useCars } from "@/lib/hooks/useCars";
import { Car } from "@/lib/types/car";

interface StepsProps {
  onFocus?: () => void;
  selectCar: (carData: Car) => void;
}

const ChauffeurServicesCars = ({ onFocus, selectCar}: StepsProps) => {
  return (
    <div
      onClick={() => {
        onFocus?.();
      }}
      style={{
        boxShadow: "0px 11.48px 114.76px 0px #A7A7A73D",
      }}
      className="px-10 py-6 bg-white rounded-2xl"
    >
      <h4 className="font-manrope font-medium text-[18.75px] leading-[1.3] tracking-normal">
        Chauffeur Services
      </h4>
      <span className="inline-block w-full h-0.5 bg-[#CFCFCF] mb-2" />
      <div className="space-y-2 md:col-span-2">
        <Label htmlFor="vehicle-address">Select your vehicle</Label>
        <IconInput
          icon={<Menu />}
          iconPosition="right"
          id="vehicle-address"
          placeholder="Address"
          className="pl-4 pr-10 bg-[#F4F4F4] rounded-md border border-[#E0E0E0]"
          inputClassName="shadow-none outline-none focus:outline-none focus:ring-0 ring-0 border-none"
        />
      </div>
      <div className="py-4">
        <CardPicker onSelectCar={selectCar} />
      </div>

      <Button
        style={{
          background:
            "linear-gradient(179.26deg, #7B5A41 0.64%, #DFB08D 223.79%)",
          border: "1.26px solid #966B4B",
        }}
        className={
          "cursor-pointer h-7 font-[Manrope] font-normal py-0 px-8 rounded-full mt-2 border-[#966B4B] text-white"
        }
      >
        Add Chauffeur
      </Button>
    </div>
  );
};

export default ChauffeurServicesCars;

type CarCardProps = {
  car: Car;
  selected?: boolean;
  onSelect?: () => void;
};

const CarCard = ({ car, selected = false, onSelect }: CarCardProps) => {
  const {
    passengers_capacity,
    baggage_capacity,
    price_per_mile,
    car_type_name,

    car_type_img,
    car_type_description,
  } = car;

  return (
    <div
      onClick={onSelect}
      className={`
      bg-white rounded-lg p-4 flex flex-col justify-between shadow-md hover:shadow-xl duration-300 cursor-pointer relative
      ${selected ? "border-2 border-[#664F31]" : "border-2 border-white"}
    `}
    >
      {/* Radio-like indicator */}
      <div>
        <div
          className={`
        absolute grid place-items-center top-4 right-4 w-5 h-5 rounded-full border 
        ${selected ? " border-[#664F31]" : "border-[#D5D6DB]"}
      `}
        >
          {selected ? (
            <span className="block w-4 h-4 rounded-full bg-[#664F31]" />
          ) : (
            ""
          )}
        </div>

        <div className="flex justify-between w-full pr-5">
          <p className="font-bold text-[#101828]">
            {car_type_name}{" "}
            {/* {isNew && (
            <span className="text-[0.625rem] font-light">(new shape)</span>
          )} */}
          </p>
        </div>
      </div>
      <div>
        <p className="text-[0.625rem] max-w-44 text-[#7a7a7a] mb-3">
          {car_type_description}
        </p>

        <Image
          src={
            car_type_img
              ? `https://airportassist-backend.aqaralex.com/storage/images/car-types-images/${car_type_img}`
              : "/placeholder.png"
          }
          alt={car_type_name}
          width={230}
          height={120}
          quality={1}
          className="rounded-lg h-[120px] w-[230px] object-contain mx-auto"
        />

        <div className="mt-auto flex justify-between text-[0.625rem] items-end pb-1 mb-1 border-b border-[#E5E5E5]">
          <div className="flex gap-2 ">
            <p className="flex gap-1 items-center">
              <Passengers />
              <span>{passengers_capacity}</span>
            </p>
            <p className="flex gap-1 items-center">
              <CarriedBag />
              <span>{baggage_capacity}</span>
            </p>
          </div>
          <p className="text-[#74747A]">Includes up to 15 miles</p>
        </div>

        <div className="text-[#74747A]">
          <p className="text-[0.675rem] flex justify-between">
            Price Per Mile<span>£{price_per_mile}</span>
          </p>
          <p className="text-[0.675rem] flex justify-between">
            Supplement Fee<span>£220.00</span>
          </p>
        </div>
      </div>
    </div>
  );
};

function CardPicker({onSelectCar}: {onSelectCar: (carData: Car) => void}) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [selectedCarId, setSelectedCarId] = useState<number | null>(null);
  const carInputRef = useRef<HTMLInputElement>(null);

  const { data, isLoading, isError, error } = useCars();

  if (isError) {
    console.error("Error fetching cars:", error);
  }

  // 🔹 load from sessionStorage once data is available
  useEffect(() => {
    if (!data?.data.car_types) return;

    const storedCarId = sessionStorage.getItem("selected_car_type_id");
    if (!storedCarId) return;

    const carId = Number(storedCarId);

    const index = data.data.car_types.findIndex(
      (car) => car.car_type_id === carId,
    );

    if (index !== -1) {
      setSelectedIndex(index);
      setSelectedCarId(carId);
      
      if (carInputRef.current) {
        carInputRef.current.value = String(carId);
      }
    }
  }, [data]);
  
  const handleSelect = (index: number, carId: number) => {
    setSelectedIndex(index);
    setSelectedCarId(carId);
    if(data?.data.car_types){
      onSelectCar(data.data.car_types[index])
    }


    // update sessionStorage
    sessionStorage.setItem("selected_car_type_id", String(carId));

    // update hidden input value
    if (carInputRef.current) {
      carInputRef.current.value = String(carId);
    }
  };

  return (
    <div className="grid grid-cols-3 gap-3 mt-4">
      {data?.data.car_types.map((car, index) => (
        <CarCard
          key={car.car_type_id ?? index}
          car={car}
          selected={selectedIndex === index}
          onSelect={() => handleSelect(index, car.car_type_id)}
        />
      ))}

      {/* hidden input to store selected car id for forms */}
      <input
        type="number"
        name="car_type_id"
        ref={carInputRef}
        value={selectedCarId ?? ""}
        readOnly
        hidden
      />
    </div>
  );
}
