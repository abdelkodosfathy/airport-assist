import CarPassengers from "@/components/custom icons/CarPassengers";
import CarriedBag from "@/components/custom icons/carriedBag";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Car } from "@/lib/types/car";
import {
  Briefcase,
  Clock4,
  Crown,
  HandHelping,
  Headphones,
  Phone,
  Sparkles,
  UserCheck,
  Users,
  Wifi,
} from "lucide-react";
import Image from "next/image";
import CarImageCarousel from "./CarImageCarousel";
import { useCurrencyStore } from "@/store/currencyStore";
// import { usePickupPointsStore } from "@/store/pickupPointsStore";
// import { useAirportStore, useSingleAirportStore } from "@/store/vipInputsStore";
// import { useTripStore } from "@/store/tripStore";
import { useCarPricing } from "@/lib/hooks/useCarPricing";

const IMAGE_BASE =
  "https://airportassist-backend.aqaralex.com/storage/images/car-types-images/";

const FEATURES = [
  { icon: Sparkles, label: "Interior sanitizing" },
  { icon: Phone, label: "Cell phone chargers" },
  { icon: HandHelping, label: "Luggage assist" },
  { icon: Clock4, label: "Punctual service" },
  { icon: UserCheck, label: "Licensed chauffeurs" },
  { icon: Crown, label: "Luxury & Comfort" },
  { icon: Wifi, label: "Complimentary Wi-Fi" },
];

type CarCardProps = {
  car: Car;
  selected?: boolean;
  includedMiles?: number;
  hideSupplementFee?: boolean;
  onSelect: () => void;
};

function parseCarName(name: string) {
  const match = name.match(/^(.*?)\s*\((.*?)\)$/);
  return match
    ? { name: match[1].trim(), subtitle: match[2].trim() }
    : { name, subtitle: null };
}

// Builds carousel slides from the car object.
// When Car gains a `car_images: string[]` field, it will be used automatically.
// function getCarSlides(car: Car) {
//   const images: string[] = car.car_images?.length
//     ? car.car_images
//     : [car.car_type_img];

