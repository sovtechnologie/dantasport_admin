import { useMutation } from "@tanstack/react-query";
import { fetchBannerById, UpdateBanner } from "../../../services/admin/Banners/endpointApi";

import { useQuery } from "@tanstack/react-query";
export const useUpdateBanner = () => {
  return useMutation({
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
  });
};

export const useFetchSingleBanner = (id) => {
  return useQuery({
    queryKey: ["singleBannerDetails", id],
    queryFn: () => fetchBannerById(id),
    enabled: !!id, // tabhi chale jab id ho
    staleTime: 5 * 60 * 1000, // cache 5 minutes
  });
};
