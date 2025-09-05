import { useMutation } from "@tanstack/react-query";
import { CreateVenue } from "../../../services/admin/CreateVenue/endpointApi";

export const useCreateVenue = () => {
    return useMutation({
        mutationKey: ["createVenue"],
        mutationFn: (payload) => {
            if (!payload) {
                throw new Error("Payload is required to create a venue");
            }
            return CreateVenue(payload);
        },
        onSuccess: (data) => {
            console.log("Venue created successfully", data);
        },
        onError: (error) => {
            console.error("Error creating venue", error);
        },
    });
};