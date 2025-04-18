import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCategory } from "@/services/categoryService";
import { toast } from "react-hot-toast";

export default function useUpdateCategories() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ categoryId, categoryData }) => {
      const response = await updateCategory(categoryId, categoryData);
      return response;
    },
    onSuccess: () => {
      // Invalidate and refetch categories query
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Category updated successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update category");
    },
  });
}
