export interface ContentBlock {
  type: "paragraph" | "list";
  content: string | string[];
}

export interface Section {
  title: string;
  blocks: ContentBlock[];
}

export const TERMS_AND_CONDITIONS_FULL: Section[] = [
  {
    title: "Key Points Briefly",
    blocks: [
      {
        type: "list",
        content: [
          "A booking is only confirmed once Airport Assist issues a booking reference.",
          "Prices and availability are guaranteed only once confirmed.",
          "Cancellations made within 48 hours are usually charged in full unless a booking-specific rule applies.",
          "Some airports, VVIP services, and transport bookings follow stricter local terms.",
          "Airport, airline, security, or terminal changes may affect how a service is delivered.",
          "Invoices are payable within 30 days unless otherwise agreed in writing.",
        ],
      },
    ],
  },
  {
    title: "1. About These Terms",
    blocks: [
      {
        type: "paragraph",
        content:
          "These Booking Terms and Service Conditions explain how Airport Assist Ltd provides meet and assist, concierge, VIP, VVIP, lounge, porter, buggy, transportation coordination, and related airport support services.",
      },
      {
        type: "paragraph",
        content:
          "By submitting a booking request, accepting a booking confirmation, or using our services, you agree to these Terms and any booking-specific conditions that we notify to you.",
      },
    ],
  },
  {
    title: "2. Definitions",
    blocks: [
      {
        type: "list",
        content: [
          "Airport Assist refers to Airport Assist Ltd., also referred to as 'we', 'us', or 'our'.",
          "Client, 'you' or 'your' refers to any individual, corporation, agency, or intermediary engaging with our services.",
          "Passenger refers to the traveller who receives the service.",
          "Booking refers to a confirmed service request with a booking reference.",
          "Services refer to airport assistance and related services confirmed in your reservation.",
          "Ancillary Services refer to supplementary services such as porter, buggy, lounge, and vehicle services.",
          "Charges refer to all payable fees including service fees, surcharges, cancellations, waiting time, taxes, and extras.",
          "VVIP Services refer to premium airport services such as VIP lounges, terminals, or tarmac access.",
        ],
      },
    ],
  },
  {
    title: "3. Booking Process",
    blocks: [
      {
        type: "paragraph",
        content:
          "1. Booking channels. Booking requests may be submitted via our website, booking portal, by email, telephone, or through other authorised sales channels.",
      },
      {
        type: "paragraph",
        content:
          "2. Confirmation. A reservation is deemed confirmed only when Airport Assist accepts it and issues a booking reference. A request alone does not guarantee availability or pricing.",
      },
      {
        type: "paragraph",
        content:
          "3. Advance bookings. Reservations can generally be requested up to eleven months prior. Prices and availability are guaranteed only upon confirmation.",
      },
      {
        type: "paragraph",
        content:
          "4. Information required. You must provide complete and accurate information including passenger name, airport, flight details, route, contact information, and service type.",
      },
      {
        type: "paragraph",
        content:
          "5. Passenger awareness. You must ensure all passengers are aware of the booking terms.",
      },
      {
        type: "paragraph",
        content:
          "6. Approved partners. Airport Assist may use approved partners or subcontractors to deliver services but remains responsible.",
      },
    ],
  },
  {
    title: "4. Service Standards",
    blocks: [
      {
        type: "paragraph",
        content:
          "Airport Assist provides services with professionalism, trained staff, and adherence to airport security and operational protocols. Staff maintain a professional appearance and may use visible signage where required.",
      },
    ],
  },
  {
    title: "5. Charges and Pricing",
    blocks: [
      {
        type: "paragraph",
        content:
          "1. Charges may include service fees, surcharges (public holidays, late bookings, destination fees), waiting time, amendments, cancellations, taxes, and additional services.",
      },
      {
        type: "paragraph",
        content:
          "2. Airport Assist may revise rates with prior notice. Confirmed bookings remain at agreed rates; new bookings follow updated rates.",
      },
      {
        type: "paragraph",
        content: "3. Booking or administrative fees may apply where specified.",
      },
    ],
  },
  {
    title: "6. Amendments, Cancellations and No-Shows",
    blocks: [
      {
        type: "paragraph",
        content:
          "1. Standard Policy. Cancellations more than 48 hours before service are free unless stated otherwise. Within 48 hours, full charges apply. Amendments within 48 hours may incur fees. No-shows are fully charged.",
      },
      {
        type: "paragraph",
        content:
          "2. Separate Bookings. Arrival, departure, and transit services are treated as separate bookings.",
      },
      {
        type: "paragraph",
        content:
          "3. Departure Delays. Airport representatives will wait up to three hours unless extended service is approved.",
      },
      {
        type: "paragraph",
        content:
          "4. Destination-Specific Regulations. Local rules may override standard policies.",
      },
    ],
  },
  {
    title: "7. Special Destination and Service Conditions",
    blocks: [
      {
        type: "paragraph",
        content:
          "Certain airports and providers apply different rules such as tiered cancellation fees, short-notice surcharges, terminal fees, extra hour charges, and non-refundable reservations.",
      },
      {
        type: "paragraph",
        content:
          "These conditions will be clearly stated in the quotation or confirmation.",
      },
    ],
  },
  {
    title: "8. VVIP, VIP Terminal and Tarmac Services",
    blocks: [
      {
        type: "paragraph",
        content:
          "These services are often managed by airport authorities or third parties and follow stricter payment and refund rules.",
      },
      {
        type: "paragraph",
        content:
          "Fees are usually non-refundable and may require advance payment.",
      },
      {
        type: "paragraph",
        content:
          "Cancellations are only effective once accepted by the operator, and refunds may not be available.",
      },
    ],
  },
  {
    title: "9. Transportation Services",
    blocks: [
      {
        type: "paragraph",
        content:
          "Vehicle services include specific rules for wait times, grace periods, and cancellations as outlined in booking details.",
      },
      {
        type: "paragraph",
        content:
          "Standard policy: within 24 hours = 100% charge, 24–48 hours = 50%, more than 48 hours = no charge.",
      },
      {
        type: "paragraph",
        content: "Premium vehicles may have different conditions.",
      },
    ],
  },
  {
    title: "10. Service Changes Caused by Operations",
    blocks: [
      {
        type: "paragraph",
        content:
          "Airport operations, weather, airline policies, or security rules may require changes, delays, or cancellations of services.",
      },
      {
        type: "paragraph",
        content:
          "Airport Assist will notify clients and adjust services where possible.",
      },
    ],
  },
  {
    title: "11. Complaints",
    blocks: [
      {
        type: "paragraph",
        content:
          "Complaints should be reported within five working days. Airport Assist will review and respond within a reasonable timeframe.",
      },
    ],
  },
  {
    title: "12. Invoicing, Payment and Taxes",
    blocks: [
      {
        type: "paragraph",
        content:
          "1. Invoices include all services and additional requests. Clients remain responsible for payment.",
      },
      {
        type: "paragraph",
        content: "2. Payment is due within 30 days unless otherwise agreed.",
      },
      {
        type: "paragraph",
        content: "3. VAT and taxes apply where required.",
      },
    ],
  },
  {
    title: "13. Data Protection",
    blocks: [
      {
        type: "paragraph",
        content:
          "Personal data is used only to deliver services and may be shared with relevant partners such as airports, airlines, lounges, and transport providers.",
      },
    ],
  },
  {
    title: "14. Liability",
    blocks: [
      {
        type: "paragraph",
        content:
          "Airport Assist is not liable for indirect or consequential losses.",
      },
      {
        type: "paragraph",
        content:
          "Total liability is limited to 150% of booking charges or £2,000, whichever is greater.",
      },
    ],
  },
  {
    title: "15. Confidentiality and Anti-Bribery",
    blocks: [
      {
        type: "paragraph",
        content:
          "Both parties must protect confidential information unless disclosure is required by law or necessary for service delivery.",
      },
      {
        type: "paragraph",
        content:
          "Bribery is strictly prohibited and all parties must comply with applicable laws including the Bribery Act 2010.",
      },
    ],
  },
  {
    title: "16. General Legal Terms",
    blocks: [
      {
        type: "paragraph",
        content:
          "These terms form the full agreement between parties along with booking confirmations.",
      },
      {
        type: "paragraph",
        content:
          "Amendments apply only to individual bookings unless agreed in writing.",
      },
      {
        type: "paragraph",
        content:
          "These terms are governed by English law under the jurisdiction of England and Wales.",
      },
    ],
  },
];