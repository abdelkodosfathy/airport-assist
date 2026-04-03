"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSingleAirport } from "@/lib/hooks/useAirports";
import { AirportPackage } from "@/lib/types/airport";
import { useCurrencyStore } from "@/store/currencyStore";
import { useAirportPackageStore } from "@/store/packageStore";
import { useAirportStore, useSingleAirportStore } from "@/store/vipInputsStore";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export default function CurrencySelector() {
  const currency = useCurrencyStore((s) => s.currency);
  const setCurrency = useCurrencyStore((s) => s.setCurrency);
  // const currencyLoading = useCurrencyStore((s) => s.currencyLoading);
  // const setCurrencyLoading = useCurrencyStore((s) => s.setCurrencyLoading);

  // const storedAirport = useAirportStore((state) => state.airport);

  const airportPackage = useAirportPackageStore(
    (state) => state.airportPackage,
  );
  const setAirportPackage = useAirportPackageStore(
    (state) => state.setAirportPackage,
  );

  const singleAirport = useSingleAirportStore((state) => state.singleAirport);
  const setSingleAirport = useSingleAirportStore(
    (state) => state.setSingleAirport,
  );
  const {
    data: airportQuery,
    refetch,
    isLoading,
    isError,
  } = useSingleAirport(singleAirport?.airport_id.toString() ?? "");
  const airportResponse = airportQuery?.data?.airport;

  console.log(isLoading);
  console.log(airportResponse);

  useEffect(() => {
    if (airportResponse) {
      setSingleAirport(airportResponse);
    }
    if (airportPackage) {
      const newPackage = airportResponse?.airport_packages.find(
        (pkg) =>
          pkg.package.package_slug === airportPackage.package.package_slug,
      );
      setAirportPackage(newPackage as AirportPackage);
    }
  }, [airportResponse, setSingleAirport]);

  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["singleAirport"] });
  }, [currency]);
  // useEffect(() => {
  //   refetch();
  // }, [currency]);
  return (
    <Select value={currency} onValueChange={setCurrency}>
      <SelectTrigger
        className="min-h-10 backdrop-blur-md hover:backdrop-blur-xl
        bg-white/10 border border-white/20
        p-2 rounded-xl text-sm text-white
        transition w-31 outline-none font-light hover:bg-transparent hover:text-white cursor-pointer"
      >
        <SelectValue />
      </SelectTrigger>

      <SelectContent className="bg-white text-black" position="popper">
        <SelectItem value="USD">
          <div className="flex items-center gap-3">
            <img
              src="/icons/usd.png"
              className="w-8 h-8 object-cover rounded-2xl"
            />
            USD
          </div>
        </SelectItem>

        <SelectItem value="EUR">
          <div className="flex items-center gap-3">
            <img
              src="/icons/eur.webp"
              className="w-8 h-8 object-cover rounded-2xl"
            />
            EUR
          </div>
        </SelectItem>

        <SelectItem value="GBP">
          <div className="flex items-center gap-3">
            <img
              src="/icons/gbp.png"
              className="w-8 h-8 object-cover rounded-2xl"
            />
            GBP
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
