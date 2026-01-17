import ServiceSection from "@/app/services/components/services-section";

type Props = {};

const page = (props: Props) => {
  return (
    <>
      <ServiceSection/>
      <ServiceSection left />
      <ServiceSection />
    </>
  );
};

export default page;
