import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateGalleryImage } from "../../../services/vendor/images/endpointApi";

export const useUpdateGalleryImage = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["UpdateGalleryImage"],
        mutationFn: (formData) => {
            console.log("🔄 Mutation: Starting UpdateGalleryImage");
            console.log("📋 FormData in mutation:", formData);
            return UpdateGalleryImage(formData);
        },
        onSuccess: (data, variables) => {
            console.log("✅ Mutation Success:", data);
            const venueId = variables.get('venueId');
            const imageGalleryId = variables.get('imageGalleryId');
            console.log("🔄 Invalidating queries for venue:", venueId, "and image:", imageGalleryId);

            // Invalidate specific venue gallery images
            queryClient.invalidateQueries({
                queryKey: ["galleryImagesList", venueId]
            });

            // Also invalidate all gallery images queries to ensure UI refresh
            queryClient.invalidateQueries({
                queryKey: ["galleryImagesList"]
            });

            console.log("✅ Queries invalidated - UI should refresh automatically");
        },
        onError: (error) => {
            console.error("❌ Mutation Error - Failed to update gallery image:", error);
            console.error("Error details:", {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status
            });
        }
    })
}