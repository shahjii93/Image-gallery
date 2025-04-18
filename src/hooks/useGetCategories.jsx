import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "@/services/categoryService";

export default function useGetCategories() {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["getCategories"],
    queryFn: async () => {
      const categories = await fetchCategories();
      return categories;
    },
    enabled: false,
    retry: 1,
    staleTime: 0,
    cacheTime: 0,
  });
  return { data, isLoading, refetch };
}
