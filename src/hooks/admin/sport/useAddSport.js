import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AddSports } from "../../../services/admin/Sports/endpointApi";

export const useAddSport = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => AddSports(payload),
    onSuccess: () => {
      // ✅ Invalidate or refetch sports list to update the UI
      queryClient.invalidateQueries(["sportsList"]);

      // Optional: show a toast or alert
      console.log("Sport added successfully!");
    },
    onError: (error) => {
      console.error("Failed to add sport:", error);
    }
  });
};
