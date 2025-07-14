import { create } from "zustand";

const usePostStore = create(set => ({
  posts: [],
  setPosts: posts => set({ posts }),
  selectedCategoryIds: [],
  toggleCategoryId: id =>
    set(state => ({
      selectedCategoryIds: state.selectedCategoryIds.includes(id)
        ? state.selectedCategoryIds.filter(cid => cid !== id)
        : [...state.selectedCategoryIds, id],
    })),
  clearSelectedCategories: () => set({ selectedCategoryIds: [] }),
}));

export default usePostStore;
