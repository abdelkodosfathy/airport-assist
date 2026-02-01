// "use client";
// import { Button } from "@/components/ui/button";
// import { Package } from "@/lib/types/package";
// import Link from "next/link";
// import { useSearchParams } from "next/navigation";

// export default function ContinueButton({selectedPackage}: {selectedPackage?: Package}) {
//   const searchParams = useSearchParams();

//   // Preserve all existing query parameters
//   const queryString = searchParams.toString();

//   const href = `/meet-and-greet/flight-information${queryString ? `?${queryString}` : ''}`;

//   return (
//     <Button
//       asChild
//       variant="outline"
//       className="
//            mt-6
//            w-max
//            cursor-pointer
//            border-black
//            text-black
//            hover:border-[#664F31]
//            hover:bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)]
//            hover:text-white
//            duration-0
//          "
//     >
//       <Link href={href}>
//         <p className="text-lg font-normal font-[Manrope]">Continue</p>
//       </Link>
//     </Button>
//   );
// }
"use client";
import { Button } from "@/components/ui/button";
// import { Package } from "@/lib/types/package";
import Link from "next/link";
// import { useSearchParams } from "next/navigation";

export default function ContinueButton() {
  // const searchParams = useSearchParams();

  // clone existing params
  // const params = new URLSearchParams(searchParams.toString());

  // // add / update package_slug
  // if (selectedPackage?.package_slug) {
  //   params.set("package_slug", selectedPackage.package_slug);
  // }

  // const queryString = params.toString();

  // const href = `/meet-and-greet/flight-information${
  //   queryString ? `?${queryString}` : ""
  // }`;

  return (
    <Button
      asChild
      variant="outline"
      className="
        mt-6
        w-max 
        cursor-pointer 
        border-black 
        text-black 
        hover:border-[#664F31]  
        hover:bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)] 
        hover:text-white 
        duration-0
      "
    >
      <Link href={'/meet-and-greet/flight-information'}>
        <p className="text-lg font-normal font-[Manrope]">Continue</p>
      </Link>
    </Button>
  );
}
