import { create } from "zustand";
import { persist } from "zustand/middleware";

const usePostStore = create(
  persist(
    set => ({
      posts: [],
      selectedCategoryIds: [],
      setPosts: posts => set({ posts }),
      toggleCategoryId: id =>
        set(state => ({
          selectedCategoryIds: state.selectedCategoryIds.includes(id)
            ? state.selectedCategoryIds.filter(cid => cid !== id)
            : [...state.selectedCategoryIds, id],
        })),
      clearSelectedCategories: () => set({ selectedCategoryIds: [] }),
    }),
    {
      name: "post-store", // unique storage key
      partialize: state => ({
        posts: state.posts,
        selectedCategoryIds: state.selectedCategoryIds,
      }),
    }
  )
);

export default usePostStore;
