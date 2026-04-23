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
    <div className={`w-full rounded-2xl overflow-hidden ${className}`}>
      {/* Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="
          w-full flex items-center justify-between
          px-4 py-3.5
          bg-[#25302B] text-white
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

      {/* Body */}
      <div
        style={{ height }}
        className="
          overflow-hidden
          transition-all duration-300 ease-in-out
          bg-primary text-white
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
