import { useMutation } from "@tanstack/react-query";
import { CreateVendor } from "../../../services/admin/CreateVendor/endpointApi";

export const useCreateVendor = () => {
  return useMutation({
    mutationKey: ["CreateVendor"],
    mutationFn: (payload) => {
      if (!payload) {
        throw new Error("Payload is required to create a vendor");
      }
      return CreateVendor(payload);
    },
    onSuccess: (data) => {
      console.log("Vendor created successfully", data);
    },
    onError: (error) => {
      console.error("Error creating vendor", error);
    },
  });
};
