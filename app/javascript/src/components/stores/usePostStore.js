import { create } from "zustand";
import { persist } from "zustand/middleware";

const usePostStore = create(
  persist(
    (set, get) => ({
      selectedCategories: [], // [{ id, name }]

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
    }),
    {
      name: "post-store", // unique name for localStorage
    }
  )
);

export default usePostStore;
