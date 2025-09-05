import { useMutation } from "@tanstack/react-query";
import { VendorSendOtp } from "../../../services/admin/CreateVendor/endpointApi";

export const useSendOtp = () => {
  return useMutation({
    mutationKey: ["SendOtp"],
    mutationFn: (payload) => {
      if (!payload) {
        throw new Error("payload is required");
      }
      console.log("in mutation section payload", payload);
      return VendorSendOtp(payload);
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
};