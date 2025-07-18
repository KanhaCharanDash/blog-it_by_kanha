import { useQuery, useMutation, useQueryClient } from "react-query";

import categoriesApi from "../../apis/category";

export const useCategories = () =>
  useQuery(["categories"], async () => {
    const res = await categoriesApi.fetch();

    return res.data;
  });

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async payload => {
      await categoriesApi.create(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["categories"]);
    },
  });
};
