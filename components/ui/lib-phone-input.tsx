"use client";

import { useState, useCallback } from "react";
import PhoneInputLib from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { parsePhoneNumberFromString } from "libphonenumber-js/max";
import type { CountryCode } from "libphonenumber-js";

interface Props {
  value?: string;
  onChange?: (
    value: string,
    formatted: string,
    country: CountryCode | undefined,
    isValid: boolean,
  ) => void;
  className?: string;
  inputClassName?: string;
  placeholder?: string;
}

export const LibPhoneInput = ({
  value = "",
  onChange,
  className = "",
  inputClassName = "",
  placeholder = "Enter phone number",
}: Props) => {
  const [phoneNumber, setPhoneNumber] = useState(value);
  const [country, setCountry] = useState<CountryCode | undefined>(undefined);
  const [touched, setTouched] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const handleChange = useCallback(
    (val: string | undefined) => {
      const clean = val || "";
      setPhoneNumber(clean);

      if (!clean) {
        setIsValid(false);
        onChange?.("", "", country, false);
        return;
      }

      const parsed = parsePhoneNumberFromString(clean, country);

      const valid = parsed?.isValid() ?? false;
      const formatted = parsed?.formatInternational() ?? "";

      setIsValid(valid);

      onChange?.(clean, formatted, country, valid);
    },
    [country, onChange],
  );

  const error = touched && phoneNumber && !isValid;

  return (
    <div className={`w-full ${className}`}>
      <PhoneInputLib
        value={phoneNumber}
        onChange={handleChange}
        onCountryChange={(c) => setCountry(c)}
        international
        withCountryCallingCode
        addInternationalOption={false}
        // enableSearch
        onBlur={() => setTouched(true)}
        placeholder={placeholder}
        className={`
          w-full
          px-3 py-2
          rounded-lg
          border
          transition-all
					outline-none
					focus:outline-none
					focus:ring-0
          ${error ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-blue-500"}
          ${inputClassName}
        `}
        inputProps={{
          dir: "ltr",
          style: {
            direction: "ltr",
            border: "none",
            outline: "none",
            boxShadow: "none",
          },
        }}
      />
    </div>
  );
};
