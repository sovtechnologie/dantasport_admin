import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateAmenities } from "../../../services/admin/Amenities/endpointApi";

export const useDeleteAmenities = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["DeleteAmenities"],
        mutationFn: (payload) => {
            if (!payload) {
                throw new Error("Payload is required to delete Amenites");
            }
            return UpdateAmenities(payload);
        },
        onSuccess: (data) => {
            console.log("delete amenities successfully", data);
            queryClient.invalidateQueries(["amenitiesList"]);
        },
        onError: (error) => {
            console.error("Create amenity error", error);
        },
    })
}