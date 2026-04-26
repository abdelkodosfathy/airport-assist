import StripeForm from "@/app/vip-meet-and-greet/summry/stripe-form";
import { BookingStatus } from "@/lib/types/booking";
import {
  CheckCircle,
  AlertCircle,
  Clock,
  Loader2,
  XCircle,
  CalendarSearch,
} from "lucide-react";
import { Button } from "./ui/button";
import { useConfirmBookingMutation } from "@/lib/hooks/useBooking";

type Props = {
  booking_status: BookingStatus;
  booking_uuid?: string;
};

function StripeRenderer({ booking_uuid }: { booking_uuid?: string }) {
  return (
    <StripeForm
    // booking_status="awaiting_payment"
    // uuid={booking_uuid}
    />
  );
}

export const statusConfig: Record<
  BookingStatus,
  {
    icon: any;
    iconColor: string;
    iconBg: string;
    title: string;
    description: string;
    render?: (props: Props) => React.ReactNode;
  }
> = {
  scheduled: {
    icon: Clock,
    iconColor: "text-green-500",
    iconBg: "bg-green-100",
    title: "Booking Scheduled",
    description: "Your booking has been scheduled successfully.",
  },
  pending: {
    icon: Clock,
    iconColor: "text-blue-500",
    iconBg: "bg-blue-100",
    title: "Booking pending to confirm",
    description: "Your booking is waiting for you to confirm.",
  },

  awaiting_payment: {
    icon: AlertCircle,
    iconColor: "text-yellow-500",
    iconBg: "bg-yellow-100",
    title: "Awaiting Payment",
    description: "Please complete your payment to continue.",
    render: (props) => <StripeRenderer {...props} />,
  },

  checking_availability: {
    icon: CalendarSearch,
    iconColor: "text-[#62697D]",
    iconBg: "bg-[#7B5A411C]",
    title: "Checking Availability",
    description: "We are checking availability for your booking.",
  },

  in_progress: {
    icon: Loader2,
    iconColor: "text-indigo-500",
    iconBg: "bg-indigo-100",
    title: "In Progress",
    description: "Your booking is currently in progress.",
  },

  rejected: {
    icon: XCircle,
    iconColor: "text-red-500",
    iconBg: "bg-red-100",
    title: "Booking Rejected",
    description: "Unfortunately your booking was rejected.",
  },

  completed_successfully: {
    icon: CheckCircle,
    iconColor: "text-green-500",
    iconBg: "bg-green-100",
    title: "Completed",
    description: "Your booking completed successfully.",
  },

  faild: {
    icon: XCircle,
    iconColor: "text-red-500",
    iconBg: "bg-red-100",
    title: "Failed",
    description: "Something went wrong with your booking.",
  },
};

// export default function BookingStatusCard({
//   booking_status,
//   booking_uuid,
// }: Props) {
//   // استخدام الـ Mutation بدلاً من الـ Query
//   const confirmMutation = useConfirmBookingMutation();

//   const config = statusConfig[booking_status];
//   const Icon = config.icon;
//   console.log(confirmMutation);
//   console.log(confirmMutation.isSuccess);
//   console.log(confirmMutation.data?.booking_status === "awaiting_payment");

//   // 1. حالة الـ Pending (عرض أزرار التأكيد والتعديل)
//   if (booking_status === "pending") {
//     return (
//       <ConfirmationActions
//         // عند الضغط، ننفذ الميوتيشن
//         onConfirm={() => {
//           if (booking_uuid) {
//             confirmMutation.mutate(booking_uuid);
//           }
//         }}
//         // نمرر حالة التحميل لتعطيل الزر وإظهار Spinner
//         isLoading={confirmMutation.isPending}
//       />
//     );
//   }

//   // 2. إذا كانت الحالة أصبحت "awaiting_payment" أو نجحت العملية
//   if (booking_status === "awaiting_payment" || (confirmMutation.isSuccess && confirmMutation.data?.booking_status === "awaiting_payment")) {
//     return <StripeForm/>;
//   }

//   // 3. باقي الحالات (Success, Fail, etc.)
//   return (
//     <div className="bg-white rounded-2xl p-6 shadow-md flex flex-col items-center gap-4 border border-gray-50">
//       <div
//         className={`w-12 h-12 rounded-full flex items-center justify-center ${config.iconBg}`}
//       >
//         <Icon size={24} className={config.iconColor} />
//       </div>
//       <div className="flex flex-col items-center gap-1 text-center">
//         <p className="text-base font-bold text-[#1a1a1a]">{config.title}</p>
//         <p className="text-sm text-[#74747A] leading-relaxed">
//           {config.description}
//         </p>
//       </div>
//     </div>
//   );
// }


