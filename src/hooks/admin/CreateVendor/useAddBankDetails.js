import { useMutation } from "@tanstack/react-query";
import { AddVendorBankingDetails } from "../../../services/admin/CreateVendor/endpointApi";

export const useAddBankDetails = () => {
  return useMutation({
    mutationKey: ["addBankDetails"],
    mutationFn: (payload) => {
      if (!payload) {
        throw new Error("Payload is required to add bank details");
      }
      return AddVendorBankingDetails(payload);
    },
    onSuccess: (data) => {
      console.log("Bank details added successfully", data);
    },
    onError: (error) => {
      console.error("Failed to add bank details", error);
    },
  });
};
