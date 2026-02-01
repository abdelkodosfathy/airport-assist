"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ReactNode, useState } from "react";

interface Autocomplete extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  inputClassName?: string;
}

export default function Autocomplete({
  icon,
  iconPosition = "left",
  className,
  inputClassName,
  ...props
}: Autocomplete) {
  return (
    <div className={` ${className} relative w-full flex items-center`}>
      {icon && iconPosition === "left" && (
        <span className="absolute left-3 text-gray-400 pointer-events-none">
          {icon}
        </span>
      )}

      <Input
        className={cn(
          icon && iconPosition === "left" && "pl-10",
          icon && iconPosition === "right" && "pr-10 pl-4",
          inputClassName
        )}
        {...props}
      />

      {icon && iconPosition === "right" && (
        <span className="absolute right-3 text-gray-400 pointer-events-none">
          {icon}
        </span>
      )}
      <div className="absolute bottom-0 translate-y-[100%] left-0 right-0 rounded-2xl bg-white">
        <ul>
          <li>JFK – John F. Kennedy Intl</li>
          <li>LAX – Los Angeles Intl</li>
          <li>JFK – John F. Kennedy Intl</li>
        </ul>
      </div>
    </div>
  );
}
