import { useMutation } from "@tanstack/react-query";
import { UpdateBanner } from "../../../services/admin/Banners/endpointApi";


export const useUpdateBanner = () => {
  return useMutation(
    {
      mutationKey: ["updateBanner"],
      mutationFn: (payload) => {
        if (!payload) {
          throw new Error("Payload is required to update the banner");
        }
        return UpdateBanner(payload);
      },
      onSuccess: (data) => {
        console.log("banner updated successfully", data);
      },
      onError: (error) => {
        console.error("Error updated banner", error);
      },
    }
  );
};