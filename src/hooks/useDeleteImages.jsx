// useDeleteImage.js
import { useMutation } from "@tanstack/react-query";
import { deleteImage } from "@/services/imageService";

export default function useDeleteImage() {

    const {mutate, isLoading}= useMutation( {
        mutationFn: deleteImage,
        onSuccess: (data)=>{
            // refetch(); //Not needed as we are using demo apis
        },
        onError: (error) => {
            
        }
    });

    return {mutate, isLoading}
}
