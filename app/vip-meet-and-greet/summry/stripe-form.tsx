"use client";
import payments from "@/public/payments.png";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { apiPost } from "@/lib/api";
import { Country, CountryDropdown } from "@/components/ui/country-dropdown";
import { AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

type Props = { payFor?: "bookings" | "trips"; booking_status: string };

const cardElementStyle = {
  style: {
    base: {
      fontSize: "14px",
      color: "#1a1a1a",
      fontFamily: "Manrope, Arial, sans-serif",
      fontWeight: "400",
      "::placeholder": { color: "#9CA3AF" },
    },
    invalid: { color: "#dc2626" },
  },
};

const cardInputClass =
  "px-4 h-11 py-3 bg-[#F4F4F4] border border-[#E0E0E0] rounded-md w-full transition-colors focus-within:border-[#664F31] shadow-xs";

// ── Root: fetches client secret and passes it down ───────────────────────────
const StripeForm = ({ payFor = "bookings", booking_status }: Props) => {
  // const searchParams = useSearchParams();
  // const paramsUUID = searchParams.get("uuid");

  // const [promoCode, setPromoCode] = useState("");
  // const [clientSecret, setClientSecret] = useState<string | null>(null);
  // const [fetchError, setFetchError] = useState<string | null>(null);

  // useEffect(() => {
  //   if (!paramsUUID) return;
  //   const fetchClientSecret = async () => {
  //     try {
  //       const result = await apiPost(
  //         `/${payFor}/${paramsUUID}/checkout/payment-intent`,
  //         { payment_method: "stripe", promo_code: promoCode },
  //       );
  //       const secret = result?.data?.payment_intent?.clientSecret;
  //       if (!secret) throw new Error("Client secret not returned from server.");
  //       setClientSecret(secret);
  //     } catch (err: any) {
  //       setFetchError(err.message || "Something went wrong");
  //     }
  //   };
  //   fetchClientSecret();
  // }, [paramsUUID]);
  const searchParams = useSearchParams();
  const paramsUUID = searchParams.get("uuid");

  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);
  const [promoLoading, setPromoLoading] = useState(false);

  const fetchClientSecret = async () => {
    setFetchError(null);
    setClientSecret(null);
    try {
      const result = await apiPost(
        `/${payFor}/${paramsUUID}/checkout/payment-intent`,
        { payment_method: "stripe", promo_code: "" },
      );
      const secret = result?.data?.payment_intent?.clientSecret;
      if (!secret) throw new Error("Client secret not returned from server.");
      setClientSecret(secret);
    } catch (err: any) {
      setFetchError(err.message || "Something went wrong");
    }
  };

  const applyPromo = async (code: string) => {
    setPromoError(null);
    setPromoLoading(true);
    try {
      const result = await apiPost(
        `/${payFor}/${paramsUUID}/checkout/payment-intent`,
        { payment_method: "stripe", promo_code: code },
      );
      const secret = result?.data?.payment_intent?.clientSecret;
      if (!secret) throw new Error("Invalid promo code.");
      setClientSecret(secret); // ← لو نجح بس بنحدث الـ secret
    } catch (err: any) {
      setPromoError(err.data?.error || "Invalid promo code"); // ← clientSecret مش بيتأثر
    } finally {
      setPromoLoading(false);
    }
  };

  useEffect(() => {
    if (!paramsUUID) return;
    fetchClientSecret();
  }, [paramsUUID]);

  if (fetchError)
    return (
      <div className="bg-white rounded-2xl p-5 shadow-md flex flex-col items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
          <AlertCircle size={20} className="text-red-500" />
        </div>
        <div className="flex flex-col items-center gap-1">
          <p className="text-sm font-semibold text-[#1a1a1a]">
            Payment unavailable
          </p>
          {/* <p className="text-xs text-[#74747A] text-center">{fetchError}</p> */}
        </div>
      </div>
    );
  if (!clientSecret)
    return (
      <div className="bg-white rounded-2xl p-5 shadow-md text-center text-gray-500">
        Loading payment form...
      </div>
    );

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      {/* <CheckoutForm
        booking_status={booking_status}
        clientSecret={clientSecret}
        onCheckPromotionCode={() => {}}
      /> */}
      <CheckoutForm
        booking_status={booking_status}
        clientSecret={clientSecret}
        promoError={promoError}
        promoLoading={promoLoading}
        onApplyPromo={applyPromo}
      />
    </Elements>
  );
};

export default StripeForm;

