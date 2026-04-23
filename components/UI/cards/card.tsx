"use client";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  padding?: "none" | "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "white";
  shadow?: "none" | "sm" | "md" | "lg";
}

const Card = ({
  children,
  className = "",
  rounded = "2xl",
  padding = "md",
  variant = "primary",
  shadow = "md",
}: CardProps) => {
  const roundedMap = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    "2xl": "rounded-2xl",
    full: "rounded-full",
  };

  const paddingMap = {
    none: "p-0",
    sm: "p-2",
    md: "p-5",
    lg: "p-8",
  };

  const variantMap = {
    primary: "bg-primary text-white",
    secondary: "bg-secondary text-white",
    white: "bg-white text-black",
  };

  const shadowMap = {
    none: "",
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
  };

  return (
    <div
      className={`
        w-full
        ${roundedMap[rounded]}
        ${paddingMap[padding]}
        ${variantMap[variant]}
        ${shadowMap[shadow]}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;
