import { useMutation } from "@tanstack/react-query";
import { UpdateVendorDetailsWithOtp } from "../../../services/admin/CreateVendor/endpointApi";

export const useUpdateVendorDetails = () => {
    return useMutation({
        mutationKey: ["updateVendorDetails"],
        mutationFn: (payload) => {
            if (!payload) {
                throw new Error("Payload is required to update vendor details");
            }
            return UpdateVendorDetailsWithOtp(payload);
        },
        onSuccess: (data) => {
            console.log("vendor details updated successfully", data);
        },
        onError: (error) => {
            console.error("Failed to update vendor details", error);
        },
    });
}