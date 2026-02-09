export interface ContentBlock {
  type: "paragraph" | "list";
  content: string | string[];
}

export interface Section {
  title: string;
  blocks: ContentBlock[];
}

const WHY_AIRPORT_ASSIST: Section[] = [
  {
    title: "Why Choose AIRPORT ASSIST for Airport Concierge Services?",
    blocks: [
      {
        type: "paragraph",
        content:
          "AIRPORT ASSIST's Private Travel division specialises in VIP airport assistance, luxury travel concierge services, and tailored travel experiences for high-profile and discerning clients.",
      },
      {
        type: "paragraph",
        content: "We are trusted globally for our:",
      },
      {
        type: "list",
        content: [
          "Discreet and professional service",
          "Fast-track airport assistance",
          "Personalised travel planning",
          "Worldwide airport coverage",
        ],
      },
      {
        type: "paragraph",
        content:
          "From departure to arrival, we provide a smooth and stress-free journey for travellers who value efficiency, privacy, and world-class service.",
      },
    ],
  },
  {
    title: "Bespoke Travel & Luxury Concierge Services",
    blocks: [
      {
        type: "paragraph",
        content:
          "At AIRPORT ASSIST, your journey is managed by a dedicated personal travel manager who oversees every aspect of your travel experience.",
      },
      {
        type: "paragraph",
        content: "Our luxury concierge services include:",
      },
      {
        type: "list",
        content: [
          "VIP Meet & Assist services at international airports",
          "Private and commercial flight bookings",
          "Preferred seating and cabin upgrades",
          "Luxury ground transportation",
          "Exclusive hotel and restaurant reservations",
          "Personal assistants, trusted nannies, and lifestyle services",
          "Special occasions, romantic proposals, and bespoke experiences",
        ],
      },
      {
        type: "paragraph",
        content:
          "No request is too small or too complex—we deliver tailored solutions discreetly and efficiently.",
      },
    ],
  },
  {
    title: "VIP Meet & Assist Airport Services",
    blocks: [
      {
        type: "paragraph",
        content:
          "Our VIP Meet & Assist airport service is designed to eliminate long queues, language barriers, and airport stress.",
      },
      {
        type: "paragraph",
        content: "Our professional airport agents assist with:",
      },
      {
        type: "list",
        content: [
          "Fast-track security and immigration clearance",
          "Baggage handling and porter services",
          "Arrival, departure, and transit assistance",
          "Airport lounge access coordination",
        ],
      },
      {
        type: "paragraph",
        content:
          "This premium airport concierge service is available to all passengers, regardless of airline, ticket class, or travel purpose. Whether you are travelling for business, leisure, or family reasons, our services are fully customised to your needs.",
      },
      {
        type: "paragraph",
        content:
          "With thousands of successful airport meet-and-greet services delivered worldwide, AIRPORT ASSIST is a trusted name in airport assistance.",
      },
    ],
  },
  {
    title: "24/7 Global Support & Emergency Assistance",
    blocks: [
      {
        type: "paragraph",
        content:
          "AIRPORT ASSIST operates 24 hours a day, 7 days a week, providing global support wherever you travel. Our emergency assistance service ensures immediate help at any time, giving you complete confidence and peace of mind.",
      },
    ],
  },
  {
    title: "What Is the Airport Assist Service?",
    blocks: [
      {
        type: "paragraph",
        content:
          "Airport Assist provides discreet, professional assistance through airport formalities. Our VIP Meet & Assist service assigns a dedicated airport officer to manage your journey efficiently, from arrival to departure, ensuring a smooth and controlled experience.",
      },
    ],
  },
  {
    title: "Where Does Airport Assist Operate?",
    blocks: [
      {
        type: "paragraph",
        content:
          "Airport Assist operates at over 800 airports worldwide, including all major international hubs. For confirmation at a specific airport, please contact our team on +44 20 4517 7711 or email meet@airport-assist.com.",
      },
    ],
  },
  {
    title: "Does Airport Assist Offer Chauffeur Transportation?",
    blocks: [
      {
        type: "paragraph",
        content:
          "Yes. We work with a vetted network of premium chauffeur partners and can arrange luxury ground transportation at selected destinations. Availability varies by location; please contact us to confirm arrangements.",
      },
    ],
  },
  {
    title: "Are My Details Kept Confidential?",
    blocks: [
      {
        type: "paragraph",
        content:
          "Our VIP Meet & Assist services are available to all passengers, regardless of airline or travel class, for both arriving and departing flights.",
      },
    ],
  },
  {
    title: "How Do I Book Airport Assist Services?",
    blocks: [
      {
        type: "paragraph",
        content:
          "Bookings can be made at any time via our 24/7 online booking platform at www.airport-assist.com",
      },
      {
        type: "paragraph",
        content:
          "First-time users will be required to register basic details. All bookings are reviewed by our team, and confirmation is issued once approved.",
      },
      {
        type: "paragraph",
        content: "Information Required at Booking:",
      },
      {
        type: "list",
        content: [
          "Passenger details",
          "Flight number(s)",
          "Number of bags",
          "Address for chauffeur service (if included)",
          "Alternatively, details of an independently arranged driver",
        ],
      },
      {
        type: "paragraph",
        content:
          "If baggage or vehicle details are not yet confirmed, they may be provided later, no later than 24 hours before the scheduled service time.",
      },
      {
        type: "paragraph",
        content:
          "For assistance, our Bookings Team is available: 📞+44 20 4517 7711 ✉️meet@airport-assist.com 🕘 Available 24/7",
      },
    ],
  },
];

