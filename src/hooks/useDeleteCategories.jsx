// useDeleteImage.js
import { useMutation } from "@tanstack/react-query";
import { deleteCategory } from "@/services/categoryService";

export default function useDeleteCategory() {
  const { mutate, isLoading } = useMutation({
    mutationFn: deleteCategory,
    onSuccess: (data) => {
      // refetch(); //Not needed as we are using demo apis
    },
    onError: (error) => {},
  });

  return { mutate, isLoading };
}
