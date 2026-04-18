"use client";

import MeetAndGreet from "@/components/custom icons/meetAndGreet";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import Separator from "@/components/ui/formSeparator";
import InnerToast from "@/components/ui/InnerToast";
import PickUpPoints from "./routesCalculator";
import CardPicker from "./CardPicker";
import NumberInput from "./NumberInputs";
import { useTripStore } from "@/store/tripStore";
import TripTypeRow from "./TripTypeRow";
import ChauffeurBillingSection from "./chauffeur-billing-section";
import { toast } from "sonner";
import { useEffect } from "react";
import SubmitButton from "./SubmitButton";
import { TripBasedInputs } from "./TripBasedInputs";
import { useAirportStore, useSingleAirportStore } from "@/store/vipInputsStore";
import { useSingleAirport } from "@/lib/hooks/useAirports";

const Pickup = () => {
  return (
    <div className="flex-2 h-full">
      <TripTypeRow />
      <AlertRow />
      <div className="flex gap-4 "></div>
      <div className="flex gap-4 ">
        <PickupForm />
        <CardPicker />
      </div>
    </div>
  );
};

export default Pickup;
const AlertRow = () => {
  const tripType = useTripStore((s) => s.tripType);

  if (tripType === "one-way") {
    return (
      <div className="max-w-6/11 w-full">
        <InnerToast text="One-way is a professional chauffeur service from point A to point B." />
      </div>
    );
  } else {
    return (
      <div className="max-w-6/11 w-full">
        <InnerToast text="Please note: We can only service journeys that start or end in London.Our minimum booking duration is 4 hours." />
      </div>
    );
  }
};

const PickupForm = () => {
  return (
    <div className=" max-w-6/11 h-full w-full flex flex-col gap-4">
      <div className="shadow-md px-4.5 py-5 bg-white rounded-2xl ">
        <div className="mb-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full ">
            <PickUpPoints />
          </div>
        </div>
        <Separator />
        <TripBasedInputs />
        <Separator />
        <PassengersRow />
        <Separator />
        <div>
          <MeetAndGreetRow />
          <AdditionalRequirementsRow />
        </div>
      </div>
      <ChauffeurBillingSection />
      <SubmitButton />
    </div>
  );
};

const PassengersRow = () => {
  const car = useTripStore((state) => state.car);
  const passengersValue = useTripStore((state) => state.passengers);
  const luggageValue = useTripStore((state) => state.luggage);

  const setPassengersValue = useTripStore((state) => state.set_passengers);
  const setLuggageValue = useTripStore((state) => state.set_luggage);

  const maxPassengers = car?.passengers_capacity ?? Infinity;
  const maxLuggage = car?.baggage_capacity ?? Infinity;

  useEffect(() => {
    if (car && luggageValue > maxLuggage) {
      toast.warning(`This car fits a maximum of ${maxLuggage} bags`, {
        position: "top-center",
      });
      setLuggageValue(maxLuggage);
    }
    if (car && passengersValue > maxPassengers) {
      toast.warning(`This car fits a maximum of ${maxPassengers} passengers`, {
        position: "top-center",
      });
      setPassengersValue(maxPassengers);
    }
  }, [car]);

  return (
    <div className="grid grid-cols-2 gap-6 mt-3">
      <NumberInput
        min={1}
        onIncrement={() => {
          if (passengersValue < maxPassengers) {
            setPassengersValue(passengersValue + 1);
          } else {
            toast.warning(
              `This car fits a maximum of ${maxPassengers} passengers`,
              {
                position: "top-center",
              },
            );
          }
        }}
        onDecrement={() => {
          setPassengersValue(Math.max(1, (passengersValue ?? 0) - 1));
        }}
        onChangeValue={(e) => {
          setPassengersValue(e);
        }}
        value={passengersValue}
        title="passengers"
      />
      <NumberInput
        onIncrement={() => {
          if (luggageValue < maxLuggage) {
            setLuggageValue(luggageValue + 1);
          } else {
            toast.warning(`This car fits a maximum of ${maxLuggage} bags`, {
              position: "top-center",
            });
          }
        }}
        onDecrement={() => {
          setLuggageValue(Math.max(0, (luggageValue ?? 0) - 1));
        }}
        onChangeValue={(e) => {
          setLuggageValue(e);
        }}
        value={luggageValue}
        title="luggage"
      />
    </div>
  );
};

const MeetAndGreetRow = () => {
  const isChecked = useTripStore((s) => s.meetAndGreet);
  const setIsChecked = useTripStore((s) => s.set_meetAndGreet);

  const airport = useAirportStore((s) => s.airport);
  const setSingleAirport = useSingleAirportStore((s) => s.setSingleAirport);

  const { data, refetch } = useSingleAirport(
    airport?.airport_id.toString() ?? "",
    isChecked,
  );

  // لما الداتا توصل
  useEffect(() => {
    if (!isChecked) return;

    const fetchedAirport = data?.data.airport;
    if (fetchedAirport) {
      setSingleAirport(fetchedAirport);
    }
  }, [data, isChecked, setSingleAirport]);

  // لما اليوزر يفعّل switch
  useEffect(() => {
    if (isChecked) {
      refetch();
    }
  }, [isChecked, refetch]);

  return (
    <div className="flex justify-between p-4 items-center bg-[#F2F3F5] rounded-md my-4">
      <p className="flex gap-2 text-lg items-center">
        <MeetAndGreet />
        Airport Meet & greet service
      </p>
      <Switch
        checked={isChecked}
        onCheckedChange={setIsChecked}
        className="scale-110 data-[state=checked]:bg-[#7B5A41]"
      />
    </div>
  );
};

const AdditionalRequirementsRow = () => {
  const additionalRequirements = useTripStore((s) => s.additionalRequirements);
  const setAdditionalRequirements = useTripStore(
    (s) => s.setAdditionalRequirements,
  );

  return (
    <>
      <h3 className="font-semibold mb-2">
        Additional requirements{" "}
        <span className="text-sm font-light text-[#7A7A7A] lowercase">
          (optional)
        </span>
      </h3>
      <Textarea
        placeholder="Any Special Notes"
        value={additionalRequirements ?? ""}
        onChange={(e) => setAdditionalRequirements(e.target.value)}
        className="pl-4 pr-10 bg-[#F4F4F4] border border-[#E0E0E0]"
      />
    </>
  );
};
