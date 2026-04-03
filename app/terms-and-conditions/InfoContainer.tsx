"use client";

import KeyPointsTable from "./KeyPoints";
import ScheduleTable from "./ScheduleA";

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
        Airport Assist Ltd | Booking Terms and Service Conditions
      </h1>

      <P>AIRPORT ASSIST LTD</P>
      <P>Booking Terms and Service Conditions</P>

      {/* Key Points */}
      {/* <Section title="Key Points briefly">
        <List
          items={[
            "Booking status",
            "A booking is only confirmed once Airport Assist issues a booking reference.",
            "Pricing",
            "Prices and availability are guaranteed only once confirmed.",
            "Standard cancellations",
            "Cancellations made within 48 hours are usually charged in full unless a booking-specific rule applies.",
            "Special services",
            "Some airports, VVIP services, and transport bookings follow stricter local terms.",
            "Operational changes",
            "Airport, airline, security, or terminal changes may affect how a service is delivered.",
            "Payment",
            "Invoices are payable within 30 days unless otherwise agreed in writing.",
          ]}
        />
      </Section> */}

      <KeyPointsTable/>
      {/* 1 */}
      <Section title="1. About these Terms">
        <P>
          These Booking Terms and Service Conditions explain how Airport Assist
          Ltd provides meet and assist, concierge, VIP, VVIP, lounge, porter,
          buggy, transportation coordination, and related airport support
          services.
        </P>

        <P>
          By submitting a booking request, accepting a booking confirmation, or
          using our services, you agree to these Terms and any booking-specific
          conditions that we notify to you.
        </P>
      </Section>

      {/* 2 */}
      <Section title="2. Definitions">
        <P>
          Airport Assist, as referred to herein, includes the entity Airport
          Assist Ltd., and may be denoted by the pronouns 'we', 'us', or 'our'.
        </P>

        <P>
          Client, 'you' or 'your' refers to any individual, corporation, agency,
          or intermediary engaging with our services through booking.
        </P>

        <P>A passenger is defined as the traveller who receives the service.</P>

        <P>
          Booking signifies a request for services that has been duly accepted
          and confirmed by Airport Assist, accompanied by a booking reference.
        </P>

        <P>
          Services encompass the airport assistance or related services duly
          confirmed in your reservation, including any supplementary services
          requested.
        </P>

        <P>
          Ancillary Services refer to supplementary services provided beyond the
          primary meet and assist functions, including porter services, electric
          buggy transportation, lounge coordination, and vehicle services.
        </P>

        <P>
          Charges refer to the aggregate fees payable for the booking,
          encompassing service charges, surcharges, cancellation fees, waiting
          time charges, taxes, and authorized additional services.
        </P>

        <P>
          VVIP Services refer to premium airport amenities offered through VIP
          lounges, VIP terminals, tarmac access, or specialised operators.
        </P>
      </Section>

      {/* 3 */}
      <Section title="3. Booking Process">
        <List
          items={[
            "3.1 Booking channels. Booking requests may be submitted via our website, booking portal, by email, telephone, or through other authorised sales channels.",
            "3.2 Confirmation. A reservation is deemed confirmed only when Airport Assist accepts it and issues a booking reference, either through our portal or by electronic mail. A mere request does not ensure availability or pricing.",
            "3.3 Advance bookings. Reservations can generally be requested up to eleven months prior to the intended date. Prices and availability are only guaranteed upon confirmation.",
            "3.4 Information required. You are obligated to furnish complete and accurate information, including passenger name, airport, flight details, route, contact information, and the type of service required.",
            "3.5 Passenger awareness. You are responsible for ensuring that all passengers utilizing the service are aware of the relevant booking terms and service conditions.",
            "3.6 Approved partners. Airport Assist may engage approved local partners or subcontractors to deliver part or all of a service. Nevertheless, Airport Assist maintains responsibility for the contracted service.",
          ]}
        />
      </Section>

      {/* 4 */}
      <Section title="4. Service Standards">
        <P>
          Airport Assist shall provide services with due diligence, expertise,
          and professionalism, employing staff who are appropriately trained or
          utilizing approved service partners. Airport agents are mandated to
          adhere to airport security and operational protocols and to maintain a
          professional appearance, including the use of visible signage where
          applicable.
        </P>
      </Section>

      {/* 5 */}
      <Section title="5. Charges and Pricing">
        <List
          items={[
            "5.1 Charges may encompass the booked service fee, along with any applicable surcharges for public holidays, late bookings, destination-specific fees, waiting times, amendments, cancellations, airport or terminal-specific costs, taxes, and additional services requested prior to or during the reservation.",
            "5.2 Airport Assist reserves the right to periodically revise rates with prior notice. Confirmed reservations shall be honoured at the rate in effect at the time of confirmation, whereas revised rates shall be applicable solely to new reservations made after the notice date.",
            "5.3 A booking or administrative fee may be applicable where specified at the quotation or confirmation stage.",
          ]}
        />
      </Section>

      {/* 6 */}
      <Section title="6. Amendments, Cancellations and No-Shows">
        <List
          items={[
            "6.1 Standard Policy. Unless alternative conditions are explicitly outlined for your reservation, cancellations made more than 48 hours prior to the scheduled service shall be exempt from charges; cancellations within 48 hours will be subject to full charges; amendments requested within 48 hours are subject to availability and may incur fees; and no-shows will be billed in total.",
            "6.2 Separate Bookings. Each arrival, departure, or transit service shall be regarded as a separate booking for the purposes of amendments, cancellations, and no-shows.",
            "6.3 Departure Delays. For departure services, in the event of a delay or disruption not announced prior to the passenger's arrival at the airport, our airport representative will remain on duty for a maximum of three hours unless further assistance is requested and approved.",
            "6.4 Destination-Specific Regulations. Where applicable, regulations established by local airports, airlines, lounges, transportation providers, or suppliers shall take precedence.",
          ]}
        />
      </Section>

      {/* 7 */}
      <Section title="7. Special Destination and Service Conditions">
        <P>
          Certain airports and service providers implement varying policies
          concerning cancellations, surcharges, and operational procedures.
          These may encompass tiered cancellation fees, surcharges for
          short-notice changes, terminal surcharges, additional charges for
          extra hours, and non-refundable reservation fees.
        </P>

        <P>
          When conditions specific to a destination or supplier are applicable,
          they will be clearly delineated within the quotation, confirmation, or
          accompanying schedule.
        </P>
      </Section>

      {/* 8 */}
      <Section title="8. VVIP, VIP Terminal and Tarmac Services">
        <P>
          VVIP services are frequently managed by airport authorities, VIP
          lounges, VIP terminals, or specialized operators rather than solely by
          Airport Assist. Consequently, more stringent payment, amendment, and
          refund policies are typically enforced.
        </P>

        <P>
          Reservation fees are generally non-refundable, and payment may be
          required in advance. Cancellation becomes effective only upon
          acceptance by the relevant operator.
        </P>

        <P>
          Furthermore, if the authority has already confirmed or finalized the
          service, refunds are generally not available.
        </P>
      </Section>

      {/* 9 */}
      <Section title="9. Transportation Services">
        <P>
          Where Airport Assist provides or coordinates vehicle services, the
          applicable grace periods, wait-time charges, and cancellation rules
          will be outlined in the quotation or trip confirmation.
        </P>

        <P>
          Standard vehicle cancellation policies are as follows: within 24
          hours, a 100% fee applies; between 24 and 48 hours, a 50% fee applies;
          and more than 48 hours, no charge will be applied. Premium or
          specialist vehicles may have customised terms.
        </P>
      </Section>

      {/* 10 */}
      <Section title="10. Service Changes Caused by Airport or Airline Operations">
        <P>
          Airports represent dynamic operational environments. Services may
          require modification, restriction, delay, or suspension in accordance
          with airport regulations, airline protocols, security mandates,
          weather conditions, terminal alterations, directives from local
          authorities, or limitations imposed by suppliers.
        </P>

        <P>
          When feasible, Airport Assist will notify you promptly and endeavour
          to adapt the service in a practical and reasonable manner.
        </P>
      </Section>

      {/* 11 */}
      <Section title="11. Complaints and Service Concerns">
        <P>
          If you or your passenger are dissatisfied with the service provided,
          kindly notify Airport Assist at your earliest convenience, preferably
          within five working days of the travel date. We shall review the
          matter diligently and respond within a reasonable timeframe.
        </P>
      </Section>

      {/* 12 */}
      <Section title="12. Invoicing, Payment and Taxes">
        <List
          items={[
            "12.1 Airport Assist invoices shall be issued for the services rendered, including any supplementary services requested during the delivery process. The client shall remain liable for payment irrespective of whether funds have been recovered from the passenger.",
            "12.2 Invoices are due for payment within thirty (30) days unless otherwise agreed upon. Payments should be made in the currency specified on the invoice.",
            "12.3 Value Added Tax (VAT) and comparable taxes shall be applied where applicable. Any inquiries regarding the invoice should be raised promptly.",
          ]}
        />
      </Section>

      {/* 13 */}
      <Section title="13. Data Protection">
        <P>
          Airport Assist processes personal data solely insofar as necessary to
          organize and provide the booked services. By making a reservation, you
          affirm that you are authorized to furnish the passenger information
          necessary for service fulfilment.
        </P>

        <P>
          When required, Airport Assist may exchange relevant data with airport
          authorities, airlines, lounges, transport providers, and authorized
          local service partners.
        </P>
      </Section>

      {/* 14 */}
      <Section title="14. Liability">
        <P>
          Nothing in these Terms limits liability for death or personal injury
          caused by negligence, fraud, or any liability that cannot legally be
          excluded. Subject to that, Airport Assist is not liable for indirect
          or consequential loss, loss of profit, loss of business, or loss of
          goodwill.
        </P>

        <P>
          Airport Assist’s total liability in connection with any booking shall
          not exceed 150% of the Charges for that booking or £2,000, whichever
          is greater.
        </P>
      </Section>

      {/* 15 */}
      <Section title="15. Confidentiality and Anti-Bribery">
        <P>
          Both parties are obligated to maintain the confidentiality of any
          confidential or commercially sensitive information shared in
          connection with the services, except where disclosure is mandated by
          law or reasonably necessary for the provision of services.
        </P>

        <P>
          Airport Assist strictly prohibits bribery in any form. Clients and
          their representatives are expected to adhere to all applicable
          anti-bribery legislation, including the Bribery Act 2010.
        </P>
      </Section>

      {/* 16 */}
      <Section title="16. General Legal Terms">
        <P>
          These Terms, in conjunction with the booking confirmation and any
          relevant service-specific or destination-specific conditions,
          constitute the comprehensive agreement between the parties. Amendments
          to a booking, confirmed via email, shall be binding solely for that
          individual booking.
        </P>

        <P>
          Any wider alterations to these Terms require mutual written agreement.
          These Terms are subject to English law, and the courts of England and
          Wales shall have exclusive jurisdiction.
        </P>
      </Section>

      <ScheduleTable />
    </div>
  );
};

export default InfoContainer;
