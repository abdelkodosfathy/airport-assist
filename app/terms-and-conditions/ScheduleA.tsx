"use client";

const ScheduleTable = () => {
  const data = [
    {
      location: "AMS",
      service: "Meet and Assist",
      rule: "Graduated cancellation fees may apply between 24 and 72 hours, with a small handling fee for earlier cancellation.",
    },
    {
      location: "BKK",
      service: "Meet and Assist",
      rule: "Early cancellation may allow partial refund less a handling fee; within 48 hours the service may be non-refundable.",
    },
    {
      location: "SIN",
      service: "Meet and Assist",
      rule: "Night, same-day, peak-season, and terminal surcharges may apply; changes or cancellations inside 60 hours may be charged in full.",
    },
    {
      location: "LAX",
      service: "VIP Tarmac",
      rule: "Reservation fees are generally non-refundable and non-transferable; changes inside 48 hours may incur a 50% fee.",
    },
    {
      location: "LHR",
      service: "VIP / Tarmac",
      rule: "Cancellation fees are non-refundable; changes inside 15 hours may be refused or charged up to 100%.",
    },
    {
      location: "Transport",
      service: "Vehicle Services",
      rule: "Grace periods and wait-time charges depend on pickup type; premium vehicles may carry custom cancellation rules.",
    },
  ];

  return (
    <div className="flex flex-col gap-4 mt-10">
      <h2 className="text-xl font-semibold text-black">
        Schedule A - Examples of Destination-Specific Rules
      </h2>

      <p className="text-[15px] text-[#555] leading-7">
        This schedule is illustrative and should be aligned to the latest
        operational terms used by Airport Assist before issue. Where a booking
        confirmation or quote states a different rule, that booking-specific
        rule prevails.
      </p>

      <div className="overflow-x-auto rounded-2xl border border-gray-200">
        <table className="min-w-full text-left border-collapse">
          <thead className="bg-gray-50">
            <tr className="text-sm text-gray-700">
              <th className="px-5 py-4 font-semibold">Location</th>
              <th className="px-5 py-4 font-semibold">Service Type</th>
              <th className="px-5 py-4 font-semibold">
                Illustrative Rule
              </th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {data.map((row, index) => (
              <tr key={index} className="hover:bg-gray-50 transition">
                <td className="px-5 py-4 font-medium text-black whitespace-nowrap">
                  {row.location}
                </td>
                <td className="px-5 py-4 whitespace-nowrap">
                  {row.service}
                </td>
                <td className="px-5 py-4 text-[#444] leading-7">
                  {row.rule}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ScheduleTable;