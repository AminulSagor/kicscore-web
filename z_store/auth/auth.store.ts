import { create } from "zustand";

interface authStore {
  loggedIn: boolean;
  setLoggedIn: () => void;
}

export const authStore = create<authStore>((set) => ({
  loggedIn: true,
  setLoggedIn: () => set({ loggedIn: false }),
}));
