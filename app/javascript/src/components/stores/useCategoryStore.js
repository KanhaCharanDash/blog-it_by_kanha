// stores/useCategoryStore.js
import { assoc, dissoc, isEmpty } from "ramda";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCategoryStore = create(
  persist(
    set => ({
      categories: {},
      setCategory: (id, category) =>
        set(({ categories }) => {
          if (isEmpty(category)) {
            return { categories: dissoc(id, categories) };
          }

          return { categories: assoc(id, category, categories) };
        }),
      setAllCategories: newCategories => {
        const categoriesObject = newCategories.reduce(
          (acc, category) => assoc(category.id, category, acc),
          {}
        );
        set({ categories: categoriesObject });
      },
      removeCategory: id =>
        set(({ categories }) => ({
          categories: dissoc(id, categories),
        })),
      clearCategories: () => set({ categories: {} }),
    }),
    {
      name: "category-store",
    }
  )
);

export default useCategoryStore;
