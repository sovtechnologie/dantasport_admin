import { useMutation } from "@tanstack/react-query";
import { VendorOtpVerification } from "../../../services/admin/CreateVendor/endpointApi";


export const useVerifyOtp = () => {
  return useMutation({
    mutationKey: ["VerifyOtp"],
    mutationFn: (payload) => {
      if (!payload) {
        throw new Error("payload is required");
      }
      console.log("in mutation section payload", payload);
      return VendorOtpVerification(payload);
    },
    onSuccess: (data) => {
      console.log("OTP verify successfully:", data);
      return data;
    },
    onError: (error) => {
      console.error("Failed to verify OTP:", error);
      return error;
    },
  });
};