"use client";

import { X } from "lucide-react";

interface DialogProps {
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  className?: string;
  size?: DialogSize;
  position?: DialogPosition;
  hideClose?: boolean; // optional if you want
}

type DialogSize = "default" | "sm" | "md" | "lg" | "xl";
type DialogPosition = "center" | "top" | "bottom";

const styleSize: Record<DialogSize, string> = {
  default: "w-[calc(100vw-32px)] max-w-md",
  sm: "w-[calc(100vw-32px)] max-w-sm",
  md: "w-[calc(100vw-32px)] max-w-xl",
  lg: "w-[calc(100vw-32px)] max-w-2xl",
  xl: "w-[calc(100vw-32px)] max-w-4xl",
};

const stylePosition: Record<DialogPosition, string> = {
  center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
  top: "top-15 left-1/2 -translate-x-1/2",
  bottom: "bottom-10 left-1/2 -translate-x-1/2",
};

export default function Dialog({
  open,
  onOpenChange,
  children,
  className = "",
  size = "default",
  position = "top",
  hideClose,
}: DialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/30 dark: backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />

      {/* Dialog */}
      <div
        className={`absolute rounded-xl bg-primary text-white transition-all duration-150
        ${stylePosition[position]}
        ${styleSize[size]}
        ${className}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* close */}
        {!hideClose && (
          <button
            className="absolute top-4 right-4 text-gray/60 "
            onClick={() => onOpenChange(false)}
          >
            <X size={20} className="text-white" />
          </button>
        )}

        <div className="p-5 max-h-[calc(100vh-80px)] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
