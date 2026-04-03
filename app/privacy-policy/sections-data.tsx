export interface ContentBlock {
  type: "paragraph" | "list";
  content: string | string[];
}

export interface Section {
  title: string;
  blocks: ContentBlock[];
}

export const PRIVACY_POLICY: Section[] = [
  {
    title: "Scope of this Privacy Policy",
    blocks: [
      {
        type: "list",
        content: [
          "This policy applies when you make a booking, enquiry, or use our services",
          "It also applies when contacting customer support or using our website",
          "It includes interactions via partners, agents, or intermediaries",
          "It does not apply to third-party services like airlines or payment providers",
          "The policy may be updated periodically",
          "Users will be notified of material changes where required",
        ],
      },
    ],
  },
  {
    title: "Information we collect when you make or receive a booking",
    blocks: [
      {
        type: "list",
        content: [
          "Name and contact details",
          "Passenger information",
          "Travel dates, flights, and itinerary details",
          "Booking references and transaction data",
          "Billing and payment information",
          "Service-related details required for assistance",
          "Emergency contact details if provided",
          "Communication records including support or complaints",
          "Information about other travellers if booking on their behalf",
          "Contact details used for confirmations and service updates",
        ],
      },
    ],
  },
  {
    title: "Information we receive from others",
    blocks: [
      {
        type: "list",
        content: [
          "Information from travel agents or people booking on your behalf",
          "Data from concierge services, employers, or card programs",
          "Information from airports, airlines, and local service partners",
          "Payment processors and fraud prevention services",
          "Analytics and customer support providers",
          "Used only when necessary to deliver or improve services",
        ],
      },
    ],
  },
  {
    title: "Special assistance and sensitive personal information",
    blocks: [
      {
        type: "list",
        content: [
          "May include health or accessibility-related data",
          "Used only to provide special assistance services",
          "Shared with relevant partners when necessary",
          "Used for emergency situations or legal compliance",
          "Examples include mobility assistance or medical conditions",
          "Explicit consent is obtained where required",
          "Only minimal necessary data should be provided",
        ],
      },
    ],
  },
  {
    title: "Children",
    blocks: [
      {
        type: "list",
        content: [
          "Children's data is processed only when necessary for services",
          "Not collected for independent marketing purposes",
          "Users can contact support if data is submitted improperly",
        ],
      },
    ],
  },
  {
    title: "Information collected through our website and digital services",
    blocks: [
      {
        type: "list",
        content: [
          "IP address, browser type, and device information",
          "Operating system and usage data",
          "Pages visited and referral sources",
          "Access time and estimated location",
          "Used for performance, security, and analytics",
          "Used to improve user experience",
          "Consent is required for non-essential tracking",
        ],
      },
    ],
  },
  {
    title: "Cookies and similar technologies",
    blocks: [
      {
        type: "list",
        content: [
          "Strictly necessary cookies for core functionality",
          "Functional cookies for preferences like language",
          "Analytics cookies for performance insights",
          "Advertising cookies for marketing effectiveness",
          "Consent required for analytics and advertising cookies",
          "Users can manage cookies via settings or browser",
        ],
      },
    ],
  },
  {
    title: "Third-party analytics and advertising tools",
    blocks: [
      {
        type: "list",
        content: [
          "Third-party providers may support analytics and advertising",
          "These providers may use cookies and tracking technologies",
          "Data may be processed on our behalf or independently",
          "We do not sell personal data for monetary gain",
          "Users are informed where data sharing is required by law",
        ],
      },
    ],
  },
  {
    title: "How we use personal information",
    blocks: [
      {
        type: "list",
        content: [
          "To manage bookings and deliver services",
          "To coordinate with airport and service partners",
          "To communicate about bookings and updates",
          "To handle payments, refunds, and fraud prevention",
          "To improve operations and internal processes",
          "To maintain systems security and performance",
          "To provide customer support",
          "To comply with legal obligations",
          "To handle emergencies and protect individuals",
        ],
      },
    ],
  },
  {
    title: "Marketing communications",
    blocks: [
      {
        type: "list",
        content: [
          "Marketing messages sent only where permitted by law",
          "Consent required where applicable",
          "Users can unsubscribe anytime",
          "Service-related messages will still be sent if necessary",
        ],
      },
    ],
  },
  {
    title: "Who we share personal information with",
    blocks: [
      {
        type: "list",
        content: [
          "Airport operators and service providers",
          "Airlines and lounge operators",
          "Transport and chauffeur services",
          "Payment and booking technology providers",
          "Business partners and intermediaries",
          "Professional advisers and legal authorities",
          "Internal corporate entities for operations",
          "Not shared for third-party marketing without consent",
        ],
      },
    ],
  },
  {
    title: "Our role and the role of partners",
    blocks: [
      {
        type: "list",
        content: [
          "Airport Assist acts as a data controller in most cases",
          "Other entities may also process data independently",
          "Airlines, airports, and partners have their own policies",
          "Responsibilities depend on how booking is made",
          "Data may be processed on behalf of partners when required",
        ],
      },
    ],
  },
  {
    title: "Legal bases for processing",
    blocks: [
      {
        type: "list",
        content: [
          "Contractual necessity for service delivery",
          "Legal obligations for compliance",
          "Legitimate interests for business operations",
          "Consent for specific processing activities",
          "Vital interests in emergency situations",
          "Public interest for accessibility services",
        ],
      },
    ],
  },
  {
    title: "International transfers",
    blocks: [
      {
        type: "list",
        content: [
          "Data may be transferred internationally",
          "Safeguards are applied where required",
          "Includes legal mechanisms like contracts",
          "Users can request more information",
        ],
      },
    ],
  },
  {
    title: "Security",
    blocks: [
      {
        type: "list",
        content: [
          "Technical and organisational measures are applied",
          "Protection against unauthorized access or loss",
          "Security depends on data sensitivity",
          "Users should protect their credentials",
          "Report suspected breaches immediately",
        ],
      },
    ],
  },
  {
    title: "Data retention",
    blocks: [
      {
        type: "list",
        content: [
          "Data retained only as long as necessary",
          "Used for services, legal, and operational purposes",
          "Different data types have different retention periods",
          "Includes bookings, support records, and analytics",
          "Data is deleted or anonymised when no longer needed",
        ],
      },
    ],
  },
  {
    title: "Your rights",
    blocks: [
      {
        type: "list",
        content: [
          "Right to access personal data",
          "Right to correct inaccurate data",
          "Right to request deletion",
          "Right to restrict processing",
          "Right to object to certain uses",
          "Right to withdraw consent",
          "Right to data portability",
          "Rights may be subject to legal limitations",
        ],
      },
    ],
  },
  {
    title: "Contact us",
    blocks: [
      {
        type: "list",
        content: [
          "Email: meet@airport-assist.com",
          "Phone: +44 20 4517 7711",
          "Users may contact for any privacy-related request",
          "Complaints can be submitted to relevant authorities",
        ],
      },
    ],
  },
];