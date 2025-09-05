import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateAmenities } from "../../../services/admin/Amenities/endpointApi";
import { message } from "antd";

export const useCreateAmenities = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["CreateAmenities"],
        mutationFn: (payload) => {
            if (!payload) {
                throw new Error("Payload is required to create Amenites");
            }
            return CreateAmenities(payload);
        },
        onSuccess: (data) => {
            console.log("cretae amenities successfully", data);
             queryClient.invalidateQueries(["amenitiesList"]);
        },
        onError: (error) => {
            console.error("Create amenity error", error);
        },
    });
};
