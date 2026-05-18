"use client";

import { useEffect } from "react";

import { getMe } from "@/service/auth/get-me.service";
import { getAccessToken } from "@/utils/token/cookie.utils";
import { authStore } from "@/z_store/auth/auth.store";
import { mapGetMeUserToAuthUser } from "@/utils/auth/auth-user.mapper";

export const useAuthHydration = () => {
  const setAuthUser = authStore((state) => state.setAuthUser);
  const setAuthHydrated = authStore((state) => state.setAuthHydrated);
  const logout = authStore((state) => state.logout);

  //======= Hydrate auth user =======//
  useEffect(() => {
    const hydrateAuth = async () => {
      const token = getAccessToken();

      if (!token) {
        setAuthHydrated(true);
        return;
      }

      try {
        const response = await getMe();
        setAuthUser(mapGetMeUserToAuthUser(response.data));
      } catch {
        logout();
      } finally {
        setAuthHydrated(true);
      }
    };

    hydrateAuth();
  }, [logout, setAuthHydrated, setAuthUser]);
};
