"use client";

const KeyPointsTable = () => {
  const data = [
    {
      title: "Booking status",
      desc: "A booking is only confirmed once Airport Assist issues a booking reference.",
    },
    {
      title: "Pricing",
      desc: "Prices and availability are guaranteed only once confirmed.",
    },
    {
      title: "Standard cancellations",
      desc: "Cancellations made within 48 hours are usually charged in full unless a booking-specific rule applies.",
    },
    {
      title: "Special services",
      desc: "Some airports, VVIP services, and transport bookings follow stricter local terms.",
    },
    {
      title: "Operational changes",
      desc: "Airport, airline, security, or terminal changes may affect how a service is delivered.",
    },
    {
      title: "Payment",
      desc: "Invoices are payable within 30 days unless otherwise agreed in writing.",
    },
  ];

  return (
    <div className="flex flex-col gap-4 mt-6">
      <h2 className="text-xl font-semibold text-black">
        Key Points briefly
      </h2>

      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="min-w-full border-collapse text-left">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-5 py-3 font-semibold text-gray-700 w-1/3">
                Topic
              </th>
              <th className="px-5 py-3 font-semibold text-gray-700">
                Details
              </th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {data.map((row, i) => (
              <tr key={i}>
                <td className="px-5 py-4 font-medium text-black align-top">
                  {row.title}
                </td>
                <td className="px-5 py-4 text-[#444] leading-7">
                  {row.desc}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default KeyPointsTable;