const OUR_PRICING: Section[] = [
  {
    title: "Competitive Booking Fees",
    blocks: [
      {
        type: "paragraph",
        content:
          "With Airport Assist, there are no upfront costs and no hidden charges. We pride ourselves on offering transparent and competitive booking fees across all our services.",
      },
    ],
  },
  {
    title: "VIP Services – Pricing",
    blocks: [
      {
        type: "paragraph",
        content:
          "Airport Assist works closely with leading global operators to provide you with the best selection of VIP services at the most competitive prices for your itinerary.",
      },
      {
        type: "list",
        content: [
          "Competitive booking fees apply to all online VIP service request bookings",
          "Pricing may vary depending on location, service type, and operational requirements",
        ],
      },
      {
        type: "paragraph",
        content:
          "For details on specific pricing or any additional charges, please contact the Airport Assist Team directly.",
      },
    ],
  },
  {
    title: "Payment Options",
    blocks: [
      {
        type: "paragraph",
        content:
          "Airport Assist accepts a wide range of payment methods for your convenience:",
      },
      {
        type: "list",
        content: ["All major credit cards", "Debit cards", "Bank transfers"],
      },
      {
        type: "paragraph",
        content:
          "Flights and services can be paid online or offline. Please note that all funds must be received and cleared prior to the delivery of services.",
      },
      {
        type: "paragraph",
        content: "For full details, please refer to our Terms and Conditions.",
      },
    ],
  },
];

