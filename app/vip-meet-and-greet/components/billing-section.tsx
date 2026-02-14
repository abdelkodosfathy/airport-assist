// import { forwardRef, useImperativeHandle, useRef } from "react";
// import BillingInformation, {
//   BillingInformationRef,
// } from "./billing-information";
// import BillingAddress, { BillingAddressRef } from "./billing-address";
// import { FlightSectionData } from "./flight-section";
// import { toast } from "sonner";

// export type BillingSectionRef = {
//   isValid: () => boolean;
//   getData: () => {
//     info: ReturnType<BillingInformationRef["getData"]>;
//     address: ReturnType<BillingAddressRef["getData"]>;
//   };
// };

// interface BillingSectionProps {
//   onGetFlightData: () => FlightSectionData | null;
//   slug: string;
// }

// const BillingSection = forwardRef<BillingSectionRef, BillingSectionProps>(
//   ({ onGetFlightData, slug }, ref) => {
//     const billingInfoRef = useRef<BillingInformationRef>(null);
//     const billingAddressRef = useRef<BillingAddressRef>(null);

//     const validateInputs = () => {
//       const isInfoValid = billingInfoRef.current?.isValid() ?? false;
//       const isAddressValid = billingAddressRef.current?.isValid() ?? false;
//       return isInfoValid && isAddressValid;
//     };

//     useImperativeHandle(ref, () => ({
//       isValid: () => {
//         const res = validateInputs();
//         return res;
//       },
//       getData: () => ({
//         info: billingInfoRef.current?.getData()!,
//         address: billingAddressRef.current?.getData()!,
//       }),
//     }));

//     const postData = () => {
//       const isFormValid = validateInputs();
//       if (isFormValid) {
//         const packageSlug = slug;
//         const flight = onGetFlightData();
//         const info = billingInfoRef.current?.getData()!;
//         const address = billingAddressRef.current?.getData()!;
//         console.log("data: ", { packageSlug, info, address, flight });
//       } else {
//         toast.error("please fill required billing data", {
//           position: "top-center",
//         });
//       }
//     };

//     return (
//       <div className="space-y-4 h-auto flex-2">
//         <BillingInformation ref={billingInfoRef} />
//         <BillingAddress ref={billingAddressRef} />

//         <button onClick={postData}>get data</button>
//       </div>
//     );
//   },
// );

// BillingSection.displayName = "BillingSection";

// export default BillingSection;

import { forwardRef, useImperativeHandle, useRef } from "react";
import BillingInformation, {
  BillingInformationRef,
} from "./billing-information";
import BillingAddress, { BillingAddressRef } from "./billing-address";
import { FlightSectionData } from "./flight-section";
import { postBillingData } from "../postData"; // <-- import the function
import { Button } from "@/components/ui/button";

export type BillingSectionRef = {
  isValid: () => boolean;
  getData: () => {
    info: ReturnType<BillingInformationRef["getData"]>;
    address: ReturnType<BillingAddressRef["getData"]>;
  };
};

interface BillingSectionProps {
  onGetFlightData: () => FlightSectionData | null;
  slug: string;
  onSuccess: (uuid: string) => void;
}

const BillingSection = forwardRef<BillingSectionRef, BillingSectionProps>(
  ({ onGetFlightData, slug, onSuccess }, ref) => {
    const billingInfoRef = useRef<BillingInformationRef>(null);
    const billingAddressRef = useRef<BillingAddressRef>(null);

    const validateInputs = () => {
      const isInfoValid = billingInfoRef.current?.isValid() ?? false;
      const isAddressValid = billingAddressRef.current?.isValid() ?? false;
      return isInfoValid && isAddressValid;
    };

    useImperativeHandle(ref, () => ({
      isValid: () => validateInputs(),
      getData: () => ({
        info: billingInfoRef.current?.getData()!,
        address: billingAddressRef.current?.getData()!,
      }),
    }));

    // --- Updated: Use postBillingData here ---
    const handleSubmit = async () => {
      await postBillingData(
        {
          current: {
            isValid: validateInputs,
            getData: () => ({
              info: billingInfoRef.current?.getData()!,
              address: billingAddressRef.current?.getData()!,
            }),
          },
        } as React.RefObject<BillingSectionRef>,
        slug,
        onGetFlightData,
        onSuccess,
      );
    };

    // const onSuccess = (uuid: string) => {
    //   console.log(uuid);
    // }

    return (
      <div className="space-y-4 h-auto flex-2">
        <BillingInformation ref={billingInfoRef} />
        <BillingAddress ref={billingAddressRef} />


        <Button
          onClick={handleSubmit}
          type="button"
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
          <p className="text-lg font-normal font-[Manrope]">
            Proceed To Checkout
          </p>
        </Button>
      </div>
    );
  },
);

BillingSection.displayName = "BillingSection";

export default BillingSection;
