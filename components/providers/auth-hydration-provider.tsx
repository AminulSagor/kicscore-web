"use client";

import { ReactNode } from "react";

import { useAuthHydration } from "@/hooks/auth/use-auth-hydration";

interface AuthHydrationProviderProps {
  children: ReactNode;
}

export default function AuthHydrationProvider({
  children,
}: AuthHydrationProviderProps) {
  useAuthHydration();

  return children;
}
