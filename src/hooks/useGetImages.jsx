import { useQuery } from "@tanstack/react-query";
import { fetchImages } from "@/services/imageService";

export default function useGetImages() {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["getImages"],

    queryFn: async () => {
      const images = await fetchImages();
      return images;
    },
    enabled: false,
    retry: 1,
    staleTime: 0,
    cacheTime: 0,
  });
  return { data, isLoading, refetch };
}