const FAQ_VIP_MEET_and_GREET: Section[] = [
  {
    title: "What is VIP Meet and Greet?",
    blocks: [
      {
        type: "paragraph",
        content:
          "VIP Meet and Greet is a premium airport assistance service provided by Airport Assist, designed to make airport travel smooth, efficient, and stress-free. A dedicated professional agent personally assists passengers through key airport processes, including immigration, security, and baggage handling.",
      },
    ],
  },
  {
    title: "Who is VIP Meet and Greet designed for?",
    blocks: [
      {
        type: "paragraph",
        content: "VIP Meet and Greet services are suitable for:",
      },
      {
        type: "list",
        content: [
          "Business and corporate travellers",
          "Executives, diplomats, and VIP guests",
          "Families travelling with children",
          "Elderly passengers or those requiring additional support",
          "First-time travellers seeking guidance and reassurance",
        ],
      },
    ],
  },
  {
    title: "How does Airport Assist VIP Meet and Greet work?",
    blocks: [
      {
        type: "list",
        content: [
          "A trained Airport Assist agent meets the passenger at the terminal entrance, aircraft gate, or agreed meeting point",
          "The agent provides guided assistance through immigration and security (fast-track where available)",
          "Support is offered with baggage collection and porter arrangements",
          "The passenger is escorted to their next point, including lounge access, chauffeur pickup, or connecting flight",
        ],
      },
    ],
  },
  {
    title: "What services are included in VIP Meet and Greet?",
    blocks: [
      {
        type: "paragraph",
        content:
          "Depending on the airport and service level, VIP Meet and Greet may include:",
      },
      {
        type: "list",
        content: [
          "Personal airport escort",
          "Priority or fast-track lanes (where permitted)",
          "Immigration and security guidance",
          "Baggage assistance",
          "Discreet, professional support throughout the airport journey",
        ],
      },
    ],
  },
  {
    title:
      "Is VIP Meet and Greet available for arrivals, departures, and connections?",
    blocks: [
      {
        type: "paragraph",
        content: "Yes. Airport Assist offers VIP Meet and Greet services for:",
      },
      {
        type: "list",
        content: ["Arrivals", "Departures", "Transit and flight connections"],
      },
    ],
  },
  {
    title: "At which airports is VIP Meet and Greet available?",
    blocks: [
      {
        type: "paragraph",
        content:
          "Airport Assist provides VIP Meet and Greet services at major international airports worldwide, subject to local airport authority regulations and operational availability.",
      },
    ],
  },
  {
    title:
      "Do VIP airport services allow passengers to fast track security or immigration?",
    blocks: [
      {
        type: "paragraph",
        content:
          "VIP airport services are available at many international and domestic airports. Service scope, access levels, and procedures vary depending on airport regulations, terminal layout, and local authorities.",
      },
    ],
  },
  {
    title: "What are the benefits of VIP Meet and Greet?",
    blocks: [
      {
        type: "list",
        content: [
          "Reduced waiting times at busy airports",
          "Personal guidance through complex airport procedures",
          "Increased comfort, privacy, and peace of mind",
          "Ideal support for tight connections or unfamiliar airports",
        ],
      },
    ],
  },
  {
    title: "How is VIP Meet and Greet different from Fast Track?",
    blocks: [
      {
        type: "paragraph",
        content:
          "Fast Track provides access to priority lanes only. VIP Meet and Greet includes a dedicated Airport Assist agent who stays with the passenger and provides end-to-end assistance throughout the airport experience.",
      },
    ],
  },
  {
    title: "When should VIP Meet and Greet be booked?",
    blocks: [
      {
        type: "paragraph",
        content:
          "We recommend booking VIP Meet and Greet 24 to 48 hours in advance to ensure availability. Last-minute requests may be accommodated depending on the airport.",
      },
    ],
  },
  {
    title: "Why choose Airport Assist?",
    blocks: [
      {
        type: "paragraph",
        content: "Airport Assist is trusted by travellers worldwide for:",
      },
      {
        type: "list",
        content: [
          "Professional and discreet service",
          "Experienced airport assistance agents",
          "Global coverage",
          "24/7 customer support",
          "Compliance with airport and immigration regulations",
        ],
      },
    ],
  },
  {
    title: "Is VIP Meet and Greet safe and compliant?",
    blocks: [
      {
        type: "paragraph",
        content:
          "Yes. All Airport Assist services are delivered in full compliance with airport authority rules, immigration requirements, and local regulations, ensuring a secure and reliable service.",
      },
    ],
  },
];