//   return images.map((img) => ({ img, name: car.car_type_name }));
// }
// TODO: replace with real images from API when available
function getCarSlides(car: Car) {
  return [car.car_type_img, car.car_type_img, car.car_type_img].map((img) => ({
    img,
    name: car.car_type_name,
  }));
}
export function extractNumber(value: string): number {
  return parseFloat(value);
}
const CarCard = ({
  car,
  includedMiles = 15,
  selected = false,
  onSelect,
  hideSupplementFee = false,
}: CarCardProps) => {
  // const airport = useAirportStore((s) => s.airport);
  // const singleAirport = useSingleAirportStore((s) => s.singleAirport);
  // const meetAndGreet = useTripStore((s) => s.meetAndGreet);
  // const bags = useTripStore((s) => s.luggage);
  // const passengers = useTripStore((s) => s.passengers);

  // const currencyMark = useCurrencyStore((state) => state.currencyMark);
  // const distanceMi = usePickupPointsStore((s) => s.distanceMi);

  // const miles = extractNumber(distanceMi ?? "0 mi");

  // const paiedMiles = Math.max(miles - includedMiles, 0);
  // const milesCost = paiedMiles * 4;
  // const { name, subtitle } = parseCarName(car.car_type_name);
  // const slides = getCarSlides(car);

  // const passengersCost = (() => {
  //   if (!meetAndGreet || !airport) return 0;

  //   const airportPackage =
  //     airport.airport_packages.find(
  //       (p) => p.package.package_slug === "elite",
  //     ) ??
  //     airport.airport_packages.find(
  //       (p) => p.package.package_slug === "elite_plus",
  //     ) ??
  //     airport.airport_packages.find(
  //       (p) => p.package.package_slug === "signature",
  //     ) ??
  //     airport.airport_packages.find((p) => p.package.package_slug === "vip");

  //   const freePassengers = airportPackage?.included_adults_count ?? 0;

  //   const blockSize = 1;

  //   const blockCost = airportPackage?.additional_adult_cost ?? 0;

  //   const paidPassengers = Math.max(passengers - freePassengers, 0);

  //   const blocks = Math.ceil(paidPassengers / blockSize);

  //   return blocks * blockCost;
  // })();
  // const luggageCost = (() => {
  //   if (!meetAndGreet || !airport) return 0;
  //   const freeBags = airport.number_of_free_bags ?? 0;
  //   const blockSize = airport.paid_bags_block_size ?? 1;
  //   const blockCost = airport.paid_bags_block_cost ?? 0;

  //   const paidBags = Math.max(bags - freeBags, 0);
  //   const blocks = Math.ceil(paidBags / blockSize);

  //   return blocks * blockCost;
  // })();

  // const totalCost = car.supplement_fee + milesCost + passengersCost + luggageCost ;

  // console.log(airport);

  const { totalCost } = useCarPricing({ car, includedMiles });

  const currencyMark = useCurrencyStore((state) => state.currencyMark);

  const { name, subtitle } = parseCarName(car.car_type_name);
  const slides = getCarSlides(car);

  return (
    <Dialog>
      {/* Card */}
      <div
        onClick={onSelect}
        className={`bg-white flex flex-col justify-between rounded-lg p-4 shadow-md hover:shadow-xl duration-300 cursor-pointer relative border-2 ${
          selected ? "border-[#664F31]" : "border-white"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-start">
          <p className="font-bold text-[#101828]">
            {name}
            {subtitle && (
              <span className="text-xs font-light ml-1">({subtitle})</span>
            )}
          </p>
          <div
            className={`grid place-items-center min-w-5 min-h-5 rounded-full border ${
              selected ? "border-[#664F31]" : "border-[#D5D6DB]"
            }`}
          >
            {selected && (
              <span className="block min-w-4 min-h-4 rounded-full bg-[#664F31]" />
            )}
          </div>
        </div>

        <p className="text-[0.625rem] max-w-44 text-[#7a7a7a] mb-3 truncate">
          {car.car_type_description}
        </p>

        {/* Thumbnail — clicking opens modal */}
        <DialogTrigger asChild>
          <div onClick={(e) => e.stopPropagation()} className="cursor-zoom-in">
            <Image
              src={`${IMAGE_BASE}${car.car_type_img}`}
              alt={car.car_type_name}
              width={270}
              height={135}
              className="rounded-lg h-30 w-full object-contain mb-3"
            />
          </div>
        </DialogTrigger>

        {/* Footer */}
        <div>
          <div className="flex justify-between text-[0.625rem] items-end pb-1 mb-1 border-b border-[#E5E5E5]">
            <div className="flex gap-2">
              <p className="flex gap-1 items-center">
                <CarPassengers /> <span>{car.passengers_capacity}</span>
              </p>
              <p className="flex gap-1 items-center">
                <CarriedBag /> <span>{car.baggage_capacity}</span>
              </p>
            </div>
            <p className="text-[#74747A]">
              Includes up to {includedMiles} miles
            </p>
          </div>
          <Prices
            hideSupplementFee={hideSupplementFee}
            currencyMark={currencyMark}
            car={car}
          />
        </div>
      </div>

      {/* Modal */}
      <DialogContent className="p-6 md:max-w-3xl lg:max-w-5xl w-full">
        <DialogTitle className="sr-only">{car.car_type_name}</DialogTitle>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Carousel — replaces single static image */}
          <div className="md:w-1/2 flex items-center">
            <CarImageCarousel cars={slides} />
          </div>

          <div className="md:w-1/2 flex flex-col gap-4 max-h-[80vh] overflow-y-auto">
            <h2 className="text-2xl font-bold">{car.car_type_name}</h2>
            <p className="text-gray-600">{car.car_type_description}</p>

            <div className="grid grid-cols-2 gap-2">
              <p className="flex items-center gap-2">
                <Users className="w-4 h-4" color="#7B5A41" />{" "}
                {car.passengers_capacity} passengers
              </p>
              <p className="flex items-center gap-2">
                <Briefcase className="w-4 h-4" color="#7B5A41" />{" "}
                {car.baggage_capacity} Luggage pieces
              </p>
              {FEATURES.map(({ icon: Icon, label }) => (
                <p key={label} className="flex items-center gap-2">
                  <Icon className="w-4 h-4" color="#7B5A41" /> {label}
                </p>
              ))}
            </div>

            <p className="text-sm text-[#6A7282]">
              *Exact features may vary by vehicle. Luggage assist ≠ Meet &
              Greet.
            </p>

            <div className="flex items-center gap-2">
              <Headphones />
              <div>
                <p className="font-bold">24/7 Support</p>
                <p className="text-[#6A7282] text-sm">
                  +1 (415) 384-5039 & support@bookinglane.com
                </p>
              </div>
            </div>

            <div className="mt-4 border-t pt-2 flex justify-between items-center">
              <div>
                <p className="text-2xl font-bold">
                  {currencyMark}
                  {totalCost.toFixed(2)}
                </p>
                <p className="text-[#6A7282] text-sm">Price excluding taxes</p>
              </div>
              <DialogClose asChild>
                <Button
                  onClick={onSelect}
                  variant="outline"
                  className="cursor-pointer min-w-35 py-5 border-black hover:bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)] hover:text-white hover:border-white duration-0"
                >
                  Select
                </Button>
              </DialogClose>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CarCard;

const Prices = ({
  hideSupplementFee,
  currencyMark,
  car,
}: {
  hideSupplementFee: boolean;
  currencyMark: string;
  car: Car;
}) => {
  return (
    <div className="text-[#74747A]">
      {hideSupplementFee ? (
        <>
          <div className="text-[0.8rem] flex justify-between">
            <p>
              Rate Per Mile
              <span className="text-[0.7rem]"> (inside city)</span>
            </p>
            <span>
              {currencyMark} {car.price_per_mile.toFixed(2)}
            </span>
          </div>

          <div className="text-[0.8rem] flex justify-between">
            <p>
              Rate Per Mile
              <span className="text-[0.7rem]"> (outside city)</span>
            </p>
            <span>
              {currencyMark} {car.price_per_mile.toFixed(2)}
            </span>
          </div>
        </>
      ) : (
        <>
          <p className="text-[0.675rem] flex justify-between">
            Price Per Mile
            <span>
              {currencyMark} {car.price_per_mile.toFixed(2)}
            </span>
          </p>

          <p className="text-[0.675rem] flex justify-between">
            Price Per Hour
            <span>
              {currencyMark} {car.price_per_hour.toFixed(2)}
            </span>
          </p>

          <p className="text-[0.675rem] flex justify-between">
            Supplement Fee
            <span>
              {currencyMark} {car.supplement_fee}
            </span>
          </p>
        </>
      )}
    </div>
  );
};
