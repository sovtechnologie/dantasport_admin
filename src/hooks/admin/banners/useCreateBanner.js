import { useMutation } from "@tanstack/react-query";
import { CreateBanner } from "../../../services/admin/Banners/endpointApi";

export const useCreateBanner = () => {
  return useMutation(
    {
      mutationKey: ["createBanner"],
      mutationFn: (payload) => {
        if (!payload) {
          throw new Error("Payload is required to create a venue");
        }
        return CreateBanner(payload);
      },
      onSuccess: (data) => {
        console.log("banner created successfully", data);
      },
      onError: (error) => {
        console.error("Error creating banner", error);
      },
    }
  );
};