// ── Inner form ───────────────────────────────────────────────────────────────
// const CheckoutForm = ({
//   booking_status,
//   clientSecret,
//   onCheckPromotionCode,
// }: {
//   booking_status: string;
//   clientSecret: string;
//   onCheckPromotionCode: (promotionCode: string) => void;
// }) => {
const CheckoutForm = ({
  booking_status,
  clientSecret,
  onApplyPromo,
  promoError,
  promoLoading,
}: {
  booking_status: string;
  clientSecret: string;
  onApplyPromo: (code: string) => void;
  promoError: string | null;
  promoLoading: boolean;
}) => {
  const stripe = useStripe();
  const elements = useElements();

  const [termsAccepted, setTermsAccepted] = useState(false);
  const [reservationConfirmed, setReservationConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [cardComplete, setCardComplete] = useState(false);

  const [nameOnCard, setNameOnCard] = useState("");
  const [address, setAddress] = useState("");
  const [postCode, setPostCode] = useState("");
  const [country, setCountry] = useState("");

  //if payment success --> it will be true to disable form from repay
  const [success, setSuccess] = useState(false);

  const isPayDisabled =
    success ||
    !stripe ||
    !cardComplete ||
    !elements ||
    !termsAccepted ||
    !reservationConfirmed ||
    !nameOnCard.trim() ||
    !address.trim() ||
    !postCode.trim() ||
    !country ||
    booking_status !== "awaiting_payment" ||
    loading;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setErrorMessage(null);

    const cardNumber = elements.getElement(CardNumberElement);
    if (!cardNumber) {
      setErrorMessage("Card number not found.");
      setLoading(false);
      return;
    }

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: cardNumber,
          billing_details: {
            name: nameOnCard,
            address: {
              line1: address,
              postal_code: postCode,
              country: country,
            },
          },
        },
      },
    );

    if (error) {
      toast.error("Payment failed", {
        description: error.message ?? "Something went wrong, please try again.",
      });
    } else if (paymentIntent?.status === "succeeded") {
      setSuccess(true);
      toast.success("Payment successful!", {
        description: "Your booking has been confirmed.",
        position: "top-center",
        style: {
          background: "white",
          color: "#664F31",
          border: "none",
        },
        classNames: {
          icon: "text-[#664F31]",
        },
      });
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`bg-white rounded-2xl p-5 grid grid-cols-2 gap-x-3 gap-y-4 shadow-md ${
        loading || success ? "opacity-60 pointer-events-none" : ""
      }`}
    >
      {/* Card Number */}
      <div className="space-y-2 col-span-2">
        <Label>Card number</Label>
        <div className={`${cardInputClass} flex items-center pr-4`}>
          <div className="flex-1">
            <CardNumberElement
              options={cardElementStyle}
              onChange={(e) => {
                setCardComplete(e.complete);
              }}
            />
          </div>
          <Image
            alt="payment ways"
            src={payments}
            width={105}
            height={40}
            className="shrink-0"
          />
        </div>
      </div>
      {/* Name on Card */}
      <div className="space-y-2 col-span-2">
        <Label htmlFor="name-on-card">Name on card</Label>
        <Input
          id="name-on-card"
          value={nameOnCard}
          onChange={(e) => setNameOnCard(e.target.value)}
          placeholder="Full name as on card"
          className="pl-4 h-11 rounded-md bg-[#F4F4F4] border border-[#E0E0E0] shadow-none focus-visible:ring-0 focus-visible:border-[#664F31]"
        />
      </div>
      {/* Expiry */}
      <div className="space-y-2 col-span-1">
        <Label>Expiry date</Label>
        <div className={cardInputClass}>
          <CardExpiryElement options={cardElementStyle} />
        </div>
      </div>
      {/* CVC */}
      <div className="space-y-2 col-span-1">
        <Label>Security code</Label>
        <div className={cardInputClass}>
          <CardCvcElement options={cardElementStyle} />
        </div>
      </div>
      {/* Address */}
      <div className="space-y-2 col-span-2">
        <Label htmlFor="address">Address</Label>
        <Input
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Billing address"
          className="pl-4 h-11 rounded-md bg-[#F4F4F4] border border-[#E0E0E0] shadow-none focus-visible:ring-0 focus-visible:border-[#664F31]"
        />
      </div>
      {/* Post Code + Country — same row */}
      <div className="space-y-2 col-span-1">
        <Label htmlFor="post-code">Post code</Label>
        <Input
          id="post-code"
          value={postCode}
          onChange={(e) => setPostCode(e.target.value)}
          placeholder="Post code"
          className="pl-4 h-11 rounded-md bg-[#F4F4F4] border border-[#E0E0E0] shadow-none focus-visible:ring-0 focus-visible:border-[#664F31]"
        />
      </div>
      <div className="space-y-2 col-span-1">
        <Label>Country</Label>
        <CountryDropdown
          placeholder="Select country"
          onChange={(c: Country) => setCountry(c.alpha2)}
          className="w-full h-11 pl-4 rounded-md bg-[#F4F4F4] border border-[#E0E0E0] shadow-none focus:ring-0 focus:border-[#664F31] text-sm"
        />
      </div>
      <Separator className="col-span-2" />
      {/* promotion code */}
      {/* <PromoCode onApply={onApplyPromo} /> ← مرر مباشرة */}
      <Separator className="col-span-2" />
      <PromoCode
        onApply={onApplyPromo}
        error={promoError}
        loading={promoLoading}
      />
      {/* Confirm reservation */}
      <div className="flex items-start gap-3 col-span-2">
        <Checkbox
          id="i-confirm"
          checked={reservationConfirmed}
          onCheckedChange={(v) => setReservationConfirmed(!!v)}
          className="cursor-pointer w-6 h-6 rounded-md bg-[#F4F4F4] data-[state=checked]:bg-[#664F31] data-[state=checked]:border-[#664F31] shrink-0"
        />
        <Label
          htmlFor="i-confirm"
          className="text-sm leading-relaxed cursor-pointer"
        >
          I confirm that I have reviewed and verified the accuracy of this
          reservation.
        </Label>
      </div>
      {/* Terms */}
      <div className="flex items-start gap-3 col-span-2">
        <Checkbox
          id="i-agree"
          checked={termsAccepted}
          onCheckedChange={(v) => setTermsAccepted(!!v)}
          className="cursor-pointer w-6 h-6 rounded-md bg-[#F4F4F4] data-[state=checked]:bg-[#664F31] data-[state=checked]:border-[#664F31] shrink-0"
        />
        <Label
          htmlFor="i-agree"
          className="text-sm leading-relaxed cursor-pointer"
        >
          I have read and agree to the website terms and conditions *
        </Label>
      </div>
      {/* Book Now */}
      {!success && (
        <Button
          type="submit"
          disabled={isPayDisabled}
          variant="outline"
          className="
          col-span-2 w-full cursor-pointer border-black text-black
          hover:border-[#664F31]
          hover:bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)]
          hover:text-white duration-0 rounded-lg py-5 px-7
          disabled:opacity-50 disabled:cursor-not-allowed
        "
        >
          <p className="text-sm font-normal font-[Manrope]">
            {loading ? "Processing..." : "Pay Now"}
          </p>
        </Button>
      )}
      {errorMessage && (
        <div className="col-span-2 flex items-start gap-3 px-4 py-3 rounded-xl border border-red-200 bg-red-50">
          <div className="shrink-0 w-5 h-5 rounded-full bg-red-100 flex items-center justify-center mt-0.5">
            <AlertCircle size={12} className="text-red-500" />
          </div>
          <div className="flex flex-col gap-0.5">
            <p className="text-sm font-semibold text-red-600">Payment failed</p>
            <p className="text-xs text-red-400">{errorMessage}</p>
          </div>
        </div>
      )}
      <p className="text-[#74747A] col-span-2 text-center">
        Secure checkout powered by <span className="font-bold">stripe</span>
      </p>
    </form>
  );
};

