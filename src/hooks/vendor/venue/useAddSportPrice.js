import { useMutation } from "@tanstack/react-query";
import { AddSportPrice } from "../../../services/vendor/venueinfo/endpointApi";


export const useAddSportPrice = () => {
    return useMutation({
        mutationKey: ["addSportPrice"],
        mutationFn: (payload) => {
            if (!payload) {
                throw new Error("Payload is required to create a sport price");
            }
            return AddSportPrice(payload);
        },
        onSuccess: (data) => {
            console.log("Sport Price added successfully", data);
        },
        onError: (error) => {
            console.error("Failed to add SportPrice", error);
        },
    });
}