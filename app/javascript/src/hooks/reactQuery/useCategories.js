import { QUERY_KEYS } from "constants/query";

import categoriesApi from "apis/category";
import { useQuery, useMutation } from "react-query";
import queryClient from "utils/queryClient";

export const useCategories = () =>
  useQuery([QUERY_KEYS.CATEGORIES], async () => {
    const res = await categoriesApi.fetch();

    return res.data;
  });

export const useCreateCategory = () =>
  useMutation({
    mutationFn: categoriesApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.CATEGORIES]);
    },
  });
