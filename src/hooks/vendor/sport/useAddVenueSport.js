import { useMutation } from "@tanstack/react-query";
import { CreateSportVenue } from "../../../services/vendor/SportList/endpointApi";

export const useAddVenueSport = () => {
    return useMutation({
        mutationKey: ["add-venue-sport"],
        mutationFn: (payload) => {
            if (!payload) {
                throw new Error("Payload is required to create a venueSports");
            }
            return CreateSportVenue(payload);
        },
        onSuccess: (data) => {
            console.log("Venue Sport added successfully", data);
        },
        onError: (error) => {
            console.error("Failed to add Venue Sport", error);
        },
    });
}