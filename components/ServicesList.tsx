import React from "react";

// بيانات الخدمات
const servicesData = [
  {
    title: "Business traveller",
    description: "Airport Fast Track Services for Business Travellers",
    img: "/downloads/Business traveller.jpg",
  },
  {
    title: "Chauffeur Services",
    description: "Luxury Chauffeur Services: Travel in Comfort and Style",
    img: "/downloads/Chauffeur Services.jpg",
  },
  {
    title: "NCE Airport",
    description: "VIP Fast Track at Nice Côte d'Azur Airport (NCE)",
    img: "/downloads/NCE Airport.jpg",
  },
  {
    title: "JFK Airport",
    description: "VIP Fast Track at John F. Kennedy Airport (JFK)",
    img: "/downloads/JFK Airport.jpg",
  },
];

// Component لكل عنصر
const ServiceItem = ({
  title,
  description,
  img,
}: {
  title: string;
  description: string;
  img: string;
}) => {
  return (
    <div className="flex gap-2">
      <div className="flex-1 overflow-hidden rounded-lg">
        <img
          src={img}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>
      <div className="flex-2 flex flex-col justify-center">
        <p className="font-manrope text-[rgb(100,96,125)] text-md">{title}</p>
        <p className=" font-manrope text-lg font-bold">{description}</p>
      </div>
    </div>
  );
};

// Component الرئيسي لعرض كل الخدمات
const ServicesList = () => {
  return (
    <div className="flex-1 flex flex-col gap-4">
      {servicesData.map((item, index) => (
        <React.Fragment key={index}>
          <ServiceItem
            title={item.title}
            description={item.description}
            img={item.img}
          />
          {index !== servicesData.length - 1 && (
            <span className="w-full h-[2px] rounded-lg bg-gray-300 my-4 block"></span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ServicesList;
