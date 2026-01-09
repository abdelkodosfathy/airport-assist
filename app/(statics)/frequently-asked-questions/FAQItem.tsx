// app/frequently-asked-questions/FAQItem.tsx
"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronUp } from "lucide-react";
import gsap from "gsap";

type FAQItemProps = {
  question: string;
  answer: string;
};

export default function FAQItem({ question, answer }: FAQItemProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  const toggle = () => {
    if (!contentRef.current) return;

    if (open) {
      gsap.to(contentRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.4,
        ease: "power2.inOut",
      });
    } else {
      gsap.to(contentRef.current, {
        height: "auto",
        opacity: 1,
        duration: 0.4,
        ease: "power2.inOut",
      });
    }

    setOpen(!open);
  };

  return (
    <div
      className={`shadow-lg px-15 py-6 rounded-2xl  transition-colors duration-300
      ${
        open
          ? "border border-[#7B5A41] bg-[#eae9e75a]"
          : "border border-white bg-white"
      }`}
    >
      <div
        className={`flex gap-8 items-center duration-300 ${open ? "mt-6" : ""}`}
      >
        <Button variant="ghost" className="p-0 hover:bg-transparent" onClick={toggle}>
          <div
            className={`w-12 h-12 grid place-content-center  rounded-full ${
              open ? "bg-white" : "bg-[#E6E6E66B]"
            } border border-[#DADADA]`}
          >
            <ChevronUp
              className={` transition-transform duration-300 ${
                open ? "rotate-0" : "rotate-180"
              }`}
            />
          </div>
        </Button>

        <p className="font-semibold text-xl">{question}</p>
      </div>

      {/* Animated Content */}
      <div ref={contentRef} className={"overflow-hidden h-0 opacity-0"}>
        <p className={`text-lg text-[#6D6D6D] mt-8 ${open ? "mb-6" : ""}`}>
          {answer}
        </p>
      </div>
    </div>
  );
}
