import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AddGalleryImage } from "../../../services/vendor/images/endpointApi";


export const useAddGalleryImage = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["AddGalleryImage"],
        mutationFn: (formData) => {
            console.log("🔄 Mutation: Starting AddGalleryImage");
            console.log("📋 FormData in mutation:", formData);
            return AddGalleryImage(formData);
        },
        onSuccess: (data, variables) => {
            console.log("✅ Mutation Success:", data);
            // Invalidate and refetch gallery images for the specific venue
            const venueId = variables.get('venueId');
            console.log("🔄 Invalidating queries for venue:", venueId);
            
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
            console.error("❌ Mutation Error - Failed to add gallery Images:", error);
            console.error("Error details:", {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status
            });
        }
    })
}