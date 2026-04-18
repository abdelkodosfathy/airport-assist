import StripeForm from "@/app/vip-meet-and-greet/summry/stripe-form";
import { BookingStatus } from "@/lib/types/booking";
import { CheckCircle, AlertCircle, Clock, Loader2, XCircle, CalendarSearch } from "lucide-react";

type Props = {
  booking_status: BookingStatus;
  booking_uuid?: string;
};

function StripeRenderer({ booking_uuid }: { booking_uuid?: string }) {
  return (
    <StripeForm
      booking_status="awaiting_payment"
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
    iconColor: "text-blue-500",
    iconBg: "bg-blue-100",
    title: "Booking Scheduled",
    description: "Your booking has been scheduled successfully.",
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

export default function BookingStatusCard({
  booking_status,
  booking_uuid,
}: Props) {
  const config = statusConfig[booking_status];
  const Icon = config.icon;

  if (config.render) {
    return config.render({ booking_status, booking_uuid });
  }

  return (
    <div className="bg-white rounded-2xl p-5 shadow-md flex flex-col items-center gap-3">
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center ${config.iconBg}`}
      >
        <Icon size={20} className={config.iconColor} />
      </div>

      <div className="flex flex-col items-center gap-1">
        <p className="text-sm font-semibold text-[#1a1a1a]">
          {config.title}
        </p>
        <p className="text-xs text-[#74747A] text-center">
          {config.description}
        </p>
      </div>
    </div>
  );
}