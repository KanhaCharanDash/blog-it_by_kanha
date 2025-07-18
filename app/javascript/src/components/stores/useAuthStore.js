import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    set => ({
      authToken: null,
      userId: null,
      userName: null,
      email: null,
      organizationId: null,

      setAuth: ({ authToken, userId, userName, email, organizationId }) =>
        set({ authToken, userId, userName, email, organizationId }),

      resetAuth: () =>
        set({
          authToken: null,
          userId: null,
          userName: null,
          email: null,
          organizationId: null,
        }),
    }),
    {
      name: "auth-storage",
    }
  )
);
export default useAuthStore;
