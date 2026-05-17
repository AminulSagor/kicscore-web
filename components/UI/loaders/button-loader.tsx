interface ButtonLoaderProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "size-3 border",
  md: "size-4 border-[1.5px]",
  lg: "size-5 border-2",
};

export default function ButtonLoader({
  size = "md",
  className = "",
}: ButtonLoaderProps) {
  return (
    <span
      className={`
        inline-block animate-spin rounded-full
        border-current border-t-transparent
        ${sizeClasses[size]}
        ${className}
      `}
      aria-label="Loading"
    />
  );
}
