"use client";

import { ThemeProvider } from "@/components/UI/theme/theme-provider";
import { Toaster } from "react-hot-toast";

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}

      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            background: "#10201B",
            color: "#FFFFFF",
            border: "1px solid rgba(255,255,255,0.10)",
            boxShadow: "0 16px 40px rgba(0,0,0,0.18)",
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: 500,
          },
          success: {
            style: {
              background: "#007A5A",
              color: "#FFFFFF",
            },
          },
          error: {
            style: {
              background: "#B42318",
              color: "#FFFFFF",
            },
          },
          loading: {
            style: {
              background: "#1F2937",
              color: "#FFFFFF",
            },
          },
        }}
      />
    </ThemeProvider>
  );
}
