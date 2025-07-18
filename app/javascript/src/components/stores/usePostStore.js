import { create } from "zustand";
import { persist } from "zustand/middleware";

const usePostStore = create(
  persist(
    (set, get) => ({
      selectedCategories: [],

      toggleCategory: category => {
        const { selectedCategories } = get();
        const isAlreadySelected = selectedCategories.some(
          c => c.id === category.id
        );

        const updatedCategories = isAlreadySelected
          ? selectedCategories.filter(c => c.id !== category.id)
          : [...selectedCategories, category];

        set({ selectedCategories: updatedCategories });
      },

      setCategoriesFromNames: (names, allCategories) => {
        const selected = allCategories.filter(c => names.includes(c.name));
        set({ selectedCategories: selected });
      },

      getUrlWithTypes: () => {
        const { selectedCategories } = get();
        const names = selectedCategories.map(c => c.name).join(",");

        return names ? `?type=${names}` : "";
      },
      showCategories: false,
      toggleSidebar: () =>
        set(state => ({ showCategories: !state.showCategories })),
      closeSidebar: () => set({ showCategories: false }),
    }),
    {
      name: "post-store",
    }
  )
);

export default usePostStore;
