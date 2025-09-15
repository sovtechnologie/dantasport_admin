import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteGymMember } from "../../../services/vendor/gym/endpointApi";
import { message } from "antd";

export const useDeleteGymMember = (gymId, vendorId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      try {
        console.log("📤 Deleting gym member with payload:", payload);

        const response = await deleteGymMember(payload);
        
        console.log("✅ Delete gym member response:", response);
        
        if (response?.status === 200) {
          return response;
        } else {
          throw new Error(response?.message || "Failed to delete gym member");
        }
      } catch (error) {
        console.error("❌ Delete gym member error:", error);
        throw error;
      }
    },
    onSuccess: (data, variables) => {
      console.log("🎉 Gym member deleted successfully:", data);
      message.success("Gym member deleted successfully!");
      
      // Invalidate and refetch gym members list with specific gym and vendor
      if (gymId && vendorId) {
        queryClient.invalidateQueries({ queryKey: ["gymMembers", gymId, vendorId] });
      }
      // Also invalidate all gym members queries as fallback
      queryClient.invalidateQueries({ queryKey: ["gymMembers"] });
    },
    onError: (error) => {
      console.error("❌ Delete gym member failed:", error);
      const errorMessage = error?.response?.data?.message || error?.message || "Failed to delete gym member";
      message.error(errorMessage);
    },
  });
};