// export default function BookingStatusCard({
//   booking_status,
//   booking_uuid,
// }: Props) {
//   const confirmMutation = useConfirmBookingMutation();
//   const config = statusConfig[booking_status];
//   const Icon = config.icon;

//   // 1. تحقق أولاً: هل نجحت العملية؟ أو هل الحالة أصلاً awaiting_payment؟
//   // نضع هذا الشرط في البداية "لأنه يكسر الحالة القديمة"
//   if (
//     booking_status === "awaiting_payment" ||
//     (confirmMutation.isSuccess &&
//       confirmMutation.data?.booking_status === "awaiting_payment")
//   ) {
//     return <StripeForm />;
//   }

//   // 2. إذا لم تنجح بعد، وكان الـ Prop القادم من الأب لا يزال pending
//   if (booking_status === "pending") {
//     return (
//       <ConfirmationActions
//         onConfirm={() => {
//           if (booking_uuid) {
//             confirmMutation.mutate(booking_uuid);
//           }
//         }}
//         isLoading={confirmMutation.isPending}
//       />
//     );
//   }

//   // 3. باقي الحالات (Success, Fail, etc.)
//   return (
//     <div className="bg-white rounded-2xl p-6 shadow-md flex flex-col items-center gap-4 border border-gray-50">
//       <div
//         className={`w-12 h-12 rounded-full flex items-center justify-center ${config.iconBg}`}
//       >
//         <Icon size={24} className={config.iconColor} />
//       </div>
//       <div className="flex flex-col items-center gap-1 text-center">
//         <p className="text-base font-bold text-[#1a1a1a]">{config.title}</p>
//         <p className="text-sm text-[#74747A] leading-relaxed">
//           {config.description}
//         </p>
//       </div>
//     </div>
//   );
// }

export default function BookingStatusCard({
  booking_status,
  booking_uuid,
}: Props) {
  const confirmMutation = useConfirmBookingMutation();

  // الـ status الفعلي = نتيجة الـ mutation لو نجحت، غير كده الـ prop العادي
  const effectiveStatus: BookingStatus = confirmMutation.isSuccess
    ? confirmMutation.data?.booking_status
    : booking_status;

  const config = statusConfig[effectiveStatus];
  const Icon = config.icon;

  if (effectiveStatus === "pending") {
    return (
      <ConfirmationActions
        onConfirm={() => {
          if (booking_uuid) confirmMutation.mutate(booking_uuid);
        }}
        isLoading={confirmMutation.isPending}
      />
    );
  }

  if (config.render) {
    return <>{config.render({ booking_status: effectiveStatus, booking_uuid })}</>;
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md flex flex-col items-center gap-4 border border-gray-50">
      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${config.iconBg}`}>
        <Icon size={24} className={config.iconColor} />
      </div>
      <div className="flex flex-col items-center gap-1 text-center">
        <p className="text-base font-bold text-[#1a1a1a]">{config.title}</p>
        <p className="text-sm text-[#74747A] leading-relaxed">{config.description}</p>
      </div>
    </div>
  );
}

function ConfirmationActions({
  onConfirm,
  isLoading,
}: {
  onConfirm: () => void;
  isLoading: boolean;
}) {
  return (
    <div className="flex flex-col gap-3 w-full p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
          <Clock className="text-blue-600" size={20} />
        </div>
        <div>
          <h3 className="text-sm font-bold text-gray-900">
            Review Your Booking
          </h3>
          <p className="text-xs text-gray-500">
            Please confirm your details before payment.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Button
          onClick={onConfirm}
          disabled={isLoading} // تعطيل الزر أثناء التحميل
          type="button"
          variant="outline"
          className="w-full cursor-pointer border-black text-black hover:border-[#664F31] hover:bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)] hover:text-white duration-0"
        >
          {/* <p className="text-lg font-normal font-[Manrope]"> */}
          {isLoading ? (
            <>
              <Loader2 className="animate-spin" size={18} />
              Confirming...
            </>
          ) : (
            "Confirm & Proceed to Payment"
          )}
          {/* </p> */}
        </Button>
      </div>
    </div>
  );
}
