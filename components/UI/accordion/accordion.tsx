"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronUp } from "lucide-react";

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

const Accordion = ({
  title,
  children,
  defaultOpen = false,
  className = "",
}: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [height, setHeight] = useState("0px");
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? `${contentRef.current.scrollHeight}px` : "0px");
    }
  }, [isOpen]);

  return (
    <div
      className={`w-full overflow-hidden rounded-2xl border border-[#DDE8E3] bg-white dark:border-white/10 dark:bg-[#111d1a] ${className}`}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="
          flex w-full items-center justify-between
          bg-[#EAF3EF] px-4 py-3.5 text-[#10201B]
          dark:bg-[#25302B] dark:text-white
        "
      >
        <span>{title}</span>

        <ChevronUp
          size={22}
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      <div
        style={{ height }}
        className="
          overflow-hidden bg-white text-[#10201B]
          transition-all duration-300 ease-in-out
          dark:bg-[#101c19] dark:text-white
        "
      >
        <div ref={contentRef} className="px-4 py-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Accordion;
