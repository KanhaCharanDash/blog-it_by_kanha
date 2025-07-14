// stores/useCategoryStore.js
import { update, findIndex, propEq } from "ramda";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCategoryStore = create(
  persist(
    set => ({
      categories: [],
      setCategory: category =>
        set(({ categories }) => {
          const index = findIndex(propEq("id", category.id), categories);

          if (index === -1) {
            return { categories: [...categories, category] };
          }

          return {
            categories: update(index, category, categories),
          };
        }),

      setAllCategories: newCategories => {
        set({ categories: newCategories });
      },
      removeCategory: id =>
        set(({ categories }) => ({
          categories: categories.filter(cat => cat.id !== id),
        })),
      clearCategories: () => set({ categories: [] }),
    }),
    {
      name: "category-store",
    }
  )
);

export default useCategoryStore;
