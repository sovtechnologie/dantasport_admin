import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMember } from "../../../services/vendor/members/endpointApi";
import { message } from "antd";

export const useDeleteMember = (venueId, vendorId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      try {
        console.log("📤 Deleting member with payload:", payload);

        const response = await deleteMember(payload);
        
        console.log("✅ Delete member response:", response);
        
        if (response?.status === 200) {
          return response;
        } else {
          throw new Error(response?.message || "Failed to delete member");
        }
      } catch (error) {
        console.error("❌ Delete member error:", error);
        throw error;
      }
    },
    onSuccess: (data, variables) => {
      console.log("🎉 Member deleted successfully:", data);
      message.success("Member deleted successfully!");
      
      // Invalidate and refetch members list with specific venue and vendor
      if (venueId && vendorId) {
        queryClient.invalidateQueries({ queryKey: ["members", venueId, vendorId] });
      }
      // Also invalidate all members queries as fallback
      queryClient.invalidateQueries({ queryKey: ["members"] });
    },
    onError: (error) => {
      console.error("❌ Delete member failed:", error);
      const errorMessage = error?.response?.data?.message || error?.message || "Failed to delete member";
      message.error(errorMessage);
    },
  });
};
