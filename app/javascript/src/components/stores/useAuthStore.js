import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    set => ({
      authToken: null,
      userId: null,
      userName: null,
      email: null,

      setAuth: ({ authToken, userId, userName, email }) =>
        set({ authToken, userId, userName, email }),

      resetAuth: () =>
        set({
          authToken: null,
          userId: null,
          userName: null,
          email: null,
        }),
    }),
    {
      name: "auth-storage", // name in localStorage
    }
  )
);

export default useAuthStore;