const FAQ_PRIVATE_SUITE: Section[] = [
  {
    title: "What is a Private Suite Airport Service?",
    blocks: [
      {
        type: "paragraph",
        content:
          "A Private Suite airport service is an exclusive airport experience that allows passengers to complete airport formalities in a private, discreet suite away from the main terminal. Airport Assist coordinates personalised support, enabling travellers to relax in a private environment while immigration, security, and boarding processes are handled seamlessly.",
      },
    ],
  },
  {
    title: "Who are Private Suite services designed for?",
    blocks: [
      {
        type: "paragraph",
        content: "Private Suite services are ideal for:",
      },
      {
        type: "list",
        content: [
          "High-profile individuals and VIP travellers",
          "Executives and corporate leaders",
          "Diplomats and government officials",
          "Passengers seeking maximum privacy and comfort",
          "Families or travellers preferring a quiet, private environment",
        ],
      },
    ],
  },
  {
    title: "How do Private Suite services work?",
    blocks: [
      {
        type: "list",
        content: [
          "Passengers are met on arrival at the terminal, aircraft, or private entrance",
          "Airport formalities are completed discreetly within the private suite (subject to airport regulations)",
          "Dedicated staff manage immigration, security coordination, and baggage handling",
          "Passengers are escorted directly to their aircraft or onward transportation",
        ],
      },
    ],
  },
  {
    title: "What is included in a Private Suite service?",
    blocks: [
      {
        type: "paragraph",
        content: "Private Suite services may include:",
      },
      {
        type: "list",
        content: [
          "Access to a fully private airport suite",
          "Dedicated personal assistance throughout the journey",
          "Discreet handling of immigration and security processes",
          "Baggage assistance and porter coordination",
          "Direct transfer to aircraft or chauffeur service",
        ],
      },
      {
        type: "paragraph",
        content:
          "Services vary by airport and are subject to local authority approval.",
      },
    ],
  },
  {
    title: "Is Private Suite available for arrivals, departures, and transit?",
    blocks: [
      {
        type: "paragraph",
        content: "Yes. Private Suite services can be arranged for:",
      },
      {
        type: "list",
        content: ["Arrivals", "Departures", "Transit and flight connections"],
      },
      {
        type: "paragraph",
        content:
          "Availability depends on the airport infrastructure and regulations.",
      },
    ],
  },
  {
    title: "At which airports are Private Suite services available?",
    blocks: [
      {
        type: "paragraph",
        content:
          "Private Suite airport services are available at select international airports worldwide. Availability varies by location due to airport authority policies and operational constraints.",
      },
    ],
  },
  {
    title: "What are the benefits of Private Suite services?",
    blocks: [
      {
        type: "list",
        content: [
          "Complete privacy away from public terminals",
          "Personalised, unhurried airport experience",
          "Reduced exposure to queues and crowds",
          "Enhanced comfort, discretion, and security",
        ],
      },
    ],
  },
  {
    title: "How is Private Suite different from VIP Meet and Greet?",
    blocks: [
      {
        type: "paragraph",
        content:
          "VIP Meet and Greet provides personal assistance through the public terminal. Private Suite services offer a fully secluded experience, allowing passengers to use a private facility while airport processes are handled discreetly.",
      },
    ],
  },
  {
    title: "When should Private Suite services be booked?",
    blocks: [
      {
        type: "paragraph",
        content:
          "Private Suite services should be booked well in advance, ideally 48 to 72 hours prior to travel, due to limited availability and airport approvals.",
      },
    ],
  },
  {
    title: "Why choose Airport Assist for Private Suite services?",
    blocks: [
      {
        type: "paragraph",
        content:
          "Airport Assist is trusted to deliver Private Suite services because of:",
      },
      {
        type: "list",
        content: [
          "Strong relationships with airport authorities and service partners",
          "Professional, discreet coordination",
          "Global service expertise",
          "24/7 operational support",
        ],
      },
    ],
  },
  {
    title: "Are Private Suite services compliant with airport regulations?",
    blocks: [
      {
        type: "paragraph",
        content:
          "Yes. All Private Suite services arranged by Airport Assist comply fully with airport authority regulations, immigration laws, and security requirements.",
      },
    ],
  },
  {
    title: "Are private airport suites suitable for families?",
    blocks: [
      {
        type: "paragraph",
        content:
          "Yes. Private airport suites are often chosen by families due to their privacy, comfort, and reduced exposure to busy terminals. They can accommodate children, elderly passengers, and travellers requiring additional support.",
      },
    ],
  },
  {
    title: "Are private airport suites discreet and confidential?",
    blocks: [
      {
        type: "paragraph",
        content:
          "Yes. Discretion and confidentiality are core features of private airport suites. Passenger details and movements are handled privately with controlled access.",
      },
    ],
  },
  {
    title: "When should a traveller choose a private airport suite?",
    blocks: [
      {
        type: "paragraph",
        content: "Private airport suites are ideal when:",
      },
      {
        type: "list",
        content: [
          "Privacy is a priority",
          "Time efficiency is critical",
          "Security or discretion is required",
          "Travelling with family or VIP guests",
          "Connecting through busy international hubs",
        ],
      },
    ],
  },
  {
    title: "When should VIP Private Suite be booked?",
    blocks: [
      {
        type: "paragraph",
        content:
          "We recommend booking VIP Private Suite 48 to 72 hours in advance to ensure availability. Last-minute requests may be accommodated depending on the airport.",
      },
    ],
  },
];

