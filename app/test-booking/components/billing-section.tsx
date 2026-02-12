import BillingInformation from "./billing-information";
import BillingAddress from "./billing-address";
import { SingleAirport } from "@/lib/types/airport";

type Props = {};

const BillingSection = () => {
  return (
    <div className="space-y-4 h-auto flex-2">
      <BillingInformation />
      <BillingAddress />
    </div>
  );
};

export default BillingSection;
