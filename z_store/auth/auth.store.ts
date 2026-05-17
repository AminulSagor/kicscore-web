import { create } from "zustand";

import { SigninUser } from "@/types/auth/signin.types";
import { removeAccessToken } from "@/utils/token/cookie.utils";

interface AuthStore {
  user: SigninUser | null;
  loggedIn: boolean;
  setAuthUser: (user: SigninUser) => void;
  logout: () => void;
}

export const authStore = create<AuthStore>((set) => ({
  user: null,
  loggedIn: false,

  setAuthUser: (user) =>
    set({
      user,
      loggedIn: true,
    }),

  logout: () => {
    removeAccessToken();

    set({
      user: null,
      loggedIn: false,
    });
  },
}));
