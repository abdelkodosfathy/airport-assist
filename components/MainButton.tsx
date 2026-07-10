"use client";

import React, { forwardRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type MainButtonProps = React.ComponentProps<typeof Button> & {
  href?: string;
  onDisabledClick?: () => void;
  isActive?: boolean;
};

const MainButton = forwardRef<HTMLButtonElement, MainButtonProps>(
  (
    {
      children,
      href,
      disabled,
      isActive,
      onDisabledClick,
      className,
      onClick,
      ...props
    },
    ref,
  ) => {
    const handleClick = (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    ) => {
      if (disabled) {
        e.preventDefault();
        onDisabledClick?.();
        return;
      }

      onClick?.(e);
    };

    // const styles = cn(
    //   "w-max cursor-pointer border-black text-black hover:border-[#664F31] hover:bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)] hover:text-white duration-0",

    //   className,
    // );

    const styles = cn(
      isActive
        ? "w-max cursor-pointer bg-black text-white border-black hover:bg-black hover:text-white hover:border-black duration-300"
        : "w-max cursor-pointer border-black text-black hover:border-[#664F31] hover:bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)] hover:text-white duration-0",

      className,
    );
    if (href && !disabled) {
      return (
        <Button
          asChild
          ref={ref}
          variant="outline"
          className={styles}
          {...props}
        >
          <Link href={href}>{children}</Link>
        </Button>
      );
    }

    return (
      <div
        className="w-max"
        onClick={() => {
          if (disabled) {
            onDisabledClick?.();
          }
        }}
      >
        <Button
          ref={ref}
          variant="outline"
          disabled={disabled}
          className={styles}
          onClick={handleClick}
          {...props}
        >
          {children}
        </Button>
      </div>
    );
  },
);

MainButton.displayName = "MainButton";

export default MainButton;