const FAQ_CHAUFFEUR: Section[] = [
  {
    title: "What are Chauffeur Services?",
    blocks: [
      {
        type: "paragraph",
        content:
          "Chauffeur services provide pre-booked, private ground transportation in premium vehicles driven by professionally trained chauffeurs. Unlike taxis or ride-share services, chauffeur services focus on punctuality, comfort, privacy, and personalised customer care.",
      },
      {
        type: "paragraph",
        content:
          "Chauffeur services are commonly used for airport transfers, business travel, events, and VIP guest transportation.",
      },
    ],
  },
  {
    title: "What is included in a professional chauffeur service?",
    blocks: [
      {
        type: "paragraph",
        content: "A professional chauffeur service typically includes:",
      },
      {
        type: "list",
        content: [
          "Pre-booked private vehicle and driver",
          "Professionally trained, uniformed chauffeur",
          "Flight tracking for airport pickups",
          "Meet and greet at arrivals, where applicable",
          "Luggage assistance",
          "Door-to-door transportation",
          "Clean, late-model luxury vehicle",
          "Bottled water and onboard amenities (service dependent)",
        ],
      },
    ],
  },
  {
    title: "How does a chauffeur airport pickup work?",
    blocks: [
      {
        type: "paragraph",
        content:
          "For airport pickups, the chauffeur monitors flight status in real time and adjusts the pickup time if the flight is delayed or arrives early. The chauffeur meets the passenger at a designated arrival point or curbside, assists with luggage, and provides a direct transfer to the destination.",
      },
      {
        type: "paragraph",
        content: "Pickup procedures vary by airport and service level.",
      },
    ],
  },
  {
    title:
      "What is the difference between a chauffeur and a taxi or ride-share?",
    blocks: [
      {
        type: "paragraph",
        content:
          "Chauffeur services are pre-arranged, fixed-price, and hospitality-driven. Taxis and ride-share services are usually on-demand and subject to availability, surge pricing, and variable service quality.",
      },
      {
        type: "paragraph",
        content:
          "Chauffeur services offer greater reliability, consistency, discretion, and personalised support.",
      },
    ],
  },
  {
    title: "What vehicles are used for chauffeur services?",
    blocks: [
      {
        type: "paragraph",
        content: "Chauffeur fleets typically include:",
      },
      {
        type: "list",
        content: [
          "Luxury sedans (e.g. Mercedes-Benz S-Class, Mercedes-Benz V-Class, BMW 7 Series)",
          "Executive SUVs (e.g. Range Rover, Cadillac Escalade)",
          "Luxury vans for groups and families",
          "Premium electric vehicles (where available)",
        ],
      },
      {
        type: "paragraph",
        content:
          "Vehicle availability depends on location and passenger requirements.",
      },
    ],
  },
  {
    title: "Are chauffeur services suitable for business travel?",
    blocks: [
      {
        type: "paragraph",
        content:
          "Yes. Chauffeur services are widely used for business and corporate travel due to their reliability, punctuality, and professional presentation. They are ideal for airport transfers, meetings, roadshows, conferences, and executive travel.",
      },
    ],
  },
  {
    title:
      "Can chauffeur services be booked for multiple stops or an hourly hire?",
    blocks: [
      {
        type: "paragraph",
        content: "Yes. Chauffeur services can be booked for:",
      },
      {
        type: "list",
        content: [
          "One-way transfers",
          "Return journeys",
          "Hourly or full-day hire",
          "Multi-stop itineraries",
        ],
      },
      {
        type: "paragraph",
        content:
          "This flexibility makes them suitable for meetings, city tours, and events.",
      },
    ],
  },
  {
    title: "Are chauffeur services available 24/7?",
    blocks: [
      {
        type: "paragraph",
        content:
          "Most professional chauffeur services operate 24 hours a day, 7 days a week, including holidays. Availability depends on location and advance booking.",
      },
    ],
  },
  {
    title: "How much does a chauffeur service cost?",
    blocks: [
      {
        type: "paragraph",
        content: "Chauffeur service pricing depends on:",
      },
      {
        type: "list",
        content: [
          "Vehicle type",
          "Distance and duration",
          "Airport fees or tolls",
          "Waiting time or hourly hire",
          "Location and local operating costs",
        ],
      },
      {
        type: "paragraph",
        content: "Prices are typically fixed in advance rather than metered.",
      },
    ],
  },
  {
    title: "Are chauffeur services private and discreet?",
    blocks: [
      {
        type: "paragraph",
        content:
          "Yes. Privacy and discretion are core features of chauffeur services. Chauffeurs are trained to maintain confidentiality, making the service suitable for high-profile individuals and VIP guests.",
      },
    ],
  },
  {
    title: "Are chauffeur services safe?",
    blocks: [
      {
        type: "paragraph",
        content:
          "Professional chauffeur services use licensed vehicles, insured operations, and trained drivers. Vehicles are regularly maintained, and chauffeurs follow local regulations and safety standards.",
      },
    ],
  },
  {
    title: "Can chauffeur services be combined with VIP airport services?",
    blocks: [
      {
        type: "paragraph",
        content:
          "Yes. Chauffeur services are often combined with VIP airport services such as Meet and Greet or airport assistance, creating a seamless door-to-door travel experience.",
      },
    ],
  },
  {
    title: "When should chauffeur services be booked?",
    blocks: [
      {
        type: "paragraph",
        content:
          "Chauffeur services should be booked in advance, particularly during peak travel periods or major events. Last-minute bookings may be available depending on location and availability.",
      },
    ],
  },
  {
    title: "Who typically uses chauffeur services?",
    blocks: [
      {
        type: "paragraph",
        content: "Chauffeur services are commonly used by:",
      },
      {
        type: "list",
        content: [
          "Business executives",
          "High-net-worth individuals",
          "International travellers",
          "Families and groups",
          "Event and hospitality guests",
        ],
      },
    ],
  },
  {
    title: "Are Chauffeur services safe and compliant?",
    blocks: [
      {
        type: "paragraph",
        content:
          "Yes. All chauffeur services arranged by Airport Assist comply with local transport regulations, licensing requirements, and safety standards.",
      },
    ],
  },
  {
    title: "Why choose Airport Assist for Chauffeur services?",
    blocks: [
      {
        type: "paragraph",
        content: "Airport Assist is trusted for chauffeur services because of:",
      },
      {
        type: "list",
        content: [
          "Carefully selected professional chauffeurs",
          "High service standards and discretion",
          "Global coordination capabilities",
          "24/7 customer and operational support",
        ],
      },
    ],
  },
];

