"use client";
import "react-international-phone/style.css";
import { PhoneInput } from "react-international-phone";
import { memo } from "react";

const CustomPhoneInput = memo(
  ({
    className,
    validationClass,
    value,
    radius,
    disabled = false,
    onChange,
  }: {
    validationClass?: boolean;
    className?: string;
    radius?: string;
    value?: string;
    disabled?: boolean;
    onChange?: (phone: string) => void;
  }) => {
    return (
      <PhoneInput
        name="phone"
        onChange={onChange}
        value={value}
        disabled={disabled}
        className={`bg-[#F4F4F4] border overflow-visible ${validationClass ? "border-red-500" : "border-[#E0E0E0]"} overflow-hidden ${className ?? "h-11.25 rounded-xl"}`}
        defaultCountry="gb"
        preferredCountries={["gb", "us", "fr"]}
        placeholder="+xx xxx xxxx xxx"
        hideDropdown={false}

        inputProps={{
          style: {
            backgroundColor: "#F4F4F4",
            borderRadius: "15px",
            width: "100%",
            border: "none",
            margin: "auto",
            height: "100%",
          },
        }}
        countrySelectorStyleProps={{
          buttonStyle: {
            background: "#E5E5E5",
            height: "100%",
            border: "none",
            borderRadius: radius ?? "12px",
            padding: "12px 30px",
          },
          buttonClassName: "bg-[#F4F4F4] border-nonse bg-none pl-4 py-5.5",
          dropdownStyleProps: {
            className: "scrollbar-none overflow-hidden rounded-lg w-full",
          },
        }}
      />
    );
  },
);

CustomPhoneInput.displayName = "CustomPhoneInput";

export default CustomPhoneInput;
//

