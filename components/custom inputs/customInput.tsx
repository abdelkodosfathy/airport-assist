"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface IconInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  inputClassName?: string;
}

export default function IconInput({
  icon,
  iconPosition = "left",
  className,
  inputClassName,
  ...props
}: IconInputProps) {
  return (
    <div className={` ${className} relative w-full flex items-center`}>
      {icon && iconPosition === "left" && (
        <span className="absolute left-3 text-gray-400 pointer-events-none">
          {icon}
        </span>
      )}

      <Input
        className={cn(
          icon && iconPosition === "left" && "pl-10 pr-2",
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
    </div>
  );
}
