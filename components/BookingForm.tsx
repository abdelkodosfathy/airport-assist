// "use client";

// import { useState } from "react";
// import { Card } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import clsx from "clsx";
// import { DatePickerWithIconDemo } from "./DateTimeInputs";
// import { ArrowUpRight } from "lucide-react";

// export default function BookingForm() {
//   const [activeTab, setActiveTab] = useState<"vip" | "luxury-chauffeur" | "private-jet" | "hotel">("vip");

//   return (
//     <Card className="backdrop-blur-md bg-white/10 border-white/20 mt-12 p-12 w-full">
//       {/* Tabs buttons */}
//       <div className="flex gap-0">
//         <Button
//           variant={"ghost"}
//           onClick={() => setActiveTab("vip")}
//           className="cursor-pointer relative px-4 py-2 text-white font-medium text-2xl hover:bg-transparent hover:text-white"
//         >
//           VIP Meet & Greet Service
//           {/* underline */}
//           <span
//             className={clsx(
//               "absolute left-0 right-0 -bottom-3 h-1 rounded-full transition-opacity duration-300",
//               activeTab === "vip"
//                 ? "opacity-100 bg-linear-to-r from-[#99785F00]/0 via-[#AB9B90] to-[#99785F00]/0"
//                 : "opacity-0"
//             )}
//           />
//         </Button>
//         <span className="inline-block w-0.75 h-9 rounded-3xl  bg-linear-to-b from-white to-white/10"></span>

//         <Button
//           variant={"ghost"}
//           onClick={() => setActiveTab("luxury-chauffeur")}
//           className="cursor-pointer relative px-4 py-2 text-white font-medium text-2xl hover:bg-transparent hover:text-white"
//         >
//           Luxury Chauffeur
//           <span
//             className={clsx(
//               "absolute left-0 right-0 -bottom-3 h-1 rounded-full transition-opacity duration-300",
//               activeTab === "luxury-chauffeur"
//                 ? "opacity-100 bg-linear-to-r from-[#99785F00]/0 via-[#AB9B90] to-[#99785F00]/0"
//                 : "opacity-0"
//             )}
//           />
//         </Button>
//         <span className="inline-block w-0.75 h-9 rounded-3xl  bg-linear-to-b from-white to-white/10"></span>
//         <Button
//           variant={"ghost"}
//           onClick={() => setActiveTab("private-jet")}
//           className="cursor-pointer relative px-4 py-2 text-white font-medium text-2xl hover:bg-transparent hover:text-white"
//         >
//           Private Jet
//           <span
//             className={clsx(
//               "absolute left-0 right-0 -bottom-3 h-1 rounded-full transition-opacity duration-300",
//               activeTab === "private-jet"
//                 ? "opacity-100 bg-linear-to-r from-[#99785F00]/0 via-[#AB9B90] to-[#99785F00]/0"
//                 : "opacity-0"
//             )}
//           />
//         </Button>
//         <span className="inline-block w-0.75 h-9 rounded-3xl  bg-linear-to-b from-white to-white/10"></span>
//         <Button
//           variant={"ghost"}
//           onClick={() => setActiveTab("hotel")}
//           className="cursor-pointer relative px-4 py-2 text-white font-medium text-2xl hover:bg-transparent hover:text-white"
//         >
//           Hotel
//           <span
//             className={clsx(
//               "absolute left-0 right-0 -bottom-3 h-1 rounded-full transition-opacity duration-300",
//               activeTab === "hotel"
//                 ? "opacity-100 bg-linear-to-r from-[#99785F00]/0 via-[#AB9B90] to-[#99785F00]/0"
//                 : "opacity-0"
//             )}
//           />
//         </Button>
//       </div>

