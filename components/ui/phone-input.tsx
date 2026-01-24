import "react-international-phone/style.css";
import { PhoneInput } from "react-international-phone";

export default function CustomPhoneInput({className, radius}: {className?:string, radius?: string}) {
  return (
    <PhoneInput
      defaultCountry="us"
      preferredCountries={[
        "gb",
        "us",
        "fr",
      ]}
      
      placeholder="0101 434 3413"
      className={`bg-[#F4F4F4] border border-[#E0E0E0]  ${className ?? "h-11.25 rounded-xl"}`}
      inputProps={{
        style: {
          backgroundColor: "#F4F4F4",
          borderRadius:"15px",
          width: "100%",
          border: "none",
          margin:"auto",
          height:"100%",
        },
      }}
      countrySelectorStyleProps={{
        buttonStyle: {
          background: "#E5E5E5",
          height:"100%",
          border: "none",
          borderRadius: radius ?? "12px",
          padding: "12px 30px ",
        },
        buttonClassName: "bg-[#F4F4F4] border-nonse bg-none  pl-4 py-5.5",
        dropdownStyleProps:{
          className:"scrollbar-none overflow-hidden rounded-lg w-full"
        }
      }}
    />
  );
}
