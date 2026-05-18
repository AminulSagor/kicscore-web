import { create } from "zustand";

import { AuthUser } from "@/types/auth/auth-user.types";
import { removeAccessToken } from "@/utils/token/cookie.utils";

interface AuthStore {
  user: AuthUser | null;
  loggedIn: boolean;
  authHydrated: boolean;
  setAuthUser: (user: AuthUser) => void;
  setAuthHydrated: (value: boolean) => void;
  logout: () => void;
}

export const authStore = create<AuthStore>((set) => ({
  user: null,
  loggedIn: false,
  authHydrated: false,

  setAuthUser: (user) =>
    set({
      user,
      loggedIn: true,
      authHydrated: true,
    }),

  setAuthHydrated: (value) =>
    set({
      authHydrated: value,
    }),

  logout: () => {
    removeAccessToken();

    set({
      user: null,
      loggedIn: false,
      authHydrated: true,
    });
  },
}));