//       {/* Tab content */}
//       <div className="*:h-18 mt-6 flex gap-1">
//         {activeTab === "vip" ? (
//           <>
//             <Input
//               placeholder="From Airport"
//               className="flex-1 bg-white rounded-none rounded-l-3xl"
//             />
//             <Input
//               placeholder="Drop Off"
//               className="flex-1 bg-white rounded-none"
//             />
//             <DatePickerWithIconDemo />
//             <Input
//               type="number"
//               placeholder="Pickup Time"
//               className="max-w-56.25 bg-white rounded-none"
//             />
//           </>
//         ) : (
//           <>
//             <Input
//               placeholder="From"
//               className="flex-1 bg-white rounded-none rounded-l-3xl"
//             />
//             <Input placeholder="To" className="flex-1 bg-white rounded-none" />
//             <DatePickerWithIconDemo />
//             <Input
//               type="time"
//               className="max-w-56.25 bg-white rounded-none"
//             />
//           </>
//         )}
//         <Button className="w-full rounded-none rounded-r-3xl border text-xl font-light border-white/30 text-white px-6 py-3 bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)] hover:opacity-90 max-w-[240]">
//           Book Now
//         </Button>
//       </div>
//     </Card>
//   );
// }

"use client";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { DatePickerWithIconDemo } from "./DateTimeInputs";
// import { ArrowUpRight } from "lucide-react";

export default function BookingForm() {
  const [activeTab, setActiveTab] = useState<"vip" | "chauffeur-services">("vip");

  return (
    <Card className="backdrop-blur-md bg-white/10 border-white/20 mt-12 p-12 w-full">
      {/* Tabs buttons */}
      <div className="flex gap-0">
        <Button
          variant={"ghost"}
          onClick={() => setActiveTab("vip")}
          className="cursor-pointer relative px-4 py-2 text-white font-medium text-lg hover:bg-transparent hover:text-white"
        >
          VIP Meet & Greet Service
          {/* underline */}
          <span
            className={clsx(
              "absolute left-0 right-0 -bottom-3 h-1 rounded-full transition-opacity duration-300",
              activeTab === "vip"
                ? "opacity-100 bg-linear-to-r from-[#99785F00]/0 via-[#AB9B90] to-[#99785F00]/0"
                : "opacity-0"
            )}
          />
        </Button>
        <span className="inline-block w-0.75 h-9 rounded-3xl  bg-linear-to-b from-white to-white/10"></span>

        <Button
          variant={"ghost"}
          onClick={() => setActiveTab("chauffeur-services")}
          className="cursor-pointer relative px-4 py-2 text-white font-medium text-lg hover:bg-transparent hover:text-white"
        >
          Chauffeur Services
          <span
            className={clsx(
              "absolute left-0 right-0 -bottom-3 h-1 rounded-full transition-opacity duration-300",
              activeTab === "chauffeur-services"
                ? "opacity-100 bg-linear-to-r from-[#99785F00]/0 via-[#AB9B90] to-[#99785F00]/0"
                : "opacity-0"
            )}
          />
        </Button>
      </div>

      {/* Tab content */}
      <div className="*:h-18 mt-6 flex gap-1">
        {activeTab === "vip" ? (
          <>
            <Input
              placeholder="From Airport"
              className="flex-1 bg-white rounded-none rounded-l-3xl"
            />
            <Input
              placeholder="Drop Off"
              className="flex-1 bg-white rounded-none"
            />
            <DatePickerWithIconDemo />
            <Input
              type="number"
              placeholder="Pickup Time"
              className="max-w-56.25 bg-white rounded-none"
            />
          </>
        ) : (
          <>
            <Input
              placeholder="From"
              className="flex-1 bg-white rounded-none rounded-l-3xl"
            />
            <Input placeholder="To" className="flex-1 bg-white rounded-none" />
            <DatePickerWithIconDemo />
            <Input
              type="time"
              className="max-w-56.25 bg-white rounded-none"
            />
          </>
        )}
        <Button className="w-full rounded-none rounded-r-3xl border text-xl font-light border-white/30 text-white px-6 py-3 bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)] hover:opacity-90 max-w-[240]">
          Book Now
        </Button>
      </div>
    </Card>
  );
}