const FAQ_HOTEL: Section[] = [
  {
    title: "What are Luxury Hotel services?",
    blocks: [
      {
        type: "paragraph",
        content:
          "Luxury Hotel services by Airport Assist provide travellers with access to carefully selected premium hotels, offering exceptional comfort, privacy, and service. These services are designed to complement airport assistance and ground transportation, ensuring a seamless travel experience from arrival to accommodation.",
      },
    ],
  },
  {
    title: "Who are Luxury Hotel services designed for?",
    blocks: [
      {
        type: "paragraph",
        content: "Luxury Hotel services are ideal for:",
      },
      {
        type: "list",
        content: [
          "Business and corporate travellers",
          "VIPs and executive guests",
          "Diplomats and high-profile individuals",
          "Leisure travellers seeking premium accommodation",
          "Passengers requiring short stays, stopovers, or extended visits",
        ],
      },
    ],
  },
  {
    title: "How do Luxury Hotel services work?",
    blocks: [
      {
        type: "list",
        content: [
          "Airport Assist arranges accommodation at a selected luxury hotel",
          "Services are coordinated with Meet and Greet, Private Suite, or Chauffeur services",
          "Guests are transferred seamlessly from the airport to the hotel",
          "Ongoing support is available throughout the stay, where required",
        ],
      },
    ],
  },
  {
    title: "What is included in Luxury Hotel services?",
    blocks: [
      {
        type: "paragraph",
        content:
          "Depending on destination and availability, services may include:",
      },
      {
        type: "list",
        content: [
          "Access to five-star and luxury hotels",
          "Preferred hotel locations near airports or city centres",
          "Seamless coordination with airport and ground services",
          "Discreet handling of guest requirements",
        ],
      },
      {
        type: "paragraph",
        content:
          "Hotel facilities and amenities are subject to the individual property.",
      },
    ],
  },
  {
    title: "Where are Luxury Hotel services available?",
    blocks: [
      {
        type: "paragraph",
        content:
          "Airport Assist arranges Luxury Hotel services at major international cities and airport locations worldwide, subject to hotel availability and local regulations.",
      },
    ],
  },
  {
    title: "What are the benefits of Luxury Hotel services?",
    blocks: [
      {
        type: "list",
        content: [
          "Premium accommodation standards",
          "Comfort, privacy, and personalised service",
          "Seamless travel planning from airport to hotel",
          "Trusted coordination through a single service provider",
        ],
      },
    ],
  },
  {
    title:
      "How are Luxury Hotel services different from standard hotel bookings?",
    blocks: [
      {
        type: "paragraph",
        content:
          "Standard bookings focus solely on accommodation. Luxury Hotel services by Airport Assist integrate accommodation with airport assistance and chauffeur services, creating a smooth, end-to-end travel experience.",
      },
    ],
  },
  {
    title: "When should Luxury Hotel services be arranged?",
    blocks: [
      {
        type: "paragraph",
        content:
          "Luxury Hotel services should ideally be arranged in advance of travel to ensure availability, preferred room categories, and smooth coordination with arrival schedules.",
      },
    ],
  },
  {
    title: "Why choose Airport Assist for Luxury Hotel services?",
    blocks: [
      {
        type: "paragraph",
        content:
          "Airport Assist is trusted to arrange Luxury Hotel services because of:",
      },
      {
        type: "list",
        content: [
          "Experience working with premium travel requirements",
          "Discreet and professional coordination",
          "Global destination knowledge",
          "24/7 support for travellers and partners",
        ],
      },
    ],
  },
  {
    title: "Are Luxury Hotel services compliant and secure?",
    blocks: [
      {
        type: "paragraph",
        content:
          "Yes. Airport Assist works with reputable luxury hotels that meet high standards of safety, service quality, and guest confidentiality.",
      },
    ],
  },
];

