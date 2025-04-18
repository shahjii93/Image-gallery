import { useQuery } from "@tanstack/react-query";
import { fetchFilters } from "@/services/filterService";

export default function useGetFilters() {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["getFilters"],

    queryFn: async () => {
      const filters = await fetchFilters();
      return filters;
    },
    enabled: false,
    retry: 1,
    staleTime: 0,
    cacheTime: 0,
  });
  return { data, isLoading, refetch };
}