// const PromoCode = ({ onApply }: { onApply: (code: string) => void }) => {
//   const [promo, setPromo] = useState("");

//   const handleApplyPromo = () => {
//     if (promo.trim() !== "") {
//       onApply(promo);
//     }
//   };

//   return (
//     <div className="gap-3 col-span-2">
//       <div className="flex gap-2 items-stretch">
//         <Input
//           value={promo}
//           onChange={(e) => setPromo(e.target.value)}
//           id="promo_code"
//           placeholder="Promotion Code"
//           className="pl-4 h-11 rounded-md bg-[#F4F4F4] border border-[#E0E0E0] shadow-none focus-visible:ring-0 focus-visible:border-[#664F31]"
//         />
//         <Button
//           disabled={promo.trim() === ""}
//           onClick={handleApplyPromo}
//           variant="outline"
//           className="w-max h-11 cursor-pointer border-black text-black hover:border-[#664F31] hover:bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)] hover:text-white duration-0"
//         >
//           Apply
//         </Button>
//       </div>
//     </div>
//   );
// };

const PromoCode = ({
  onApply,
  error,
  loading,
}: {
  onApply: (code: string) => void;
  error?: string | null;
  loading?: boolean;
}) => {
  const [promo, setPromo] = useState("");

  const handleApplyPromo = () => {
    if (promo.trim() !== "") onApply(promo);
  };

  return (
    <div className="gap-3 col-span-2">
      <div className="flex gap-2 items-stretch">
        <Input
          value={promo}
          onChange={(e) => {
            setPromo(e.target.value);
          }}
          id="promo_code"
          placeholder="Promotion Code"
          className="pl-4 h-11 rounded-md bg-[#F4F4F4] border border-[#E0E0E0] shadow-none focus-visible:ring-0 focus-visible:border-[#664F31]"
        />
        <Button
          disabled={promo.trim() === "" || loading}
          onClick={handleApplyPromo}
          type="button" // ← مهم عشان ميعملش submit للفورم
          variant="outline"
          className="w-max h-11 cursor-pointer border-black text-black hover:border-[#664F31] hover:bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)] hover:text-white duration-0"
        >
          {loading ? "Applying..." : "Apply"}
        </Button>
      </div>
      {error && <p className="text-xs text-red-500 mt-1.5">{error}</p>}
    </div>
  );
};