const FAQ_PRIVATE_JET: Section[] = [
  {
    title: "What are private jet services?",
    blocks: [
      {
        type: "paragraph",
        content:
          "Private jet services provide on-demand access to privately operated aircraft, allowing passengers to travel on their own schedule with full privacy, flexibility, and personalised service. Unlike commercial flights, private jet travel uses private terminals and offers custom flight planning, aircraft selection, and concierge support.",
      },
    ],
  },
  {
    title: "How do private jet services work?",
    blocks: [
      {
        type: "paragraph",
        content:
          "Private jet services operate through charter providers or aviation operators who arrange aircraft, crew, flight permits, and ground handling. Clients select the route, travel time, and aircraft type, while the operator manages all logistics including customs, catering, and airport coordination.",
      },
    ],
  },
  {
    title: "What are the benefits of private jet travel?",
    blocks: [
      {
        type: "paragraph",
        content: "Private jet travel offers several key advantages:",
      },
      {
        type: "list",
        content: [
          "Flexible departure times without fixed schedules",
          "Access to private terminals and smaller airports",
          "Reduced total travel time",
          "High levels of privacy and security",
          "Fully customised onboard experience",
        ],
      },
      {
        type: "paragraph",
        content:
          "These benefits make private jets ideal for business, leisure, and time-sensitive travel.",
      },
    ],
  },
  {
    title: "Who uses private jet services?",
    blocks: [
      {
        type: "paragraph",
        content: "Private jet services are commonly used by:",
      },
      {
        type: "list",
        content: [
          "Business executives and corporate teams",
          "High-net-worth individuals and families",
          "Athletes, entertainers, and public figures",
          "Government and diplomatic delegations",
          "Medical and emergency travel passengers",
        ],
      },
      {
        type: "paragraph",
        content:
          "The common requirement is reliability, discretion, and efficiency.",
      },
    ],
  },
  {
    title: "Is flying on a private jet faster than commercial flights?",
    blocks: [
      {
        type: "paragraph",
        content:
          "Yes. While the aircraft speed may be similar, private jet travel is significantly faster overall because passengers avoid commercial terminals, long security lines, boarding delays, and baggage waits. Flights also land closer to final destinations using smaller airports.",
      },
    ],
  },
  {
    title: "What types of private jets are available?",
    blocks: [
      {
        type: "paragraph",
        content:
          "A private jet terminal, also known as an FBO (Fixed Base Operator), is a private aviation facility separate from commercial terminals. Passengers arrive discreetly, pass through private security and customs procedures, and board the aircraft directly from the lounge or vehicle.",
      },
    ],
  },
  {
    title: "How much does private jet travel cost?",
    blocks: [
      {
        type: "paragraph",
        content: "The cost of private jet travel depends on:",
      },
      {
        type: "list",
        content: [
          "Aircraft category and size",
          "Flight distance and duration",
          "Airport fees and international permits",
          "Crew duty time and overnight stays",
        ],
      },
      {
        type: "paragraph",
        content:
          "Pricing is typically calculated per flight hour, with charter offering trip-based pricing rather than fixed tickets.",
      },
    ],
  },
  {
    title:
      "What is the difference between private jet charter and jet ownership?",
    blocks: [
      {
        type: "paragraph",
        content:
          "Private jet charter provides access to aircraft without ownership responsibilities such as maintenance, crew, and storage. Jet ownership offers long-term availability but requires significant capital investment and operational management. Many travellers choose a charter for flexibility and efficiency.",
      },
    ],
  },
  {
    title: "Are private jets safe?",
    blocks: [
      {
        type: "paragraph",
        content:
          "Yes. Private jets are operated under strict aviation regulations and maintained to high safety standards. Professional operators use experienced flight crews, regulated maintenance programmes, and detailed flight planning to ensure safety and compliance.",
      },
    ],
  },
  {
    title: "Can private jets fly internationally?",
    blocks: [
      {
        type: "paragraph",
        content:
          "Yes. Private jets operate globally and can fly internationally with proper permits and customs coordination. Experienced operators handle overflight approvals, landing permissions, customs, immigration, and health regulations for international routes.",
      },
    ],
  },
  {
    title: "What services are included with private jet travel?",
    blocks: [
      {
        type: "paragraph",
        content: "Private jet services often include:",
      },
      {
        type: "list",
        content: [
          "Flight planning and aircraft selection",
          "Professional flight crew",
          "Private terminal access",
          "Custom catering",
          "Ground transportation and concierge support",
        ],
      },
      {
        type: "paragraph",
        content: "Services are tailored to each passenger's requirements.",
      },
    ],
  },
  {
    title: "Is private jet travel confidential?",
    blocks: [
      {
        type: "paragraph",
        content:
          "Yes. Confidentiality is a core feature of private aviation. Passenger details, flight schedules, and travel routes are handled discreetly, making private jets the preferred option for high-profile travellers.",
      },
    ],
  },
  {
    title: "When should someone choose private jet travel?",
    blocks: [
      {
        type: "paragraph",
        content: "Private jet travel is ideal when:",
      },
      {
        type: "list",
        content: [
          "Time efficiency is critical",
          "Privacy is required",
          "Multiple destinations are involved",
          "Commercial routes are unavailable or inconvenient",
          "Travel involves sensitive or high-profile passengers",
        ],
      },
    ],
  },
  {
    title: "What is included in Private Jet services?",
    blocks: [
      {
        type: "paragraph",
        content:
          "Depending on location and operational requirements, services may include:",
      },
      {
        type: "list",
        content: [
          "Private jet coordination via approved aviation partners",
          "Access to private terminals or FBO facilities",
          "Ground handling and flight support services",
          "Passenger and crew assistance",
          "Coordination with chauffeur, hotel, and airport assistance services",
        ],
      },
    ],
  },
];

export {
  WHY_AIRPORT_ASSIST,
  OUR_PRICING,
  FAQ_VIP_MEET_and_GREET,
  FAQ_PRIVATE_SUITE,
  FAQ_CHAUFFEUR,
  FAQ_HOTEL,
  FAQ_PRIVATE_JET,
};
