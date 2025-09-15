import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeleteGalleryImage } from "../../../services/vendor/images/endpointApi";

export const useDeleteGalleryImage = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["DeleteGalleryImage"],
        mutationFn: (payload) => {
            console.log("🔄 Mutation: Starting DeleteGalleryImage");
            console.log("📋 Payload in delete mutation:", payload);
            return DeleteGalleryImage(payload);
        },
        onSuccess: (data, variables) => {
            console.log("✅ Delete Mutation Success:", data);
            console.log("📊 Response Status Check:", data?.status === 200 ? "✅ Status 200" : "❌ Status not 200");
            
            // Invalidate and refetch gallery images for the specific venue
            const venueId = variables.venueId;
            console.log("🔄 Invalidating queries for venue:", venueId);
            queryClient.invalidateQueries({
                queryKey: ["galleryImagesList", venueId]
            });
            queryClient.invalidateQueries({
                queryKey: ["galleryImagesList"]
            });
            console.log("✅ Queries invalidated - UI should refresh automatically after delete");
        },
        onError: (error) => {
            console.error("❌ Mutation Error - Failed to delete gallery Images:", error);
            console.error("Error details:", {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status
            });
        }
    })
}
