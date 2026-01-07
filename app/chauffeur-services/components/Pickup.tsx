import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus } from "lucide-react";
import car1 from "@/public/car1.png";
import car2 from "@/public/car2.png";
import Image, { StaticImageData } from "next/image";
import Passengers from "@/components/custom icons/passengers";
import CarriedBag from "@/components/custom icons/carriedBag";
import MeetAndGreet from "@/components/custom icons/meetAndGreet";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

type Props = {};

const Pickup = (props: Props) => {
  return (
    <div className="flex-2 h-full">
      <div className="flex gap-3.5 mb-4">
        <Button
          variant="outline"
          className="
            mt-6
            w-max 
            cursor-pointer 
            border-[#D1D1D1] 
            text-[#7A7A7A] 
            bg-[#ECECEC]
            hover:border-[#664F31]  
            hover:bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)] 
            hover:text-white 
            duration-0
          "
        >
          On a way
        </Button>
        <Button
          variant="outline"
          className="
            mt-6
            w-max 
            cursor-pointer 
            border-[#D1D1D1] 
            text-[#7A7A7A] 
            bg-[#ECECEC]
            hover:border-[#664F31]  
            hover:bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)] 
            hover:text-white 
            duration-0
          "
        >
          Round Trip
        </Button>
        <Button
          variant="outline"
          className="
            mt-6
            w-max 
            cursor-pointer 
            border-[#D1D1D1] 
            text-[#7A7A7A] 
            bg-[#ECECEC]
            hover:border-[#664F31]  
            hover:bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)] 
            hover:text-white 
            duration-0
          "
        >
          Hourly
        </Button>
      </div>
      <div className="flex items-center mb-4 gap-4 rounded-lg bg-[#FFFBEF] px-4 py-3 border border-[#7B5A414D] text-[#7B5A41]">
        <div className="min-w-6 w-6 min-h-6 h-6 text-lg bg-[#7B5A41] rounded-full grid place-content-center">
          <p className="text-white">!</p>
        </div>
        <p>
          One-way is a professional chauffeur service from point A to point B.
        </p>
      </div>

      <div className="flex gap-4 ">
        <div className="shadow-lg px-4.5 py-6 bg-white rounded-2xl h-full w-full max-w-6/11">
          <div>
            <h3 className="mb-2">Pickup</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6 w-full">
              <div className="space-y-2 col-span-2">
                {/* <Label htmlFor="from">From</Label> */}
                <Input
                  id="from"
                  placeholder="First Name"
                  className="pl-4 pr-10 bg-[#F4F4F4] border border-[#E0E0E0]"
                />
              </div>
              <div className="space-y-2 col-span-2">
                {/* <Label htmlFor="drop-off">Drop Off</Label> */}
                <Input
                  id="drop-off"
                  placeholder="First Name"
                  className="pl-4 pr-10 bg-[#F4F4F4] border border-[#E0E0E0]"
                />
              </div>
              <div className="space-y-2 col-span-1">
                {/* <Label htmlFor="pickup-date">Pickup date</Label> */}
                <Input
                  id="pickup-date"
                  placeholder="First Name"
                  className="pl-4 pr-10 bg-[#F4F4F4] border border-[#E0E0E0]"
                />
              </div>
              <div className="space-y-2 col-span-1">
                {/* <Label htmlFor="pickup-time">Pickup time</Label> */}
                <Input
                  id="pickup-time"
                  placeholder="First Name"
                  className="pl-4 pr-10 bg-[#F4F4F4] border border-[#E0E0E0]"
                />
              </div>
            </div>
          </div>

          <Separator />
          <div>
            <h3 className="mb-2">Flight</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6 w-full">
              <div className="space-y-2 col-span-1">
                {/* <Label htmlFor="flight">Flight</Label> */}
                <Input
                  id="flight"
                  placeholder="Air Lines"
                  className="pl-4 pr-10 bg-[#F4F4F4] border border-[#E0E0E0]"
                />
              </div>
              <div className="space-y-2 col-span-1">
                {/* <Label htmlFor="flight">Flight</Label> */}
                <Input
                  id="flight"
                  placeholder="Air Lines"
                  className="pl-4 pr-10 bg-[#F4F4F4] border border-[#E0E0E0]"
                />
              </div>
            </div>
          </div>
          <Separator />
          <div className="flex gap-16 mt-3">
            <NumperInput title="Passengers" />
            <NumperInput title="Luggage" />
          </div>
          <Separator />
          <div>
            <div className="flex justify-between p-4 items-center bg-[#F2F3F5] rounded-md my-4">
              <p className="flex gap-2 text-lg items-center">
                <MeetAndGreet />
                Airport Meet & greet service
              </p>
              <Switch className="scale-110 data-[state=checked]:bg-[#7B5A41]" />
            </div>
            <h3 className="font-semibold mb-2">
              Additional requirements{" "}
              <span className="text-sm font-light text-[#7A7A7A]">
                (optional)
              </span>
            </h3>
            <Textarea
              placeholder="Any Special Notes"
              className="pl-4 pr-10 bg-[#F4F4F4] border border-[#E0E0E0]"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 w-5/11">
          <CarCard
            title="Mercedes V-Class"
            desc="Premium SUV – Elegant comfort for up to 7 passengers."
            image={car2}
          />
          <CarCard
            title="Mercedes Jet-Class"
            desc="Premium SUV – Elegant comfort for up to 4 passengers."
            image={car2}
          />
          <CarCard
            isNew
            title="Mercedes S-Class"
            desc="Premium Sedan – Elegant comfort for up to 2 passengers."
            image={car1}
          />
          <CarCard
            title="Range Rover Vogue"
            desc="Premium SUV – Elegant comfort for up to 4 passengers."
            image={car2}
          />

          <Button
            variant="outline"
            className="
            col-span-2
            cursor-pointer 
            border-[#D1D1D1] 
            text-[#7A7A7A] 
            bg-[#ECECEC]
            hover:border-[#664F31]  
            hover:bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)] 
            hover:text-white 
            duration-0
          "
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Pickup;

const Separator = () => (
  <span className="inline-block w-full h-0.5 bg-[#E5E5E5]"></span>
);
const NumperInput = ({ title }: { title: string }) => (
  <div className="flex flex-1 justify-between items-center">
    <p className="font-semibold">{title}</p>
    <div className="flex gap-2 items-center">
      <div className="grid place-content-center rounded-full w-8 h-8 text-white bg-[#7B5A41] opacity-50">
        <Minus />
      </div>
      <Input
        min={0}
        type="number"
        className="rounded-lg text-center min-w-0 w-16 bg-[#F2F3F5]"
      />
      <div className="grid place-content-center rounded-full w-8 h-8 text-white bg-[#7B5A41]">
        <Plus />
      </div>
    </div>
  </div>
);

type CarCardProps = {
  title: string;
  desc: string;
  isNew?: boolean;
  image: StaticImageData | string;
};

const CarCard = ({ title, desc, image, isNew }: CarCardProps) => (
  <div className="bg-white rounded-lg p-4 shadow-md hover:shadow-xl duration-300  cursor-pointer">
    <div className="flex justify-between">
      <p className="font-bold text-[#101828]">
        {title}{" "}
        {isNew && (
          <span className="text-[0.625rem] font-light">(new shape)</span>
        )}
      </p>

      <span className="inline-block w-6 h-6 rounded-full border border-[#D5D6DB]"></span>
      {/* <Radio selected={car.id === selectedCarId} /> */}
    </div>
    <p className="text-[0.625rem] max-w-44 text-[#7a7a7a] mb-3">{desc}</p>

    <Image
      src={image}
      alt={title}
      width={230}
      height={120}
      className="rounded-lg h-[120px] w-[230px] object-contain mx-auto"
    />
    <div className="flex justify-between text-[0.625rem] items-end pb-1 mb-1 border-b border-[#E5E5E5]">
      <div className="flex gap-2 ">
        <p className="flex gap-1 items-center">
          <Passengers />
          <span>7</span>
        </p>
        <p className="flex gap-1 items-center">
          <CarriedBag />
          <span>7</span>
        </p>
      </div>
      <p className="text-[#74747A]">Includes up to 18 miles</p>
    </div>
    <div>
      <p className="text-[0.675rem] flex justify-between">
        Price Per Mile<span>£4.00</span>
      </p>
      <p className="text-[0.675rem] flex justify-between">
        Supplement Fee<span>£220.00</span>
      </p>
      <p className="text-[0.675rem] flex justify-between">
        Rate per hour<span>+£90.00/hour</span>
      </p>
    </div>
  </div>
);

interface RadioProps {
  selected?: boolean;
}

function Radio({ selected }: RadioProps) {
  return (
    <div
      className={`min-w-6 min-h-6 rounded-full border-2 flex items-center justify-center border-[#7A7A7A] cursor-pointer`}
    >
      {selected && <span className="w-4 h-4 rounded-full bg-[#7A7A7A]"></span>}
    </div>
  );
}
