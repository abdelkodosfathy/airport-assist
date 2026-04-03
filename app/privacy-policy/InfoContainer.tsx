"use client";

const Section = ({ title, children }: any) => (
  <div className="flex flex-col gap-3">
    <h2 className="text-xl font-semibold text-black">{title}</h2>
    <div className="flex flex-col gap-2 text-[15px] leading-8 text-[#333]">
      {children}
    </div>
  </div>
);

const P = ({ children }: any) => <p>{children}</p>;

const List = ({ items }: { items: string[] }) => (
  <ul className="list-disc pl-6 flex flex-col gap-1">
    {items.map((item, i) => (
      <li key={i}>{item}</li>
    ))}
  </ul>
);

const InfoContainer = () => {
  return (
    <div className="flex flex-col px-10 gap-8 max-w-4xl mx-auto py-10">
      <h1 className="text-2xl font-bold text-black">
        Airport Assist Ltd | Privacy Policy
      </h1>

      <P>Airport Assist Ltd</P>
      <P>Privacy Policy</P>

      <P>
        This Privacy Policy elucidates how Airport Assist Ltd, operating under
        the trade name Airport Assist (“Airport Assist”, “we”, “us", or “our"),
        systematically collects, utilizes, stores, disseminates, and safeguards
        personal information in relation to our airport assistance services,
        meet-and-greet, transfer, concierge, booking, customer support, website,
        and associated digital services (collectively referred to as the
        “Services”).
      </P>

      {/* 1 */}
      <Section title="1. Scope of this Privacy Policy">
        <P>
          This Privacy Policy applies when you make an enquiry or booking with
          us, travel using a service arranged by us, contact our customer
          support team, use our website or other digital services, or interact
          with us through a partner, agent, concierge, employer, or other
          intermediary that arranges services on your behalf.
        </P>

        <P>
          This Privacy Policy does not apply to services, websites, or platforms
          operated by third parties that have their own privacy notices,
          including airlines, airports, payment providers, reservation system
          providers, or other partners. We may update this Privacy Policy
          periodically.
        </P>

        <P>
          If we implement a material change, we will publish the updated version
          on our website and, where legally required, notify you via appropriate
          channels.
        </P>
      </Section>

      {/* 2 */}
      <Section title="2. Information we collect when you make or receive a booking">
        <P>
          Upon making a reservation or requesting a service from us, we collect
          the necessary information to facilitate, execute, manage, and support
          that service.
        </P>

        <List
          items={[
            "Your name and contact details.",
            "Passenger information.",
            "Travel dates, flight specifics, airport, destination, and itinerary details.",
            "Booking reference and transaction information.",
            "Billing and payment-related data.",
            "Information pertinent to providing the requested assistance.",
            "Emergency contact details, if provided; and",
            "Communications regarding your booking, including amendments, cancellations, complaints, or support requests.",
          ]}
        />

        <P>
          If you make a reservation on behalf of another individual, we may
          gather information about that traveller and may communicate directly
          with the traveller when necessary to ensure service delivery.
        </P>

        <P>
          Where required for the operation of the service, we may utilize the
          contact details associated with a booking to send confirmations,
          service updates, reminders, disruption notices, or other essential
          travel-related communications
        </P>
      </Section>

      {/* 3 */}
      <Section title="3. Information we receive from others">
        <P>
          We may receive personal information from individuals such as those
          making reservations on your behalf, travel agents, concierge service
          providers, employers, card benefit programs, and other intermediaries,
          as well as airport operators, airlines, local service partners
          involved in providing the requested assistance, payment processors,
          fraud prevention entities, and analytics, communication, or customer
          support providers.
        </P>

        <P>
          We utilise information obtained from these sources solely when it is
          pertinent to organizing, delivering, supporting, securing, or
          enhancing our Services, or in accordance with applicable legal
          provisions.
        </P>
      </Section>

      {/* 4 */}
      <Section title="4. Special assistance and sensitive personal information">
        <P>
          Some of the Services we arrange may require us to process information
          that is considered sensitive under applicable law, such as information
          relating to health, mobility or accessibility requirements.
        </P>

        <P>
          We only process this information where it is necessary to assess or
          fulfil a request for special assistance, coordinate the requested
          service with an airport operator, airline, lounge operator, transport
          provider or other relevant fulfilment partner, protect the vital
          interests of a traveller or another person in an emergency, or comply
          with applicable legal or regulatory obligations.
        </P>

        <List
          items={[
            "Wheelchair or mobility assistance;",
            "a medical condition or medical device relevant to travel assistance; and",
            "accessibility or support requirements communicated by you or by someone booking on your behalf.",
          ]}
        />

        <P>
          Where required by law, we will obtain your explicit consent before
          processing this type of information. We ask that you provide only the
          minimum information necessary for us to deliver the requested service
          safely and appropriately.
        </P>
      </Section>

      {/* 5 */}
      <Section title="5. Children">
        <P>
          We may process personal information related to children when it is
          essential for organizing or providing a reserved service, fulfilling
          legal requirements, or ensuring safety, security, or operational needs
          associated with travel.
        </P>

        <P>
          We do not intentionally gather personal information directly from
          children for marketing purposes independently.
        </P>

        <P>
          If you suspect that a child’s information has been improperly provided
          to us, please contact us, and we will assess the request in accordance
          with applicable legal provisions.
        </P>
      </Section>

      {/* 6 */}
      <Section title="6. Information collected through our website and digital services">
        <P>
          By utilising our website or digital services, you acknowledge that we
          may collect technical information, including your IP address, browser
          type, device specifications, operating system, pages viewed, referral
          website, date and time of access, and estimated location based on your
          IP address or device configurations, where applicable.
        </P>

        <P>
          This information is employed to operate and secure our website, retain
          your preferences, analyze website usage, enhance performance,
          usability, and customer experience, and assess the effectiveness of
          our communications and advertising, where applicable.
        </P>

        <P>
          In accordance with legal requirements, we request your consent prior
          to the use of non-essential cookies or similar technologies.
        </P>
      </Section>

      {/* 7 */}
      <Section title="7. Cookies and similar technologies">
        <P>
          We utilize cookies and similar technologies to operate our website and
          enhance your experience. These technologies may be categorized as
          follows:
        </P>

        <List
          items={[
            "Strictly necessary cookies, which are essential for fundamental website functions such as page navigation, booking processes, security, fraud prevention, and session management.",
            "Functional cookies, which assist us in recalling your preferences, including language, region, or previously entered data.",
            "Analytics cookies enable us to comprehend how visitors utilize our website, thereby facilitating improvements in performance, content, and usability.",
            "Advertising cookies, which may be deployed to evaluate marketing effectiveness and, where permitted, to display relevant advertisements tailored to your interactions with our website.",
          ]}
        />

        <P>
          In accordance with legal requirements, we shall only employ analytics
          and advertising cookies upon receipt of your explicit consent. You may
          manage your preferences via our cookie settings tool. Additionally,
          you have the option to control cookies through your browser settings;
          however, disabling certain cookies may impact the functionality of the
          website.
        </P>
      </Section>

      {/* 8 */}
      <Section title="8. Third-party analytics and advertising tools">
        <P>
          We may utilise carefully chosen third-party providers to support
          website analytics, advertising measurement, and marketing performance.
          These providers may set or access cookies and similar technologies on
          our website, subject to applicable laws and, when necessary, your
          consent. These providers process information on our behalf or for
          their own purposes, depending on the service they offer and the legal
          arrangements established.
        </P>

        <P>
          We recommend reviewing the privacy information available through our
          cookie settings tool for more detailed information about the
          technologies employed.
        </P>

        <P>
          We do not sell personal information for monetary gain. Where
          applicable law considers certain advertising or analytics disclosures
          as sharing for cross-context behavioural advertising, we will provide
          the requisite notices and options as mandated by law.
        </P>
      </Section>

      {/* 9 */}
      <Section title="9. How we use personal information">
        <P>
          We utilize personal information to deliver and oversee our services,
          encompassing the processing of inquiries and bookings, arranging
          airport assistance, coordinating with service partners, communicating
          regarding booked services, managing amendments and cancellations, and
          providing customer support. Additionally, personal data is employed to
          process payments and manage transactions, including payment
          processing, refunds, invoicing, fraud prevention, and accounting.
        </P>

        <P>
          The use of personal information extends to operating, enhancing, and
          securing our business operations, which include service
          administration, recordkeeping, website maintenance, analytics, staff
          training, internal reporting, auditing, risk management, and the
          safeguarding of our systems, personnel, and services.
        </P>

        <P>
          We may communicate with you concerning service messages, responses to
          customer support inquiries, disruption notices, and, where permitted,
          marketing communications.
        </P>

        <P>
          Furthermore, personal information is processed to ensure compliance
          with legal and regulatory obligations and to protect travelers and
          other parties in urgent situations.
        </P>
      </Section>

      {/* 10 */}
      <Section title="10. Marketing communications">
        <P>
          Where permitted by law, we may send you information about our
          services, offers, or updates that we believe may be relevant to you.
        </P>

        <P>
          Where consent is required, we will only send marketing communications
          if you have opted in. You can unsubscribe at any time by using the
          unsubscribe link in the message or by contacting us.
        </P>

        <P>
          Even if you opt out of marketing, we may still send service-related
          communications that are necessary to manage a booking, provide
          support, or inform you about operational issues affecting your travel
          service.
        </P>
      </Section>

      {/* 11 */}
      <Section title="11. Who we share personal information with">
        <P>
          We disclose personal information solely when it is necessary to fulfil
          the purposes outlined in this Privacy Policy. Such disclosures include
          the following categories of recipients:
        </P>

        <List
          items={[
            "Service fulfilment partners, such as airport operators, airline-related service providers, lounge operators, chauffeurs, transfer providers, and other suppliers involved in delivering the service you requested.",
            "Booking, payment, and technology providers, including payment processors, reservation or booking technology providers, website hosting providers, communication platforms, customer support tools, and IT service providers.",
            "Business partners and intermediaries. When a booking is arranged through a travel advisor, concierge, employer, card programmed, agent, or other intermediary, sharing is necessary for managing the booking, as well as for related reporting or support.",
            "Professional advisers and compliance recipients, such as auditors, lawyers, insurers, regulators, law enforcement authorities, or other parties where disclosure is mandated or deemed appropriate by law.",
            "Corporate group entities, insofar as it is relevant for internal administration, customer support, compliance, or service management.",
          ]}
        />

        <P>
          We do not disclose personal information to unrelated third parties for
          their independent marketing purposes unless you have been explicitly
          informed and, where legally required, have provided your consent.
        </P>
      </Section>

      {/* 12 */}
      <Section title="12. Our role and the role of airlines, airports and partners">
        <P>
          In most instances, Airport Assist Ltd, operating under the trade name
          Airport Assist, functions as an independent controller of the personal
          data we gather and utilize in relation to our services.
        </P>

        <P>
          Nevertheless, the travel industry ecosystem comprises multiple
          organisations. Depending on the manner in which your reservation is
          made, and the mode of service delivery, entities such as airlines,
          airports, reservation system providers, travel agents, employers,
          concierge firms, or other partners may also process your personal data
          for their respective purposes and in accordance with their own privacy
          policies.
        </P>

        <P>
          An airline may handle passenger information concerning flight
          operations or special service requests; an airport operator or local
          service partner may process information necessary to provide
          assistance at the airport; and a booking intermediary may process your
          data to manage the relationship through which the reservation was
          made.
        </P>

        <P>
          In cases where another organization determines the purposes and means
          of data processing, that entity functions as a separate data
          controller. When we process data solely on behalf of a partner
          following documented instructions, we do so in the capacity mandated
          by the pertinent arrangement and applicable law.
        </P>
      </Section>

      {/* 13 */}
      <Section title="13. Legal bases for processing">
        <P>
          In instances where data protection legislation mandates the
          identification of a legal basis for processing, we rely on one or more
          of the following grounds:
        </P>

        <List
          items={[
            "Contractual necessity, whereby processing is requisite to undertake actions at your request or to deliver the Services you have contracted.",
            "Legal obligation, wherein processing is essential to comply with applicable laws, regulations, accounting, tax, or reporting requirements.",
            "Legitimate interests, which are necessary for the operation, enhancement, security, and management of our business and Services, provided such interests are not superseded by your rights.",
            "Consent, as mandated by law, includes instances involving certain marketing activities, cookies, or processing of special-category data.",
            "Vital interests, necessary for the protection of individuals in emergency situations.",
            "Substantial public interest or accessibility considerations, recognised by applicable law, in relation to providing suitable support to travelers in need of assistance.",
          ]}
        />
      </Section>

      {/* 14 */}
      <Section title="14. International transfers">
        <P>
          Due to the international scope of travel and the conduct of our
          business operations, personal information may be transferred to or
          accessed from countries other than the country in which it was
          initially collected. When mandated by legal requirements, we implement
          appropriate safeguards for such transfers, which may encompass
          contractual protections, adequacy decisions, or other lawful transfer
          mechanisms.
        </P>

        <P>
          You are welcome to contact us for further information regarding the
          safeguards applicable to the transfer of your personal data.
        </P>
      </Section>

      {/* 15 */}
      <Section title="15. Security">
        <P>
          We employ appropriate technical, organisational, and administrative
          measures intended to safeguard personal information against
          unauthorized access, disclosure, alteration, loss, or misuse.
        </P>

        <P>
          These measures are tailored to reflect the nature of the information
          we handle and the risks associated with our services. While no online
          service can guarantee absolute security, we diligently maintain
          safeguards that are commensurate with the sensitivity of the
          information involved. Furthermore, you play a vital role in protecting
          your data.
        </P>

        <P>
          Kindly retain the confidentiality of your booking references, login
          credentials, and access details, and contact us promptly should you
          suspect that your information has been compromised.
        </P>
      </Section>

      {/* 16 */}
      <Section title="16. Data retention">
        <P>
          We retain personal information solely for the duration necessary to
          fulfil the purposes outlined in this Privacy Policy, which include
          providing our Services, maintaining business and legal records,
          resolving disputes, enforcing contractual agreements, and complying
          with legal, tax, accounting, regulatory, and reporting obligations.
        </P>

        <P>
          Retention periods may differ based on the type of information and the
          rationale for its retention. For instance, we may retain booking and
          transaction records for an appropriate period to administer services
          and adhere to legal and accounting requirements; correspondence and
          support records for as long as necessary to manage customer
          relationships and resolve disputes; accessibility or
          assistance-related data only for as long as required to deliver the
          relevant service and meet legal obligations; records of marketing
          suppression for as long as needed to honor your communication
          preferences; and cookie and analytics data in accordance with the
          settings of relevant technologies and our internal retention policies.
        </P>

        <P>
          When information is no longer necessary, we will either delete it,
          anonymize it, or securely store it in a manner that no longer
          identifies you, in accordance with legal provisions.
        </P>
      </Section>

      {/* 17 */}
      <Section title="17. Your rights">
        <P>
          Depending on your location and the applicable legal framework, you may
          possess rights regarding your personal data, including the right to
          access the information we hold about you, request corrections to any
          inaccurate or incomplete data, request deletion of information under
          specific circumstances, request restrictions on processing activities
          in certain cases, object to specific processing actions—including
          those based on legitimate interests or direct marketing—and withdraw
          consent where processing is based on consent. Additionally, you may
          have the right to request data portability where applicable.
        </P>

        <P>
          These rights are not absolute and may be subject to limitations where
          we are legally permitted or obliged to retain or continue processing
          certain data.
        </P>

        <P>
          To exercise these rights, please contact us using the contact details
          provided below. We may require sufficient information to verify your
          identity prior to responding to your request.
        </P>
      </Section>
      <Section title="18. Contact us">
        <P>
          If you have questions about this Privacy Policy or wish to exercise
          your rights, please contact:
        </P>

        <P>Entity</P>
        <P>Airport Assist</P>

        <P>Email</P>
        <P>meet@airport-assist.com</P>

        <P>Phone</P>
        <P>+44 20 4517 7711</P>

        <P>
          If applicable law gives you the right to lodge a complaint with a
          supervisory authority, you may do so in the country where you live,
          work or where you believe an infringement has occurred.
        </P>

        <P>End of Privacy Policy</P>
      </Section>
    </div>
  );
};

export default InfoContainer;
