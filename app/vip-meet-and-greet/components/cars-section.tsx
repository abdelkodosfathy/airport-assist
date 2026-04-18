"use client";
import { Button } from "@/components/ui/button";
import CarsList from "./cars-list";
import {
  useAirportStore,
  useChauffeurDestinationStore,
  useServiceStore,
} from "@/store/vipInputsStore";
import { useJsApiLoader } from "@react-google-maps/api";
import { useState, useEffect, useMemo } from "react";
import { Clock12, Clock4, Info, Loader2 } from "lucide-react";
import Distance from "@/components/custom icons/distance";
import {
  LocationInput,
  Suggestion,
} from "@/app/chauffeur-services/components/LoactionInputs";
import InnerToast from "@/components/ui/InnerToast";
import Image from "next/image";
import { Car } from "@/lib/types/car";
import { useCarStore } from "@/store/chauffeurStore";

// ── Constants ─────────────────────────────────────────────────────────────────
const KM_TO_MI = 0.621371;
const LIBRARIES: "places"[] = ["places"];

// ── Component ─────────────────────────────────────────────────────────────────
export type CarsSectionHandle = {
  isValid: () => boolean;
  getData: () => number;
};

const CarsSection = ({ isAdditional = false, onCancel}: { isAdditional?: boolean, onCancel?: () => void }) => {
  const serviceType = useServiceStore((s) => s.serviceType);
  const airport = useAirportStore((state) => state.airport);
  const destination = useChauffeurDestinationStore((s) => s.destination);
  const distanceMi = useChauffeurDestinationStore((m) => m.miles);
  const setDestination = useChauffeurDestinationStore((s) => s.setDestination);
  const setMiles = useChauffeurDestinationStore((m) => m.setMiles);
  const setWithTrip = useChauffeurDestinationStore((m) => m.setWithTrip);

  const [distanceKm, setDistanceKm] = useState<string | null>(null);
  const [duration, setDuration] = useState<string | null>(null);
  const [loadingDist, setLoadingDist] = useState(false);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: LIBRARIES,
  });

  const airportLocation = useMemo(
    () =>
      airport
        ? {
            lat: Number(airport.location_lat),
            lng: Number(airport.location_long),
          }
        : null,
    [airport?.airport_id],
  );

  // ── Distance calculation ──────────────────────────────────────────────────
  useEffect(() => {
    if (!isLoaded || !airportLocation || !destination?.location) {
      setDistanceKm(null);
      setMiles(null);
      setDuration(null);
      return;
    }

    setLoadingDist(true);
    setDistanceKm(null);
    setMiles(null);
    setDuration(null);

    const service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: [airportLocation],
        destinations: [destination.location],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC,
      },
      (response, status) => {
        setLoadingDist(false);
        if (status !== "OK" || !response) return;
        const el = response.rows[0]?.elements[0];
        if (!el || el.status !== "OK") return;

        const km = el.distance.value / 1000;
        const mi = km * KM_TO_MI;
        const minutes = Math.round(el.duration.value / 60);

        setDistanceKm(
          km < 1 ? `${el.distance.value} m` : `${km.toFixed(1)} km`,
        );
        // setDistanceMi(`${mi.toFixed(1)} mi`);
        setMiles(Number(mi.toFixed(1)));
        setDuration(`${minutes} mins`);
      },
    );
  }, [
    destination?.location?.lat,
    destination?.location?.lng,
    airportLocation,
    isLoaded,
  ]);

  const selectedCar = useCarStore((s) => s.car); // أو اللي عندك في الستور للعربية المختارة
  // 1. الزرار يبقى disabled لو مفيش عربية أو destination
  const canAdd = !!destination?.location && !!selectedCar;

  // 2. state للـ summary
  const [showSummary, setShowSummary] = useState(false);
  // const showSummary = !!destination?.location && !!selectedCar;

  // useEffect(()=>{
    // setShowSummary(false);
  // }, [selectedCar?.car_type_id])

  const handleAddChauffeur = () => {
    setWithTrip(true);
    console.log("true with trip");
    
    setShowSummary(true);
  };
  return (
    <>
      {showSummary && selectedCar && destination ? (
        <CarSummary
          car={selectedCar}
          destination={destination}
          distanceKm={distanceKm}
          distanceMi={distanceMi}
          duration={duration}
          onEdit={() => setShowSummary(false)} // ← add this
        />
      ) : (
        <div
          style={{ boxShadow: "0px 11.48px 114.76px 0px #A7A7A73D" }}
          className="px-10 py-6 bg-white rounded-2xl"
        >
          {/* Header */}
          <div className="flex justify-between items-center">
            <h4 className="font-manrope font-medium text-[18.75px] leading-[1.3] tracking-normal">
              Chauffeur Services
            </h4>

            {/* Distance badge */}
            {loadingDist && (
              <p className="text-xs text-[#ACACAC] flex items-center gap-1.5">
                <Loader2 size={12} className="animate-spin" />
                Calculating…
              </p>
            )}
            {distanceKm && !loadingDist && (
              <div className="flex gap-4 px-3 py-1.5 border border-[#E0E0E0] rounded-lg bg-[#FAFAFA]">
                <p className="flex items-center gap-1.5 text-sm text-[#1A1A1A]">
                  <Distance />
                  <span>
                    {distanceKm} / {distanceMi} mi
                  </span>
                </p>
                <p className="flex items-center gap-1.5 text-sm text-[#1A1A1A]">
                  <Clock12 size={14} color="#747474" />
                  <span>{duration}</span>
                </p>
              </div>
            )}
          </div>
          <span className="inline-block w-full h-0.5 bg-[#CFCFCF] mb-0 mt-1" />
          {/* Destination input */}
          <div className="py-4">
            <LocationInput
              //   onChange={(s) => {
              //   setPickup(s);
              //   clearError("from");
              // }}
              label={serviceType === "arrival" ? "Drop Off" : "Pickup From"}
              placeholder="Search for drop off location…"
              value={destination}
              onChange={setDestination}
              isLoaded={isLoaded}
              isPickup={false}
              disableAirportsSearch={true}
              // countryRestriction={["uk", "fr"]} // you can use it for many countries or remove it to unlock the search
            />
          </div>
          {/* Cars list */}
          <div className="py-2">
            <CarsList />
          </div>
          <div className="col-span-2">
            {isAdditional ? (
              <AdditionalChauffeur onCancel={onCancel}  canAdd={canAdd} onAddChauffeur={handleAddChauffeur} />
            ) : (
              <Button
                onClick={handleAddChauffeur}
                disabled={!canAdd}
                variant="outline"
                className="
              col-span-2 cursor-pointer border-black text-black
              hover:border-[#664F31]
              hover:bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)]
              hover:text-white duration-0
              disabled:opacity-50 disabled:cursor-not-allowed
              hover:linear-gradient(179.26deg, #7B5A41 0.64%, #DFB08D 223.79%)
              h-7 font-[Manrope] font-normal py-0 px-8 rounded-full mt-2
            "
              >
                Add Chauffeur
              </Button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CarsSection;

// const CarSummary = ({
//   car,
//   distanceKm,
//   distanceMi,
//   destination,
//   duration,
// }: {
//   car: Car;
//   destination: Suggestion;
//   distanceKm: string | null;
//   distanceMi: number | null;
//   duration: string | null;
// }) => {
//   console.log(car);

//   return (
//     <div
//       className="px-10 py-6 w-full bg-white rounded-2xl"
//       style={{ boxShadow: "0px 11.48px 114.76px 0px #A7A7A73D" }}
//     >
//       <div className="flex gap-12 mb-2">
//         <Image
//           width={216}
//           height={108.75}
//           src={`https://airportassist-backend.aqaralex.com/storage/images/car-types-images/${car.car_type_img}`}
//           alt="car image"
//         />
//         <div>
//           <p className="flex gap-8 mb-2 font-semibold items-center">
//             {car.car_type_name} <Info className="w-5 h-5 text-[#99A1AF]" />
//           </p>
//           <p className="text-sm text-[#4A5565]">
//             <span className="font-bold">Drop Off Address: </span>
//             {destination.label}
//           </p>
//           <p className="text-sm text-[#4A5565]">
//             <span className="font-bold">Destination: </span>
//             {distanceKm} / {distanceMi} mi - {duration}
//           </p>
//         </div>
//       </div>
//       <InnerToast
//         icon={
//           <div className="min-w-6 min-h-6 w-6 h-6 bg-[#7B5A41] rounded-full grid place-content-center">
//             <Clock4 className="w-5 h-5 text-white" />
//           </div>
//         }
//         text="Chauffeur will wait 15 minutes free of charge"
//       />
//     </div>
//   );
// };

const CarSummary = ({
  car,
  distanceKm,
  distanceMi,
  destination,
  duration,
  onEdit, // ← add this
}: {
  car: Car;
  destination: Suggestion;
  distanceKm: string | null;
  distanceMi: number | null;
  duration: string | null;
  onEdit: () => void; // ← add this
}) => {
  return (
    <div
      className="px-10 py-6 w-full bg-white rounded-2xl"
      style={{ boxShadow: "0px 11.48px 114.76px 0px #A7A7A73D" }}
    >
      <div className="flex gap-12 mb-2">
        <Image
          width={216}
          height={108.75}
          src={`https://airportassist-backend.aqaralex.com/storage/images/car-types-images/${car.car_type_img}`}
          alt="car image"
        />
        <div className="flex-1">
          <div className="flex justify-between items-center mb-2">
            <p className="flex gap-8 font-semibold items-center">
              {car.car_type_name} <Info className="w-5 h-5 text-[#99A1AF]" />
            </p>

            {/* ← Edit button */}
            <Button
              onClick={onEdit}
              variant="ghost"
              // className="
              //   cursor-pointer border-black text-black
              //   hover:border-[#664F31]
              //   hover:bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)]
              //   hover:text-white duration-0
              //   h-7 font-[Manrope] font-normal py-0 rounded-full
              // "
              className="
                cursor-pointer border-black 
                text-[#7a7a7a]
                hover:text-gray-500 hover:bg-gray-200 duration-0
                h-7 font-[Manrope] font-normal py-0 rounded-full
              "
            >
              Edit
            </Button>
          </div>
          <p className="text-sm text-[#4A5565]">
            <span className="font-bold">Drop Off Address: </span>
            {destination.label}
          </p>
          <p className="text-sm text-[#4A5565]">
            <span className="font-bold">Destination: </span>
            {distanceKm} / {distanceMi} mi - {duration}
          </p>
        </div>
      </div>

      <InnerToast
        className="mb-0"
        icon={
          <div className="min-w-6 min-h-6 w-6 h-6 bg-[#7B5A41] rounded-full grid place-content-center">
            <Clock4 className="w-5 h-5 text-white" />
          </div>
        }
        text="Chauffeur will wait 15 minutes free of charge"
      />
    </div>
  );
};

const AdditionalChauffeur = ({
  onCancel,
  onAddChauffeur,
  canAdd,
  loading,
}: {
  onCancel?: () => void;
  onAddChauffeur: () => void;
  canAdd:boolean,
  loading?: boolean
}) => {
  // const additionalChauffeur = useChauffeurDestinationStore(
  //   (s) => s.withAdditionalChauffeur,
  // );
  // const setAdditionalChauffeur = useChauffeurDestinationStore(
  //   (s) => s.setWithAdditionalChauffeur,
  // );
  const resetChauffeur = useChauffeurDestinationStore(s => s.resetChauffeurDestination);
  const setCar = useCarStore(s => s.setCar);

  return (
    <div className="flex items-center justify-between">
      <Button
        type="button"
        onClick={() => {
          resetChauffeur();
          setCar(null);
          if(onCancel){
            onCancel();
          }
        }}
        disabled={loading}
        variant="outline"
        className="px-6 cursor-pointer border-black text-black hover:border-[#664F31] hover:bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)] hover:text-white duration-0"
      >
       Cancel Chauffeur
      </Button>
      <Button
        onClick={onAddChauffeur}
        disabled={!canAdd }
        variant="outline"
        className="px-6 cursor-pointer border-black text-black hover:border-[#664F31] hover:bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)] hover:text-white duration-0"
      >
        Add Chauffeur
      </Button>
    </div>
  );
};
