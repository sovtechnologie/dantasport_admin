import { useMutation } from "@tanstack/react-query";
import { VendorRequestUpdateDetailsOtp } from "../../../services/admin/CreateVendor/endpointApi";

export const useUpdateSendOtp = () => {
    return useMutation({
        mutationKey: ["UpdateSendOtp"],
        mutationFn: (payload) => {
            if (!payload) {
                throw new Error("payload is required");
            }
            console.log("in mutation section payload", payload);
            return VendorRequestUpdateDetailsOtp(payload);
        },
        onSuccess: (data) => {
            console.log("OTP sent successfully:", data);
            return data;
        },
        onError: (error) => {
            console.error("Failed to send OTP:", error);
            return error;
        },
    });
}