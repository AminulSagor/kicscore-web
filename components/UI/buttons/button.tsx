"use client";

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "base" | "md" | "lg";
  variant?: "primary" | "secondary";
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "full";
  disabled?: boolean;
  type?: "button" | "submit";
  onClick?: () => void;
}

const Button = ({
  children,
  className = "",
  size = "md",
  variant = "primary",
  rounded = "lg",
  disabled = false,
  type = "button",
  onClick,
}: ButtonProps) => {
  const sizeMap = {
    sm: "px-2 py-1 text-xs",
    base: "px-3 py-2 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const variantMap = {
    primary: "bg-secondary text-white",
    secondary: "bg-primary text-white hover:bg-[#1749ab]",
  };

  const roundedMap = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    full: "rounded-full",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`
        flex items-center justify-center gap-2
        transition-all active:scale-[0.97]
        ${sizeMap[size]}
        ${variantMap[variant]}
        ${roundedMap[rounded]}
        ${disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default Button;
