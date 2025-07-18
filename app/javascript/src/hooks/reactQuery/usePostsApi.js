import { useQuery, useMutation, useQueryClient } from "react-query";

import postsApi from "../../apis/post";
import { QUERY_KEYS } from "../../constants/query";

export const useShowPost = slug =>
  useQuery({
    queryKey: [QUERY_KEYS.POST, slug],
    queryFn: async () => {
      const response = await postsApi.show(slug);

      return response.data.post;
    },
  });

export const usePosts = selectedCategories => {
  const selectedCategoryNames = selectedCategories
    .map(cat => cat.name)
    .join(",");

  return useQuery({
    queryKey: ["posts", selectedCategoryNames],
    queryFn: async () => {
      const res = await postsApi.fetch({ type: selectedCategoryNames });

      return res.data.posts;
    },
    keepPreviousData: true,
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async payload => {
      await postsApi.create(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ slug, payload }) => {
      await postsApi.update({ slug, payload });
    },
    onSuccess: (_, { slug }) => {
      queryClient.invalidateQueries([QUERY_KEYS.POST, slug]);
      queryClient.invalidateQueries([QUERY_KEYS.POST]);
      queryClient.invalidateQueries([QUERY_KEYS.MY_POSTS]);
    },
  });
};

export const useMyPosts = () =>
  useQuery({
    queryKey: [QUERY_KEYS.MY_POSTS],
    queryFn: async () => {
      const res = await postsApi.fetchMyPosts();

      return res.data.posts;
    },
  });

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async slug => {
      await postsApi.destroy(slug);
    },
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.MY_POSTS]);
    },
  });
};
